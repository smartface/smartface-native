import { AbstractLiveMediaPlayer } from './livemediaplayer';

const LiveMediaPlayer: typeof AbstractLiveMediaPlayer = require(`./livemediaplayer.${Device.deviceOS.toLowerCase()}`).default;
type LiveMediaPlayer = AbstractLiveMediaPlayer;

export default LiveMediaPlayer;
