/*globals requireClass*/
const View = require('../view');
const Exception = require("../../util/exception");
const AndroidConfig = require('../../util/Android/androidconfig');
const NativeRelativeLayout = requireClass('android.widget.RelativeLayout');
const NativeVideoView = requireClass('io.smartface.android.sfcore.ui.videoview.SFVideoView')
const NativePlayer = requireClass('com.google.android.exoplayer2.Player');

VideoView.prototype = Object.create(View);
function VideoView(params) {

    if (!this.nativeObject) {
        // To solve stretching due to yoga, we will wrap with RelativeLayout.
        this.nativeObject = new NativeRelativeLayout(AndroidConfig.activity);
        var layoutParams = new NativeRelativeLayout.LayoutParams(-1, -1);
        /** @todo
         * layoutParams.addRule is not a function 
         */
        // CENTER_IN_PARENT, TRUE
        layoutParams.addRule(13, -1);
        this.nativeInner = new NativeVideoView(AndroidConfig.activity);
        this.nativeObject.addView(this.nativeInner, layoutParams);
        this.nativeObject.setGravity(17);
    }
    View.call(this);

    const NativeMediaPlayer = requireClass('android.media.MediaPlayer');
    const NativeMediaController = requireClass('android.widget.MediaController');

    let _onReady,
        _onFinish,
        _nativeMediaPlayer,
        _page;
    Object.defineProperties(this, {
        'play': {
            value: function () {
                this.nativeInner.getPlayer().play();
            }
        },
        'pause': {
            value: function () {
                this.nativeInner.getPlayer().pause();
            }
        },
        'stop': {
            value: function () {
                this.nativeInner.getPlayer().pause();
                this.nativeInner.getPlayer().seekTo(0);
            }
        },
        'isPlaying': {
            value: function () {
                return this.nativeInner.getPlayer().isPlaying();
            }
        },
        'setLoopEnabled': {
            value: function (enabled) {
                this.nativeInner.getPlayer().setRepeatMode(enabled ? NativePlayer.REPEAT_MODE_ALL : NativePlayer.REPEAT_MODE_OFF);
            }
        },
        'loadURL': {
            value: function (url) {
                this.nativeInner.setUri(url);
            }
        },
        'loadFile': {
            value: function (file) {
                const File = require("../../io/file");

                if (!(file instanceof File) || !(file.exists)) {
                    throw new TypeError(Exception.TypeError.FILE);
                }
                this.nativeInner.setUri(file.fullPath);
            }
        },
        'onReady': {
            get: function () {
                return _onReady
            },
            set: function (callback) {
                _onReady = callback
                this.nativeInner.setOnReady(_onReady);
            }
        },
        'onFinish': {
            get: function () {
                return _onFinish
            },
            set: function (callback) {
                _onFinish = callback
                this.nativeInner.setOnFinish(_onFinish);
            }
        },
        'seekTo': {
            value: function (milliseconds) {
                this.nativeInner.getPlayer().seekTo(milliseconds);
            }
        },
        'totalDuration': {
            get: function () {
                return this.nativeInner.getPlayer().getDuration();
            }
        },
        'currentDuration': {
            get: function () {
                return this.nativeInner.getPlayer().getCurrentPosition();
            }
        },
        'setVolume': {
            value: function (volume) {
                this.nativeInner.getPlayer().getAudioComponent().setVolume(volume);
            }
        },
        'setControllerEnabled': {
            value: function (enabled) {
                this.nativeInner.setUseController(enabled);
            }
        },
        'page': {
            get: () => _page,
            set: (page) => {
                _page = page;
                _page.nativeObject.getLifecycle().addObserver(this.nativeInner);
            }
        },
        'toString': {
            value: function () {
                return 'VideoView';
            },
            enumerable: true,
            configurable: true
        },
        // Overrided property because videoview does not support background stuffs.
        'backgroundImage': {
            get: function () { },
            set: function (backgroundImage) { },
            enumerable: true,
            configurable: true
        },
        'backgroundColor': {
            get: function () { },
            set: function (backgroundColor) { },
            enumerable: true,
            configurable: true
        },
        'borderColor': {
            get: function () { },
            set: function (value) { },
            enumerable: true,
            configurable: true
        },
        'borderRadius': {
            get: function () { },
            set: function (borderRadius) { },
            enumerable: true,
            configurable: true
        },
        'borderWidth': {
            get: function () { },
            set: function (borderRadius) { },
            enumerable: true,
            configurable: true
        },
    });



    // TODO: Set this listener after onReady callback is set.
    this.nativeInner.setOnPreparedListener(NativeMediaPlayer.OnPreparedListener.implement({
        onPrepared: function (mediaPlayer) {
            _nativeMediaPlayer = mediaPlayer;

            _onReady && _onReady();
        }
    }));

    // TODO: Set this listener after onFinish callback is set.
    this.nativeInner.setOnCompletionListener(NativeMediaPlayer.OnCompletionListener.implement({
        onCompletion: function (mediaPlayer) {
            _onFinish && _onFinish();
        }
    }));

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = VideoView;