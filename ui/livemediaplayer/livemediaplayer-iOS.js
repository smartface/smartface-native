const View = require('../../ui/view');
const Events = require('./events');

LiveMediaPlayer.prototype = Object.create(View.prototype)

function LiveMediaPlayer(params) {
    if (!this.nativeObject) {
        var previewView = new View();
        this.nativeObject = previewView.nativeObject;
        this.nodePlayer = new __SF_NodePlayer();
    }

    View.apply(this);
    
    this.nodePlayer.playerView = this.nativeObject;

    this.playerDelegate = new __SF_NodePlayerDelegateClass();
    this.playerDelegate.onEventCallbackEventMsg = function(e){
        _onChange && _onChange({event: e.event, message: e.msg});
    };
    this.nodePlayer.nodePlayerDelegate = this.playerDelegate;

    let _inputUrl, _scaleType = LiveMediaPlayer.ScaleType.STRETCH,
        _audioEnabled = true, _videoEnabled = true;
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
                this.nodePlayer.inputUrl = _inputUrl;
            },
            enumerable: true
        },
        'audioEnabled': {
            get: function() {
                return _audioEnabled;
            },
            set: (isEnabled) => {
                _audioEnabled = isEnabled;
                this.nodePlayer.audioEnable = _audioEnabled;
            },
            enumerable: true
        },
        'videoEnabled': {
            get: () => {
                return _videoEnabled;
            },
            set: (isEnabled) => {
                _videoEnabled = isEnabled;
                this.nodePlayer.videoEnable = _videoEnabled;
            },
            enumerable: true
        },
        'scaleType': {
            get: () => {
                return _scaleType;
            },
            set: (mode) => {
                _scaleType = mode;
                this.nodePlayer.contentMode = _scaleType;
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
            _onChange = function (state) {
                this.emitter.emit(Events.CallStateChanged, state);
            } 
        }
    }
    
    const parentOnFunction = this.on;
    Object.defineProperty(this, 'on', {
        value: (event, callback) => {
            if (typeof EventFunctions[event] === 'function') {
                EventFunctions[event].call(this);
                this.emitter.on(event, callback);
            }
            else {
                parentOnFunction(event, callback);
            }
        },
        configurable: true
    });

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

LiveMediaPlayer.ScaleType = Object.freeze({
    STRETCH: 0,
    ASPECTFIT: 1,
    ASPECTFILL: 2
});

module.exports = LiveMediaPlayer;