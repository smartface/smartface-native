import { AbstractLiveMediaPublisher } from './livemediapublisher';

const LiveMediaPublisher: typeof AbstractLiveMediaPublisher = require(`./livemediapublisher.${Device.deviceOS.toLowerCase()}`).default;
type LiveMediaPublisher = AbstractLiveMediaPublisher;

export default LiveMediaPublisher;
