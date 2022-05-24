import Path from '../path';
import FileStream from '../filestream';
import AndroidConfig from '../../util/Android/androidconfig';
import { IFile } from './file';
import { FileContentMode, FileStreamType } from '../filestream/filestream';
import PathAndroid from '../path/path.android';
import NativeComponent from '../../core/native-component';
import { PATH_FILE_TYPE } from '../path/path';
const activity = AndroidConfig.activity;

const NativeFile = requireClass('java.io.File');
const NativeBitmapFactory = requireClass('android.graphics.BitmapFactory');
const NativeByteArrayOutputStream = requireClass('java.io.ByteArrayOutputStream');
const NativeBufferedOutputStream = requireClass('java.io.BufferedOutputStream');
const NativeFileOutputStream = requireClass('java.io.FileOutputStream');
const NativeBitmap = requireClass('android.graphics.Bitmap');
const NativeBufferedInputStream = requireClass('java.io.BufferedInputStream');
const NativeFileInputStream = requireClass('java.io.FileInputStream');
const NativeFileUtil = requireClass('io.smartface.android.utils.FileUtil');
export default class FileAndroid extends NativeComponent implements IFile {
  protected createNativeObject() {
    return null;
  }
  nativeAssetsList: any[] | undefined;
  resolvedPath: any;
  type: PATH_FILE_TYPE;
  fullPath: string;
  drawableResourceId: number;
  ios: {
    getNSURL: () => __SF_NSURL;
  };
  private pathResolver = new PathAndroid();
  constructor(params?: Partial<IFile>) {
    super(params);
    if (typeof params?.path !== 'string') {
      throw new Error('File path must be string');
    }

    if (params?.path) {
      this.resolvedPath = this.pathResolver.resolve(params.path);
    }
    this.type = this.resolvedPath.type;
    this.fullPath = this.resolvedPath.fullPath;

    switch (this.resolvedPath.type) {
      case Path.FILE_TYPE.ASSET:
        // this.nativeObject will be String for performance
        this.getNativeAssetsList()?.forEach((assetName) => {
          if (this.resolvedPath.name === assetName) {
            // this.nativeObject = this.resolvedPath.name;
            this.nativeObject = this.resolvedPath.fullPath ? new NativeFile(this.resolvedPath.fullPath) : null;
            this.copyAssetFile(this.nativeObject, assetName);
          }
        });
        break;
      case Path.FILE_TYPE.DRAWABLE: {
        // this.nativeObject will be Bitmap
        const resources = AndroidConfig.activityResources;
        this.drawableResourceId = resources.getIdentifier(this.resolvedPath.name, 'drawable', AndroidConfig.packageName);
        this.nativeObject = this.drawableResourceId !== 0 ? NativeBitmapFactory.decodeResource(resources, this.drawableResourceId) : null;
        break;
      }
      case Path.FILE_TYPE.RAU_ASSETS:
      case Path.FILE_TYPE.RAU_DRAWABLE:
      case Path.FILE_TYPE.EMULATOR_ASSETS:
      case Path.FILE_TYPE.EMULATOR_DRAWABLE:
      case Path.FILE_TYPE.FILE:
        // this.nativeObject will be File
        this.nativeObject = this.resolvedPath.fullPath ? new NativeFile(this.resolvedPath.fullPath) : null;
        break;
      default:
        break;
    }
  }
  android: Partial<{}>;

  get creationDate(): number {
    return this.resolvedPath.type === Path.FILE_TYPE.FILE ? this.nativeObject.lastModified() : -1;
  }

  get exists(): boolean {
    if (this.resolvedPath.type === Path.FILE_TYPE.DRAWABLE || this.resolvedPath.type === Path.FILE_TYPE.ASSET) {
      return this.nativeObject ? true : false;
    } else {
      return this.nativeObject && this.nativeObject.exists();
    }
  }

  get extension(): string {
    const fileName = this.name;
    if (fileName.lastIndexOf('.') !== -1) {
      return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length);
    } else {
      return fileName;
    }
  }

  get isDirectory(): boolean {
    return this.nativeObject ? (this.resolvedPath.type === Path.FILE_TYPE.FILE ? this.nativeObject.isDirectory() : false) : false;
  }

  get isFile(): boolean {
    return this.nativeObject ? (this.resolvedPath.type === Path.FILE_TYPE.FILE ? this.nativeObject.isFile() : true) : false;
  }

  get modifiedDate(): number {
    return this.resolvedPath.type === Path.FILE_TYPE.FILE && this.nativeObject ? this.nativeObject.lastModified() : -1;
  }

  get name(): string {
    return this.resolvedPath.name;
  }

  get parent() {
    if (this.resolvedPath.type === Path.FILE_TYPE.FILE && this.nativeObject) {
      return new FileAndroid({
        path: this.nativeObject.getParent().getAbsolutePath()
      });
    } else {
      return null;
    }
  }

  get path(): string {
    return this.resolvedPath.path;
  }
  set path(value: string) {
    if (this.resolvedPath) {
      this.resolvedPath.path = value;
    }
  }

  get size(): number {
    if (!this.nativeObject) {
      return -1;
    }
    switch (this.resolvedPath.type) {
      case Path.FILE_TYPE.ASSET: {
        const assetsInputStream = activity.getAssets().open(this.nativeObject);
        const size = assetsInputStream.available();
        assetsInputStream.close();
        return size;
      }
      case Path.FILE_TYPE.DRAWABLE:
        return this.nativeObject.getByteCount();
      case Path.FILE_TYPE.FILE:
      case Path.FILE_TYPE.EMULATOR_ASSETS:
      case Path.FILE_TYPE.EMULATOR_DRAWABLE:
      case Path.FILE_TYPE.RAU_ASSETS:
      case Path.FILE_TYPE.RAU_DRAWABLE:
        return this.nativeObject.length();
      default:
        return -1;
    }
  }

  get writable(): boolean {
    return this.resolvedPath.type === Path.FILE_TYPE.FILE && this.nativeObject ? this.nativeObject.canWrite() : false;
  }

  getNativeAssetsList(): any[] | undefined {
    // Checking assets list loaded.
    if (!this.nativeAssetsList) {
      this.nativeAssetsList = this.loadNativeAssetsList();
    }
    return this.nativeAssetsList;
  }

  loadNativeAssetsList(): any[] | undefined {
    const nativeAssetsList = activity.getAssets().list('');
    if (nativeAssetsList) {
      return toJSArray(nativeAssetsList);
    }
    return undefined;
  }

  getAbsolutePath(): string {
    return this.fullPath;
  }

  copy(destination: string): boolean {
    if (this.nativeObject) {
      let destinationFile = new FileAndroid({
        path: destination
      });
      if (destinationFile.isFile) {
        let destinationFileStream;
        if (this.resolvedPath.type === Path.FILE_TYPE.FILE) {
          let destinationConfigured;
          if (this.isDirectory) {
            destinationConfigured = destinationFile.isDirectory || (destinationFile.exists ? false : destinationFile.createDirectory(true));
            return destinationConfigured && this.copyDirectory(this, destinationFile);
          } else if (this.isFile) {
            destinationConfigured = false;
            if (destinationFile.exists && destinationFile.isDirectory) {
              destinationFile = new FileAndroid({
                path: destinationFile.path + '/' + this.name
              });
              destinationConfigured = destinationFile.createFile(true);
            } else if (!destinationFile.exists) {
              destinationConfigured = destinationFile.createFile(true);
            }
            return destinationConfigured && this.copyFile(this, destinationFile);
          }
        } else if (this.resolvedPath.type === Path.FILE_TYPE.ASSET) {
          if (destinationFile.exists && destinationFile.isDirectory) {
            destinationFile = new FileAndroid({
              path: destination + '/' + this.name
            });
          }
          if (destinationFile.createFile(true)) {
            this.copyAssetFile(destinationFile.nativeObject, this.resolvedPath.name);
            return true;
          }
        } else if (this.resolvedPath.type === Path.FILE_TYPE.DRAWABLE) {
          if (destinationFile.exists && destinationFile.isDirectory) {
            destinationFile = new FileAndroid({
              path: destination + '/' + this.name + '.png'
            });
          }
          if (destinationFile.createFile(true)) {
            const drawableByteArrayStream = new NativeByteArrayOutputStream();
            this.nativeObject.compress(NativeBitmap.CompressFormat.PNG, 0 /*ignored for PNG*/, drawableByteArrayStream);
            const bitmapdata = drawableByteArrayStream.toByteArray();

            const destinationFileOutputStream = new NativeFileOutputStream(destinationFile.nativeObject, false);
            destinationFileStream = new NativeBufferedOutputStream(destinationFileOutputStream);
            destinationFileStream.write(bitmapdata);
            destinationFileStream.flush();
            destinationFileStream.close();
            drawableByteArrayStream.close();
            return true;
          }
        } else {
          if (destinationFile.exists && destinationFile.isDirectory) {
            let destinationFileName = destination + '/' + this.name;
            if (this.resolvedPath.type === Path.FILE_TYPE.EMULATOR_DRAWABLE || this.resolvedPath.type === Path.FILE_TYPE.RAU_DRAWABLE) {
              destinationFileName += '.png';
            }
            destinationFile = new FileAndroid({
              path: destinationFileName
            });
          }
          if (destinationFile.createFile(true)) {
            return this.copyFile(this, destinationFile);
          }
        }
      }
    }
    return false;
  }

  createFile(createParents: boolean): boolean {
    if (this.resolvedPath.type === Path.FILE_TYPE.FILE) {
      if (this.nativeObject.exists()) {
        this.remove(true);
      }
      if (createParents) {
        const fileParentPath = this.resolvedPath.fullPath.substring(0, this.resolvedPath.fullPath.lastIndexOf('/'));
        const fileParent = new NativeFile(fileParentPath);
        if (!fileParent.exists()) {
          fileParent.mkdirs();
        }
      }
      return this.nativeObject.createNewFile();
    }
    return false;
  }

  createDirectory(createParents: any): boolean {
    if (this.resolvedPath.type === Path.FILE_TYPE.FILE) {
      return createParents ? this.nativeObject.mkdirs() : this.nativeObject.mkdir();
    }
    return false;
  }

  remove(withChilds?: boolean): boolean {
    return this.resolvedPath.type === Path.FILE_TYPE.FILE && this.removeFile(this, withChilds);
  }

  getFiles(): IFile[] | null {
    if (this.resolvedPath.type === Path.FILE_TYPE.FILE && this.nativeObject && this.exists) {
      const allJSFiles: FileAndroid[] = [];
      const allNativeFiles = toJSArray(this.nativeObject.listFiles());
      allNativeFiles?.forEach((tmpFile) => {
        allJSFiles.push(
          new FileAndroid({
            path: tmpFile.getAbsolutePath()
          })
        );
      });

      return allJSFiles;
    }
    return null;
  }

  move(destination: string): boolean {
    if (this.resolvedPath.type === Path.FILE_TYPE.FILE) {
      let destinationFile = new FileAndroid({
        path: destination
      });
      if (destinationFile.isFile) {
        if (this.isFile || this.isDirectory) {
          if (destinationFile.exists) {
            if (destinationFile.isDirectory) {
              // Move to folder
              destinationFile = new FileAndroid({
                path: destinationFile.path + '/' + this.name
              });
            } else {
              // MOVE TO FILE
              destinationFile.remove();
            }
          }
        }
        if (this.nativeObject.renameTo(destinationFile.nativeObject)) {
          this.resolvedPath.path = destinationFile.path;
          this.resolvedPath.fullPath = destinationFile.path;
          return true;
        }
      }
    }
    return false;
  }

  openStream(streamType: FileStreamType, contentMode: FileContentMode): FileStream | undefined {
    return new FileStream({
      source: this,
      streamType: streamType,
      mode: streamType,
      contentMode: contentMode
    });
  }

  rename(newName: string): boolean {
    if (this.resolvedPath.type === Path.FILE_TYPE.FILE) {
      const newFileFullPath = this.path.substring(0, this.path.lastIndexOf('/') + 1) + newName;
      const newFile = new NativeFile(newFileFullPath);
      if (this.nativeObject.renameTo(newFile)) {
        this.resolvedPath.path = newFileFullPath;
        this.resolvedPath.fullPath = newFileFullPath;
        return true;
      }
    }
    return false;
  }

  //
  copyAssetFile(destinationFile: any, filename: any) {
    const assetsInputStream = activity.getAssets().open(filename);
    const assetsBufferedInputStream = new NativeBufferedInputStream(assetsInputStream);
    const destinationFileStream = new NativeFileOutputStream(destinationFile, false);
    this.copyStream(assetsInputStream, destinationFileStream);
    destinationFileStream.flush();
    assetsBufferedInputStream.close();
    assetsInputStream.close();
    destinationFileStream.close();
  }

  copyDirectory(sourceDirectory: any, destinationDirectory: any) {
    const sourceFiles = toJSArray(sourceDirectory.getFiles());
    if (!sourceFiles) return false;
    sourceFiles.forEach(function (tmpFile) {
      if (tmpFile.isFile) {
        const destinationFile = new FileAndroid({
          path: destinationDirectory.path + '/' + tmpFile.name
        });
        if (destinationFile.createFile(true)) {
          this.copyFile(tmpFile, destinationFile);
        }
      } else if (tmpFile.isDirectory) {
        const newDirectory = new FileAndroid({
          path: tmpFile.path + '/' + tmpFile.name
        });
        if (newDirectory.createDirectory(true)) {
          this.copyDirectory(tmpFile, newDirectory);
        }
      }
    });
    return true;
  }

  removeFile(fileToRemove: any, withChilds?: boolean) {
    if (fileToRemove.exists) {
      if (fileToRemove.isDirectory) {
        if (withChilds) {
          const allFiles = toJSArray(fileToRemove.getFiles());
          if (allFiles) {
            allFiles.forEach(function (tmpFile) {
              this.removeFile(tmpFile, withChilds);
            });
          }
          return this.removeFile(fileToRemove, false);
        }
      }
      return fileToRemove.nativeObject.delete();
    }
  }

  copyStream(sourceFileStream: any, destinationFileStream: any) {
    NativeFileUtil.copyStream(sourceFileStream, destinationFileStream); // TODO: After fixing  AND-3271 issue, need to implement by Native Api Access

    // var buffer = [];
    // buffer.length = 1024;
    // var len = sourceFileStream.read(array(buffer, "byte"));
    // while (len > 0) {
    //     destinationFileStream.write(array(buffer, "byte"), 0, len);
    //     len = sourceFileStream.read(array(buffer, "byte"));
    // }
  }

  copyFile(sourceFile: any, destinationFile: any) {
    if (sourceFile.isFile && destinationFile.isFile) {
      const sourceFileStream = new NativeFileInputStream(sourceFile.nativeObject);
      const destinationFileStream = new NativeFileOutputStream(destinationFile.nativeObject, false);
      this.copyStream(sourceFileStream, destinationFileStream);
      sourceFileStream.close();
      destinationFileStream.close();

      return true;
    }
    return false;
  }
}

// module.exports = File;
