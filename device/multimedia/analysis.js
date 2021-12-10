/**
 * @class Device.Multimedia
 * @since 0.1
 * @android
 * @ios
 * 
 * Multimedia manages camera, video and image.
 * 
 *     @example
 *     const Page = require("@smartface/native/ui/page");
 *     const extend = require("js-base/core/extend");
 *     const Button = require('@smartface/native/ui/button');
 *     const Multimedia = require("@smartface/native/device/multimedia");
 *     
 *        var Page1 = extend(Page)(
 *            function(_super) {
 *                _super(this, {
 *                    onShow: function(params) {
 *                    },
 *                    onLoad: function(){
 *                       var self = this;
 *                        var button = new Button();
 *                        button.flexGrow = 1;
 *                        button.text = "Button"
 *                        
 *                        button.onPress = function(){
 *                        
 *                           Multimedia.capturePhoto({
 *                               onSuccess: capturedImage,
 *                                page : self
 *                            });
 *                            
 *                            function capturedImage(picked) { 
 *                                var image = picked.image;
 *                            }
 *                        }
 *                        this.layout.addChild(button);
 *                    }
 *                });
 *        
 *            }
 *        );
 *        
 *       module.exports = Page1;
 * 
 * 
 */
function Multimedia() { }


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
 * @param {Device.Multimedia.CameraFlashMode} params.cameraFlashMode The flash mode used by the active camera.The default value is Multimedia.iOS.CameraFlashMode.AUTO.
 * @param {Object} params.android Android specific argument
 * @param {Device.Multimedia.Android.CropShape} params.android.cropShape specifies the crop window shape
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
Multimedia.startCamera = function (e) { };


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
 * @param {Device.Multimedia.Android.CropShape} params.android.cropShape specifies the crop window shape
 * @param {String} params.android.rotateText specifies the text of rotate button in the crop window
 * @param {String} params.android.scaleText specifies the text of scale button in the crop window
 * @param {String} params.android.cropText specifies the text of crop button in the crop window
 * @param {String} params.android.headerBarTitle specifies the title of header bar in the crop window
 * @param {Boolean} params.android.hideBottomControls set to true to hide the bottom controls  in the crop window (shown by default)
 * @param {Boolean} params.android.enableFreeStyleCrop set to true to let user resize crop bounds (disabled by default)
 * @param {Boolean} params.android.fixOrientation fixes incorrect image orientation. The fixing takes time if image resolution is high. So it's strictly recommended to use with maxImageSize in order to reduce performance issues.
 * @param {Number} params.android.maxImageSize specifies the max size for both width and height of image
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
Multimedia.capturePhoto = function (params) { };


/**
 * @method recordVideo
 * 
 * Calls the camera intent for video. In Android, read/write external storage permission should be obtained before using recorded video
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
Multimedia.recordVideo = function (params) { };


/**
 * @method pickFromGallery
 * 
 * Allows pick item from gallery.
 * 
 *     @example
 *     const Image = require("@smartface/native/ui/image");
 *     const Multimedia = require("@smartface/native/device/multimedia");
 *     const Page = require("@smartface/native/ui/page");
 *     const extend = require("js-base/core/extend");
 *     const Button = require('@smartface/native/ui/button');
 * 
 *     var Page1 = extend(Page)(
 *        function(_super) {
 *            _super(this, {
 *                onShow: function(params) {
 *                },
 *                onLoad: function(){
 *                    var self = this;
 *                    var button = new Button();
 *                    button.flexGrow = 1;
 *                    button.text = "Button"
 *                    
 *                    button.onPress = function(){
 *                        Multimedia.pickFromGallery({
 *                            type: Multimedia.Type.IMAGE,
 *                            onSuccess: onSuccess,
 *                            page : self
 *                         });
 *                        
 *                        function onSuccess(picked) { 
 *                            var image = picked.image;
 *                        }
 *                    }
 *                    this.layout.addChild(button);
 *                }
 *            });
 *        }
 *     );
 *    
 *     module.exports = Page1;
 * 
 * @param {Object} params Object describing parameters for the function.
 * @param {UI.Page} params.page
 * @param {Device.Multimedia.Type} params.type Data type.
 * @param {Boolean} params.allowsEditing opens editing screen of selected content.
 * @param {Object} params.aspectRatio This property affects only on android.
 * @param {Number} params.aspectRatio.x The X value of aspect ratio of cropping window
 * @param {Number} params.aspectRatio.y The Y value of aspect ratio of cropping window
 * @param {Object} params.android Android specific argument
 * @param {Device.Multimedia.Android.CropShape} params.android.cropShape specifies the crop window shape
 * @param {String} params.android.rotateText specifies the text of rotate button in the crop window
 * @param {String} params.android.scaleText specifies the text of scale button in the crop window
 * @param {String} params.android.cropText specifies the text of crop button in the crop window
 * @param {String} params.android.headerBarTitle specifies the title of header bar in the crop window
 * @param {Boolean} params.android.hideBottomControls set to true to hide the bottom controls  in the crop window (shown by default)
 * @param {Boolean} params.android.enableFreeStyleCrop set to true to let user resize crop bounds (disabled by default)
 * @param {Boolean} params.android.fixOrientation fixes incorrect image orientation. The fixing takes time if image resolution is high. So it's strictly recommended to use with maxImageSize in order to reduce performance issues.
 * @param {Number} params.android.maxImageSize specifies the max size for both width and height of image
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
Multimedia.pickFromGallery = function (e) { };



/**
 * @method launchCropper
 * 
 * Launches cropper.
 * 
 * @param {Object} params Object describing parameters for the function.
 * @param {UI.Page} params.page
 * @param {IO.File|UI.Image} params.asset Image or image file which suppose to cropped. Note that providing Image caueses to launch the Cropper with the delay which depends on size of the Image in Android.
 * Thus, providing File is always a better option. At least to decrease the delay, provide smaller images.
 * @param {Object} params.aspectRatio This property affects only on android.
 * @param {Number} params.aspectRatio.x The X value of aspect ratio of cropping window
 * @param {Number} params.aspectRatio.y The Y value of aspect ratio of cropping window
 * @param {Object} params.android Android specific argument
 * @param {Device.Multimedia.Android.CropShape} params.android.cropShape specifies the crop window shape
 * @param {String} params.android.rotateText specifies the text of rotate button in the crop window
 * @param {String} params.android.scaleText specifies the text of scale button in the crop window
 * @param {String} params.android.cropText specifies the text of crop button in the crop window
 * @param {String} params.android.headerBarTitle specifies the title of header bar in the crop window
 * @param {Boolean} params.android.hideBottomControls set to true to hide the bottom controls  in the crop window (shown by default)
 * @param {Boolean} params.android.enableFreeStyleCrop set to true to let user resize crop bounds (disabled by default)
 * @param {Boolean} params.android.fixOrientation fixes incorrect image orientation. The fixing takes time if image resolution is high. So it's strictly recommended to use with maxImageSize in order to reduce performance issues.
 * @param {Number} params.android.maxImageSize specifies the max size for both width and height of image
 * @param {Object} params.android.maxResultSize set maximum size for result cropped image.
 * @param {Number} params.android.maxResultSize.height max cropped image height
 * @param {Number} params.android.maxResultSize.width max cropped image width 
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
Multimedia.launchCropper = function (e) { };



/**
 * @method pickMultipleFromGallery
 * 
 * Allows multiple pick item from gallery.
 * 
 * @param {Object} params Object describing parameters for the function.
 * @param {UI.Page} params.page
 * @param {Device.Multimedia.Type} params.type Data type.
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
Multimedia.pickMultipleFromGallery = function (e) { };

/**
 * @method requestGalleryAuthorization
 * 
 * @param {Function} callback
 * @param {Boolean} callback.status
 * @ios
 * @since 2.0.10
 */
Multimedia.requestGalleryAuthorization = function (callback) { };

/**
 * @method requestCameraAuthorization
 * 
 * @param {Function} callback
 * @param {Boolean} callback.status
 * @ios
 * @since 2.0.10
 */
Multimedia.requestCameraAuthorization = function (callback) { };


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
 * @param {String} params.outputFileName Converted video file name
 * @param {Function} params.onCompleted Callback for success situation.
 * @param {Object} params.onCompleted.params 
 * @param {IO.File} params.onCompleted.params.video Converted video file
 * @param {Function} [params.onFailure] Callback for failure situation.
 * @android
 * @ios
 * @since 4.2.2
 */
Multimedia.convertToMp4 = function (params) { };

Multimedia.android = {};

/**
 * @method getAllGalleryItems
 * 
 * Gets an object array contains gallery items.
 * 
 * @param {Object} params Object describing parameters for the function.
 * @param {Device.Multimedia.Type} params.type Data type.
 * @param {Function} params.onSuccess Callback for success situation.
 * @param {Object} params.onSuccess.params 
 * @param {Array.<UI.Image>} params.onSuccess.params.images 
 * @param {Array.<IO.File>} params.onSuccess.params.videos 
 * @param {Function} [params.onCancel] Callback for cancellation situation.
 * @param {Function} [params.onFailure] Callback for failure situation.
 * @param {Object} params.onFailure.params 
 * @param {String} params.onFailure.params.message Failure message
 * @android
 * @since 0.1
 */
Multimedia.android.getAllGalleryItems = function (e) { };

/**
 * @method getGalleryAuthorizationStatus
 * 
 * @return {Device.Multimedia.iOS.GalleryAuthorizationStatus} status
 * @ios
 * @since 2.0.11
 */
Multimedia.getGalleryAuthorizationStatus = function () { };

/**
 * @method getCameraAuthorizationStatus
 * 
 * @return {Device.Multimedia.iOS.CameraAuthorizationStatus} status
 * @ios
 * @since 2.0.11
 */
Multimedia.getCameraAuthorizationStatus = function () { };

/**
 * @enum {Number} Device.Multimedia.Type
 * @since 0.1
 * @android
 * @ios
 *
 * Type is used to indicate type of the media.
 */
var Type = {};

/**
 * @property {Number} IMAGE
 * @static
 * @readonly
 * @android
 * @ios
 * @since 0.1
 */
Type.IMAGE = 0;

/**
 * @property {Number} VIDEO
 * @static
 * @readonly
 * @since 0.1
 * @android
 * @ios
 */
Type.VIDEO = 1;


/**
 * @enum {Number} Device.Multimedia.ActionType
 * @since 0.1
 * @android
 * @ios
 *
 * ActionType is used to indicate type of the camera action.
 */
var ActionType = {};

/**
 * @property {Number} IMAGE_CAPTURE
 * @static
 * @readonly
 * @android
 * @ios
 * @since 0.1
 */
ActionType.IMAGE_CAPTURE = 0;

/**
 * @property {Number} VIDEO_CAPTURE
 * @static
 * @readonly
 * @android
 * @ios
 * @since 0.1
 */
ActionType.VIDEO_CAPTURE = 1;

/** 
 * @enum {Number} Device.Multimedia.galleryAuthorizationStatus 
 * @since 2.0.11
 * @ios
 * @deprecated 3.1.1 Use {@link Device.Multimedia.iOS.GalleryAuthorizationStatus}
 */
Multimedia.galleryAuthorizationStatus = {};

/**
 * User has not yet made a choice with regards to this application.
 * 
 * @property {Number} NotDetermined
 * @static
 * @ios
 * @readonly
 * @since 2.0.11
 */
Multimedia.galleryAuthorizationStatus.NotDetermined = 0;

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
Multimedia.galleryAuthorizationStatus.Restricted = 1;

/**
 * User has explicitly denied this application access to photos data.
 * 
 * @property {Number} Denied
 * @static
 * @ios
 * @readonly
 * @since 2.0.11
 */
Multimedia.galleryAuthorizationStatus.Denied = 2;

/**
 * User has authorized this application to access photos data.
 * 
 * @property {Number} Authorized
 * @static
 * @ios
 * @readonly
 * @since 2.0.11
 */
Multimedia.galleryAuthorizationStatus.Authorized = 3;

/** 
 * @enum {Number} Device.Multimedia.cameraAuthorizationStatus 
 * @since 2.0.11
 * @ios
 * @deprecated 3.1.1 Use {@link Device.Multimedia.iOS.CameraAuthorizationStatus}
 */
Multimedia.cameraAuthorizationStatus = {};

/**
 * User has not yet made a choice with regards to this application.
 * 
 * @property {Number} NotDetermined
 * @static
 * @ios
 * @readonly
 * @since 2.0.11
 */
Multimedia.cameraAuthorizationStatus.NotDetermined = 0;

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
Multimedia.cameraAuthorizationStatus.Restricted = 1;

/**
 * User has explicitly denied this application access to camera.
 * 
 * @property {Number} Denied
 * @static
 * @ios
 * @readonly
 * @since 2.0.11
 */
Multimedia.cameraAuthorizationStatus.Denied = 2;

/**
 * User has authorized this application to access camera.
 * 
 * @property {Number} Authorized
 * @static
 * @ios
 * @readonly
 * @since 2.0.11
 */
Multimedia.cameraAuthorizationStatus.Authorized = 3;


/**
 * These enums used to specify quality of video 
 * 
 * @enum {Number} Device.Multimedia.VideoQuality
 * @since 4.3.0
 * @android
 * @ios
 *
 */
Multimedia.VideoQuality = {};


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
Multimedia.VideoQuality.LOW = 0;


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
Multimedia.VideoQuality.HIGH = 1;

/**
 * iOS Specific VideoQuality Properties.
 * 
 * @class Device.Multimedia.VideoQuality.iOS
 * @since 4.3.0
 */
Multimedia.VideoQuality.iOS = {};

/**
 * If recording, specifies that you want to use medium-quality video recording.
 * 
 * @property {Number} MEDIUM
 * @static
 * @ios
 * @readonly
 * @since 4.3.0
 */
Multimedia.VideoQuality.iOS.MEDIUM = 100;

/**
 * If recording, specifies that you want to use VGA-quality video recording (pixel dimensions of 640x480).
 * 
 * @property {Number} TYPE640x480
 * @static
 * @ios
 * @readonly
 * @since 4.3.0
 */
Multimedia.VideoQuality.iOS.TYPE640x480 = 101;

/**
 * If recording, specifies that you want to use 1280x720 iFrame format.
 * 
 * @property {Number} TYPEIFRAME1280x720
 * @static
 * @ios
 * @readonly
 * @since 4.3.0
 */
Multimedia.VideoQuality.iOS.TYPEIFRAME1280x720 = 102;

/**
 * If recording, specifies that you want to use 960x540 iFrame format.
 * 
 * @property {Number} TYPEIFRAME960x540
 * @static
 * @ios
 * @readonly
 * @since 4.3.0
 */
Multimedia.VideoQuality.iOS.TYPEIFRAME960x540 = 103;

/**
 * Android Specific Properties.
 * @class Device.Multimedia.Android
 * @since 4.1.5
 */
Multimedia.Android = {};


/** 
 * These enums used to specify shape of crop window.
 * 
 * @enum {Number} Device.Multimedia.Android.CropShape
 * @since 4.1.5
 * @android
 */
Multimedia.Android.CropShape = {};


/**
 * Specifies that crop window shape is oval.
 * 
 * @property {Number} OVAL
 * @static
 * @android
 * @readonly
 * @since 4.1.5
 */
Multimedia.Android.CropShape.OVAL = 2;


/**
 * Specifies that crop window shape is rectangle.
 * 
 * @property {Number} RECTANGLE
 * @static
 * @android
 * @readonly
 * @since 4.1.5
 */
Multimedia.Android.CropShape.RECTANGLE = 1;

/**
 * iOS Specific Properties.
 * @class Device.Multimedia.iOS
 * @since 3.1.1
 */
Multimedia.iOS = {};

/** 
 * @enum {Number} Device.Multimedia.iOS.CameraFlashMode
 * @since 3.1.1
 * @ios
 */
Multimedia.iOS.CameraFlashMode = {};

/**
 * Specifies that flash illumination is always off, no matter what the ambient light conditions are.
 * 
 * @property {Number} OFF
 * @static
 * @ios
 * @readonly
 * @since 3.1.1
 */
Multimedia.iOS.CameraFlashMode.OFF;

/**
 * Specifies that the device should consider ambient light conditions to automatically determine whether or not to use flash illumination.
 * 
 * @property {Number} AUTO
 * @static
 * @ios
 * @readonly
 * @since 3.1.1
 */
Multimedia.iOS.CameraFlashMode.AUTO;

/**
 * Specifies that flash illumination is always on, no matter what the ambient light conditions are.
 * 
 * @property {Number} ON
 * @static
 * @ios
 * @readonly
 * @since 3.1.1
 */
Multimedia.iOS.CameraFlashMode.ON;

/** 
 * @enum {Number} Device.Multimedia.CameraFlashMode 
 * @since 3.0.2
 * @ios
 * @deprecated 3.1.1 Use {@link Device.Multimedia.iOS.CameraFlashMode}
 */
Multimedia.CameraFlashMode = {};

/**
 * Specifies that flash illumination is always off, no matter what the ambient light conditions are.
 * 
 * @property {Number} OFF
 * @static
 * @ios
 * @readonly
 * @since 3.0.2
 */
Multimedia.CameraFlashMode.OFF;

/**
 * Specifies that the device should consider ambient light conditions to automatically determine whether or not to use flash illumination.
 * 
 * @property {Number} AUTO
 * @static
 * @ios
 * @readonly
 * @since 3.0.2
 */
Multimedia.CameraFlashMode.AUTO;

/**
 * Specifies that flash illumination is always on, no matter what the ambient light conditions are.
 * 
 * @property {Number} ON
 * @static
 * @ios
 * @readonly
 * @since 3.0.2
 */
Multimedia.CameraFlashMode.ON;

/** 
 * @enum {Number} Device.Multimedia.iOS.GalleryAuthorizationStatus
 * @since 3.1.1
 * @ios
 */
Multimedia.iOS.GalleryAuthorizationStatus = {};

/**
 * User has not yet made a choice with regards to this application.
 * 
 * @property {Number} NOTDETERMINED
 * @static
 * @ios
 * @readonly
 * @since 3.1.1
 */
Multimedia.iOS.GalleryAuthorizationStatus.NOTDETERMINED = 0;

/**
 * This application is not authorized to access photo data.
 * The user cannot change this application’s status, possibly due to active restrictions such as parental controls being in place.
 * 
 * @property {Number} RESTRICTED
 * @static
 * @ios
 * @readonly
 * @since 3.1.1
 */
Multimedia.iOS.GalleryAuthorizationStatus.RESTRICTED = 1;

/**
 * User has explicitly denied this application access to photos data.
 * 
 * @property {Number} DENIED
 * @static
 * @ios
 * @readonly
 * @since 3.1.1
 */
Multimedia.iOS.GalleryAuthorizationStatus.DENIED = 2;

/**
 * User has authorized this application to access photos data.
 * 
 * @property {Number} AUTHORIZED
 * @static
 * @ios
 * @readonly
 * @since 3.1.1
 */
Multimedia.iOS.GalleryAuthorizationStatus.AUTHORIZED = 3;

/** 
 * @enum {Number} Device.Multimedia.iOS.CameraAuthorizationStatus
 * @since 3.1.1
 * @ios
 */
Multimedia.iOS.CameraAuthorizationStatus = {};

/**
 * User has not yet made a choice with regards to this application.
 * 
 * @property {Number} NOTDETERMINED
 * @static
 * @ios
 * @readonly
 * @since 3.1.1
 */
Multimedia.iOS.CameraAuthorizationStatus.NOTDETERMINED = 0;

/**
 * This application is not authorized to access camera.
 * The user cannot change this application’s status, possibly due to active restrictions such as parental controls being in place.
 * 
 * @property {Number} RESTRICTED
 * @static
 * @ios
 * @readonly
 * @since 3.1.1
 */
Multimedia.iOS.CameraAuthorizationStatus.RESTRICTED = 1;

/**
 * User has explicitly denied this application access to camera.
 * 
 * @property {Number} DENIED
 * @static
 * @ios
 * @readonly
 * @since 3.1.1
 */
Multimedia.iOS.CameraAuthorizationStatus.DENIED = 2;

/**
 * User has authorized this application to access camera.
 * 
 * @property {Number} AUTHORIZED
 * @static
 * @ios
 * @readonly
 * @since 3.1.1
 */
Multimedia.iOS.CameraAuthorizationStatus.AUTHORIZED = 3;

/** 
 * @enum {Number} Device.Multimedia.iOS.CameraDevice
 * @since 4.3.0
 * @ios
 */
Multimedia.iOS.CameraDevice = {};

/**
 * Specifies the camera on the rear of the device.
 * 
 * @property {Number} REAR
 * @static
 * @ios
 * @readonly
 * @since 4.3.0
 */
Multimedia.iOS.CameraDevice.REAR = 0;

/**
 * Specifies the camera on the front of the device.
 * 
 * @property {Number} FRONT
 * @static
 * @ios
 * @readonly
 * @since 4.3.0
 */
Multimedia.iOS.CameraDevice.FRONT = 1;

module.exports = Multimedia;