const { EventEmitterCreator } = require('../../core/eventemitter');
const View = require('../../ui/view');
const AndroidConfig = require("../../util/Android/androidconfig");
const Events = require('./events');
LiveMediaPublisher.Events = { ...View.Events, ...Events };

const SFLiveMediaPublisherDelegate = requireClass("io.smartface.android.sfcore.ui.livemediapublisher.SFLiveMediaPublisherDelegate")
const NodeCameraView = requireClass("cn.nodemedia.NodeCameraView");
const NodePublisher = requireClass("cn.nodemedia.NodePublisher");

LiveMediaPublisher.prototype = Object.create(View.prototype)

function LiveMediaPublisher(params) {
    if (!this.nativeObject) {
        this.nativeObject = new NodeCameraView(AndroidConfig.activity);
        this.nodePublisher = new NodePublisher(AndroidConfig.activity);
    }
    View.apply(this);

    // set default values for camera property.
    // If the this.nodePublisher.setCameraPreview method is not called,  camera preview does not start.
    this.nodePublisher.setCameraPreview(this.nativeObject, 0, true);

    // set default values for video property.
    // If the this.nodePublisher.setVideoParam method is not called,  video streaming does not start.
    this.nodePublisher.setVideoParam(12, 400000, 1, 15, false);

    this.nodePublisher.setNodePublisherDelegate(new SFLiveMediaPublisherDelegate({
        onEventCallback: function (event, message) {
            _onChange && _onChange({ event, message });
        }
    }));

    let _outputUrl = "", _flashEnabled = false, _audioEnabled = true, _videoEnabled = true;
    let _videoOptions, _cameraOptions, _audioOptions, _onChange;
    Object.defineProperties(this, {
        'onChange': {
            get: () => {
                return _onChange;
            },
            set: (callback) => {
                _onChange = callback;

            },
            enumerable: true
        },
        'audioEnabled': {
            get: () => {
                return _audioEnabled;
            },
            set: (value) => {
                _audioEnabled = value;
                this.nodePublisher.setAudioEnable(_audioEnabled);
            },
            enumerable: true
        },
        'videoEnabled': {
            get: () => {
                return _videoEnabled;
            },
            set: (value) => {
                _videoEnabled = value;
                this.nodePublisher.setVideoEnable(_videoEnabled);
            },
            enumerable: true
        },
        'video': {
            get: () => {
                return _videoOptions;
            },
            set: (options) => {
                _videoOptions = options;
                let { preset = 12, bitrate = 400000, profile = 1, fps = 15, videoFrontMirror = false } = options;
                this.nodePublisher.setVideoParam(preset, fps, bitrate, profile, videoFrontMirror);
            },
            enumerable: true
        },
        'camera': {
            get: () => {
                return _cameraOptions;
            },
            set: (options) => {
                _cameraOptions = options;
                let { cameraId = 1, cameraFrontMirror = true } = options;
                this.nodePublisher.setCameraPreview(this.nativeObject, cameraId, cameraFrontMirror);
            },
            enumerable: true
        },
        'audio': {
            get: () => {
                return _audioOptions;
            },
            set: (options) => {
                _audioOptions = options;
                let { bitrate = 32000, profile = 1, samplerate = 44100 } = options;
                this.nodePublisher.setAudioParam(bitrate, profile, samplerate);
            },
            enumerable: true
        },
        'outputUrl': {
            get: function () {
                return _outputUrl;
            },
            set: (url) => {
                _outputUrl = url;
                this.nodePublisher.setOutputUrl(_outputUrl);
            },
            enumerable: true
        },
        'flashEnabled': {
            get: function () {
                return _flashEnabled;
            },
            set: (value) => {
                _flashEnabled = value;
                this.nodePublisher.setFlashEnable(_flashEnabled);
            },
            enumerable: true
        },
        'start': {
            value: function () {
                this.nodePublisher.start();
            },
            enumerable: true,
            configurable: true
        },
        'stop': {
            value: function () {
                this.nodePublisher.stop();
            },
            enumerable: true,
            configurable: true
        },
        'release': {
            value: function () {
                this.nodePublisher.release();
            },
            enumerable: true,
            configurable: true
        },
        'startPreview': {
            value: function () {
                this.nodePublisher.startPreview();
            },
            enumerable: true,
            configurable: true
        },
        'stopPreview': {
            value: function () {
                this.nodePublisher.stopPreview();
            },
            enumerable: true,
            configurable: true
        },
        'switchCamera': {
            value: function () {
                this.nodePublisher.switchCamera();
            },
            enumerable: true,
            configurable: true
        }
    });

    const EventFunctions = {
        [Events.Change]: function () {
            _onChange = function (state) {
                this.emitter.emit(Events.Change, state);
            }
        }
    }
    EventEmitterCreator(this, EventFunctions);

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

LiveMediaPublisher.Camera = Object.freeze({
    BACK: 0,
    FRONT: 1
});

// NodePublisher.VIDEO_PROFILE_BASELINE
// ...
LiveMediaPublisher.VideoProfile = Object.freeze({
    BASELINE: 0,
    MAIN: 1,
    HIGH: 2
});

// NodePublisher.AUDIO_PROFILE_LCAAC
// ...
LiveMediaPublisher.AudioProfile = Object.freeze({
    LCAAC: 0,
    HEAAC: 1
});

LiveMediaPublisher.VideoPreset = Object.freeze({
    PRESET_16X9_270: 0,
    PRESET_16X9_360: 1,
    PRESET_16X9_480: 2,
    PRESET_16X9_540: 3,
    PRESET_16X9_720: 4,
    PRESET_16X9_1080: 5,
    PRESET_4X3_270: 10,
    PRESET_4X3_360: 11,
    PRESET_4X3_480: 12,
    PRESET_4X3_540: 13,
    PRESET_4X3_720: 14,
    PRESET_1X1_270: 20,
    PRESET_1X1_360: 21,
    PRESET_1X1_480: 22,
    PRESET_1X1_540: 23,
    PRESET_1X1_720: 24
});

module.exports = LiveMediaPublisher;