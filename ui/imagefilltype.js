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
 * 
 */
const ImageFillType = { };

/**
 * @property {Number} NORMAL
 * The source image will be displayed in its normal dimensions.
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(ImageFillType, 'NORMAL', {
    value: 0,
    writable: false
});

/**
 * @property {Number} STRETCH
 * Stretched the image source in order to fit the size of the Image.
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(ImageFillType, 'STRETCH', {
    value: 1,
    writable: false
});

/**
 * @property {Number} ASPECTFIT
 * Resizes the image source  until the whole image will fits within the Image.
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(ImageFillType, 'ASPECTFIT', {
    value: 2,
    writable: false
});

module.exports = ImageFillType;