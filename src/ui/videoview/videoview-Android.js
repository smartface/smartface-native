/*globals requireClass*/
const View = require('../view');
const Exception = require("../../util/exception");
const AndroidConfig = require('../../util/Android/androidconfig');
const NativeRelativeLayout = requireClass('android.widget.RelativeLayout');
const NativeVideoView = requireClass('io.smartface.android.sfcore.ui.videoview.SFVideoView')
const NativePlayer = requireClass('com.google.android.exoplayer2.Player');
const Events = require('./events');
const { EventEmitterCreator } = require('../../core/eventemitter');
VideoView.Events = {...View.Events, ...Events };

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

    let _onReady,
        _onFinish,
        _onFailure,
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
        'onFailure': {
            get: function () {
                return _onFailure
            },
            set: function (callback) {
                _onFailure = callback
                this.nativeInner.setOnFailure(_onFailure);
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
                this.nativeInner.setPage(page.nativeObject);
            }
        },
        'backgroundModeEnabled': {
            get: () => _backgroundModeEnabled,
            set: (value) => {
                _backgroundModeEnabled = value;
                this.nativeInner.allowBackgroundRunning(_backgroundModeEnabled);
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
        }
    });

    const SHOW_BUFFERING_ALWAYS = 2,
        SHOW_BUFFERING_NEVER = 0;
    let _enableStateSaving,
        _backgroundColor, _onFullScreenModeChanged,
        _showLoadingIndicator, _nextButtonEnabled,
        _fastForwardButtonEnabled, _rewindButtonEnabled,
        _previousButtonEnabled, _controllerShowTimeoutMs;
    Object.defineProperties(this.android, {
        'stateSavingEnabled': {
            get: () => _enableStateSaving,
            set: (value) => {
                _enableStateSaving = value
                this.nativeInner.setStateful(_enableStateSaving);
            },
            enumerable: true,
            configurable: true
        },
        'customErrorMessage': {
            get: () => _customErrorMessage,
            set: (value) => {
                _customErrorMessage = value
                this.nativeInner.setCustomErrorMessage(_customErrorMessage);
            },
            enumerable: true,
            configurable: true
        },
        'backgroundColor': {
            get: () => _backgroundColor,
            set: (value) => {
                _backgroundColor = value;
                this.nativeInner.setBackgroundColor(_backgroundColor.nativeObject);
            },
            enumerable: true,
            configurable: true
        },
        'onFullScreenModeChanged': {
            get: () => {
                return _onFullScreenModeChanged
            },
            set: (callback) => {
                _onFullScreenModeChanged = callback
                this.nativeInner.setFullScreenModeChangedCallback(_onFullScreenModeChanged);
            }
        },
        'loadingIndicatorEnabled': {
            get: () => {
                return _showLoadingIndicator
            },
            set: (value) => {
                _showLoadingIndicator = value
                this.nativeInner.setShowBuffering(_showLoadingIndicator ? SHOW_BUFFERING_ALWAYS : SHOW_BUFFERING_NEVER);
            }
        },
        'nextButtonEnabled': {
            get: () => {
                return _nextButtonEnabled;
            },
            set: (value) => {
                _nextButtonEnabled = value
                this.nativeInner.setShowNextButton(_nextButtonEnabled);
            }
        },
        'fastForwardButtonEnabled': {
            get: () => {
                return _fastForwardButtonEnabled;
            },
            set: (value) => {
                _fastForwardButtonEnabled = value
                this.nativeInner.setShowFastForwardButton(_fastForwardButtonEnabled);
            }
        },
        'rewindButtonEnabled': {
            get: () => {
                return _rewindButtonEnabled;
            },
            set: (value) => {
                _rewindButtonEnabled = value
                this.nativeInner.setShowRewindButton(_rewindButtonEnabled);
            }
        },
        'previousButtonEnabled': {
            get: () => {
                return _previousButtonEnabled;
            },
            set: (value) => {
                _previousButtonEnabled = value
                this.nativeInner.setShowPreviousButton(_previousButtonEnabled);
            }
        },
        'controllerShowTimeoutMs': {
            get: () => {
                return _controllerShowTimeoutMs
            },
            set: (value) => {
                _controllerShowTimeoutMs = value
                this.nativeInner.setControllerShowTimeoutMs(_controllerShowTimeoutMs);
            }
        },
        'onControllerVisibilityChange': {
            get: () => {
                return _onControllerVisibilityChange
            },
            set: (value) => {
                _onControllerVisibilityChange = value
                this.nativeInner.setOnControllerVisibilityCallback(_onControllerVisibilityChange);
            }
        },
        'showController': {
            get: () => {
                return _showController
            },
            set: (value) => {
                _showController = value
                this.nativeInner.showController(_showController);
            }
        },
        'setFullScreenButtonImage': {
            value: (isInFullScreen) => {
                this.nativeInner.setFullscreenDrawable(isInFullScreen);
            }
        }
    })

    const EventFunctions = {
        [Events.Finish]: function() {
            _onFinish = (state) => {
                this.emitter.emit(Events.Finish, state);
            }
            this.nativeInner.setOnFinish(_onFinish);
        },
        [Events.Ready]: function() {
            _onReady = (state) => {
                this.emitter.emit(Events.Ready, state);
            } 
            this.nativeInner.setOnReady(_onReady);
        },
        [Events.Failure]: function() {
            _onFailure = (state) => {
                this.emitter.emit(Events.Failure, state);
            } 
            this.nativeInner.setOnFailure(_onFailure);
        },
        [Events.DidStartPictureInPicture]: function() {
            //iOS Only
        },
        [Events.DidStopPictureInPicture]: function() {
            //iOS Only
        },
        [Events.WillStartPictureInPicture]: function() {
            //iOS Only
        },
        [Events.WillStopPictureInPicture]: function() {
            //iOS Only
        },
        [Events.RestoreUserInterfaceForPictureInPictureStopWithCompletionHandler]: function() {
            //iOS Only
        },
    }
    EventEmitterCreator(this, EventFunctions);

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = VideoView;