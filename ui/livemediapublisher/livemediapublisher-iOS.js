const { EventEmitterCreator } = require('../../core/eventemitter');
const View = require('../../ui/view');
const Events = require('./events');
LiveMediaPublisher.Events = {...View.Events, ...Events};
LiveMediaPublisher.prototype = Object.create(View.prototype)

function LiveMediaPublisher(params) {
    if (!this.nativeObject) {
        var previewView = new View();
        this.nativeObject = previewView.nativeObject;
        this.nodePublisher = new __SF_NodePublisher();
    }

    View.apply(this);

    //Defaults
    this.cameraDefault = {
        cameraId: 0,
        cameraFrontMirror: true
    };
    this.nodePublisher.setCameraPreviewCameraIdFrontMirror(
        this.nativeObject, 
        this.cameraDefault.cameraId, 
        this.cameraDefault.cameraFrontMirror
        );

    this.videoDefault = {
        preset: 12,
        bitrate: 400000,
        profile: 1,
        fps: 15,
        videoFrontMirror: false
    };
    this.nodePublisher.setVideoParamPresetFpsBitrateProfileFrontMirror(
        this.videoDefault.preset, 
        this.videoDefault.fps, 
        this.videoDefault.bitrate, 
        this.videoDefault.profile, 
        this.videoDefault.videoFrontMirror
        );
    
    this.audioDefault = {
        bitrate: 32000,
        profile: 1,
        samplerate:44100
    };
    this.nodePublisher.setAudioParamBitrateProfileSampleRate(
        this.audioDefault.bitrate,
        this.audioDefault.profile,
        this.audioDefault.samplerate
        );
    
    this.publisherDelegate = new __SF_NodePlayerDelegateClass();
    this.publisherDelegate.onEventCallbackEventMsg = function(e){
        _onChange && _onChange({event: e.event, message: e.msg});
    };
    this.nodePublisher.nodePublisherDelegate = this.publisherDelegate;

    let _outputUrl = "", _flashEnabled = false, _audioEnabled = true, _videoEnabled = true;
    let _videoOptions = this.videoDefault, _cameraOptions = this.cameraDefault, _audioOptions = this.audioDefault, _onChange;
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
                this.nodePublisher.audioEnable = _audioEnabled;
            },
            enumerable: true
        },
        'videoEnabled': {
            get: () => {
                return _videoEnabled;
            },
            set: (value) => {
                _videoEnabled = value;
                this.nodePublisher.videoEnable = _videoEnabled;
            },
            enumerable: true
        },
        'video': {
            get: () => {
                return _videoOptions;
            },
            set: (options) => {
                var videoOptionsDefault = Object.assign({},this.videoDefault);
                _videoOptions = Object.assign(videoOptionsDefault,options);

                this.nodePublisher.setVideoParamPresetFpsBitrateProfileFrontMirror(
                    _videoOptions.preset, 
                    _videoOptions.fps, 
                    _videoOptions.bitrate, 
                    _videoOptions.profile, 
                    _videoOptions.videoFrontMirror
                    );
            },
            enumerable: true
        },
        'camera': {
            get: () => {
                return _cameraOptions;
            },
            set: (options) => {
                var cameraOptionsDefault = Object.assign({},this.cameraDefault);
                _cameraOptions = Object.assign(cameraOptionsDefault,options);

                this.nodePublisher.setCameraPreviewCameraIdFrontMirror(
                    this.nativeObject, 
                    _cameraOptions.cameraId, 
                    _cameraOptions.cameraFrontMirror
                    );
            },
            enumerable: true
        },
        'audio': {
            get: () => {
                return _audioOptions;
            },
            set: (options) => {
                var audioOptionsDefault = Object.assign({},this.audioDefault);
                _audioOptions = Object.assign(audioOptionsDefault,options);
                this.nodePublisher.setAudioParamBitrateProfileSampleRate(
                    _audioOptions.bitrate, 
                    _audioOptions.profile,
                    _audioOptions.samplerate
                    );
            },
            enumerable: true
        },
        'outputUrl': {
            get: function() {
                return _outputUrl;
            },
            set: (url) => {
                _outputUrl = url;
                this.nodePublisher.outputUrl = _outputUrl;
            },
            enumerable: true
        },
        'flashEnabled': {
            get: function() {
                return _flashEnabled;
            },
            set: (value) => {
                _flashEnabled = value;
                this.nodePublisher.flashEnable = _flashEnabled;
            },
            enumerable: true
        },
        'start': {
            value: function() {
                this.nodePublisher.start();
            },
            enumerable: true,
            configurable: true
        }, 
        'stop': {
            value: function() {
                this.nodePublisher.stop();
            },
            enumerable: true,
            configurable: true
        },
        'startPreview': {
            value: function() {
                this.nodePublisher.startPreview();
            },
            enumerable: true,
            configurable: true
        }, 
        'stopPreview': {
            value: function() {
                this.nodePublisher.stopPreview();
            },
            enumerable: true,
            configurable: true
        }, 
        'switchCamera': {
            value: function() {
                this.nodePublisher.switchCamera();
            },
            enumerable: true,
            configurable: true
        }
    });

    const EventFunctions = {
        [Events.Change]: function() {
            _onChange = (state) => {
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