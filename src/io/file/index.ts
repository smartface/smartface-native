import { AbstractFile, IFile } from './file';

class FileImpl extends AbstractFile {
  constructor(params: Partial<IFile>) {
    super(params);
  }
}

const File: typeof FileImpl = require(`./file.${Device.deviceOS.toLowerCase()}`).default;
type File = FileImpl;
export default File;
