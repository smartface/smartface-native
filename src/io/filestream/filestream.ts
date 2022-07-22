import { INativeComponent } from '../../core/inative-component';
import NativeComponent from '../../core/native-component';
import IBlob from '../../global/blob/blob';
import { IFile } from '../file/file';

export enum FileStreamType {
  APPEND,
  READ,
  WRITE
}

export enum FileContentMode {
  TEXT,
  BINARY
}

export interface IFileStream extends INativeComponent {
  /**
   * Gets the mode of FileStream operation.
   * @android
   * @ios
   * @since 0.1
   */
  mode: FileStreamType;

  /**
   * Gets the content mode of FileStream operation.
   * @android
   * @ios
   * @since 0.1
   */
  contentMode: FileContentMode;

  /**
   * Checks whether the stream is readable.
   * @android
   * @ios
   * @since 0.1
   */
  isReadable: boolean;

  /**
   * Checks whether the stream is writable.
   * @android
   * @ios
   * @since 0.1
   */
  isWritable: boolean;

  /**
   * Gets the name of the file it belongs to.
   * @android
   * @ios
   * @since 0.1
   */
  name: string;

  /**
   * Gets the path of the file it belongs to.
   * @android
   * @ios
   * @since 0.1
   */
  path: string;

  /**
   * iOS only property. Gets the offset of the file stream set as padding.
   * @ios
   */
  offset: number;

  /**
   * Closes the FileStream instance. FileStream have to be closed when its job is done.
   * @android
   * @ios
   * @since 0.1
   */
  close(): void;
  /**
   * Gets the {@link Blob} object from FileStream.
   * @android
   * @ios
   * @deprecated since 1.1.10, you may use FileStream.readToEnd() function after you change contentMode of FileStream to FileStream.ContentMode.BINARY.
   */
  readBlob(): IBlob;
  /**
   * Gets all characters or blob content from the file stream depending of {@link IO.FileStream#ContentMode contentMode} content mode.
   * If FileStream not opened with {@link IO.FileStream.StreamType#READ} mode, returns null.
   * @android
   * @ios
   * @since 0.1
   */
  readToEnd<ContentType = string | IBlob>(): ContentType;
  /**
   * Writes all characters or blob content into the file stream depending of {@link IO.FileStream#ContentMode contentMode} content mode.
   * If the file stream opened with {@link IO.FileStream.StreamType#READ}, returns false.
   * @android
   * @ios
   * @since 0.1
   */
  write(content: string | IBlob): boolean;
  /**
   * Scans through the end of the file. See the example in the file and blob.
   * @iOS
   */
  seekToEnd?: () => void;
}

export interface FileStreamParams extends IFileStream {
  source: IFile;
  streamType: FileStreamType;
  contentMode: FileContentMode;
}
export abstract class FileStreamBase extends NativeComponent implements IFileStream {
  constructor(params?: Partial<FileStreamParams>) {
    super(params);
  }
  abstract readToEnd<ContentType = string | IBlob>(): ContentType;
  mode: FileStreamType;
  contentMode: FileContentMode;
  isReadable: boolean;
  isWritable: boolean;
  name: string;
  path: string;
  offset: number;
  abstract close(): void;
  abstract readBlob(): IBlob;
  abstract write(content: string | IBlob): boolean;
  seekToEnd?: (() => void) | undefined;
  static StreamType = FileStreamType;
  static ContentMode = FileContentMode;
  static create(path: any, streamMode: any, contentMode: number): FileStreamBase | undefined {
    throw new Error('Method not implemented.');
  }
  protected createNativeObject() {
    throw new Error('Method not implemented.');
  }
}
