/**
 * @class Device.Multimedia
 * @since 0.1
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
 * @param {Device.Multimedia.ActionType} [params.action] Camera action.
 * @param {Function} [params.onSuccess] Callback for success situation.
 * @param {Function} [params.onCancel] Callback for cancellation situation.
 * @param {Function} [params.onFailure] Callback for failure situation.
 * @return IO.File
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
 *     if(readExternalStoragePermission())  {
 *         Multimedia.pickFromGallery({
 *             type: Multimedia.Type.IMAGE,
 *             onSuccess: onSuccess
 *         });
 *     }
 * 
 *     function onSuccess(e) {
 *         var image = e.image;
 *     }
 * 
 *     function readExternalStoragePermission() {
 *         var result = Application.checkPermission("READ_EXTERNAL_STORAGE");
 *         if(!result) {
 *             var permissionCode = 1003;
 *             Application.requestPermissions(permissionCode, "READ_EXTERNAL_STORAGE");
 *         }
 *         return Application.checkPermission("READ_EXTERNAL_STORAGE");
 *     }
 * 
 * @param {Object} params Object describing parameters for the function.
 * @param {Device.Multimedia.Type} [params.type] Data type.
 * @param {Function} [params.onSuccess] Callback for success situation.
 * @param {Function} [params.onCancel] Callback for cancellation situation.
 * @param {Function} [params.onFailure] Callback for failure situation.
 * @return IO.File
 * @since 0.1
 */
Multimedia.pickFromGallery = function(e) { };

/**
 * @method getAllGalleryItems
 * 
 * Gets an object array contains gallery items.
 * 
 * @param {Object} params Object describing parameters for the function.
 * @param {Device.Multimedia.Type} [params.type] Data type.
 * @param {Function} [params.onSuccess] Callback for success situation.
 * @param {Function} [params.onCancel] Callback for cancellation situation.
 * @param {Function} [params.onFailure] Callback for failure situation.
 * @return {Object}
 * @since 0.1
 */
Multimedia.getAllGalleryItems = function(e) { };

/**
 * @enum {Number} Device.Multimedia.Type
 * @since 0.1
 *
 * Type is used to indicate type of the media.
 */
var Type = { };

/**
 * @property {Number} IMAGE
 * @static
 * @readonly
 * @since 0.1
 */
Type.IMAGE = 0;

/**
 * @property {Number} VIDEO
 * @static
 * @readonly
 * @since 0.1
 */
Type.VIDEO = 1;


/**
 * @enum {Number} Device.Multimedia.ActionType
 * @since 0.1
 *
 * ActionType is used to indicate type of the camera action.
 */
var ActionType = { };

/**
 * @property {Number} IMAGE_CAPTURE
 * @static
 * @readonly
 * @since 0.1
 */
ActionType.IMAGE_CAPTURE = 0;

/**
 * @property {Number} VIDEO_CAPTURE
 * @static
 * @readonly
 * @since 0.1
 */
ActionType.VIDEO_CAPTURE = 1;


module.exports = Multimedia;