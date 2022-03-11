import { FileBase } from './file';

class FileImpl extends FileBase {
  constructor(params: ConstructorParameters<typeof FileBase>['0']) {
    super(params);
  }
}

const File: typeof FileImpl = require(`./file.${Device.deviceOS.toLowerCase()}`).default;
type File = FileImpl;
export default File;
