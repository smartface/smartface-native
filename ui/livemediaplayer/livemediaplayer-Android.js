const { EventEmitterCreator } = require('../../core/eventemitter');
const View = require('../../ui/view');
const AndroidConfig = require("../../util/Android/androidconfig");
const Events = require('./events');
LiveMediaPlayer.Events = {...View.Events, ...Events};

const SFLiveMediaPlayerDelegate = requireClass("io.smartface.android.sfcore.ui.livemediapublisher.SFLiveMediaPlayerDelegate")

const NodePlayerView = requireClass("cn.nodemedia.NodePlayerView");
const NodePlayer = requireClass("cn.nodemedia.NodePlayer");

LiveMediaPlayer.prototype = Object.create(View.prototype)

function LiveMediaPlayer(params) {
    if (!this.nativeObject) {
        this.nativeObject = new NodePlayerView(AndroidConfig.activity);
        this.nodePlayer = new NodePlayer(AndroidConfig.activity);
    }
    View.apply(this);
    
    this.nodePlayer.setPlayerView(this.nativeObject);

    this.nodePlayer.setNodePlayerDelegate(new SFLiveMediaPlayerDelegate({
        onEventCallback: function (event, message) {
            _onChange && _onChange({event, message});
        }
    }));

    let _inputUrl, _scaleType = LiveMediaPlayer.ScaleType.STRETCH,
        _audioEnabled = true, _videoEnabled = true, _onChange;
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
        'inputUrl': {
            get: function() {
                return _inputUrl;
            },
            set: (url) => {
                _inputUrl = url;
                this.nodePlayer.setInputUrl(_inputUrl);
            },
            enumerable: true
        },
        'audioEnabled': {
            get: function() {
                return _audioEnabled;
            },
            set: (isEnabled) => {
                _audioEnabled = isEnabled;
                this.nodePlayer.setAudioEnable(_audioEnabled);
            },
            enumerable: true
        },
        'videoEnabled': {
            get: () => {
                return _videoEnabled;
            },
            set: (isEnabled) => {
                _videoEnabled = isEnabled;
                this.nodePlayer.setVideoEnable(_videoEnabled);
            },
            enumerable: true
        },
        'scaleType': {
            get: () => {
                return _scaleType;
            },
            set: (mode) => {
                _scaleType = mode;
                this.nativeObject.setUIViewContentMode(_scaleType);
            },
            enumerable: true
        },
        'pause': {
            value: () => {
                this.nodePlayer.pause();
            },
            enumerable: true,
            configurable: true
        }, 
        'start': {
            value: () => {
                this.nodePlayer.start();
            },
            enumerable: true,
            configurable: true
        }, 
        'stop': {
            value: () => {
                this.nodePlayer.stop();
            },
            enumerable: true,
            configurable: true
        },
        'release': {
            value: () => {
                this.nodePlayer.release();
            },
            enumerable: true,
            configurable: true
        },
        'isPlaying': {
            value: () => {
                return this.nodePlayer.isPlaying();
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

LiveMediaPlayer.ScaleType = Object.freeze({
    STRETCH: NodePlayerView.UIViewContentMode.ScaleToFill,
    ASPECTFIT: NodePlayerView.UIViewContentMode.ScaleAspectFit,
    ASPECTFILL: NodePlayerView.UIViewContentMode.ScaleAspectFill
});

module.exports = LiveMediaPlayer;