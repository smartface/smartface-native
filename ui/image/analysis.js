const extend = require('js-base/core/extend');
const View = require('../view');

/** @enum {Number} UI.Image.ImageFillType
 * @since 0.1
 * ImageFillType is an enum. It defines fill type of image source.
 *
 *     @example
 *     const ImageFillType = require('sf-core/ui/image').ImageFillType;
 *     const Image = require('sf-core/ui/image').Image;
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


/**
 * @class UI.ActivityIndicator
 * @extends UI.View
 * @since 0.1
 * 
 * Image class is the way to show picture inside a rectangle area on UI.
 *
 *     @example
 *     const Image = require('sf-core/ui/image').Image;
 *     const ImageFillType = require('sf-core/ui/image').ImageFillType;
 *     var myImage = new Image();
 *     myImage.imageSource = "images://smartface.png";
 *     myImage.imageFillType = ImageFillType.NORMAL;
 *
 */
const Image = extend(View)(
    function (_super, params) {
        _super(this);

        /**
         * Gets/sets source of the Image. The source can be path or base64 string.
         * 
         *     @example
         *     const Image = require('sf-core/ui/image').Image;
         *     var myImage = new Image();
         *     myImage.imageSource = "images://smartface.png";
         *
         * @property {String}
         * @since 0.1
         */
        this.imageSource = "";

        /**
         * Gets/sets image fill type. The source fills the Image base on this property.
         *
         *     @example
         *     const Image = require('sf-core/ui/image').Image;
         *     const ImageFillType = require('sf-core/ui/image').ImageFillType;
         *     var myImage = new Image();
         *     myImage.imageSource = "images://smartface.png";
         *     myImage.imageFillType = ImageFillType.STRETCH;
         *
         * @property {Number}
         * @since 0.1
         */
        this.imageFillType = ImageFillType.NORMAL;

        /**
         * Gets/sets height of image source within the Image. If imageHeight property is
         * greater than the Image height, image will be displayed as cropped vertically.
         *
         *     @example
         *     const Image = require('sf-core/ui/image').Image;
         *     var myImage = new Image();
         *     myImage.imageSource = "images://smartface.png";
         *     myImage.height = 100;
         *     myImage.imageHeight = 75;
         *
         * @property {Number}
         * @since 0.1
         */
        this.imageHeight = 0;

        /**
         * Gets/sets height of image source within the Image. If imageWidth property is
         * greater than the Image width, image will be displayed as cropped horizontally.
         *
         *     @example
         *     const Image = require('sf-core/ui/image').Image;
         *     var myImage = new Image();
         *     myImage.imageSource = "images://smartface.png";
         *     myImage.width = 100;
         *     myImage.imageWidth = 75;
         *
         * @property {Number}
         * @since 0.1
         */
        this.imageWidth = 0;
    }
);

module.exports = {Image: Image, ImageFillType: ImageFillType};