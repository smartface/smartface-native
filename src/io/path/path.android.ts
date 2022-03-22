import AndroidConfig from '../../util/Android/androidconfig';
import TypeUtil from '../../util/type';
import { AndroidProps, IPath, PathBase } from './path';

const NativeFile = requireClass('java.io.File');
const NativeEnvironment = requireClass('android.os.Environment');
const NativeDisplayMetrics = requireClass('android.util.DisplayMetrics');
const NativeConfiguration = requireClass('android.content.res.Configuration');

interface IStorageType {
  internal: string;
  external: string;
  usb: string;
  isResolved: boolean;
}

const storages: IStorageType = {
  internal: '',
  external: '',
  usb: '',
  isResolved: false
};
const resolvedPaths = {};
const emulatorPath = AndroidConfig.activity.getExternalCacheDir().getAbsolutePath();
const playerRauPath = AndroidConfig.activity.getFilesDir().getAbsolutePath();
const externalFilesDirPath = AndroidConfig.activity.getExternalFilesDir(null).getAbsolutePath();

const drawableSizes = ['small', 'normal', 'large', 'xlarge'];
const drawableDensities = ['ldpi', 'mdpi', 'hdpi', 'xhdpi', 'xxhdpi', 'xxxhdpi'];
let desiredDrawableSizeIndex: number;
let desiredDrawableDensityIndex: number;
export default class PathAndroid extends PathBase {
  constructor(params?: Partial<IPath>) {
    super(params);
    this.setScreenConfigs();
  }

  static get ImagesUriScheme(): string {
    return 'images://';
  }

  static get AssetsUriScheme(): string {
    return 'assets://';
  }

  static get Separator(): string {
    return '/';
  }

  static get DataDirectory(): string {
    const filesDir = AndroidConfig.activity.getFilesDir();
    return filesDir ? filesDir.getAbsolutePath() : null;
  }

  static get android(): AndroidProps {
    return {
      get storages() {
        if (!storages.isResolved) {
          const filesDir = NativeEnvironment.getExternalStorageDirectory().getPath();
          if (filesDir) {
            storages['internal'] = filesDir;
          }

          // @todo test for more devices
          const externalStorage = new NativeFile('/storage/sdcard1/');
          if (externalStorage.exists() && externalStorage.list() !== null) {
            storages['external'] = '/storage/sdcard1/';
          }

          // @todo test for more devices
          const usbStorage = new NativeFile('/storage/usbdisk/');
          if (usbStorage.exists() && usbStorage.list() !== null) {
            storages['usb'] = '/storage/usbdisk/';
          }
          storages.isResolved = true;
        }
        return storages;
      }
    };
  }

  resolve(path: string) {
    return TypeUtil.isString(path) ? this.getResolvedPath(path) : null;
  }

  getResolvedPath(path) {
    if (resolvedPaths[path]) {
      return resolvedPaths[path];
    }

    resolvedPaths[path] = {};
    resolvedPaths[path].path = path;

    let fileName;
    if (path.startsWith('assets://')) {
      // assets://smartface.png to smartface.png
      fileName = path.slice(9);
      resolvedPaths[path].name = fileName;

      if (AndroidConfig.isEmulator) {
        // This is emulator. Check file system
        resolvedPaths[path].type = PathAndroid.FILE_TYPE.EMULATOR_ASSETS;
        resolvedPaths[path].fullPath = this.getEmulatorAssetsPath() + '/' + fileName;
      } else {
        // This is player. Check RAU
        resolvedPaths[path].type = PathAndroid.FILE_TYPE.RAU_ASSETS;
        resolvedPaths[path].fullPath = this.getRauAssetsPath() + '/' + fileName;
        // if assets not exists in rau
        if (!this.checkFileExistsInPath(resolvedPaths[path].fullPath)) {
          resolvedPaths[path].type = PathAndroid.FILE_TYPE.ASSET;
          resolvedPaths[path].fullPath = this.getExternalFilesDirPath() + '/' + fileName;
        }
      }
    } else if (path.startsWith('images://')) {
      // images://smartface.png to smartface.png
      fileName = path.slice(9);
      if (fileName.endsWith('.png')) {
        // we need file name without extension. We should check fileName.png and fileName.9.png for 9Path drawable.
        // images://smartface.png to smartface
        fileName = fileName.substring(0, fileName.lastIndexOf('.png'));
      }
      resolvedPaths[path].name = fileName;

      if (AndroidConfig.isEmulator) {
        // This is emulator. Check file system
        resolvedPaths[path].type = PathAndroid.FILE_TYPE.EMULATOR_DRAWABLE;
        resolvedPaths[path].fullPath = this.findDrawableAtDirectory(this.getEmulatorDrawablePath(), fileName);
      } else {
        // This is player and does not supports RAU drawable get it from apk
        resolvedPaths[path].type = PathAndroid.FILE_TYPE.DRAWABLE;
        resolvedPaths[path].fullPath = path;
      }
    } else {
      // cache normal path too for performance. We dont want to check more.
      resolvedPaths[path].type = PathAndroid.FILE_TYPE.FILE;
      resolvedPaths[path].name = path.substring(path.lastIndexOf('/') + 1, path.length);
      resolvedPaths[path].fullPath = path;
    }
    return resolvedPaths[path];
  }

  private getExternalFilesDirPath() {
    return externalFilesDirPath;
  }

  private getEmulatorAssetsPath() {
    return emulatorPath + '/assets';
  }

  private getEmulatorDrawablePath() {
    return emulatorPath + '/res';
  }

  private getRauAssetsPath() {
    return playerRauPath + '/system/rau/assets';
  }

  private findDrawableAtDirectory(path, drawableName) {
    // searching drawable on device density and screen size
    let targetPath = this.checkDrawableVariations(path, drawableSizes[desiredDrawableSizeIndex], drawableDensities[desiredDrawableDensityIndex], drawableName);
    if (targetPath) {
      return targetPath;
    }

    // searching on drawable folder
    targetPath = path + '/drawable/' + drawableName + '.png';
    if (this.checkFileExistsInPath(targetPath)) {
      return targetPath;
    }

    let i, j;
    // searching drawable on densities and screen size which are over the device density and screen size
    for (i = desiredDrawableDensityIndex + 1; i < drawableDensities.length; i++) {
      for (j = desiredDrawableSizeIndex + 1; j < drawableSizes.length; j++) {
        targetPath = this.checkDrawableVariations(path, drawableSizes[j], drawableDensities[i], drawableName);
        if (targetPath) {
          return targetPath;
        }
      }
    }

    // searching drawable on densities and screen size which are below the device density and screen size
    for (i = desiredDrawableDensityIndex - 1; i >= 0; i--) {
      for (j = desiredDrawableSizeIndex - 1; j >= 0; j--) {
        targetPath = this.checkDrawableVariations(path, drawableSizes[j], drawableDensities[i], drawableName);
        if (targetPath) {
          return targetPath;
        }
      }
    }
    return null;
  }

  private checkDrawableVariations(path, drawableSize, drawableDensity, drawableName) {
    let targetPath = path + '/drawable-' + drawableDensity + '/' + drawableName + '.png';
    if (this.checkFileExistsInPath(targetPath)) {
      return targetPath;
    }

    let targetPath9Path = path + '/drawable-' + drawableDensity + '/' + drawableName + '.9.png';
    if (this.checkFileExistsInPath(targetPath9Path)) {
      return targetPath9Path;
    }

    targetPath = path + '/drawable-' + drawableSize + '/' + drawableName + '.png';
    if (this.checkFileExistsInPath(targetPath)) {
      return targetPath;
    }

    targetPath9Path = path + '/drawable-' + drawableSize + '/' + drawableName + '.9.png';
    if (this.checkFileExistsInPath(targetPath9Path)) {
      return targetPath9Path;
    }

    targetPath = path + '/drawable-' + drawableSize + '-' + drawableDensity + '/' + drawableName + '.png';
    if (this.checkFileExistsInPath(targetPath)) {
      return targetPath;
    }

    targetPath9Path = path + '/drawable-' + drawableSize + '-' + drawableDensity + '/' + drawableName + '.9.png';
    if (this.checkFileExistsInPath(targetPath9Path)) {
      return targetPath9Path;
    }
    return null;
  }

  private checkFileExistsInPath(path) {
    // for preventing loop between File and Path, one of them must use native.
    const fileInPath = new NativeFile(path);
    return fileInPath.exists();
  }

  private setScreenConfigs() {
    const configuration = AndroidConfig.activityResources.getConfiguration();
    if ((configuration.screenLayout & NativeConfiguration.SCREENLAYOUT_SIZE_MASK) === NativeConfiguration.SCREENLAYOUT_SIZE_SMALL) {
      desiredDrawableSizeIndex = 0;
    } else if ((configuration.screenLayout & NativeConfiguration.SCREENLAYOUT_SIZE_MASK) === NativeConfiguration.SCREENLAYOUT_SIZE_LARGE) {
      desiredDrawableSizeIndex = 2;
    } else if ((configuration.screenLayout & NativeConfiguration.SCREENLAYOUT_SIZE_MASK) === NativeConfiguration.SCREENLAYOUT_SIZE_XLARGE) {
      desiredDrawableSizeIndex = 3;
    } else {
      // NativeConfiguration.SCREENLAYOUT_SIZE_NORMAL and others
      desiredDrawableSizeIndex = 1;
    }

    const metrics = AndroidConfig.activityResources.getDisplayMetrics();

    if (metrics.densityDpi <= NativeDisplayMetrics.DENSITY_LOW) {
      desiredDrawableDensityIndex = 0;
    } else if (metrics.densityDpi <= NativeDisplayMetrics.DENSITY_MEDIUM) {
      desiredDrawableDensityIndex = 1;
    } else if (metrics.densityDpi <= NativeDisplayMetrics.DENSITY_HIGH) {
      desiredDrawableDensityIndex = 2;
    } else if (metrics.densityDpi <= NativeDisplayMetrics.DENSITY_XHIGH) {
      desiredDrawableDensityIndex = 3;
    } else if (metrics.densityDpi <= NativeDisplayMetrics.DENSITY_XXHIGH) {
      desiredDrawableDensityIndex = 4;
    } else {
      desiredDrawableDensityIndex = 5;
    }
  }
}
