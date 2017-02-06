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
 *     const ImageFillType = require('nf-core/ui/imagefilltype');
 *     const ImageView = require('nf-core/ui/imageview');
 *     const Image = require('nf-core/ui/image');
 *     var myImageView = new ImageView();
 *     var myImage = Image.createFromFile("images://smartface.png")
 *     myImageView.image = myImage;
 *     myImageView.imageFillType = ImageFillType.NORMAL;
 *
 */
const ImageView = extend(View)(
    function (_super, params) {
        _super(this);

        /**
         * Gets/sets source of the ImageView. The source must be an Image.
         * 
         *     @example
         *     const Image = require('nf-core/ui/image');
         *     const ImageView = require('nf-core/ui/imageView');
         *     var myImage = Image.createFromFile("images://smartface.png");
         *     var myImageView = new ImageView();
         *     myImageView.image = myImage;
         *
         * @property {UI.Image} [image = null]
         * @since 0.1
         */
        this.image = null;

        /**
         * Gets/sets image fill type. The source fills the Image base on this property.
         *
         *     @example
         *     const ImageView = require('nf-core/ui/imageview');
         *     const ImageFillType = require('nf-core/ui/imagefilltype');
         *     var myImage = Image.createFromFile("images://smartface.png");
         *     var myImageView = new ImageView();
         *     myImageView.image = myImage;
         *     myImageView.imageFillType = ImageFillType.STRETCH;
         *
         * @property {UI.ImageFillType} [imageFillType = UI.ImageFillType.NORMAL]
         * @since 0.1
         */
        this.imageFillType = UI.ImageFillType.NORMAL;
    }
);

module.exports = ImageView;