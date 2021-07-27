
/**
 * @class UI.LiveMediaPlayer
 * @since 4.2.2
 *
 * LiveMediaPublisher is a live streaming player. It is used for audio and video playback in RTMP/RTMPT/RTSP/HTTP/TCP/UDP/FILE format.
 * 
 *     @example
 *     const LiveMediaPlayer = require('@smartface/native/ui/livemediaplayer');
 *
 *     let liveMediaPlayer = new LiveMediaPlayer({
 *         flexGrow: 1,
 *         backgroundColor: Color.GRAY,
 *         scaleType: LiveMediaPlayer.ScaleType.ASPECTFIT,
 *         inputUrl: "https://..."
 *     });
 *     liveMediaPlayer.start();
 * 
 */
function LiveMediaPlayer() {}

/**
 * Start playing.
 *
 * @method start
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPlayer.prototype.start = function() {};

/**
 * Pause playback.
 *
 * @method pause
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPlayer.prototype.pause = function() {};

/**
 * Returns whether it is currently playing.
 *
 * @method isPlaying
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPlayer.prototype.isPlaying = function() {};

/**
 * Release the underlying resources.
 *
 * @method release
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPlayer.prototype.release = function() {};

/**
 * Set the event callback 
 *
 * @event onChange
 * @param {Object} params
 * @param {Number} params.event Event status code
 * @param {String} params.message Event message
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.prototype.onChange = function() {};

/**
 * Stop playing.
 *
 * @method stop
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPlayer.prototype.stop = function() {};

/**
 * Set input stream adress. Supported protocols: RTMP/RTMPT/RTSP/HTTP/TCP/UDP/FILE
 *
 * @property {String} inputUrl
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPlayer.prototype.inputUrl = "";

/**
 * Set whether video is enabled
 *
 * @property {Boolean} videoEnabled
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPlayer.prototype.videoEnabled = true;

/**
 * Set whether audio is enabled
 *
 * @property {Boolean} audioEnabled
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPlayer.prototype.audioEnabled = true;

/**
 * Set video zoom mode.
 *
 * @property {UI.LiveMediaPlayer.ScaleType} scaleType
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPlayer.prototype.scaleType = "";

/**
 * @enum {Number} UI.LiveMediaPlayer.ScaleType
 * 
 * ScaleType is an enum. It defines the scale type of the video player.
 * @since 4.2.2
 *
 */
LiveMediaPlayer.ScaleType = {};

/**
 * @property {Number} STRETCH
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPlayer.ScaleType.STRETCH = 0;

/**
 * @property {Number} ASPECTFIT
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPlayer.ScaleType.ASPECTFIT = 1;

/**
 * @property {Number} ASPECTFILL
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPlayer.ScaleType.ASPECTFILL = 2;