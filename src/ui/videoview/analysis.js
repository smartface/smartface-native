/**
 * @class UI.VideoView
 * @since 0.1
 * @extends UI.View
 * VideoView is a video holder where a video clip is played inside.
 * Supported formats for both platforms are 3GPP (.3gp) and MPEG-4 (.mp4).
 *
 *     @example
 *     const Flex      = require('@smartface/native/ui/flexlayout');
 *     const VideoView = require('@smartface/native/ui/videoview');
 *
 *     var myVideoView = new VideoView({
 *         left:10, top:10, height:250, width:250,
 *         positionType: Flex.PositionType.ABSOLUTE,
 *         onReady: function() {
 *             myVideoView.play();
 *         }
 *     });
 *     myVideoView.loadURL('url-to-videoclip');
 *
 *     myPage.layout.addChild(myVideoView);
 *
 */
function VideoView(params) { }

/**
 * Gets/sets background color of a view. It allows setting background
 * color with UI.Color instance.
 *
 * @property {UI.Color} [backgroundColor = UI.Color.WHITE]
 * @android
 * @ios
 * @removed
 * @since 1.1.8
 */
VideoView.prototype.backgroundColor = UI.Color.WHITE;

/**
 * Sets/gets border color of bounded view.
 *
 * @property {UI.Color} [borderColor = UI.Color.BLACK]
 * @android
 * @ios
 * @removed
 * @since 1.1.8
 */
VideoView.prototype.borderColor = UI.Color.BLACK;

/**
 * Sets/gets border thickness of bounded view. Accepts unsigned
 * numbers, 0 means no border.
 *
 * @property {Number} [borderWidth = 0]
 * @android
 * @ios
 * @removed
 * @since 1.1.8
 */
VideoView.prototype.borderWidth = 0;

/**
 * Sets/gets corner radius of a view.
 *
 * @property {Number} [borderRadius = 0]
 * @android
 * @ios
 * @removed
 * @since 1.1.8
 */
VideoView.prototype.borderRadius = 0;

/**
 * This function plays the loaded video clip.
 *
 * @method play
 * @android
 * @ios
 * @since 0.1
 */
VideoView.prototype.play = function () { };

/**
 * This function pauses the video clip.
 *
 * @method pause
 * @android
 * @ios
 * @since 0.1
 */
VideoView.prototype.pause = function () { };

/**
 * This function stops the video clip by seeking to the initial position of the video.
 *
 * @method stop
 * @android
 * @ios
 * @since 0.1
 */
VideoView.prototype.stop = function () { };

/**
 * This function returns status of the video, if the video clip is played or not.
 *
 * @method isPlaying
 * @return {Boolean}
 * @android
 * @ios
 * @since 0.1
 */
VideoView.prototype.isPlaying = function () { };

/**
 * This function puts the video clip in loop.
 *
 * @method setLoopEnabled
 * @android
 * @ios
 * @param {Boolean} enabled
 * @since 0.1
 */
VideoView.prototype.setLoopEnabled = function (enabled) { };

/**
 * This function loads the video clip from the given URL.
 *
 * @method loadURL
 * @android
 * @ios
 * @param {String} url
 * @since 0.1
 */
VideoView.prototype.loadURL = function (url) { };

/**
 * This function loads the video clip from the local file.
 *
 * @method loadFile
 * @android
 * @ios
 * @param {IO.File} file
 * @since 0.1
 */
VideoView.prototype.loadFile = function (file) { };

/**
 * This event is called when the video clip is ready to be played.
 *
 * @event onReady
 * @deprecated
 * @android
 * @ios
 * @param {Function} callback
 * @since 0.1
 */
VideoView.prototype.onReady = function () { };

/**
 * This event is called when the video clip completed playing.
 *
 * @event onFinish
 * @deprecated
 * @android
 * @ios
 * @param {Function} callback
 * @since 0.1
 */
VideoView.prototype.onFinish = function () { };

/**
 * This event is called when the video player failed.
 *
 * @event onFailure
 * @deprecated
 * @android
 * @ios
 * @param {Function} callback
 * @since 4.3.6
 */
VideoView.prototype.onFailure = function () { };

/**
 * This event is called when the video clip is ready to be played.
 *
 * @event onReady
 * @android
 * @ios
 * @param {Function} callback
 * @since 0.1
 */
VideoView.Events.Ready = "ready";

/**
 * This event is called when the video clip completed playing.
 *
 * @event onFinish
 * @android
 * @ios
 * @param {Function} callback
 * @since 0.1
 */
VideoView.Events.Finish = "finish";

/**
 * This event is called when the video player failed.
 *
 * @event onFailure
 * @android
 * @ios
 * @param {Function} callback
 * @since 4.3.6
 */
VideoView.Events.Failure = "failure";

/**
 * This function seeks to desired position of the video.
 *
 * @method seekTo
 * @android
 * @ios
 * @param {Number} milliseconds
 * @since 0.1
 */
VideoView.prototype.seekTo = function (milliseconds) { };

/**
 * This function returns the total duration of the video.
 *
 * @property {Number} totalDuration
 * @android
 * @ios
 * @since 0.1
 */
VideoView.prototype.totalDuration;

/**
 * This function returns the current duration of the video.
 *
 * @property {Number} currentDuration
 * @android
 * @ios
 * @since 0.1
 */
VideoView.prototype.currentDuration;

/**
 * Configure your app to continue playing video when it goes into the background.
 * For iOS, you must add the following key to info.plist.
 * `<key>UIBackgroundModes</key><array><string>audio</string></array>`
 *
 * @property {Boolean} backgroundModeEnabled
 * @android
 * @ios
 * @since 4.3.1
 */
VideoView.prototype.backgroundModeEnabled;

/**
 * This function sets the volume of the video clip. The range is between {0.0, 1.0}
 *
 * @method setVolume
 * @android
 * @ios
 * @param {Number} volume
 * @since 0.1
 */
VideoView.prototype.setVolume = function (volume) { };

/**
 * This function sets the visibility of video controller
 *
 * @method setControllerEnabled
 * @android
 * @ios
 * @param {Boolean} enabled
 * @since 0.1
 */
VideoView.prototype.setControllerEnabled = function (enabled) { };

/**
 * Picture in Picture has stopped.
 *
 * @event didStopPictureInPicture
 * @deprecated
 * @ios
 * @param {Function} callback
 * @since 4.3.1
 */
VideoView.prototype.didStopPictureInPicture = function () { };

/**
 * Picture in Picture has started.
 *
 * @event didStartPictureInPicture
 * @deprecated
 * @ios
 * @param {Function} callback
 * @since 4.3.1
 */
VideoView.prototype.didStartPictureInPicture = function () { };

/**
 * Picture in Picture is about to stop.
 *
 * @event willStopPictureInPicture
 * @deprecated
 * @ios
 * @param {Function} callback
 * @since 4.3.1
 */
VideoView.prototype.willStopPictureInPicture = function () { };

/**
 * Picture in Picture is about to start.
 *
 * @event willStartPictureInPicture
 * @deprecated
 * @ios
 * @param {Function} callback
 * @since 4.3.1
 */
VideoView.prototype.willStartPictureInPicture = function () { };

/**
 * Tells the delegate when Picture in Picture is about to stop, to give your app an opportunity to restore its video playback user interface.
 *
 * @event restoreUserInterfaceForPictureInPictureStopWithCompletionHandler
 * @deprecated
 * @ios
 * @param {Function} callback
 * @param {Boolean} callback.parameter To allow the system to finish restoring your user interface, you must call the completion handler with a value of true.
 * @since 4.3.1
 */
VideoView.prototype.restoreUserInterfaceForPictureInPictureStopWithCompletionHandler = function () { };

/**
 * Picture in Picture has stopped.
 *
 * @event didStopPictureInPicture
 * @ios
 * @param {Function} callback
 * @since 4.3.1
 */
VideoView.Events.DidStopPictureInPicture = "didStopPictureInPicture";

/**
 * Picture in Picture has started.
 *
 * @event didStartPictureInPicture
 * @ios
 * @param {Function} callback
 * @since 4.3.1
 */
VideoView.Events.DidStartPictureInPicture = "didStartPictureInPicture";

/**
 * Picture in Picture is about to stop.
 *
 * @event willStopPictureInPicture
 * @ios
 * @param {Function} callback
 * @since 4.3.1
 */
VideoView.Events.WillStopPictureInPicture = "willStopPictureInPicture";

/**
 * Picture in Picture is about to start.
 *
 * @event willStartPictureInPicture
 * @ios
 * @param {Function} callback
 * @since 4.3.1
 */
VideoView.Events.WillStartPictureInPicture = "willStartPictureInPicture";

/**
 * Tells the delegate when Picture in Picture is about to stop, to give your app an opportunity to restore its video playback user interface.
 *
 * @event restoreUserInterfaceForPictureInPictureStopWithCompletionHandler
 * @ios
 * @param {Function} callback
 * @param {Boolean} callback.parameter To allow the system to finish restoring your user interface, you must call the completion handler with a value of true.
 * @since 4.3.1
 */
VideoView.Events.RestoreUserInterfaceForPictureInPictureStopWithCompletionHandler = "restoreUserInterfaceForPictureInPictureStopWithCompletionHandler";

/**
 * Asks the delegate whether the player view controller should automatically dismiss when Picture in Picture starts.
 *
 * @property {Boolean} shouldAutomaticallyDismissAtPictureInPictureStart
 * @ios
 * @since 4.3.1
 */
VideoView.prototype.ios.shouldAutomaticallyDismissAtPictureInPictureStart = false;

/**
 * Gets/Sets the page where the videoview is put. In Android, Page is mandatory to release video resources based on your configurations. 
 *
 * @property {UI.Page} page
 * @ios
 * @android
 * @since 4.3.1
 */
VideoView.prototype.page = null;

/**
 * Gets/Sets the page where the videoview is assigned. In Android, Page is mandatory to release video resources based on your configurations. 
 *
 * @property {UI.Page} page
 * @ios
 * @since 0.1
 * @deprecated 4.3.1 Use {@link UI.VideoView#page} instead.
 */
VideoView.prototype.ios.page = null;

/**
 * A Boolean value that determines whether the player automatically displays in full screen when the play button is tapped.
 *
 * @property {Boolean} entersFullScreenWhenPlaybackBegins
 * @ios
 * @since 4.1.4
 */
VideoView.prototype.ios.entersFullScreenWhenPlaybackBegins = false;

/**
 * A Boolean value that indicates whether the player exits full screen when playback ends.
 *
 * @property {Boolean} exitsFullScreenWhenPlaybackEnds
 * @ios
 * @since 4.1.4
 */
VideoView.prototype.ios.exitsFullScreenWhenPlaybackEnds = false;


/**
 * Enables state saving of the videoview. Saves the configuration with video's current position.
 *
 * @property  {Boolean} [stateSavingEnabled = true]
 * @android
 * @since 4.3.1
 */
VideoView.prototype.stateSavingEnabled = true;

/**
 * Sets a custom error message to be displayed by the view. The error message will be displayed
 * permanently, unless it is cleared by passing null to this method.
 *
 * @property  {String} customErrorMessage
 * @android
 * @since 4.3.1
 */
VideoView.prototype.customErrorMessage


/**
 * Gets/sets background color of a view. It allows setting background
 * color with UI.Color instance.
 *
 * @property {UI.Color} backgroundColor
 * @android
 * @since 4.3.1
 */
VideoView.prototype.backgroundColor;


/**
 * Setting this event makes the fullscreen button appear. The event to be notified when the fullscreen button is clicked, or null to remove the current listener and hide the fullscreen button.
 *
 * @method onFullScreenModeChanged
 * @param {Function} callback
 * @param {Boolean} callback.isFullScreen true if the video rendering surface should be fullscreen false otherwise.
 * @android
 * @since 4.3.1
 */
VideoView.prototype.onFullScreenModeChanged = function (isFullScreen) { };


/**
 * Sets whether a loading indicator is displayed when the player is in the buffering state. 
 * The loading indicatorr is not displayed by default.
 *
 * @property {Boolean} [loadingIndicatorEnabled = false]
 * @android
 * @since 4.3.1
 */
VideoView.prototype.loadingIndicatorEnabled;


/**
 * Sets whether the next button is shown.
 *
 * @property {Boolean} [nextButtonEnabled = true]
 * @android
 * @since 4.3.1
 */
VideoView.prototype.nextButtonEnabled;


/**
 * Sets whether the fast forward button is shown.
 *
 * @property {Boolean} [fastForwardButtonEnabled = true]
 * @android
 * @since 4.3.1
 */
VideoView.prototype.fastForwardButtonEnabled;

/**
 * Sets whether the rewind button is shown.
 *
 * @property {Boolean} [rewindButtonEnabled = true]
 * @android
 * @since 4.3.1
 */
VideoView.prototype.rewindButtonEnabled;

/**
 * Sets whether the previous button is shown.
 *
 * @property {Boolean} [previousButtonEnabled = true]
 * @android
 * @since 4.3.1
 */
VideoView.prototype.previousButtonEnabled;


/**
 * Sets the controller timeout. The controller is automatically hidden after this
 * duration of time has elapsed without user input and with playback or loading in progress.
 *
 * @property {Number} controllerShowTimeoutMs The timeout in milliseconds. A non-positive value will cause the  ontroller to remain visible indefinitely.
 * @android
 * @since 4.3.1
 */
VideoView.prototype.controllerShowTimeoutMs;

/**
 * The event to be notified about controller visibility changes.
 *
 * @method onControllerVisibilityChange
 * @param {Function} callback
 * @param {Boolean} callback.visible true if the controller visible, otherwise false
 * @android
 * @since 4.3.1
 */
VideoView.prototype.onControllerVisibilityChange;


/**
 * Sets controller visibility.
 *
 * @property {Boolean} showController
 * @android
 * @since 4.3.1
 */
VideoView.prototype.showController;


/**
 * Sets the full screen button image to minimize/maximize manually. If the {@link UI.VideoView#onFullScreenModeChanged onFullScreenModeChanged} callback wasn't assign, there won't be any changes. 
 *
 * @method setFullScreenButtonImage
 * @param {Boolean} isInFullScreen  if true, full screen button image will be minimize. 
 * @android
 * @since 4.3.1
 */
VideoView.prototype.setFullScreenButtonImage;

module.exports = VideoView;