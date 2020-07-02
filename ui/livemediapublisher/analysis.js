/**
 * @class UI.LiveMediaPublisher
 * @since 4.2.2
 *
 * LiveMediaPublisher is a live streaming publisher. It is used for audio and video playback in RTMP/RTMPT/RTSP/HTTP/TCP/UDP/FILE format.
 * 
 *     @example
 *     const LiveMediaPublisher = require('sf-core/ui/livemediapublisher');
 *
 *     let liveMediaPublisher = new LiveMediaPublisher({
 *         flexGrow: 1,
 *         backgroundColor: Color.GRAY,
 *         outputUrl: "rtmp://..."
 *     });
 *     liveMediaPublisher.startPreview(); 
 *     liveMediaPublisher.start(); // Start streaming
 */
function LiveMediaPublisher() {}

/**
 * The camera starts to preview.
 *
 * @method startPreview
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.prototype.startPreview = function() {};

/**
 * The camera stops to preview.
 *
 * @method stopPreview
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.prototype.stopPreview = function() {};

/**
 * Switch between rear and front camera.
 *
 * @method switchCamera
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.prototype.switchCamera = function() {};

/**
 * Set whether to keep audio is turned on.
 *
 * @property {Boolean} audioEnabled
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.prototype.audioEnabled = true;

/**
 * Set whether to keep audio is turned on.
 *
 * @property {Boolean} videoEnabled
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.prototype.videoEnabled = true;

/**
 * Set whether to keep flash is turned on.
 *
 * @property {Boolean} flashEnabled
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.prototype.flashEnabled = false;

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
 * Set output adress. Supported protocols: RTMP/RTMPT/HTTP/FLV
 *
 * @property {String} outputUrl
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.prototype.outputUrl = "";

/**
 * Set camera preview parameters. 
 * @property {Object} camera
 * @property {UI.LiveMediaPublisher.Camera} camera.cameraId Camera id
 * @property {Boolean} camera.cameraFrontMirror Camera front mirror
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.prototype.camera = {};

/**
 * Set audio encoding parameters. 
 * @property {Object} audio
 * @property {Number} audio.bitrate Audio bitrate
 * @property {UI.LiveMediaPublisher.AudioProfile} audio.profile Audio encoding format
 * @property {Number} audio.samplerate Audio sample rate
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.prototype.audio = {};

/**
 * Set video encoding parameters.
 * @property {Object} video
 * @property {UI.LiveMediaPublisher.Preset} video.preset Video resolution preset.
 * @property {Number} video.bitrate Video bitrate
 * @property {UI.LiveMediaPublisher.VideoProfile} video.profile Video encoding specifications
 * @property {Number} video.fps Video frame rate
 * @property {Boolean} video.videoFrontMirror The video output screen is mirror-inverted or not
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.prototype.video = {};

/**
 * Start stream to output address. 
 *
 * @method start
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.prototype.start = function() {};

/**
 * Release the underlying resources.
 *
 * @method release
 * @android
 * @since 4.2.2
 */
LiveMediaPublisher.prototype.release = function() {};

/**
 * Stop stream.
 *
 * @method stop
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.prototype.stop = function() {};

/**
 * 
 * @enum {Number} UI.LiveMediaPublisher.Camera
 * @since 4.2.2
 * @android
 * @ios
 */
LiveMediaPublisher.Camera = {};

/**
 * @property {Number} FRONT
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.Camera.FRONT=1;

/**
 * @property {Number} BACK
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.Camera.BACK=0;

/**
 * 
 * @enum {Number} UI.LiveMediaPublisher.VideoPreset
 * @since 4.2.2
 * @android
 * @ios
 */
LiveMediaPublisher.VideoPreset = {};

/**
 * @property {Number} PRESET_16X9_270
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.VideoPreset.PRESET_16X9_270=0;

/**
 * @property {Number} PRESET_16X9_360
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.VideoPreset.PRESET_16X9_360=1;

/**
 * @property {Number} PRESET_16X9_480
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.VideoPreset.PRESET_16X9_480=2;

/**
 * @property {Number} PRESET_16X9_540
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.VideoPreset.PRESET_16X9_540=3;

/**
 * @property {Number} PRESET_16X9_720
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.VideoPreset.PRESET_16X9_720=4;

/**
 * @property {Number} PRESET_16X9_1080
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.VideoPreset.PRESET_16X9_1080=5;

/**
 * @property {Number} PRESET_4X3_270
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.VideoPreset.PRESET_4X3_270=10;

/**
 * @property {Number} PRESET_4X3_360
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.VideoPreset.PRESET_4X3_360=11;

/**
 * @property {Number} PRESET_4X3_480
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.VideoPreset.PRESET_4X3_480=12;

/**
 * @property {Number} PRESET_4X3_540
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.VideoPreset.PRESET_4X3_540=13;

/**
 * @property {Number} PRESET_4X3_720
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.VideoPreset.PRESET_4X3_720=14;

/**
 * @property {Number} PRESET_1X1_270
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.VideoPreset.PRESET_1X1_270=20;

/**
 * @property {Number} PRESET_1X1_360
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.VideoPreset.PRESET_1X1_360=21;

/**
 * @property {Number} PRESET_1X1_480
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.VideoPreset.PRESET_1X1_480=22;

/**
 * @property {Number} PRESET_1X1_540
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.VideoPreset.PRESET_1X1_540=23;

/**
 * @property {Number} PRESET_1X1_720
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.VideoPreset.PRESET_1X1_720=24;

/**
 * 
 * @enum {Number} UI.LiveMediaPublisher.VideoProfile
 * @since 4.2.2
 * @android
 * @ios
 */
LiveMediaPublisher.VideoProfile = {};

/**
 * @property {Number} BASELINE
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.VideoProfile.BASELINE=0;

/**
 * @property {Number} MAIN
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.VideoProfile.MAIN=1;

/**
 * @property {Number} HIGH
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.VideoProfile.HIGH=2;


/**
 * 
 * @enum {Number} UI.LiveMediaPublisher.AudioProfile
 * @since 4.2.2
 * @android
 * @ios
 */
LiveMediaPublisher.AudioProfile = {};

/**
 * @property {Number} HEAAC
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.AudioProfile.HEAAC=1;

/**
 * @property {Number} LCAAC
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.AudioProfile.LCAAC=0;

/**
 * 
 * @enum {Number} UI.LiveMediaPublisher.VideoPreset
 * @since 4.2.2
 * @android
 * @ios
 */
LiveMediaPublisher.VideoPreset = {};

/**
 * @property {Number} PRESET_16X9_270
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.VideoPreset.PRESET_16X9_270=0;

/**
 * @property {Number} PRESET_16X9_360
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.VideoPreset.PRESET_16X9_360=1;

/**
 * @property {Number} PRESET_16X9_480
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.VideoPreset.PRESET_16X9_480=2;

/**
 * @property {Number} PRESET_16X9_540
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.VideoPreset.PRESET_16X9_540=3;

/**
 * @property {Number} PRESET_16X9_720
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.VideoPreset.PRESET_16X9_720=4;

/**
 * @property {Number} PRESET_16X9_1080
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.VideoPreset.PRESET_16X9_1080=5;

/**
 * @property {Number} PRESET_4X3_270
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.VideoPreset.PRESET_4X3_270=10;

/**
 * @property {Number} PRESET_4X3_360
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.VideoPreset.PRESET_4X3_360=11;

/**
 * @property {Number} PRESET_4X3_480
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.VideoPreset.PRESET_4X3_480=12;

/**
 * @property {Number} PRESET_4X3_540
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.VideoPreset.PRESET_4X3_540=13;

/**
 * @property {Number} PRESET_4X3_720
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.VideoPreset.PRESET_4X3_720=14;

/**
 * @property {Number} PRESET_1X1_270
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.VideoPreset.PRESET_1X1_270=20;

/**
 * @property {Number} PRESET_1X1_360
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.VideoPreset.PRESET_1X1_360=21;

/**
 * @property {Number} PRESET_1X1_480
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.VideoPreset.PRESET_1X1_480=22;

/**
 * @property {Number} PRESET_1X1_540
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.VideoPreset.PRESET_1X1_540=23;

/**
 * @property {Number} PRESET_1X1_720
 * @android
 * @ios
 * @static
 * @readonly
 * @android
 * @ios
 * @since 4.2.2
 */
LiveMediaPublisher.VideoPreset.PRESET_1X1_720=24;