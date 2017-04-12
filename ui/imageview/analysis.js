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
 *     const Image = require('sf-core/ui/image');
 *     const ImageView = require('sf-core/ui/imageview');
 *
 *     var myImage = Image.createFromFile("images://smartface.png")
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
         *     const Image = require('sf-core/ui/image');
         *     const ImageView = require('sf-core/ui/imageView');
         *
         *     var myImage = Image.createFromFile("images://smartface.png");
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
         *     const Image = require('sf-core/ui/image');
         *     const ImageView = require('sf-core/ui/imageview');
         *
         *     var myImage = Image.createFromFile("images://smartface.png")
         *     var myImageView = new ImageView({
         *         image: myImage,
         *         width: 200, height: 200
         *     });
         *     myImageView.imageFillType = ImageView.FillType.STRETCH;
         *
         *     myPage.layout.addChild(myImageView);
         *
         * @property {UI.ImageView.FillType} [imageFillType = UI.ImageView.FillType.NORMAL]
         * @android
         * @ios
         * @since 0.1
         */
        this.imageFillType = UI.ImageView.FillType.NORMAL;
        
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



/**
 * @enum {Number} UI.ImageView.FillType
 * @since 0.1
 * FillType is an enum. It defines the fill type of an UI.Image inside its parent.
 *
 *     @example
 *     const ImageView = require('sf-core/ui/imageview');
 *     const Image = require('sf-core/ui/image');
 *
 *     var myImage = Image.createFromFile("images://smartface.png")
 *     var myImageView = new ImageView({
 *         image: myImage,
 *         imageFillType: ImageView.FillType.NORMAL,
 *         width:200, height: 200
 *     });
 *     myPage.layout.addChild(myImageView);
 *
 */
ImageView.FillType = {};
ImageView.FillType.ios = {};

/**
 * @property {Number} NORMAL
 * @android
 * @ios
 * The source image will be displayed in its normal dimensions inside the parent.
 * @static
 * @readonly
 * @android
 * @ios
 * @since 0.1
 */
ImageView.FillType.NORMAL;

/**
 * @property {Number} STRETCH
 * @android
 * @ios
 * The source image will be stretched to the size of the parent.
 * @static
 * @readonly
 * @android
 * @ios
 * @since 0.1
 */
ImageView.FillType.STRETCH;

/**
 * @property {Number} ASPECTFIT
 * @android
 * @ios
 * The source image will grow by saving its aspect ratio until the image is at its max size inside the parent.
 * @static
 * @readonly
 * @android
 * @ios
 * @since 0.1
 */
ImageView.FillType.ASPECTFIT;

/**
 * @property {Number} TOPLEFT
 * @ios
 * The source image position will be top center. Works only for iOS.
 * @static
 * @readonly
 * @ios
 * @since 0.1
 */
ImageView.FillType.ios.TOPLEFT;

/**
 * @property {Number} TOPCENTER
 * @ios
 * The source image position will be top center. Works only for iOS.
 * @static
 * @readonly
 * @ios
 * @since 0.1
 */
ImageView.FillType.ios.TOPCENTER;

/**
 * @property {Number} TOPRIGHT
 * @ios
 * The source image position will be top right. Works only for iOS.
 * @static
 * @readonly
 * @ios
 * @since 0.1
 */
ImageView.FillType.ios.TOPRIGHT;

/**
 * @property {Number} MIDLEFT
 * @ios
 * The source image position will be mid left. Works only for iOS.
 * @static
 * @readonly
 * @ios
 * @since 0.1
 */
ImageView.FillType.ios.MIDLEFT;

/**
 * @property {Number} MIDCENTER
 * @ios
 * The source image position will be mid center. Works only for iOS.
 * @static
 * @readonly
 * @ios
 * @since 0.1
 */
ImageView.FillType.ios.MIDCENTER;

/**
 * @property {Number} MIDRIGHT
 * @ios
 * The source image position will be mid right. Works only for iOS.
 * @static
 * @readonly
 * @ios
 * @since 0.1
 */
ImageView.FillType.ios.MIDRIGHT;

/**
 * @property {Number} BOTTOMLEFT
 * @ios
 * The source image position will be bottom left. Works only for iOS.
 * @static
 * @readonly
 * @ios
 * @since 0.1
 */
ImageView.FillType.ios.BOTTOMLEFT;

/**
 * @property {Number} BOTTOMCENTER
 * @ios
 * The source image position will be bottom center. Works only for iOS.
 * @static
 * @readonly
 * @ios
 * @since 0.1
 */
ImageView.FillType.ios.BOTTOMCENTER;

/**
 * @property {Number} BOTTOMRIGHT
 * @ios
 * The source image position will be bottom right. Works only for iOS.
 * @static
 * @readonly
 * @ios
 * @since 0.1
 */
ImageView.FillType.ios.BOTTOMRIGHT;

module.exports = ImageView;
