import { IPath } from './path';

const Path: IPath = require(`./path.${Device.deviceOS.toLowerCase()}`).default;

export default Path;
