const View = require('../../ui/view');
const Exception = require("../../util").Exception;
const TypeUtil = require("../../util/type");
const Events = require('./events');
const { EventEmitterCreator } = require('../../core/eventemitter');
VideoView.Events = { ...View.Events, ...Events };

// const VideoView = extend(View)(
VideoView.prototype = Object.create(View.prototype);
function VideoView(params) {

    var self = this;

    self.backgroundModeEnabled = false;
    if (!self.nativeObject) {
        if (params && params.backgroundModeEnabled) {
            self.backgroundModeEnabled = true;
            self.avPlayerViewController = __SF_AVPlayerViewController.createWithBackgroundMode(true);
        } else {
            self.avPlayerViewController = __SF_AVPlayerViewController.createWithBackgroundMode(false);
        }
    }
    View.call(this);
    self.nativeObject.addSubview(self.avPlayerViewController.view);

    // self.avPlayerViewController.viewDidDisappear = function() {
    //     if (self.avPlayer && self.avPlayer.constructor.name === "AVPlayer") {
    //         self.pause();
    //     }
    // };

    self.loadURL = function (value) {
        if (TypeUtil.isURL(value)) {
            if (self.avPlayer) {
                self.avPlayer.removeObserver();
            }
            var url = __SF_NSURL.URLWithString(value);
            self.avPlayer = __SF_AVPlayer.createFromURL(url);
            self.avPlayerViewController.player = self.avPlayer;
            self.avPlayerViewController.videoGravity = "AVLayerVideoGravityResizeAspect";
            self.avPlayer.addObserver();
            self.addCallbackFunction();
        } else {
            throw new TypeError(Exception.TypeError.URL);
        }
    };

    self.loadFile = function (value) {
        if (self.avPlayer) {
            self.avPlayer.removeObserver();
        }
        var url = value.ios.getNSURL();
        self.avPlayer = __SF_AVPlayer.createFromURL(url);
        self.avPlayerViewController.player = self.avPlayer;
        self.avPlayerViewController.videoGravity = "AVLayerVideoGravityResizeAspect";
        self.avPlayer.addObserver();
        self.addCallbackFunction();

    }

    self.addCallbackFunction = () => {
        self.avPlayer.onItemFailed = () => {
            if (typeof self.onFailure === 'function') {
                self.onFailure();
            }
        }
    }



    self.play = function () {
        self.avPlayer && self.avPlayer.play();
    }

    self.pause = function () {
        self.avPlayer && self.avPlayer.pause();
    };

    self.stop = function () {
        self.avPlayer && self.avPlayer.pause();
        self.seekTo(0);
    };

    self.avPlayerViewController.onReady = function () {
        if (typeof self.onReady === "function") {
            self.onReady();
        }
    }



    var _loopEnabled = false;
    self.setLoopEnabled = function (value) {
        _loopEnabled = value;
    };

    self.avPlayerViewController.AVPlayerItemDidPlayToEndTime = function () {
        if (typeof self.onFinish === "function") {
            self.onFinish();
        }
        if (_loopEnabled === true) {
            self.seekTo(0);
            self.play();
        }
    };

    self.seekTo = function (milliseconds) {
        self.avPlayer.seekToMillisecond(milliseconds);
    };

    self.isPlaying = function () {
        if (self.avPlayer.rate !== 0) {
            return true;
        } else {
            return false;
        }
    };

    self.ios = {};

    var _page;
    Object.defineProperty(self.ios, 'page', { //Deprecated
        get: function () {
            return _page;
        },
        set: function (value) {
            _page = value;
            self.avPlayerViewController.removeFromParentViewController();
            value.nativeObject.addChildViewController(self.avPlayerViewController);
        },
        enumerable: true
    });

    Object.defineProperty(self, 'page', {
        get: function () {
            return _page;
        },
        set: function (value) {
            _page = value;
            self.avPlayerViewController.removeFromParentViewController();
            value.nativeObject.addChildViewController(self.avPlayerViewController);
        },
        enumerable: true
    });

    Object.defineProperty(self.ios, 'entersFullScreenWhenPlaybackBegins', {
        get: function () {
            return self.avPlayerViewController.valueForKey("entersFullScreenWhenPlaybackBegins");
        },
        set: function (value) {
            self.avPlayerViewController.setValueForKey(value, "entersFullScreenWhenPlaybackBegins");
        },
        enumerable: true
    });

    Object.defineProperty(self.ios, 'exitsFullScreenWhenPlaybackEnds', {
        get: function () {
            return self.avPlayerViewController.valueForKey("exitsFullScreenWhenPlaybackEnds");
        },
        set: function (value) {
            self.avPlayerViewController.setValueForKey(value, "exitsFullScreenWhenPlaybackEnds");
        },
        enumerable: true
    });

    Object.defineProperty(self, 'totalDuration', {
        get: function () {

            return self.avPlayer.duration() * 1000;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'currentDuration', {
        get: function () {

            return self.avPlayer.getCurrentTime() * 1000;
        },
        enumerable: true
    });

    self.setVolume = function (value) {
        self.avPlayer.volume = value;
    };

    // self.show = function(animation,callback) {
    // 	__SF_Dispatch.mainAsync(function() {
    // 	if (!self.ios.page) {
    // 		throw new Error("page property cannot be undefined.")
    // 	}
    //     self.avPlayerViewController.view.removeFromSuperview();
    //     self.avPlayerViewController.removeFromParentViewController();
    //     self.ios.page.nativeObject.presentViewController(self.avPlayerViewController,callback,animation);
    // 	});
    // };

    // self.dismiss = function(animation,callback) {
    // 	__SF_Dispatch.mainAsync(function() {
    // 		self.avPlayerViewController.dismissViewController(callback, animation);
    // 	});
    // };

    self.setControllerEnabled = function (value) {
        self.avPlayerViewController.showsPlaybackControls = value;
    };

    self.avPlayerViewController.didStopPictureInPicture = function () {
        self.ios && self.ios.didStopPictureInPicture && self.ios.didStopPictureInPicture();
    };

    self.avPlayerViewController.didStartPictureInPicture = function () {
        self.ios && self.ios.didStartPictureInPicture && self.ios.didStartPictureInPicture();
    };

    self.avPlayerViewController.willStopPictureInPicture = function () {
        self.ios && self.ios.willStopPictureInPicture && self.ios.willStopPictureInPicture();
    };

    self.avPlayerViewController.willStartPictureInPicture = function () {
        self.ios && self.ios.willStartPictureInPicture && self.ios.willStartPictureInPicture();
    };

    Object.defineProperty(self.ios, 'shouldAutomaticallyDismissAtPictureInPictureStart', {
        get: function () {
            return self.avPlayerViewController.shouldAutomaticallyDismissAtPictureInPictureStart;
        },
        set: function (value) {
            self.avPlayerViewController.shouldAutomaticallyDismissAtPictureInPictureStart = value;
        },
        enumerable: true
    });

    var _restoreUserInterfaceForPictureInPictureStopWithCompletionHandler;
    Object.defineProperty(self.ios, 'restoreUserInterfaceForPictureInPictureStopWithCompletionHandler', {
        get: function () {
            return _restoreUserInterfaceForPictureInPictureStopWithCompletionHandler;
        },
        set: function (value) {
            _restoreUserInterfaceForPictureInPictureStopWithCompletionHandler = value;
            self.avPlayerViewController.restoreUserInterfaceForPictureInPictureStopWithCompletionHandler = value;
        },
        enumerable: true
    });

    const EventFunctions = {
        [Events.Finish]: function () {
            self.onFinish = (state) => {
                self.emitter.emit(Events.Finish, state);
            }
        },
        [Events.Failure]: function () {
            self.onFailure = (state) => {
                self.emitter.emit(Events.Failure, state);
            }
        },
        [Events.Ready]: function () {
            self.onReady = (state) => {
                self.emitter.emit(Events.Ready, state);
            }
        },
        [Events.DidStartPictureInPicture]: function () {
            self.ios.didStartPictureInPicture = (state) => {
                self.emitter.emit(Events.DidStartPictureInPicture, state);
            }
        },
        [Events.DidStopPictureInPicture]: function () {
            self.ios.didStopPictureInPicture = (state) => {
                self.emitter.emit(Events.DidStopPictureInPicture, state);
            }
        },
        [Events.WillStartPictureInPicture]: function () {
            self.ios.willStartPictureInPicture = (state) => {
                self.emitter.emit(Events.WillStartPictureInPicture, state);
            }
        },
        [Events.WillStopPictureInPicture]: function () {
            self.ios.willStopPictureInPicture = (state) => {
                self.emitter.emit(Events.WillStopPictureInPicture, state);
            }
        },
        [Events.RestoreUserInterfaceForPictureInPictureStopWithCompletionHandler]: function () {
            _restoreUserInterfaceForPictureInPictureStopWithCompletionHandler = (state) => {
                self.emitter.emit(Events.RestoreUserInterfaceForPictureInPictureStopWithCompletionHandler, state);
            }
        },
    }
    EventEmitterCreator(this, EventFunctions);

    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }

    self.android.setFullScreenButtonImage = () => { };
}

module.exports = VideoView;