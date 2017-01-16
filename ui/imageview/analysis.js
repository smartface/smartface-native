const extend = require('js-base/core/extend');
const View = require('../view');

/**
 * @class UI.ImageView
 * @extends UI.View
 * @since 0.1
 * 
 * ImageView class is the way to show picture inside a rectangle area on UI.
 *
 *     @example
 *     const ImageView = require('sf-core/ui/imageview');
 *     const ImageFillType = require('sf-core/ui/imagefilltype');
 *     var myImage = new ImageView();
 *     myImage.imageSource = "images://smartface.png";
 *     myImage.imageFillType = ImageFillType.NORMAL;
 *
 */
const ImageView = extend(View)(
    function (_super, params) {
        _super(this);

        /**
         * Gets/sets source of the Image. The source can be path or base64 string.
         * 
         *     @example
         *     const Image = require('sf-core/ui/image');
         *     const ImageView = require('sf-core/ui/imageView');
         *     var myImage = Image.createFromFile("images://smartface.png")
         *     var myImageView = new myImageView();
         *     myImageView.imageSource = myImage;
         *
         * @property {UI.Image} [imageSource = null]
         * @since 0.1
         */
        this.image = null;

        /**
         * Gets/sets image fill type. The source fills the Image base on this property.
         *
         *     @example
         *     const ImageView = require('sf-core/ui/imageview');
         *     const ImageFillType = require('sf-core/ui/imagefilltype');
         *     var myImageView = new ImageView();
         *     myImageView.imageSource = "images://smartface.png";
         *     myImageView.imageFillType = ImageFillType.STRETCH;
         *
         * @property {UI.ImageFillType} [imageFillType = UI.ImageFillType.NORMAL]
         * @since 0.1
         */
        this.imageFillType = UI.ImageFillType.NORMAL;
    }
);

module.exports = ImageView;