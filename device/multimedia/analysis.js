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
Multimedia.startCamera = function(e) { };

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
 * @param {UI.Page} params.page.
 * @param {Device.Multimedia.Type} params.type Data type.
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
Multimedia.pickFromGallery = function(e) { };

/**
 * @method requestGalleryAuthorization
 * 
 * @param {Function} callback
 * @param {Boolean} callback.status
 * @ios
 * @since 2.0.10
 */
Multimedia.requestGalleryAuthorization = function(callback) { };

/**
 * @method requestCameraAuthorization
 * 
 * @param {Function} callback
 * @param {Boolean} callback.status
 * @ios
 * @since 2.0.10
 */
Multimedia.requestCameraAuthorization = function(callback) { };

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
Multimedia.android.getAllGalleryItems = function(e) { };

/**
 * @method getGalleryAuthorizationStatus
 * 
 * @return {Device.Multimedia.galleryAuthorizationStatus} status
 * @ios
 * @since 2.0.11
 */
Multimedia.getGalleryAuthorizationStatus = function(){};

/**
 * @method getCameraAuthorizationStatus
 * 
 * @return {Device.Multimedia.cameraAuthorizationStatus} status
 * @ios
 * @since 2.0.11
 */
Multimedia.getCameraAuthorizationStatus = function(){};

/**
 * @enum {Number} Device.Multimedia.Type
 * @since 0.1
 * @android
 * @ios
 *
 * Type is used to indicate type of the media.
 */
var Type = { };

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
var ActionType = { };

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

module.exports = Multimedia;