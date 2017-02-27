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
 *         width:200, height: 200
 *     });
 *     myPage.layout.addChild(myImageView);
 *
 */
const ImageFillType = { };

/**
 * @property {Number} NORMAL
 * @android
 * @ios
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
 * @android
 * @ios
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
 * @android
 * @ios
 * The source image will grow by saving its aspect ratio until the image is at its max size inside the parent.
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(ImageFillType, 'ASPECTFIT', {
    value: 2,
    writable: false
});

/**
 * @property {Number} TOPLEFT
 * @ios
 * The source image position will be top center. Works only for iOS.
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(ImageFillType, 'TOPLEFT', {
    value: 3,
    writable: false
});

/**
 * @property {Number} TOPCENTER
 * @ios
 * The source image position will be top center. Works only for iOS.
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(ImageFillType, 'TOPCENTER', {
    value: 4,
    writable: false
});

/**
 * @property {Number} TOPRIGHT
 * @ios
 * The source image position will be top right. Works only for iOS.
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(ImageFillType, 'TOPRIGHT', {
    value: 5,
    writable: false
});

/**
 * @property {Number} MIDLEFT
 * @ios
 * The source image position will be mid left. Works only for iOS.
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(ImageFillType, 'MIDLEFT', {
    value: 6,
    writable: false
});

/**
 * @property {Number} MIDCENTER
 * @ios
 * The source image position will be mid center. Works only for iOS.
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(ImageFillType, 'MIDCENTER', {
    value: 7,
    writable: false
});

/**
 * @property {Number} MIDRIGHT
 * @ios
 * The source image position will be mid right. Works only for iOS.
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(ImageFillType, 'MIDRIGHT', {
    value: 8,
    writable: false
});

/**
 * @property {Number} BOTTOMLEFT
 * @ios
 * The source image position will be bottom left. Works only for iOS.
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(ImageFillType, 'BOTTOMLEFT', {
    value: 9,
    writable: false
});

/**
 * @property {Number} BOTTOMCENTER
 * @ios
 * The source image position will be bottom center. Works only for iOS.
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(ImageFillType, 'BOTTOMCENTER', {
    value: 10,
    writable: false
});

/**
 * @property {Number} BOTTOMRIGHT
 * @ios
 * The source image position will be bottom right. Works only for iOS.
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(ImageFillType, 'BOTTOMRIGHT', {
    value: 11,
    writable: false
});

module.exports = ImageFillType;
