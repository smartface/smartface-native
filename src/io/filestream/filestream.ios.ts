import NativeComponent from '../../core/native-component';
import Blob from '../../global/blob';
import { FileContentMode, FileStreamType, IFileStream } from './filestream';

export default class FileStreamIOS extends NativeComponent implements IFileStream {
  protected __createNativeObject__() {
    return null;
  }
  static create(path: any, streamMode: any, contentMode: number): FileStreamIOS {
    const fileStreamInstance = new FileStreamIOS();
    fileStreamInstance.nativeObject = __SF_FileStream.createWithPathWithStreamModeWithContentMode(path, streamMode, contentMode);
    return fileStreamInstance;
  }

  get mode(): FileStreamType {
    return this.nativeObject.streamMode;
  }

  get contentMode(): FileContentMode {
    return this.nativeObject.contentMode;
  }

  get isReadable(): boolean {
    return this.nativeObject.isReadable();
  }

  get isWritable(): boolean {
    return this.nativeObject.isWritable();
  }

  get name(): string {
    return this.nativeObject.getName();
  }

  get path(): string {
    return this.nativeObject.getPath();
  }

  get offset(): number {
    return this.nativeObject.offset;
  }
  set offset(value: number) {
    this.nativeObject.offset = value;
  }

  close(): void {
    return this.nativeObject.closeFile();
  }

  readBlob(): Blob {
    return new Blob(this.nativeObject.getBlob());
  }

  readToEnd<ContentType = string | Blob>(): ContentType {
    const retval = this.nativeObject.readToEnd(); //It will return string or nsdata depends on content mode.
    return this.contentMode === FileStreamIOS.ContentMode.BINARY ? new Blob(retval) : retval;
  }

  write(content: string | Blob): boolean {
    let retval = false;
    switch (this.contentMode) {
      case FileStreamIOS.ContentMode.TEXT:
        retval = this.nativeObject.writeString(content);
        break;
      case FileStreamIOS.ContentMode.BINARY:
        if (content instanceof Blob) retval = this.nativeObject.writeBinary(content.nativeObject);
        break;
      default:
        break;
    }
    return retval;
  }

  seekToEnd(): void {
    return this.nativeObject.seekToEnd();
  }

  static StreamType = FileStreamType;
  static ContentMode = FileContentMode;
}
