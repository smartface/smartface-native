import { ConstructorOf } from '../../core/constructorof';
import { IZoomableImageView } from './zoomableimageview';

const ZoomableImageView: ConstructorOf<IZoomableImageView, Partial<IZoomableImageView>> = require(`./zoomableimageview.${Device.deviceOS.toLowerCase()}`).default;
type ZoomableImageView = IZoomableImageView;
export default ZoomableImageView;
