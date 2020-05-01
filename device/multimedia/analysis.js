/**
 * @class Device.Multimedia
 * @since 0.1
 * @android
 * @ios
 * 
 * Multimedia manages camera, video and image.
 * 
 *     @example
 *     const Page = require("sf-core/ui/page");
 *     const extend = require("js-base/core/extend");
 *     const Button = require('sf-core/ui/button');
 *     const Multimedia = require("sf-core/device/multimedia");
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
 *                           Multimedia.startCamera({
 *                               onSuccess: capturedImage,
 *                                action: Multimedia.ActionType.IMAGE_CAPTURE,
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
function Multimedia() {}


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
 */
Multimedia.startCamera = function(e) {};

/**
 * @method pickFromGallery
 * 
 * Allows pick item from gallery.
 * 
 *     @example
 *     const Image = require("sf-core/ui/image");
 *     const Multimedia = require("sf-core/device/multimedia");
 *     const Page = require("sf-core/ui/page");
 *     const extend = require("js-base/core/extend");
 *     const Button = require('sf-core/ui/button');
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
Multimedia.pickFromGallery = function(e) {};

/**
 * @method requestGalleryAuthorization
 * 
 * @param {Function} callback
 * @param {Boolean} callback.status
 * @ios
 * @since 2.0.10
 */
Multimedia.requestGalleryAuthorization = function(callback) {};

/**
 * @method requestCameraAuthorization
 * 
 * @param {Function} callback
 * @param {Boolean} callback.status
 * @ios
 * @since 2.0.10
 */
Multimedia.requestCameraAuthorization = function(callback) {};

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
Multimedia.android.getAllGalleryItems = function(e) {};

/**
 * @method getGalleryAuthorizationStatus
 * 
 * @return {Device.Multimedia.iOS.GalleryAuthorizationStatus} status
 * @ios
 * @since 2.0.11
 */
Multimedia.getGalleryAuthorizationStatus = function() {};

/**
 * @method getCameraAuthorizationStatus
 * 
 * @return {Device.Multimedia.iOS.CameraAuthorizationStatus} status
 * @ios
 * @since 2.0.11
 */
Multimedia.getCameraAuthorizationStatus = function() {};

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

module.exports = Multimedia;