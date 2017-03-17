/**
 * @class Device.Multimedia
 * @since 0.1
 * 
 * Multimedia manages camera, video and image.
 * 
 *     @example
 *     const Page = require("nf-core/ui/page");
 *     const extend = require("js-base/core/extend");
 *     const Button = require('nf-core/ui/button');
 *     const Multimedia = require("nf-core/device/multimedia");
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
 *     const Page = require("nf-core/ui/page");
 *     const extend = require("js-base/core/extend");
 *     const Button = require('nf-core/ui/button');
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
 *    );
 *    
 *    module.exports = Page1;
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