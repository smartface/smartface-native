import { MultimediaBase } from './multimedia';

const Multimedia: typeof MultimediaBase = require(`./multimedia.${Device.deviceOS.toLowerCase()}`).default;
type Multimedia = MultimediaBase;

export default Multimedia;
