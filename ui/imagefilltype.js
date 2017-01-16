/**
 * @enum {Number} UI.ImageFillType
 * @since 0.1
 * ImageFillType is an enum. It defines fill type of image source.
 *
 *     @example
 *     const ImageFillType = require('sf-core/ui/imagefilltype');
 *     const Image = require('sf-core/ui/image');
 *     var myImage = new Image();
 *     myImage.imageSource = "images://smartface.png";
 *     myImage.imageFillType = ImageFillType.NORMAL;
 */
var ImageFillType = { };

/**
 * @property {Number} NORMAL
 * The source image will be displayed in its normal dimensions.
 * @static
 * @readonly
 * @since 0.1
 */
ImageFillType.NORMAL = 0;

/**
 * @property {Number} STRETCH
 * Stretched the image source in order to fit the size of the Image.
 * @static
 * @readonly
 * @since 0.1
 */
ImageFillType.STRETCH  = 1;

/**
 * @property {Number} TILE
 * Tiles the image source into the Image.
 * @static
 * @readonly
 * @since 0.1
 */
ImageFillType.TILE = 2;

/**
 * @property {Number} ASPECT_FIT
 * Resizes the image source  until the whole image will fits within the Image.
 * @static
 * @readonly
 * @since 0.1
 */
ImageFillType.ASPECT_FIT = 3;

module.exports = ImageFillType;