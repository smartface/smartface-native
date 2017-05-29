/**
 * @class UI.VideoView
 * @since 0.1
 * @extends UI.View
 * VideoView is a video holder where a video clip is played inside.
 * Supported formats for both platforms are 3GPP (.3gp) and MPEG-4 (.mp4).
 *
 *     @example
 *     const Flex      = require('sf-core/ui/flexlayout');
 *     const VideoView = require('sf-core/ui/videoview');
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
function VideoView(params) {}

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
VideoView.prototype.play = function(){};

/**
 * This function pauses the video clip.
 *
 * @method play
 * @android
 * @ios
 * @since 0.1
 */
VideoView.prototype.pause = function(){};

/**
 * This function stops the video clip by seeking to the initial position of the video.
 *
 * @method stop
 * @android
 * @ios
 * @since 0.1
 */
VideoView.prototype.stop = function(){};

/**
 * This function returns status of the video, if the video clip is played or not.
 *
 * @method isPlaying
 * @return {Boolean}
 * @android
 * @ios
 * @since 0.1
 */
VideoView.prototype.isPlaying = function(){};

/**
 * This function puts the video clip in loop.
 *
 * @method setLoopEnabled
 * @android
 * @ios
 * @param {Boolean} enabled
 * @since 0.1
 */
VideoView.prototype.setLoopEnabled = function(enabled){};

/**
 * This function loads the video clip from the given URL.
 *
 * @method loadURL
 * @android
 * @ios
 * @param {String} url
 * @since 0.1
 */
VideoView.prototype.loadURL = function(url){};

/**
 * This function loads the video clip from the local file.
 *
 * @method loadFile
 * @android
 * @ios
 * @param {IO.File} file
 * @since 0.1
 */
VideoView.prototype.loadFile = function(file){};

/**
 * This event is called when the video clip is ready to be played.
 *
 * @event onReady
 * @android
 * @ios
 * @param {Function} callback
 * @since 0.1
 */
VideoView.prototype.onReady = function(){};

/**
 * This event is called when the video clip completed playing.
 *
 * @event onFinish
 * @android
 * @ios
 * @param {Function} callback
 * @since 0.1
 */
VideoView.prototype.onFinish = function(){};

/**
 * This function seeks to desired position of the video.
 *
 * @method seekTo
 * @android
 * @ios
 * @param {Number} milliseconds
 * @since 0.1
 */
VideoView.prototype.seekTo = function(milliseconds){};

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
 * This function sets the volume of the video clip. The range is between {0.0, 1.0}
 *
 * @method setVolume
 * @android
 * @ios
 * @param {Number} volume
 * @since 0.1
 */
VideoView.prototype.setVolume = function(volume){};

/**
 * This function sets the visibility of video controller
 *
 * @method setControllerEnabled
 * @android
 * @ios
 * @param {Boolean} enabled
 * @since 0.1
 */
VideoView.prototype.setControllerEnabled = function(enabled){};

/**
 * Gets/Sets the page where the videoview is put.
 *
 * @property {UI.Page} page
 * @ios
 * @since 0.1
 */
VideoView.prototype.ios.page = null;

module.exports = VideoView;