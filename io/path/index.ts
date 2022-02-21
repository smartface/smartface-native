import { PathBase } from './path';

const Path: typeof PathBase = require(`./path.${Device.deviceOS.toLowerCase()}`).default;
type Path = PathBase;

export default Path;
