/**
 * @enum {Number} UI.ImageFillType
 * @since 0.1
 * ImageFillType is an enum. It defines the fill type of an UI.Image inside its parent.
 *
 *     @example
 *     const ImageFillType = require('nf-core/ui/imagefilltype');
 *     const ImageView = require('nf-core/ui/imageview');
 *     const Image = require('nf-core/ui/image');
 *     
 *     var myImage = Image.createFromFile("images://nativeface.png")
 *     var myImageView = new ImageView({
 *         image: myImage,
 *         imageFillType: ImageFillType.NORMAL,
 *         width:"50%", height: "50%"
 *     });
 *     myPage.layout.addChild(myImageView);
 * 
 */
const ImageFillType = { };

/**
 * @property {Number} NORMAL
 * The source image will be displayed in its normal dimensions inside the parent.
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
 * The source image will be stretched to the size of the parent.
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
 * The source image will grow by saving its aspect ratio until the image is at its max size inside the parent.
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(ImageFillType, 'ASPECTFIT', {
    value: 2,
    writable: false
});

module.exports = ImageFillType;