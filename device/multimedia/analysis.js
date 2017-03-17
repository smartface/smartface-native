/**
 * @class Device.Multimedia
 * @since 0.1
 * @android
 * @ios
 * 
 * Multimedia manages camera, video and image.
 * 
 *     @example
 *     const Multimedia = require("nf-core/device/multimedia");
 *     
 *     Multimedia.startCamera({
 *         onSuccess: capturedImage,
 *         action: Multimedia.ActionType.IMAGE_CAPTURE
 *     });
 * 
 *     function capturedImage(picked) { 
 *         var image = picked.image;
 *     }
 * 
 */
function Multimedia() {}

/**
 * @method startCamera
 * 
 * Calls the camera intent.
 * 
 * @param {Object} params Object describing parameters for the function.
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
 *     const Image = require("nf-core/ui/image");
 *     const Multimedia = require("nf-core/device/multimedia");
 *     
 *     Multimedia.pickFromGallery({
 *         type: Multimedia.Type.IMAGE,
 *         onSuccess: onSuccess
 *     });
 * 
 *     function onSuccess(e) {
 *         var image = e.image;
 *     }
 * 
 * @param {Object} params Object describing parameters for the function.
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

module.exports = Multimedia;