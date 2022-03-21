import { AbstractImage } from './image';

class Imageimpl extends AbstractImage {}

const Image: typeof Imageimpl = require(`./image.${Device.deviceOS.toLowerCase()}`).default;
type Image = Imageimpl;

export default Image;
