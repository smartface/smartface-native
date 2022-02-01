/* globals requireClass */
const NativeMediaPlayer = requireClass("android.media.MediaPlayer");
const NativeIntent = requireClass("android.content.Intent");
const AndroidConfig = require("../../util/Android/androidconfig");
const RequestCodes = require("../../util/Android/requestcodes");
const { EventEmitterCreator } = require("../../core/eventemitter");
const Events = require('./events');

var _pickParams = {};

Sound.Events = { ...Events };
function Sound(params) {
    this.nativeObject = new NativeMediaPlayer();

    const EventFunctions = {
        [Events.Ready]: () => {
            _onReadyCallback = function (state) {
                this.emitter.emit(Events.Ready, state);
            }
        },
        [Events.Finish]: () => {
            _onFinishCallback = function (state) {
                this.emitter.emit(Events.Finish, state);
            }
        }
    }
    EventEmitterCreator(this, EventFunctions);

    var _volume = 1.0;
    Object.defineProperty(this, 'volume', {
        get: function() {
            return _volume;
        },
        set: function(volume) {
            if (0.0 >= volume && volume <= 1.0) {
                _volume = volume;
                this.nativeObject.setVolume(volume, volume);
            }
        },
        enumerable: true
    });

    Object.defineProperty(this, 'isLooping', {
        get: function() {
            return this.nativeObject.isLooping();
        },
        set: function(isLooping) {
            this.nativeObject.setLooping(isLooping);
        },
        enumerable: true
    });

    Object.defineProperty(this, 'isPlaying', {
        get: function() {
            return this.nativeObject.isPlaying();
        },
        enumerable: true
    });

    Object.defineProperty(this, 'currentDuration', {
        get: function() {
            return this.nativeObject.getCurrentPosition();
        },
        enumerable: true
    });

    Object.defineProperty(this, 'totalDuration', {
        get: function() {
            return this.nativeObject.getDuration();
        },
        enumerable: true
    });

    this.pause = function() {
        this.nativeObject.pause();
    };

    this.seekTo = function(milliseconds) {
        this.nativeObject.seekTo(milliseconds);
    };

    this.stop = function() {
        this.nativeObject.stop();
    };

    this.play = function() {
        this.nativeObject.start();
    };

    var _onReadyCallback;
    Object.defineProperty(this, 'onReady', {
        get: function() {
            return _onReadyCallback;
        },
        set: function(onReady) {
            _onReadyCallback = onReady;
        },
        enumerable: true
    });

    var _onFinishCallback;
    Object.defineProperty(this, 'onFinish', {
        get: function() {
            return _onFinishCallback;
        },
        set: function(onFinish) {
            _onFinishCallback = onFinish;
        },
        enumerable: true
    });

    this.nativeObject.setOnPreparedListener(NativeMediaPlayer.OnPreparedListener.implement({
        onPrepared: function(view) {
            _onReadyCallback && _onReadyCallback();
        }
    }));

    this.nativeObject.setOnCompletionListener(NativeMediaPlayer.OnCompletionListener.implement({
        onCompletion: function(view) {
            _onFinishCallback && _onFinishCallback();
        }
    }));

    this.loadFile = function(file) {
        this.nativeObject.reset();
        this.nativeObject.setDataSource(file.fullPath);
        this.nativeObject.prepare();
    };

    this.loadURL = function(url) {
        this.nativeObject.reset();
        this.nativeObject.setDataSource(url);
        this.nativeObject.prepare();
    };

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

Sound.PICK_SOUND = RequestCodes.Sound.PICK_SOUND;
Sound.android = {};

Sound.android.pick = function(params) {
    _pickParams = params;
    var intent = new NativeIntent();
    intent.setType("audio/*");
    intent.setAction(NativeIntent.ACTION_GET_CONTENT);
    if (!(params && (params.page instanceof require("../../ui/page")))) {
        getCurrentPageFragment().startActivityForResult(intent, Sound.PICK_SOUND);
    } else {
        params.page.nativeObject.startActivityForResult(intent, Sound.PICK_SOUND);
    }
};

Sound.onActivityResult = function(requestCode, resultCode, data) {
    if (requestCode === Sound.PICK_SOUND) {
        var fragmentActivity = AndroidConfig.activity;
        if (resultCode === -1) { // Activity.RESULT_OK = 1
            try {
                var uri = data.getData();
                var sound = new Sound();
                sound.nativeObject.setDataSource(fragmentActivity, uri);
                if (_pickParams.onSuccess)
                    _pickParams.onSuccess({
                        sound: sound
                    });
            } catch (err) {
                if (_pickParams.onFailure)
                    _pickParams.onFailure({
                        message: err.toString()
                    });
            }
        } else {
            if (_pickParams.onCancel)
                _pickParams.onCancel();
        }
    }
};

function getCurrentPageFragment() {
    const Application = require("../../application");
    return Application.currentPage.nativeObject;
}

module.exports = Sound;