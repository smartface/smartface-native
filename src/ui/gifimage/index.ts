import { GifImageImpl } from './gifimage';

const GifImage: typeof GifImageImpl = require(`./gifimage.${Device.deviceOS.toLowerCase()}`).default;
type GifImage = GifImageImpl;

export default GifImage;
