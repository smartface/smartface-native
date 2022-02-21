import FileStream from '.';
import { INativeComponent } from '../../core/inative-component';
import Blob from '../../global/blob';

export enum StreamType {
  APPEND,
  READ,
  WRITE
}

export enum ContentMode {
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
  mode: FileStream.StreamType;

  /**
   * Gets the content mode of FileStream operation.
   * @android
   * @ios
   * @since 0.1
   */
  contentMode: FileStream.ContentMode;

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

  offset: number;

  /**
   * Closes the FileStream instance. FileStream have to be closed when its job is done.
   * @android
   * @ios
   * @since 0.1
   */
  close: () => void;
  /**
   * Gets the {@link Blob} object from FileStream.
   * @android
   * @ios
   * @deprecated since 1.1.10, you may use FileStream.readToEnd() function after you change contentMode of FileStream to FileStream.ContentMode.BINARY.
   */
  readBlob: () => Blob;
  /**
   * Gets all characters or blob content from the file stream depending of {@link IO.FileStream#ContentMode contentMode} content mode.
   * If FileStream not opened with {@link IO.FileStream.StreamType#READ} mode, returns null.
   * @android
   * @ios
   * @since 0.1
   */
  readToEnd: () => string | Blob;
  /**
   * Writes all characters or blob content into the file stream depending of {@link IO.FileStream#ContentMode contentMode} content mode.
   * If the file stream opened with {@link IO.FileStream.StreamType#READ}, returns false.
   * @android
   * @ios
   * @since 0.1
   */
  write: (content: string | Blob) => boolean;
  /**
   * iOS only metthod
   * @iOS
   */
  seekToEnd?: () => void;
}

/**
 * berk
 */
export class FileStreamBase implements IFileStream {
  static StreamType = StreamType;
  static ContentMode = ContentMode;

  static create(path: any, streamMode: any, contentMode: number): FileStreamBase {
    throw new Error('Method not implemented.');
  }

  get mode(): StreamType {
    throw new Error('Method not implemented.');
  }
  get contentMode(): ContentMode {
    throw new Error('Method not implemented.');
  }
  get isReadable(): boolean {
    throw new Error('Method not implemented.');
  }
  get isWritable(): boolean {
    throw new Error('Method not implemented.');
  }
  get name(): string {
    throw new Error('Method not implemented.');
  }
  get path(): string {
    throw new Error('Method not implemented.');
  }
  get offset(): number {
    throw new Error('Method not implemented.');
  }

  close(): void {
    throw new Error('Method not implemented.');
  }
  readBlob(): Blob {
    throw new Error('Method not implemented.');
  }
  readToEnd(): string | Blob {
    throw new Error('Method not implemented.');
  }
  write(content: string | Blob): boolean {
    throw new Error('Method not implemented.');
  }
  seekToEnd?(): void {
    throw new Error('Method not implemented.');
  }

  nativeObject: any;
}
