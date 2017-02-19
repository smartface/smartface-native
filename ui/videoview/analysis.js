const extend = require('js-base/core/extend');
const View = require('nf-core/ui/view');

/**
 * @class UI.VideoView
 * @since 0.1
 * @extends UI.View
 * VideoView is a video holder where a video clip is played inside.
 *
 *     @example
 *     const Flex      = require('nf-core/ui/flexlayout');
 *     const VideoView = require('nf-core/ui/videoview');
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

        // cross-platform properties
        Object.defineProperties(self, {
            /**
             * Plays the loaded video clip.
             *
             * @method play
             * @since 0.1
             */
            'play': {
                value: function() {}
            },
            /**
             * Pauses the video clip.
             *
             * @method play
             * @since 0.1
             */
            'pause': {
                value: function() {}
            },
            /**
             * Stops the video clip by seeking to the initial position of the video. 
             *
             * @method play
             * @since 0.1
             */
            'stop': {
                value: function() {}
            },
            /**
             * Returns status of the video, if the video clip is played or not.
             *
             * @method isPlaying
             * 
             * @since 0.1
             */
            'isPlaying': {
                value: function() {return true | false}
            },
            /**
             * Puts the video clip in loop.
             *
             * @method setLoopEnabled
             * 
             * @since 0.1
             */
            'setLoopEnabled': {
                value: function(enabled) {}
            },
            /**
             * Loads the video clip from the URL.
             *
             * @method loadURL
             * 
             * @since 0.1
             */
            'loadURL': {
                value: function(url) {}
            },
            /**
             * Loads the video clip from the local file.
             *
             * @method loadFile
             * 
             * @since 0.1
             */
            'loadFile': {
                value: function(file) {}
            },
            /**
             * Triggered when the video clip is ready to be played.
             *
             * @event onReady
             * @param {Function} callback
             * @since 0.1
             */
            'onReady': {
                get: function() {},
                set: function(callback) {}
            },
            /**
             * Triggered when the video clip complited playing.
             *
             * @event onFinish
             * @param {Function} callback
             * @since 0.1
             */
            'onFinish': {
                get: function() {},
                set: function(callback) {}
            },
            /**
             * Skips to desired position of the video.
             *
             * @method seekTo
             * @param {Number} milliseconds
             * @since 0.1
             */
            'seekTo': {
                value: function(milliseconds) {}
            },
            /**
             * Returns the total duration of the video.
             *
             * @property {Number} milliseconds
             * @since 0.1
             */
            'totalDuration': {
                get: function() {return milliseconds}
            },
            /**
             * Returns the current duration of the video.
             *
             * @property {Number} milliseconds
             * @since 0.1
             */
            'currentDuration': {
                get: function() {return milliseconds}
            },
            /**
             * Sets the volume of the video clip. The range is between {0.0, 1.0}
             *
             * @method setVolume
             * @param {Number} volume
             * @since 0.1
             */
            'setVolume': {
                value: function(volume) {}
            },
            /**
             * Sets the video controller visible or not.
             *
             * @method setControllerEnabled
             * @param {Boolean} enabled
             * @since 0.1
             */
            'setControllerEnabled': {
                value: function(enabled) {}
            }
        });

        // platform specific properties
        Object.defineProperties(self.ios, {
            /**
             * Gets/Sets the page where the videoview is put.
             *
             * @property page
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
