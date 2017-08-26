const extend            = require('js-base/core/extend');
const View              = require('sf-core/ui/view');
const Exception         = require("sf-core/util/exception");
const AndroidConfig     = require('sf-core/util/Android/androidconfig');
const NativeVideoView   = requireClass('android.widget.VideoView');
const NativeRelativeLayout = requireClass('android.widget.RelativeLayout');

const VideoView = extend(View)(
    function (_super, params) {

        if(!this.nativeObject){
            // To solve stretching due to yoga, we will wrap with RelativeLayout.
            this.nativeObject = new NativeRelativeLayout(AndroidConfig.activity);
            var layoutParams = new NativeRelativeLayout.LayoutParams(-1,-1);
            // CENTER_IN_PARENT, TRUE
            layoutParams.addRule(13, -1);
            this.nativeInner = new NativeVideoView(AndroidConfig.activity);
            this.nativeObject.addView(this.nativeInner, layoutParams);
            this.nativeObject.setGravity(17);
        }
        _super(this);

        const NativeMediaPlayer = requireClass('android.media.MediaPlayer');
        const NativeMediaController = requireClass('android.widget.MediaController');
        
        var _onReady;
        var _onFinish;
        var _nativeMediaPlayer;
        Object.defineProperties(this, {
            'play': {
                value: function() {
                    this.nativeInner.start();
                }
            },
            'pause': {
                value: function() {
                    this.nativeInner.pause();
                }
            },
            'stop': {
                value: function() {
                    this.nativeInner.pause();
                    this.nativeInner.seekTo(0);
                }
            },
            'isPlaying': {
                value: function() {
                    return bool(this.nativeInner.isPlaying());
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
                    this.nativeInner.setVideoURI(uri);
                }
            },
            'loadFile': {
                value: function(file) {
                    const File = require("sf-core/io/file");
                    const Path = require("sf-core/io/path");
                    
                    if(!(file instanceof File) || (file.type !== Path.FILE_TYPE.FILE) || !(file.exists)) {
                        throw new TypeError(Exception.TypeError.FILE);
                    }
                    this.nativeInner.setVideoPath(file.path);
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
                    _nativeMediaPlayer && _nativeMediaPlayer.seekTo(milliseconds);
                }
            },
            'totalDuration': {
                get: function() {
                    return (_nativeMediaPlayer) ? int(_nativeMediaPlayer.getDuration()) : -1;
                }
            },
            'currentDuration': {
                get: function() {
                    return (_nativeMediaPlayer) ? int(_nativeMediaPlayer.getCurrentPosition()) : -1;
                }
            },
            'setVolume': {
                value: function(volume) {
                    _nativeMediaPlayer && _nativeMediaPlayer.setVolume(volume, volume);
                }
            },
            'setControllerEnabled': {
                value: function(enabled) {
                    var controller = enabled ? new NativeMediaController(AndroidConfig.activity) : null;
                    this.nativeInner.setMediaController(controller);
                }
            },
            'toString': {
                value: function(){
                    return 'VideoView';
                },
                enumerable: true, 
                configurable: true
            },
            // Overrided property because videoview does not support background stuffs.
            'backgroundImage': {
                get: function() {}, 
                set: function(backgroundImage) {},
                enumerable: true,
                configurable: true
            },
            'backgroundColor': {
                get: function() {},
                set: function(backgroundColor) {},
                enumerable: true,
                configurable: true
            },
            'borderColor': {
                get: function() {
                },
                set: function(value) {},
                enumerable: true,
                configurable: true
            },
            'borderRadius': {
                get: function() {},
                set: function(borderRadius) {},
                enumerable: true,
                configurable: true
            },
            'borderWidth': {
                get: function() {},
                set: function(borderRadius) {},
                enumerable: true,
                configurable: true
            },
        });
        
        // Handling ios specific properties
        this.ios = {};
        
        if(!this.isNotSetDefaults){
            this.nativeInner.setOnPreparedListener(NativeMediaPlayer.OnPreparedListener.implement({
                onPrepared: function(mediaPlayer) {
                    _nativeMediaPlayer = mediaPlayer;
    
                    _onReady && _onReady();
                }
            }));
            
            this.nativeInner.setOnCompletionListener(NativeMediaPlayer.OnCompletionListener.implement({
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