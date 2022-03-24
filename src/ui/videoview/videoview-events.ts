import { ViewEvents } from '../view/view-events';

export const VideoViewEvents = {
  /**
   * This event is called when the video clip completed playing.
   *
   * @event onFinish
   * @android
   * @ios
   * @param {Function} callback
   * @since 0.1
   */
  Finish: 'finish',
  /**
   * This event is called when the video clip is ready to be played.
   *
   * @event onReady
   * @android
   * @ios
   * @param {Function} callback
   * @since 0.1
   */
  Ready: 'ready',
  /**
   * This event is called when the video player failed.
   *
   * @event onFailure
   * @android
   * @ios
   * @param {Function} callback
   * @since 4.3.6
   */
  Failure: 'failure',

  /**
   * Tells the delegate when Picture in Picture is about to stop, to give your app an opportunity to restore its video playback user interface.
   *
   * @event restoreUserInterfaceForPictureInPictureStopWithCompletionHandler
   * @ios
   * @param {Function} callback
   * @param {Boolean} callback.parameter To allow the system to finish restoring your user interface, you must call the completion handler with a value of true.
   * @since 4.3.1
   */
  RestoreUserInterfaceForPictureInPictureStopWithCompletionHandler: 'restoreUserInterfaceForPictureInPictureStopWithCompletionHandler',
  /**
   * Picture in Picture is about to start.
   *
   * @event willStartPictureInPicture
   * @ios
   * @param {Function} callback
   * @since 4.3.1
   */
  WillStartPictureInPicture: 'willStartPictureInPicture',
  /**
   * Picture in Picture is about to stop.
   *
   * @event willStopPictureInPicture
   * @ios
   * @param {Function} callback
   * @since 4.3.1
   */
  WillStopPictureInPicture: 'willStopPictureInPicture',
  /**
   * Picture in Picture has started.
   *
   * @event didStartPictureInPicture
   * @ios
   * @param {Function} callback
   * @since 4.3.1
   */
  DidStartPictureInPicture: 'didStartPictureInPicture',
  /**
   * Picture in Picture has stopped.
   *
   * @event didStopPictureInPicture
   * @ios
   * @param {Function} callback
   * @since 4.3.1
   */
  DidStopPictureInPicture: 'didStopPictureInPicture',
  /**
   * Setting this event makes the fullscreen button appear. The event to be notified when the fullscreen button is clicked, or null to remove the current listener and hide the fullscreen button.
   *
   * @event onFullScreenModeChanged
   * @param {Function} callback
   * @param {Boolean} callback.isFullScreen true if the video rendering surface should be fullscreen false otherwise.
   * @android
   * @since 4.3.1
   */
  FullScreenModeChanged: 'fullScreenModeChanged',
  /**
   * The event to be notified about controller visibility changes.
   *
   * @method onControllerVisibilityChange
   * @param {Function} callback
   * @param {Boolean} callback.visible true if the controller visible, otherwise false
   * @android
   * @since 4.3.1
   */
  ControllerVisibilityChange: 'controllerVisibilityChange',
  ...ViewEvents
} as const;

export type VideoViewEvents = ExtractValues<typeof VideoViewEvents>;
