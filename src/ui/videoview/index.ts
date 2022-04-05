import { ConstructorOf } from '../../core/constructorof';
import { IVideoView } from './videoview';

const VideoView: ConstructorOf<IVideoView, Partial<IVideoView>> = require(`./videoview.${Device.deviceOS.toLowerCase()}`).default;
type VideoView = IVideoView;
export default VideoView;
