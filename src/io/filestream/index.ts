import IBlob from '../../global/blob/blob';
import { FileStreamBase } from './filestream';

/**
 * @class IO.FileStream
 * @since 0.1
 *
 * FileStream is a class which allows you to making IO operations.
 *
 *     @example
 *     import File from '@smartface/native/io/file';
 *     import Path from '@smartface/native/io/path';
 *     import FileStream from '@smartface/native/io/filestream';
 *     const myFile = new File({
 *         path: Path.DataDirectory + '/myFile.txt'
 *     });
 *     const myFileStream = myFile.openStream(FileStream.StreamType.WRITE, FileStream.ContentMode.TEXT);
 *     myFileStream.write('Smartface');
 *     myFileStream.close();
 *
 */
class FileStreamImpl extends FileStreamBase {
  close(): void {
    throw new Error('Method not implemented.');
  }
  readBlob(): IBlob {
    throw new Error('Method not implemented.');
  }
  readToEnd<ContentType = string | IBlob>(): ContentType {
    throw new Error('Method not implemented.');
  }
  write(content: string | IBlob): boolean {
    throw new Error('Method not implemented.');
  }
}

const FileStream: typeof FileStreamImpl = require(`./filestream.${Device.deviceOS.toLowerCase()}`).default;
type FileStream = FileStreamImpl;

export default FileStream;
