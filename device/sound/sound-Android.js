const NativeMedia = requireClass("android.provider.MediaStore");
const NativeMediaPlayer = requireClass("android.media.MediaPlayer");
const NativeIntent = requireClass("android.content.Intent");

var _pickParams = {};

function Sound(params) {
    var self = this;
    if(!self.nativeObject)
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
    
    Object.defineProperty(this, 'currentPosition', {
        get: function() {
            return self.nativeObject.getCurrentPosition();
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'currentDuration', {
        get: function() {
            return self.nativeObject.getDuration();
        },
        enumerable: true
    });
    
    var _dataSource = null;
    Object.defineProperty(this, 'dataSource', {
        get: function() {
            return _dataSource;
        },
        set: function(dataSource) {
            _dataSource = dataSource;
            if(dataSource.path)
                setPath(dataSource.path);
            else if(dataSource.url)
                setURL(dataSource.url);
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
    
    self.start = function() {
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
    
    function setPath(fullPath) {
        self.nativeObject.setDataSource(fullPath);
    }
    
    function setURL(url) {
        const NativeURI = requireClass('android.net.Uri');
        var uri = NativeURI.parse(url);
        var fragmentActivity = getCurrentPageFragment().getActivity();
        self.nativeObject.setDataSource(fragmentActivity, uri);
    }
    
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

Sound.getAll = function(params) {
    var sounds = [];
    try {
        var uri = NativeMedia.Audio.Media.EXTERNAL_CONTENT_URI;
        var projection = [NativeMedia.MediaColumns.DATA];
        var fragmentActivity = getCurrentPageFragment().getActivity();
        var contentResolver = fragmentActivity.getContentResolver();
        var cursor = contentResolver.query(uri, projection, null, null, null);
        if (cursor != null) {
            while (cursor.moveToNext()) {
                var path = cursor.getString(0);
                var sound = new Sound();
                sound.dataSource = {path: path};
                sounds.push(sound); 
            }
            cursor.close();
        }
        if(params.onSuccess)
            params.onSuccess(sounds);
    } 
    catch(err) {
        if(params.onFailure)
            params.onFailure(err);
    }
};

Sound.PICK_SOUND = 1004;

Sound.pick = function(params) {
    _pickParams = params;
    var intent = new NativeIntent();
    intent.setType("audio/*");
    intent.setAction(NativeIntent.ACTION_GET_CONTENT);
    getCurrentPageFragment().startActivityForResult(intent, Sound.PICK_SOUND);
};

Sound.onActivityResult = function(requestCode, resultCode, data) {
    if(requestCode == Sound.PICK_SOUND) {
        var fragmentActivity = getCurrentPageFragment().getActivity();
        if (resultCode == fragmentActivity.RESULT_OK) {
            try {
                var uri = data.getData();
                var sound = new Sound();
                sound.nativeObject.setDataSource(fragmentActivity, uri);
                if(_pickParams.onSuccess)
                    _pickParams.onSuccess(sound);
            }
            catch (err) {
                if(_pickParams.onFailure)
                    _pickParams.onFailure();
            }
        }
        else {
            if(_pickParams.onCancel)
                _pickParams.onCancel();
        }
    }
};

function getCurrentPageFragment() {
    const Router = require("nf-core/ui/router");
    return Router.getCurrentPage().page.nativeObject;
}

module.exports = Sound;