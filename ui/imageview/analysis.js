const extend = require('js-base/core/extend');
const View = require('../view');

/**
 * @class UI.ImageView
 * @extends UI.View
 * @since 0.1
 *
 * ImageView is simply an image container where UI.Image is displayed inside.
 *
 *     @example
 *     const Image = require('nf-core/ui/image');
 *     const ImageView = require('nf-core/ui/imageview');
 *
 *     var myImage = Image.createFromFile("images://nativeface.png")
 *     var myImageView = new ImageView({
 *         image: myImage,
 *         left: 0, width: 300, height: 400
 *     });
 *
 *     myPage.layout.addChild(myImageView);
 *
 */
const ImageView = extend(View)(
    function (_super, params) {
        _super(this);

        /**
         * Gets/sets the image set.
         *
         *     @example
         *     const Image = require('nf-core/ui/image');
         *     const ImageView = require('nf-core/ui/imageView');
         *
         *     var myImage = Image.createFromFile("images://nativeface.png");
         *     var myImageView = new ImageView({
         *         width: 200, height: 200
         *     });
         *     myImageView.image = myImage;
         *
         *     myPage.layout.addChild(myImageView);
         *
         * @property {UI.Image} [image = null]
         * @android
         * @ios
         * @since 0.1
         */
        this.image = null;

        /**
         * Gets/sets image fill type.
         *
         *     @example
         *     const Image = require('nf-core/ui/image');
         *     const ImageView = require('nf-core/ui/imageview');
         *
         *     var myImage = Image.createFromFile("images://nativeface.png")
         *     var myImageView = new ImageView({
         *         image: myImage,
         *         width: 200, height: 200
         *     });
         *     myImageView.imageFillType = Image.FillType.STRETCH;
         *
         *     myPage.layout.addChild(myImageView);
         *
         * @property {UI.Image.FillType} [imageFillType = UI.Image.FillType.NORMAL]
         * @android
         * @ios
         * @since 0.1
         */
        this.imageFillType = UI.Image.FillType.NORMAL;
        
        /**
         * Load image from the server and place the returned image into the ImageView.
         * If you pass any image to placeHolder parameter, placeHolder image will shown
         * until image loaded.
         *
         * @method loadFromUrl
         * @param {String} url 
         * @param {UI.Image} placeHolder 
         * @android
         * @ios
         * @since 0.1
         */
        this.loadFromUrl = function(url, placeHolder){};
    }
);

module.exports = ImageView;
