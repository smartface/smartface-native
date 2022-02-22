import { FileBase } from './file';

const File: typeof FileBase = require(`./file.${Device.deviceOS.toLowerCase()}`).default;
type File = FileBase;

export default File;
