import { IView, ViewAndroidProps, ViewIOSProps } from '../view/view';
import File from '../../io/file';
import Page from '../page';
import { VideoViewEvents } from './videoview-events';
import { MobileOSProps } from '../../core/native-mobile-component';
import Color from '../color';

export interface IVideoViewIOSProps extends ViewIOSProps {
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
   * @deprecated
   * @ios
   * @param {Function} callback
   * @since 4.3.1
   * @example
   * ```
   * import VideoView from '@smartface/native/ui/videoview';
   *
   * const videoView = new VideoView();
   * videoView.on(VideoView.Events.DidStopPictureInPicture, () => {
   * 	console.info('didStopPictureInPicture');
   * });
   * ```
   */
  didStopPictureInPicture: () => void;

  /**
   * Picture in Picture has started.
   *
   * @event didStartPictureInPicture
   * @deprecated
   * @ios
   * @param {Function} callback
   * @since 4.3.1
   * @example
   * ```
   * import VideoView from '@smartface/native/ui/videoview';
   *
   * const videoView = new VideoView();
   * videoView.on(VideoView.Events.DidStartPictureInPicture, () => {
   * 	console.info('didStartPictureInPicture');
   * });
   * ```
   */
  didStartPictureInPicture: () => void;
  /**
   * Picture in Picture is about to stop.
   *
   * @event willStopPictureInPicture
   * @ios
   * @param {Function} callback
   * @since 4.3.1
   * @example
   * ```
   * import VideoView from '@smartface/native/ui/videoview';
   *
   * const videoView = new VideoView();
   * videoView.on(VideoView.Events.WillStopPictureInPicture, (params) => {
   * 	console.info('willStopPictureInPicture', params);
   * });
   * ```
   */
  willStopPictureInPicture: () => void;
  /**
   * Picture in Picture is about to start.
   *
   * @event willStartPictureInPicture
   * @deprecated
   * @ios
   * @param {Function} callback
   * @since 4.3.1
   * @example
   * ```
   * import VideoView from '@smartface/native/ui/videoview';
   *
   * const videoView = new VideoView();
   * videoView.on(VideoView.Events.WillStartPictureInPicture, (params) => {
   * 	console.info('willStartPictureInPicture', params);
   * });
   * ```
   */
  willStartPictureInPicture: () => void;
  /**
   * Tells the delegate when Picture in Picture is about to stop, to give your app an opportunity to restore its video playback user interface.
   *
   * @event restoreUserInterfaceForPictureInPictureStopWithCompletionHandler
   * @deprecated
   * @ios
   * @param {Function} callback
   * @param {Boolean} callback.parameter To allow the system to finish restoring your user interface, you must call the completion handler with a value of true.
   * @since 4.3.1
   * @example
   * ```
   * import VideoView from '@smartface/native/ui/videoview';
   *
   * const videoView = new VideoView();
   * videoView.on(VideoView.Events.RestoreUserInterfaceForPictureInPictureStopWithCompletionHandler, (params) => {
   * 	console.info('restoreUserInterfaceForPictureInPictureStopWithCompletionHandler', params);
   * });
   * ```
   */
  restoreUserInterfaceForPictureInPictureStopWithCompletionHandler: (callback: (parameter?: boolean) => void) => void;
  /**
   * Asks the delegate whether the player view controller should automatically dismiss when Picture in Picture starts.
   *
   * @property {Boolean} shouldAutomaticallyDismissAtPictureInPictureStart
   * @ios
   * @since 4.3.1
   */
  shouldAutomaticallyDismissAtPictureInPictureStart: boolean;
}

export interface IVideoViewAndroidProps extends ViewAndroidProps {
  /**
   * Enables state saving of the videoview. Saves the configuration with video's current position.
   *
   * @property  {Boolean} [stateSavingEnabled = true]
   * @android
   * @since 4.3.1
   */
  stateSavingEnabled: boolean;

  /**
   * Sets a custom error message to be displayed by the view. The error message will be displayed
   * permanently, unless it is cleared by passing null to this method.
   *
   * @property  {String} customErrorMessage
   * @android
   * @since 4.3.1
   */
  customErrorMessage: string;
  /**
   * Gets/sets background color of a view. It allows setting background
   * color with UI.Color instance.
   *
   * @property {UI.Color} backgroundColor
   * @android
   * @since 4.3.1
   */
  backgroundColor: Color;

  /**
   * Sets whether a loading indicator is displayed when the player is in the buffering state.
   * The loading indicatorr is not displayed by default.
   *
   * @property {Boolean} [loadingIndicatorEnabled = false]
   * @android
   * @since 4.3.1
   */
  loadingIndicatorEnabled: boolean;

  /**
   * Setting this event makes the fullscreen button appear. The event to be notified when the fullscreen button is clicked, or null to remove the current listener and hide the fullscreen button.
   *
   * @event onFullScreenModeChanged
   * @param {Function} callback
   * @param {Boolean} callback.isFullScreen true if the video rendering surface should be fullscreen false otherwise.
   * @android
   * @since 4.3.1
   */
  onFullScreenModeChanged: (isFullScreen: boolean) => void;

  /**
   * Sets whether the next button is shown.
   *
   * @property {Boolean} [nextButtonEnabled = true]
   * @android
   * @since 4.3.1
   */
  nextButtonEnabled: boolean;

  /**
   * Sets whether the fast forward button is shown.
   *
   * @property {Boolean} [fastForwardButtonEnabled = true]
   * @android
   * @since 4.3.1
   */
  fastForwardButtonEnabled: boolean;

  /**
   * Sets whether the rewind button is shown.
   *
   * @property {Boolean} [rewindButtonEnabled = true]
   * @android
   * @since 4.3.1
   */
  rewindButtonEnabled: boolean;

  /**
   * Sets whether the previous button is shown.
   *
   * @property {Boolean} [previousButtonEnabled = true]
   * @android
   * @since 4.3.1
   */
  previousButtonEnabled: boolean;

  /**
   * Sets the controller timeout. The controller is automatically hidden after this
   * duration of time has elapsed without user input and with playback or loading in progress.
   *
   * @property {Number} controllerShowTimeoutMs The timeout in milliseconds. A non-positive value will cause the  ontroller to remain visible indefinitely.
   * @android
   * @since 4.3.1
   */
  controllerShowTimeoutMs: number;

  /**
   * The event to be notified about controller visibility changes.
   *
   * @method onControllerVisibilityChange
   * @param {Function} callback
   * @param {Boolean} callback.visible true if the controller visible, otherwise false
   * @android
   * @since 4.3.1
   */
  onControllerVisibilityChange: (visible: boolean) => void;

  /**
   * Sets controller visibility.
   *
   * @property {Boolean} showController
   * @android
   * @since 4.3.1
   */
  showController: boolean;

  /**
   * Sets the full screen button image to minimize/maximize manually. If the {@link UI.VideoView#onFullScreenModeChanged onFullScreenModeChanged} callback wasn't assign, there won't be any changes.
   *
   * @method setFullScreenButtonImage
   * @param {Boolean} isInFullScreen  if true, full screen button image will be minimize.
   * @android
   * @since 4.3.1
   */
  setFullScreenButtonImage: (isInFullScreen: boolean) => void;
}

/**
 * @class UI.VideoView
 * @since 0.1
 * @extends UI.View
 * VideoView is a video holder where a video clip is played inside.
 * Supported formats for both platforms are 3GPP (.3gp) and MPEG-4 (.mp4).
 *
 *     @example
 *     import Flex      from '@smartface/native/ui/flexlayout';
 *     import VideoView from '@smartface/native/ui/videoview';
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
export interface IVideoView<
  TEvent extends string = VideoViewEvents,
  TMobile extends MobileOSProps<IVideoViewIOSProps, IVideoViewAndroidProps> = MobileOSProps<IVideoViewIOSProps, IVideoViewAndroidProps>
> extends IView<TEvent | VideoViewEvents, any, TMobile> {
  /**
   * This function plays the loaded video clip.
   *
   * @method play
   * @android
   * @ios
   * @since 0.1
   */
  play(): void;
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
  stop(): void;
  /**
   * This function returns status of the video, if the video clip is played or not.
   *
   * @method isPlaying
   * @return {Boolean}
   * @android
   * @ios
   * @since 0.1
   */
  isPlaying(): boolean;
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
  loadURL(url: string): void;
  /**
   * This function loads the video clip from the local file.
   *
   * @method loadFile
   * @android
   * @ios
   * @param {IO.File} file
   * @since 0.1
   */
  loadFile(file: File): void;
  /**
   * This event is called when the video clip is ready to be played.
   *
   * @event onReady
   * @deprecated
   * @android
   * @ios
   * @param {Function} callback
   * @since 0.1
   * @example
   * ```
   * import VideoView from '@smartface/native/ui/videoview';
   *
   * const videoView = new VideoView();
   * videoView.on(VideoView.Events.Ready, () => {
   * 	console.info('onReady');
   * });
   * ```
   */
  onReady: () => void;
  /**
   * This event is called when the video clip completed playing.
   *
   * @event onFinish
   * @deprecated
   * @android
   * @ios
   * @param {Function} callback
   * @since 0.1
   * @example
   * ```
   * import VideoView from '@smartface/native/ui/videoview';
   *
   * const videoView = new VideoView();
   * videoView.on(VideoView.Events.Finish, () => {
   * 	console.info('onFinish');
   * });
   * ```
   */
  onFinish: () => void;
  /**
   * This event is called when the video player is failed.
   *
   * @event onFailure
   * @deprecated
   * @android
   * @ios
   * @param {Function} callback
   * @since 4.3.6
   * @example
   * ```
   * import VideoView from '@smartface/native/ui/videoview';
   *
   * const videoView = new VideoView();
   * videoView.on(VideoView.Events.Failure, () => {
   * 	console.info('onFailure');
   * });
   * ```
   */
  onFailure: (reason?: any) => void;
  /**
   * This function seeks to desired position of the video.
   *
   * @method seekTo
   * @android
   * @ios
   * @param {Number} milliseconds
   * @since 0.1
   */
  seekTo(time: number): void;
  /**
   * This function returns the total duration of the video.
   *
   * @property {Number} totalDuration
   * @android
   * @ios
   * @since 0.1
   */
  readonly totalDuration: number;
  /**
   * This function returns the current duration of the video.
   *
   * @property {Number} currentDuration
   * @android
   * @ios
   * @since 0.1
   */
  readonly currentDuration: number;

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
  setControllerEnabled(enabled: boolean): void;

  /**
   * Gets/Sets the page where the videoview is put. In Android, Page is mandatory to release video resources based on your configurations.
   *
   * @property {UI.Page} page
   * @ios
   * @android
   * @since 4.3.1
   */
  page: Page | null;
}
