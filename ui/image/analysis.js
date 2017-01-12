const extend = require('js-base/core/extend');
const View = require('../view');

/**
 * @class UI.ActivityIndicator
 * @extends UI.View
 * @since 0.1
 * 
 * Image class is the way to show picture inside a rectangle area on UI.
 *
 *     @example
 *     const Image = require('sf-core/ui/image');
 *     const ImageFillType = require('sf-core/ui/imagefilltype');
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
         *     const Image = require('sf-core/ui/image');
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
         *     const Image = require('sf-core/ui/image');
         *     const ImageFillType = require('sf-core/ui/imagefilltype');
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
         *     const Image = require('sf-core/ui/image');
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
         *     const Image = require('sf-core/ui/image');
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

module.exports = Image;