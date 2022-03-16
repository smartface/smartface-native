import Page from '../../ui/page';
import Image from '../../ui/image';
import File from '../../io/file';
import Color from '../../ui/color';

export enum ActionType {
  /**
   * @property {Number} IMAGE_CAPTURE
   * @static
   * @readonly
   * @android
   * @ios
   * @since 0.1
   */
  IMAGE_CAPTURE = 0,
  /**
   * @property {Number} VIDEO_CAPTURE
   * @static
   * @readonly
   * @android
   * @ios
   * @since 0.1
   */
  VIDEO_CAPTURE = 1
}

export enum Type {
  /**
   * @property {Number} IMAGE
   * @static
   * @readonly
   * @android
   * @ios
   * @since 0.1
   */
  IMAGE = 0,
  /**
   * @property {Number} VIDEO
   * @static
   * @readonly
   * @since 0.1
   * @android
   * @ios
   */
  VIDEO = 1
}

export enum CropShape {
  /**
   * Specifies that crop window shape is oval.
   *
   * @property {Number} OVAL
   * @static
   * @android
   * @ios
   * @readonly
   * @since 4.3.6
   */
  OVAL = 2,
  /**
   * Specifies that crop window shape is rectangle.
   *
   * @property {Number} RECTANGLE
   * @static
   * @android
   * @ios
   * @readonly
   * @since 4.3.6
   */
  RECTANGLE = 1
}

export enum CameraDevice {
  /**
   * Specifies the camera on the rear of the device.
   *
   * @property {Number} REAR
   * @static
   * @ios
   * @readonly
   * @since 4.3.0
   */
  REAR = 0,
  /**
   * Specifies the camera on the front of the device.
   *
   * @property {Number} FRONT
   * @static
   * @ios
   * @readonly
   * @since 4.3.0
   */
  FRONT = 1
}

export enum CameraAuthorizationStatus {
  /**
   * User has not yet made a choice with regards to this application.
   *
   * @property {Number} NotDetermined
   * @static
   * @ios
   * @readonly
   * @since 2.0.11
   */
  NOTDETERMINED = 0,
  /**
   * This application is not authorized to access camera.
   * The user cannot change this application’s status, possibly due to active restrictions such as parental controls being in place.
   *
   * @property {Number} Restricted
   * @static
   * @ios
   * @readonly
   * @since 2.0.11
   */
  RESTRICTED = 1,
  /**
   * User has explicitly denied this application access to camera.
   *
   * @property {Number} Denied
   * @static
   * @ios
   * @readonly
   * @since 2.0.11
   */
  DENIED = 2,
  /**
   * User has authorized this application to access camera.
   *
   * @property {Number} Authorized
   * @static
   * @ios
   * @readonly
   * @since 2.0.11
   */
  AUTHORIZED = 3
}

export enum CameraFlashMode {
  /**
   * Specifies that flash illumination is always off, no matter what the ambient light conditions are.
   *
   * @property {Number} OFF
   * @static
   * @ios
   * @readonly
   * @since 3.1.1
   */
  OFF,
  /**
   * Specifies that the device should consider ambient light conditions to automatically determine whether or not to use flash illumination.
   *
   * @property {Number} AUTO
   * @static
   * @ios
   * @readonly
   * @since 3.1.1
   */
  AUTO,
  /**
   * Specifies that flash illumination is always on, no matter what the ambient light conditions are.
   *
   * @property {Number} ON
   * @static
   * @ios
   * @readonly
   * @since 3.1.1
   */
  ON
}

export enum GalleryAuthorizationStatus {
  /**
   * User has not yet made a choice with regards to this application.
   *
   * @property {Number} NotDetermined
   * @static
   * @ios
   * @readonly
   * @since 2.0.11
   */
  NOTDETERMINED = 0,
  /**
   * This application is not authorized to access photo data.
   * The user cannot change this application’s status, possibly due to active restrictions such as parental controls being in place.
   *
   * @property {Number} Restricted
   * @static
   * @ios
   * @readonly
   * @since 2.0.11
   */
  RESTRICTED = 1,
  /**
   * User has explicitly denied this application access to photos data.
   *
   * @property {Number} Denied
   * @static
   * @ios
   * @readonly
   * @since 2.0.11
   */
  DENIED = 2,
  /**
   * User has authorized this application to access photos data.
   *
   * @property {Number} Authorized
   * @static
   * @ios
   * @readonly
   * @since 2.0.11
   */
  AUTHORIZED = 3
}
export type ConvertToMp4Params = {
  videoFile: File;
  outputFileName: string;
  onCompleted: (params: { video: File }) => void;
  onFailure?: () => void;
};

export type PickMultipleFromGalleryParams = {
  type?: Type;
  page: Page;
  android?: {
    fixOrientation?: boolean;
    maxImageSize?: number;
  };
  onSuccess: (params: { assets: [{ image?: Image; file?: File | null }] }) => void;
  onCancel?: () => void;
  onFailure?: (e: [{ message: string; fileName: string | null; uri: string }]) => void;
};

export type LaunchCropperParams = {
  page: Page;
  asset: File | Image;
  aspectRatio?: { x: number; y: number };
  cropShape?: CropShape;
  headerBarTitle?: string;
  enableFreeStyleCrop?: boolean;
  android?: {
    rotateText?: string;
    scaleText?: string;
    cropText?: string;
    hideBottomControls?: boolean;
    maxResultSize?: {
      height: number;
      width: number;
    };
    fixOrientation?: boolean;
    maxImageSize?: number;
  };
  ios?: {
    aspectRatioPickerButtonHidden: boolean;
    resetButtonHidden?: boolean;
    resetAspectRatioEnabled?: boolean;
    aspectRatioLockDimensionSwapEnabled?: boolean;
    rotateButtonsHidden?: boolean;
    showOnlyIcons?: boolean;
    doneButtonTitle?: string;
    cancelButtonTitle?: string;
    doneButtonColor?: Color;
    cancelButtonColor?: Color;
  };
  onSuccess: (params: { image?: Image }) => void;
  onCancel?: () => void;
  onFailure?: (e: { message: string }) => void;
};

export type RecordVideoParams = {
  page: Page;
  maximumDuration?: Number;
  videoQuality?: Number;
  ios?: {
    cameraFlashMode?: CameraFlashMode;
    cameraDevice?: CameraDevice;
  };
  onSuccess?: (params: { video: File }) => void;
  onCancel?: () => void;
  onFailure?: (e: { message: string }) => void;
};

export type MultimediaParams = {
  type?: Type;
  page: Page;
  action?: ActionType;
  allowsEditing?: boolean;
  aspectRatio?: { x: number; y: number };
  ios?: {
    cameraFlashMode?: CameraFlashMode;
    cameraDevice?: CameraDevice;
  };
  android?: {
    cropShape?: CropShape;
    rotateText?: string;
    scaleText?: string;
    cropText?: string;
    headerBarTitle?: string;
    hideBottomControls?: boolean;
    enableFreeStyleCrop?: boolean;
    maxResultSize?: {
      height: number;
      width: number;
    };
    fixOrientation?: boolean;
    maxImageSize?: number;
  };
  onSuccess: (params: { image?: Image; video?: File }) => void;
  onCancel?: () => void;
  onFailure?: (e: { message: string }) => void;
};

export declare class MultimediaBase {
  /**
   * @enum {Number} Device.Multimedia.ActionType
   * @since 0.1
   * @android
   * @ios
   *
   * ActionType is used to indicate type of the camera action.
   */
  static readonly ActionType: ActionType;
  /**
   * @enum {Number} Device.Multimedia.Type
   * @since 0.1
   * @android
   * @ios
   *
   * Type is used to indicate type of the media.
   */
  static readonly Type: Type;
  /**
   * These enums used to specify shape of crop window.
   *
   * @enum {Number} Device.Multimedia.CropShape
   * @since 4.3.6
   * @android
   * @ios
   */
  static readonly CropShape: CropShape;
  /**
   * @enum {Number} Device.Multimedia.CameraDevice
   * @since 4.3.0
   * @ios
   */
  static readonly CameraDevice: CameraDevice;
  /**
   * These enums used to specify quality of video
   *
   * @property {Object} VideoQuality
   * @since 4.3.0
   * @android
   * @ios
   *
   */
  static readonly VideoQuality: {
    /**
     * Specifies that quality of video is low.
     *
     * @property {Number} LOW
     * @static
     * @ios
     * @android
     * @readonly
     * @since 4.3.0
     */
    LOW: 0;

    /**
     * Specifies that quality of video is high.
     *
     * @property {Number} HIGH
     * @static
     * @ios
     * @android
     * @readonly
     * @since 4.3.0
     */
    HIGH: 1;

    /**
     * Specifies ios specific quality of video.
     *
     * @property {Object} iOS
     * @static
     * @ios
     * @readonly
     * @since 4.3.0
     */
    iOS: {
      /**
       * If recording, specifies that you want to use medium-quality video recording.
       *
       * @property {Number} MEDIUM
       * @static
       * @ios
       * @readonly
       * @since 4.3.0
       */
      MEDIUM: 100;
      /**
       * If recording, specifies that you want to use VGA-quality video recording (pixel dimensions of 640x480).
       *
       * @property {Number} TYPE640x480
       * @static
       * @ios
       * @readonly
       * @since 4.3.0
       */
      TYPE640x480: 101;
      /**
       * If recording, specifies that you want to use 1280x720 iFrame format.
       *
       * @property {Number} TYPEIFRAME1280x720
       * @static
       * @ios
       * @readonly
       * @since 4.3.0
       */
      TYPEIFRAME1280x720: 102;
      /**
       * If recording, specifies that you want to use 960x540 iFrame format.
       *
       * @property {Number} TYPEIFRAME960x540
       * @static
       * @ios
       * @readonly
       * @since 4.3.0
       */
      TYPEIFRAME960x540: 102;
    };
  };

  /**
   * @method startCamera
   *
   * Calls the camera intent.
   *
   * @param {Object} params Object describing parameters for the function.
   * @param {UI.Page} params.page
   * @param {Device.Multimedia.ActionType} params.action Camera action.
   * @param {Boolean} params.allowsEditing opens editing screen of selected content.
   * @param {Object} params.aspectRatio This property affects only on android.
   * @param {Number} params.aspectRatio.x The X value of aspect ratio of cropping window
   * @param {Number} params.aspectRatio.y The Y value of aspect ratio of cropping window
   * @param {Device.Multimedia.iOS.CameraFlashMode} params.cameraFlashMode The flash mode used by the active camera.The default value is Multimedia.iOS.CameraFlashMode.AUTO.
   * @param {Object} params.android Android specific argument
   * @param {Device.Multimedia.CropShape} params.android.cropShape specifies the crop window shape
   * @param {String} params.android.rotateText specifies the text of rotate button in the crop window
   * @param {String} params.android.scaleText specifies the text of scale button in the crop window
   * @param {String} params.android.cropText specifies the text of crop button in the crop window
   * @param {String} params.android.headerBarTitle specifies the title of header bar in the crop window
   * @param {Boolean} params.android.hideBottomControls set to true to hide the bottom controls  in the crop window (shown by default)
   * @param {Boolean} params.android.enableFreeStyleCrop set to true to let user resize crop bounds (disabled by default)
   * @param {Object} params.android.maxResultSize set maximum size for result cropped image.
   * @param {Number} params.android.maxResultSize.height max cropped image height
   * @param {Number} params.android.maxResultSize.width max cropped image width
   * @param {Function} params.onSuccess Callback for success situation.
   * @param {Object} params.onSuccess.params
   * @param {UI.Image} params.onSuccess.params.image Captured image
   * @param {IO.File} params.onSuccess.params.video Captured video
   * @param {Function} [params.onCancel] Callback for cancellation situation.
   * @param {Function} [params.onFailure] Callback for failure situation.
   * @param {Object} params.onFailure.params
   * @param {String} params.onFailure.params.message Failure message
   * @android
   * @ios
   * @since 0.1
   * @deprecated 4.3.0 use {@link Device.Multimedia#capturePhoto capturePhoto} OR {@link Device.Multimedia#recordVideo recordVideo}
   */
  static startCamera(params: MultimediaParams): void;

  /**
   * @method capturePhoto
   *
   * Calls the camera intent for photo.
   *
   * @param {Object} params Object describing parameters for the function.
   * @param {UI.Page} params.page
   * @param {Boolean} params.allowsEditing opens editing screen of selected content.
   * @param {Object} params.aspectRatio This property affects only on android.
   * @param {Number} params.aspectRatio.x The X value of aspect ratio of cropping window
   * @param {Number} params.aspectRatio.y The Y value of aspect ratio of cropping window
   * @param {Object} params.ios iOS specific argument
   * @param {Device.Multimedia.iOS.CameraFlashMode} params.ios.cameraFlashMode The flash mode used by the active camera.The default value is Multimedia.iOS.CameraFlashMode.AUTO.
   * @param {Device.Multimedia.iOS.CameraDevice} params.ios.cameraDevice Constants that specify the camera to use for image or movie capture.The default value is Multimedia.iOS.CameraDevice.REAR.
   * @param {Object} params.android Android specific argument
   * @param {Device.Multimedia.CropShape} params.android.cropShape specifies the crop window shape
   * @param {String} params.android.rotateText specifies the text of rotate button in the crop window
   * @param {String} params.android.scaleText specifies the text of scale button in the crop window
   * @param {String} params.android.cropText specifies the text of crop button in the crop window
   * @param {String} params.android.headerBarTitle specifies the title of header bar in the crop window
   * @param {Boolean} params.android.hideBottomControls set to true to hide the bottom controls  in the crop window (shown by default)
   * @param {Boolean} params.android.enableFreeStyleCrop set to true to let user resize crop bounds (disabled by default)
   * @param {Object} params.android.maxResultSize set maximum size for result cropped image.
   * @param {Number} params.android.maxResultSize.height max cropped image height
   * @param {Number} params.android.maxResultSize.width max cropped image width
   * @param {Function} params.onSuccess Callback for success situation.
   * @param {Object} params.onSuccess.params
   * @param {UI.Image} params.onSuccess.params.image Captured image
   * @param {Function} [params.onCancel] Callback for cancellation situation.
   * @param {Function} [params.onFailure] Callback for failure situation.
   * @param {Object} params.onFailure.params
   * @param {String} params.onFailure.params.message Failure message
   * @android
   * @ios
   * @since 4.3.0
   */
  static capturePhoto(params: MultimediaParams): void;

  /**
   * @method recordVideo
   *
   * Calls the camera intent for video. In Android, read/write external storage permission should be obtained before using recorded video.
   *
   * @param {Object} params Object describing parameters for the function.
   * @param {UI.Page} params.page
   * @param {Number} params.maximumDuration maximum allowed record duration in seconds
   * @param {Device.Multimedia.VideoQuality} params.videoQuality used to control the quality of a recorded video
   * @param {Object} params.ios iOS specific argument
   * @param {Device.Multimedia.iOS.CameraFlashMode} params.ios.cameraFlashMode The flash mode used by the active camera.The default value is Multimedia.iOS.CameraFlashMode.AUTO.
   * @param {Device.Multimedia.iOS.CameraDevice} params.ios.cameraDevice Constants that specify the camera to use for image or movie capture.The default value is Multimedia.iOS.CameraDevice.REAR.
   * @param {Function} params.onSuccess Callback for success situation.
   * @param {Object} params.onSuccess.params
   * @param {IO.File} params.onSuccess.params.video Captured video
   * @param {Function} [params.onCancel] Callback for cancellation situation.
   * @param {Function} [params.onFailure] Callback for failure situation.
   * @param {Object} params.onFailure.params
   * @param {String} params.onFailure.params.message Failure message
   * @android
   * @ios
   * @since 4.3.0
   */
  static recordVideo(params: RecordVideoParams): void;

  /**
   * @method pickFromGallery
   *
   *
   * @param {Object} params Object describing parameters for the function.
   * @param {UI.Page} params.page
   * @param {Device.Multimedia.Type} params.type Data type.
   * @param {Boolean} params.allowsEditing opens editing screen of selected content.
   * @param {Object} params.aspectRatio This property affects only on android.
   * @param {Number} params.aspectRatio.x The X value of aspect ratio of cropping window
   * @param {Number} params.aspectRatio.y The Y value of aspect ratio of cropping window
   * @param {Object} params.android Android specific argument
   * @param {Device.Multimedia.CropShape} params.android.cropShape specifies the crop window shape
   * @param {String} params.android.rotateText specifies the text of rotate button in the crop window
   * @param {String} params.android.scaleText specifies the text of scale button in the crop window
   * @param {String} params.android.cropText specifies the text of crop button in the crop window
   * @param {String} params.android.headerBarTitle specifies the title of header bar in the crop window
   * @param {Boolean} params.android.hideBottomControls set to true to hide the bottom controls  in the crop window (shown by default)
   * @param {Boolean} params.android.enableFreeStyleCrop set to true to let user resize crop bounds (disabled by default)
   * @param {Object} params.android.maxResultSize set maximum size for result cropped image.
   * @param {Number} params.android.maxResultSize.height max cropped image height
   * @param {Number} params.android.maxResultSize.width max cropped image width
   * @param {Function} params.onSuccess Callback for success situation.
   * @param {Object} params.onSuccess.params
   * @param {UI.Image} params.onSuccess.params.image Captured image
   * @param {IO.File} params.onSuccess.params.video Captured video
   * @param {Function} [params.onCancel] Callback for cancellation situation.
   * @param {Function} [params.onFailure] Callback for failure situation.
   * @param {Object} params.onFailure.params
   * @param {String} params.onFailure.params.message Failure message
   * @android
   * @ios
   * @since 0.1
   */
  static pickFromGallery(params: MultimediaParams): void;

  /**
   * @method pickMultipleFromGallery
   *
   * Allows multiple pick item from gallery.
   *
   * @param {Object} params Object describing parameters for the function.
   * @param {UI.Page} params.page
   * @param {Device.Multimedia.Type} [params.type=Device.Multimedia.Type.IMAGE] Data type.
   * @param {Object} params.android Android specific argument
   * @param {Boolean} params.android.fixOrientation fixes incorrect image orientation. The fixing takes time if image resolution is high. So it's strictly recommended to use with maxImageSize in order to reduce performance issues.
   * @param {Number} params.android.maxImageSize specifies the max size for both width and height of image
   * @param {Function} params.onSuccess Callback for success situation.
   * @param {Object} params.onSuccess.params
   * @param {Object[]} params.onSuccess.params.assets
   * @param {IO.File} params.onSuccess.params.assets.file Selected image or video file depends on the given type. In iOS, if the given type is image then it returns undefined.
   * @param {UI.Image} params.onSuccess.params.assets.image Selected images
   * @param {Function} [params.onCancel] Callback for cancellation situation.
   * @param {Function} [params.onFailure] Callback for failure situation.
   * @param {Object[]} params.onFailure.params
   * @param {String} params.onFailure.params.message Failure message
   * @param {String|null} params.onFailure.params.fileName File name of the selected file or null if the selected file has unkown issue or pointed to a remote resource.
   * @param {String} params.onFailure.params.uri Uri of the selected file
   * @android
   * @ios
   * @since 4.3.6
   */
  static pickMultipleFromGallery(params: PickMultipleFromGalleryParams): void;

  /**
   * @method launchCropper
   *
   * Launches cropper.
   *
   * @param {Object} params Object describing parameters for the function.
   * @param {UI.Page} params.page
   * @param {IO.File|UI.Image} params.asset Image or image file which suppose to cropped. Note that providing Image caueses to launch the Cropper with the delay which depends on size of the Image in Android.
   * Thus, providing File is always a better option. At least to decrease the delay, provide smaller images.
   * @param {Device.Multimedia.CropShape} [params.cropShape=Device.Multimedia.CropShape.RECTANGLE] specifies the crop window shape
   * @param {Boolean} [params.enableFreeStyleCrop=false] set to true to let user resize crop bounds (disabled by default)
   * @param {String} params.headerBarTitle specifies the title of header bar in the crop window
   * @param {Object} params.aspectRatio This property affects only on android.
   * @param {Number} params.aspectRatio.x The X value of aspect ratio of cropping window
   * @param {Number} params.aspectRatio.y The Y value of aspect ratio of cropping window
   * @param {Object} params.android Android specific argument
   * @param {String} params.android.rotateText specifies the text of rotate button in the crop window
   * @param {String} params.android.scaleText specifies the text of scale button in the crop window
   * @param {String} params.android.cropText specifies the text of crop button in the crop window
   * @param {Boolean} params.android.hideBottomControls set to true to hide the bottom controls  in the crop window (shown by default)
   * @param {Boolean} params.android.fixOrientation fixes incorrect image orientation. The fixing takes time if image resolution is high. So it's strictly recommended to use with maxImageSize in order to reduce performance issues.
   * @param {Number} params.android.maxImageSize specifies the max size for both width and height of image
   * @param {Object} params.android.maxResultSize set maximum size for result cropped image.
   * @param {Number} params.android.maxResultSize.height max cropped image height
   * @param {Number} params.android.maxResultSize.width max cropped image width
   * @param {Object} params.ios iOS specific argument
   * @param {Boolean} [params.ios.aspectRatioPickerButtonHidden=true] When enabled, hides the 'Aspect Ratio Picker' button on the toolbar.
   * @param {Boolean} [params.ios.resetButtonHidden=false] When enabled, hides the 'Reset' button on the toolbar.
   * @param {Boolean} [params.ios.resetAspectRatioEnabled=false] If true, tapping the reset button will also reset the aspect ratio back to the image
   * default ratio. Otherwise, the reset will just zoom out to the current aspect ratio.
   * @param {Boolean} [params.ios.aspectRatioLockDimensionSwapEnabled=true] If true, a custom aspect ratio is set, and the aspectRatioLockEnabled is set to YES, the crop box
   * will swap it's dimensions depending on portrait or landscape sized images. This value also controls whether the dimensions can swap when the image is rotated.
   * @param {Boolean} [params.ios.rotateButtonsHidden=false] When enabled, hides the rotation button.
   * @param {Boolean} [params.ios.showOnlyIcons=false] If true, button icons are visible in portairt instead button text.
   * @param {String}  params.ios.doneButtonTitle Title for the 'Done' button. Setting this will override the Default which is a localized string for "Done".
   * @param {String}  params.ios.cancelButtonTitle Title for the 'Cancel' button. Setting this will override the Default which is a localized string for "Cancel".
   * @param {UI.Color}  params.ios.doneButtonColor
   * @param {UI.Color}  params.ios.cancelButtonColor
   * @param {Function} params.onSuccess Callback for success situation.
   * @param {Object} params.onSuccess.params
   * @param {UI.Image} params.onSuccess.params.image Cropped image
   * @param {Function} [params.onCancel] Callback for cancellation situation.
   * @param {Function} [params.onFailure] Callback for failure situation.
   * @param {Object} params.onFailure.params
   * @param {String} params.onFailure.params.message Failure message
   * @android
   * @ios
   * @since 4.3.6
   */
  static launchCropper(params: LaunchCropperParams): void;

  /**
   * @method convertToMp4
   *
   * Converts video file to mp4 format.
   *
   *     @example
   *     Multimedia.convertToMp4({
   *        videoFile: video,
   *        outputFileName: "myMp4Video",
   *        onCompleted: ({video}) => {
   *             console.log(" Multimedia onCompleted ")
   *        },
   *        onFailure: () => {
   *            console.log(" Multimedia onFailure ")
   *         }
   *      });
   *
   * @param {Object} params Object describing parameters for the function.
   * @param {IO.File} params.videoFile Input Video file to convert
   * @param {string} params.outputFileName Converted video file name
   * @param {Function} params.onCompleted Callback for success situation.
   * @param {Object} params.onCompleted.params
   * @param {IO.File} params.onCompleted.params.video Converted video file
   * @param {Function} [params.onFailure] Callback for failure situation.
   * @android
   * @ios
   * @since 4.2.2
   */
  static convertToMp4(params: ConvertToMp4Params): void;

  /**
   * Indicates whether the device has camera feature.
   *
   * @property hasCameraFeature
   * @readonly
   * @android
   * @ios
   * @static
   * @return {Boolean}
   * @since 4.3.6
   */
  static hasCameraFeature: Boolean;

  static ios: Partial<{
    /**
     * @method requestGalleryAuthorization
     *
     * @param {Function} callback
     * @param {Boolean} callback.status
     * @ios
     * @since 2.0.10
     */
    requestGalleryAuthorization(callback: (status: boolean) => void): void;
    /**
     * @method requestCameraAuthorization
     *
     * @param {Function} callback
     * @param {Boolean} callback.status
     * @ios
     * @since 2.0.10
     */
    requestCameraAuthorization(callback: (status: boolean) => void): void;
    /**
     * @method getGalleryAuthorizationStatus
     *
     * @return {Device.Multimedia.iOS.GalleryAuthorizationStatus} status
     * @ios
     * @since 2.0.11
     */
    getGalleryAuthorizationStatus(): GalleryAuthorizationStatus;
    /**
     * @method getCameraAuthorizationStatus
     *
     * @return {Device.Multimedia.iOS.CameraAuthorizationStatus} status
     * @ios
     * @since 2.0.11
     */
    getCameraAuthorizationStatus(): CameraAuthorizationStatus;
  }>;
}

const Multimedia: typeof MultimediaBase = require(`./multimedia.${Device.deviceOS.toLowerCase()}`).default;
type Multimedia = MultimediaBase;

export default Multimedia;
