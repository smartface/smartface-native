const NativeMediaPlayer = requireClass("android.media.MediaPlayer");
const NativeIntent = requireClass("android.content.Intent");

var _pickParams = {};

function Sound(params) {
    var self = this;
    self.nativeObject = new NativeMediaPlayer();
    
    var _volume = 1.0;
    Object.defineProperty(this, 'volume', {
        get: function() {
            return _volume;
        }, 
        set: function(volume) {
            if(0.0 >= volume && volume <= 1.0) {
                _volume = volume;
                self.nativeObject.setVolume(volume, volume);
            }
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'isLooping', {
        get: function() {
            return self.nativeObject.isLooping();
        }, 
        set: function(isLooping) {
            self.nativeObject.setLooping(isLooping);
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'isPlaying', {
        get: function() {
            return self.nativeObject.isPlaying();
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'currentDuration', {
        get: function() {
            return self.nativeObject.getCurrentPosition();
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'totalDuration', {
        get: function() {
            return self.nativeObject.getDuration();
        },
        enumerable: true
    });
    
    self.pause = function() {
        self.nativeObject.pause();
    };
    
    self.seekTo = function(milliseconds) {
        self.nativeObject.seekTo(milliseconds);
    };
    
    self.stop = function() {
        self.nativeObject.stop();
    };
    
    self.play = function() {
        self.nativeObject.prepare();
        self.nativeObject.start();
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
    
    self.nativeObject.setOnPreparedListener(NativeMediaPlayer.OnPreparedListener.implement({
        onPrepared : function(view){
            _onReadyCallback && _onReadyCallback();
        }
    }));
    
    self.nativeObject.setOnCompletionListener(NativeMediaPlayer.OnCompletionListener.implement({
        onCompletion : function(view){
            _onFinishCallback && _onFinishCallback();
        }
    }));
    
    this.loadFile = function(file) {
        self.nativeObject.setDataSource(file.fullPath);
    };
    
    this.loadURL = function(url) {
        self.nativeObject.setDataSource(url);
    };
    
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

Sound.PICK_SOUND = 1004;
Sound.android = {};

Sound.android.pick = function(params) {
    _pickParams = params;
    var intent = new NativeIntent();
    intent.setType("audio/*");
    intent.setAction(NativeIntent.ACTION_GET_CONTENT);
    getCurrentPageFragment().startActivityForResult(intent, Sound.PICK_SOUND);
};

Sound.onActivityResult = function(requestCode, resultCode, data) {
    if(requestCode === Sound.PICK_SOUND) {
        var fragmentActivity = Android.getActivity();
        if (resultCode === fragmentActivity.RESULT_OK) {
            try {
                var uri = data.getData();
                var sound = new Sound();
                sound.nativeObject.setDataSource(fragmentActivity, uri);
                if(_pickParams.onSuccess)
                    _pickParams.onSuccess({sound: sound});
            }
            catch (err) {
                if(_pickParams.onFailure)
                    _pickParams.onFailure({message: err});
            }
        }
        else {
            if(_pickParams.onCancel)
                _pickParams.onCancel();
        }
    }
};

function getCurrentPageFragment() {
    const Router = require("sf-core/ui/router");
    return Router.getCurrentPage().page.nativeObject;
}

module.exports = Sound;