const extend            = require('js-base/core/extend');
const View              = require('sf-core/ui/view');
const Exception         = require("sf-core/util/exception");
const NativeVideoView   = requireClass('android.widget.VideoView');

const VideoView = extend(View)(
    function (_super, params) {
        var activity = Android.getActivity();
        
        if(!this.nativeObject){
            this.nativeObject = new NativeVideoView(activity);
        }
        _super(this);

        const NativeMediaPlayer = requireClass('android.media.MediaPlayer');
        
        var _onReady;
        var _onFinish;
        var _nativeMediaPlayer;
        Object.defineProperties(this, {
            'play': {
                value: function() {
                    this.nativeObject.start();
                }
            },
            'pause': {
                value: function() {
                    this.nativeObject.pause();
                }
            },
            'stop': {
                value: function() {
                    this.nativeObject.pause();
                    this.nativeObject.seekTo(0);
                }
            },
            'isPlaying': {
                value: function() {
                    return this.nativeObject.isPlaying();
                }
            },
            'setLoopEnabled': {
                value: function(enabled) {
                    _nativeMediaPlayer && _nativeMediaPlayer.setLooping(enabled);
                }
            },
            'loadURL': {
                value: function(url) {
                    const NativeURI = requireClass('android.net.Uri');
                    var uri = NativeURI.parse(url);
                    this.nativeObject.setVideoURI(uri);
                }
            },
            'loadFile': {
                value: function(file) {
                    const File = require("sf-core/io/file");
                    const Path = require("sf-core/io/path");
                    
                    if(!(file instanceof File) || (file.type !== Path.FILE_TYPE.FILE) || !(file.exists)) {
                        throw new TypeError(Exception.TypeError.FILE);
                    }
                    this.nativeObject.setVideoPath(file.path);
                }
            },
            'onReady': {
                get: function() { return _onReady },
                set: function(callback) { _onReady = callback }
            },
            'onFinish': {
                get: function() { return _onFinish },
                set: function(callback) { _onFinish = callback }
            },
            'seekTo': {
                value: function(milliseconds) {
                    _nativeMediaPlayer.seekTo(milliseconds);
                }
            },
            'totalDuration': {
                get: function() {
                    return (_nativeMediaPlayer)? _nativeMediaPlayer.getDuration() : -1;
                }
            },
            'currentDuration': {
                get: function() {
                    return (_nativeMediaPlayer)? _nativeMediaPlayer.getCurrentPosition() : -1;
                }
            },
            'setVolume': {
                value: function(volume) {
                    _nativeMediaPlayer && _nativeMediaPlayer.setVolume(volume, volume);
                }
            },
            'setControllerEnabled': {
                value: function(enabled) {
                    // TODO: implement after yoga fix.
                }
            },
            'toString': {
                value: function(){
                    return 'VideoView';
                },
                enumerable: true, 
                configurable: true
            }
        });
        
        // Handling ios specific properties
        this.ios = {};
        
        if(!this.isNotSetDefaults){
            this.nativeObject.setOnPreparedListener(NativeMediaPlayer.OnPreparedListener.implement({
                onPrepared: function(mediaPlayer) {
                    _nativeMediaPlayer = mediaPlayer;
    
                    _onReady && _onReady();
                }
            }));
            
            this.nativeObject.setOnCompletionListener(NativeMediaPlayer.OnCompletionListener.implement({
                onCompletion: function(mediaPlayer) {
                    _onFinish && _onFinish();
                }
            }));
        }

        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = VideoView;