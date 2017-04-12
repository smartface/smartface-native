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
const VideoView = extend(View)(
    function (_super, params) {
        var self = this;
        _super(this);

        self.ios = {};

        Object.defineProperties(self, {
            /**
             * This function plays the loaded video clip.
             *
             * @method play
             * @android
             * @ios
             * @since 0.1
             */
            'play': {
                value: function() {}
            },
            
            /**
             * This function pauses the video clip.
             *
             * @method play
             * @android
             * @ios
             * @since 0.1
             */
            'pause': {
                value: function() {}
            },
            /**
             * This function stops the video clip by seeking to the initial position of the video.
             *
             * @method stop
             * @android
             * @ios
             * @since 0.1
             */
            'stop': {
                value: function() {}
            },
            /**
             * This function returns status of the video, if the video clip is played or not.
             *
             * @method isPlaying
             * @return {Boolean}
             * @android
             * @ios
             * @since 0.1
             */
            'isPlaying': {
                value: function() {return true | false}
            },
            /**
             * This function puts the video clip in loop.
             *
             * @method setLoopEnabled
             * @android
             * @ios
             * @param {Boolean} enabled
             * @since 0.1
             */
            'setLoopEnabled': {
                value: function(enabled) {}
            },
            /**
             * This function loads the video clip from the given URL.
             *
             * @method loadURL
             * @android
             * @ios
             * @param {String} url
             * @since 0.1
             */
            'loadURL': {
                value: function(url) {}
            },
            /**
             * This function loads the video clip from the local file.
             *
             * @method loadFile
             * @android
             * @ios
             * @param {IO.File} file
             * @since 0.1
             */
            'loadFile': {
                value: function(file) {}
            },
            /**
             * This event is called when the video clip is ready to be played.
             *
             * @event onReady
             * @android
             * @ios
             * @param {Function} callback
             * @since 0.1
             */
            'onReady': {
                get: function() {},
                set: function(callback) {}
            },
            /**
             * This event is called when the video clip completed playing.
             *
             * @event onFinish
             * @android
             * @ios
             * @param {Function} callback
             * @since 0.1
             */
            'onFinish': {
                get: function() {},
                set: function(callback) {}
            },
            /**
             * This function seeks to desired position of the video.
             *
             * @method seekTo
             * @android
             * @ios
             * @param {Number} milliseconds
             * @since 0.1
             */
            'seekTo': {
                value: function(milliseconds) {}
            },
            /**
             * This function returns the total duration of the video.
             *
             * @property {Number} totalDuration
             * @android
             * @ios
             * @since 0.1
             */
            'totalDuration': {
                get: function() {return milliseconds}
            },
            /**
             * This function returns the current duration of the video.
             *
             * @property {Number} currentDuration
             * @android
             * @ios
             * @since 0.1
             */
            'currentDuration': {
                get: function() {return milliseconds}
            },
            /**
             * This function sets the volume of the video clip. The range is between {0.0, 1.0}
             *
             * @method setVolume
             * @android
             * @ios
             * @param {Number} volume
             * @since 0.1
             */
            'setVolume': {
                value: function(volume) {}
            },
            /**
             * This function sets the visibility of video controller
             *
             * @method setControllerEnabled
             * @android
             * @ios
             * @param {Boolean} enabled
             * @since 0.1
             */
            'setControllerEnabled': {
                value: function(enabled) {}
            }
        });

        Object.defineProperties(self.ios, {
            /**
             * Gets/Sets the page where the videoview is put.
             *
             * @property {UI.Page} page
             * @ios
             * @since 0.1
             */
            'page': {
                get: function() {return page},
                set: function(page) {}
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
