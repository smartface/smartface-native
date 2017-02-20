const extend = require('js-base/core/extend');
const View = require('nf-core/ui/view');

const VideoView = extend(View)(
    function (_super, params) {
        var activity = Android.getActivity();
        
        var self = this;
        const NativeVideoView = requireClass('android.widget.VideoView');
        self.nativeObject = new NativeVideoView(activity);
        _super(this);

        const NativeMediaPlayer = requireClass('android.media.MediaPlayer');        
        self.nativeObject.setOnPreparedListener(NativeMediaPlayer.OnPreparedListener.implement({
            onPrepared: function(mediaPlayer) {
                _nativeMediaPlayer = mediaPlayer;

                _callbackOnReady && _callbackOnReady();
            }
        }));
        
        self.nativeObject.setOnCompletionListener(NativeMediaPlayer.OnCompletionListener.implement({
            onCompletion: function(mediaPlayer) {
                _callbackOnFinish && _callbackOnFinish();
            }
        }));
        
        var _callbackOnReady;
        var _callbackOnFinish;
        var _nativeMediaPlayer;
        Object.defineProperties(self, {
            'play': {
                value: function() {
                    self.nativeObject.start();
                }
            },
            'pause': {
                value: function() {
                    self.nativeObject.pause();
                }
            },
            'stop': {
                value: function() {
                    self.nativeObject.pause();
                    self.nativeObject.seekTo(0);
                }
            },
            'isPlaying': {
                value: function() {
                    self.nativeObject.isPlaying();
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
                    self.nativeObject.setVideoURI(uri);
                }
            },
            'loadFile': {
                value: function(file) {
                    // TODO: handle inner paths.
                    self.nativeObject.setVideoPath(file.path);
                }
            },
            'onReady': {
                get: function() { return _callbackOnReady },
                set: function(callback) { _callbackOnReady = callback }
            },
            'onFinish': {
                get: function() { return _callbackOnFinish },
                set: function(callback) { _callbackOnFinish = callback }
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
            }
        });

        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = VideoView;