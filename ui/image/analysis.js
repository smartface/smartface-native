/**
 * @class UI.Image
 * @since 0.1
 * 
 * Image is used to store the image data read from the filesystem.
 * It can be set to UI objects' properties (e.g. UI.ImageView.image).
 * 
 *     @example
 *     const Image = require('sf-core/ui/image');
 *     const ImageView = require('sf-core/ui/imageview');
 *     
 *     var myImage = Image.createFromFile("images://smartface.png")
 *     var myImageView = new ImageView({
 *         image: myImage,
 *         width: 200, height: 200
 *     });
 *     
 *     myPage.layout.addChild(myImageView);
 *     
 */
function Image(params) {
        
        /**
         * Gets the height of image. 
         *
         * @property {Number} height
         * @readonly
         * @since 0.1
         */
        this.height;
        
        /**
         * Gets the width of image. 
         *
         * @property {Number} width
         * @readonly
         * @since 0.1
         */
        this.width;
        
        /**
         * Creates a new image from existing image with specified width and height.
         * onSuccess and onFailure are optional parameters.
         * 
         *     @example
         *     const Image = require('sf-core/ui/image');
         *     const ImageView = require('sf-core/ui/imageview');
         *     var myImage = Image.createFromFile("images://smartface.png")
         *     var myImageView = new ImageView();
         *     myImageView.image = myImage.resize(myImage.width/2, myImage.height/2); // resize example without callback
         * 
         *     
         *     const Image = require('sf-core/ui/image');
         *     const ImageView = require('sf-core/ui/imageview');
         *     var myImage = Image.createFromFile("images://smartface.png")
         *     var myImageView = new ImageView();
         *     myImage.resize(myImage.width/2, myImage.height/2, onSuccess); 
         * 
         *     function onSuccess(e) {
         *         myImageView.image = e.image;
         *     }
         *
         * @method resize
         * @param {Number} width Width of the new bitmap.
         * @param {Number} height Height of the new bitmap.
         * @param {Function} onSuccess Callback for success situation.
         * @param {Object} onSuccess.params 
         * @param {UI.Image} onSuccess.params.image Resized image
         * @param {Function} onFailure Callback for failure situation.
         * @param {Object} onFailure.params 
         * @param {String} onFailure.params.message Failure message 
         * @return UI.Image
         * @since 0.1
         */
        this.resize = function(width, height, onSuccess, onFailure) {}
        
        /**
         * Returns a cropped image from existing image with specified rectangle.
         * onSuccess and onFailure are optional parameters.
         *
         * @method crop
         * @param {Number} x The x value of the rectangle top-left corner.
         * @param {Number} y The y value of the rectangle top-left corner.
         * @param {Number} width Width of the new bitmap.
         * @param {Number} height Height of the new bitmap.
         * @param {Function} onSuccess Callback for success situation.
         * @param {Object} onSuccess.params 
         * @param {UI.Image} onSuccess.params.image Cropped image
         * @param {Function} onFailure Callback for failure situation.
         * @param {Object} onFailure.params 
         * @param {String} onFailure.params.message Failure message 
         * @return UI.Image
         * @since 0.1
         */
        this.crop = function(x, y, width, height, onSuccess, onFailure) {};
                
        /**
         * Returns a compressed blob from existing image with given quality.
         * onSuccess and onFailure are optional parameters.
         * 
         *     @example
         *     const Image = require('sf-core/ui/image');
         *     var myImage = Image.createFromFile("images://smartface.png")
         *     var myBlob = myImage.compress(Image.Format.JPEG, 50); 
         *     var myCompressedImage = Image.createFromBlob(myBlob);
         *
         * @method compress
         * @param {UI.Image.Format} format Image format.
         * @param {Number} quality Image quality is between 0 and 100.
         * @param {Function} onSuccess Callback for success situation.
         * @param {Object} onSuccess.params 
         * @param {Blob} onSuccess.params.blob Compressed data
         * @param {Function} onFailure Callback for failure situation.
         * @param {Object} onFailure.params 
         * @param {String} onFailure.params.message Failure message 
         * @return Blob
         * @since 0.1
         */
        this.compress = function(format, quality, onSuccess, onFailure) {}
        
        /**
         * Returns a rotated image with given angle. Rotate direction is clockwise and angle is between 0-360.
         * onSuccess and onFailure are optional parameters.
         * 
         * @method rotate
         * @param {Number} angle The angle value of the rectangle top-left corner.
         * @param {Function} onSuccess Callback for success situation.
         * @param {Object} onSuccess.params 
         * @param {UI.Image} onSuccess.params.image Rotated image
         * @param {Function} onFailure Callback for failure situation.
         * @param {Object} onFailure.params 
         * @param {String} onFailure.params.message Failure message 
         * @return UI.Image
         * @since 0.1
         */
        this.rotate = function(angle, onSuccess, onFailure) {}
};

/**
 * Creates an image object from given a blob. 
 *
 * @param {Blob} blob Contains image datas.
 * @method createFromBlob
 * @return UI.Image
 * @static
 * @since 0.1
 */
Image.createFromBlob = function(blob) { }

/**
 * Creates an Image instance from given file path.
 *  
 *     @example
 *     const Image = require('sf-core/ui/image');
 *     var myImage = Image.createFromFile("images://smartface.png");
 * 
 * @param {String} path Image file path
 * @method createFromFile
 * @return {UI.Image} An Image instance.
 * @static
 * @since 0.1
 */
Image.createFromFile = function(path) { };

/**
 * @enum {Number} UI.Image.Format
 * @static
 * @since 0.1
 *
 * Specifies image compression type.
 *
 */

var Format = {};
/**
 * @property {Number} JPEG
 * @android
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
Format.JPEG = 0;

/**
 * @property {Number} PNG
 * @android
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
Format.PNG = 1;

module.exports = Image;