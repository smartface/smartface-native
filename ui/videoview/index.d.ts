import View = require("../view");
import Color = require("../color");
import File = require("sf-core/io/file");
import Page = require("../page");
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
declare class VideoView extends View {
  constructor(params?: any);
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
  backgroundColor: Color;
/**
 * Sets/gets border color of bounded view.
 *
 * @property {UI.Color} [borderColor = UI.Color.BLACK]
 * @android
 * @ios
 * @removed
 * @since 1.1.8
 */
  borderColor: Color;
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
  borderWidth: number;
/**
 * Sets/gets corner radius of a view.
 *
 * @property {Number} [borderRadius = 0]
 * @android
 * @ios
 * @removed
 * @since 1.1.8
 */
  borderRadius:  number;
/**
 * This function plays the loaded video clip.
 *
 * @method play
 * @android
 * @ios
 * @since 0.1
 */
  play():void;
/**
 * This function pauses the video clip.
 *
 * @method play
 * @android
 * @ios
 * @since 0.1
 */
  pause(): void;
/**
 * This function stops the video clip by seeking to the initial position of the video.
 *
 * @method stop
 * @android
 * @ios
 * @since 0.1
 */
  stop():void;
/**
 * This function returns status of the video, if the video clip is played or not.
 *
 * @method isPlaying
 * @return {Boolean}
 * @android
 * @ios
 * @since 0.1
 */
  isPlaying: boolean;
/**
 * This function puts the video clip in loop.
 *
 * @method setLoopEnabled
 * @android
 * @ios
 * @param {Boolean} enabled
 * @since 0.1
 */
  setLoopEnabled(enabled: boolean): void;
/**
 * This function loads the video clip from the given URL.
 *
 * @method loadURL
 * @android
 * @ios
 * @param {String} url
 * @since 0.1
 */
  loadURL(url: string):void;
/**
 * This function loads the video clip from the local file.
 *
 * @method loadFile
 * @android
 * @ios
 * @param {IO.File} file
 * @since 0.1
 */
  loadFile(file: File):void;
/**
 * This event is called when the video clip is ready to be played.
 *
 * @event onReady
 * @android
 * @ios
 * @param {Function} callback
 * @since 0.1
 */
  onReady: () => void;
/**
 * This event is called when the video clip completed playing.
 *
 * @event onFinish
 * @android
 * @ios
 * @param {Function} callback
 * @since 0.1
 */
  onFinish: () => void;
/**
 * This function seeks to desired position of the video.
 *
 * @method seekTo
 * @android
 * @ios
 * @param {Number} milliseconds
 * @since 0.1
 */
  seekTo(time: number):void;
/**
 * This function returns the total duration of the video.
 *
 * @property {Number} totalDuration
 * @android
 * @ios
 * @since 0.1
 */
  totalDuration: number;
/**
 * This function returns the current duration of the video.
 *
 * @property {Number} currentDuration
 * @android
 * @ios
 * @since 0.1
 */
  currentDuration: number;

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
  backgroundModeEnabled: boolean;

/**
 * This function sets the volume of the video clip. The range is between {0.0, 1.0}
 *
 * @method setVolume
 * @android
 * @ios
 * @param {Number} volume
 * @since 0.1
 */
  setVolume(vol: number): void;
/**
 * This function sets the visibility of video controller
 *
 * @method setControllerEnabled
 * @android
 * @ios
 * @param {Boolean} enabled
 * @since 0.1
 */
  setControllerEnabled(enabled: string): void;

/**
 * Gets/Sets the page where the videoview is put. In Android, Page is mandatory to release video resources based on your configurations. 
 *
 * @property {UI.Page} page
 * @ios
 * @android
 * @since 4.3.1
 */
    page: Page | null;

  ios: View['ios'] & {

/**
 * Gets/Sets the page where the videoview is put. In Android, Page is mandatory to release video resources based on your configurations. 
 *
 * @property {UI.Page} page
 * @ios
 * @since 0.1
 * @deprecated 4.3.1 Use {@link UI.VideoView#page} instead.
 */
    page: Page | null;


/**
 * A Boolean value that determines whether the player automatically displays in full screen when the play button is tapped.
 *
 * @property {Boolean} entersFullScreenWhenPlaybackBegins
 * @ios
 * @since 4.1.4
 */
    entersFullScreenWhenPlaybackBegins: boolean;
/**
 * A Boolean value that indicates whether the player exits full screen when playback ends.
 *
 * @property {Boolean} exitsFullScreenWhenPlaybackEnds
 * @ios
 * @since 4.1.4
 */
    exitsFullScreenWhenPlaybackEnds: boolean;

/**
 * Picture in Picture has stopped.
 * 
 * @event didStopPictureInPicture
 * @ios
 * @param {Function} callback
 * @since 4.3.1
 */
  didStopPictureInPicture: () => void;

/**
 * Picture in Picture has started.
 * 
 * @event didStartPictureInPicture
 * @ios
 * @param {Function} callback
 * @since 4.3.1
 */
  didStartPictureInPicture: () => void;
/**
 * Picture in Picture is about to stop.
 * 
 * @event willStopPictureInPicture
 * @ios
 * @param {Function} callback
 * @since 4.3.1
 */
  willStopPictureInPicture: () => void;
/**
 * Picture in Picture is about to start.
 * 
 * @event willStartPictureInPicture
 * @ios
 * @param {Function} callback
 * @since 4.3.1
 */
  willStartPictureInPicture: () => void;
}

    android: View['android'] & {
 /**
 * Enables state saving of the videoview. Saves the configuration with video's current position.
 *
 * @property  {Boolean} [enableStateSaving = true]
 * @android
 * @since 4.3.1
 */
    enableStateSaving: boolean;
   }
}
export = VideoView;
