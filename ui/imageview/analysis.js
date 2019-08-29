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
function ImageView(params) {}

/**
 * Gets/sets the image. Path of image or Image object can be set. Setting "image path" 
 * to this property will be beneficial in terms of performance.
 *
 *     @example
 *     const Image = require('sf-core/ui/image');
 *     const ImageView = require('sf-core/ui/imageView');
 *
 *     var myImage = Image.createFromFile("images://smartface.png");
 *     var myImageView = new ImageView({
 *         width: 200, height: 200
 *     });
 *     myImageView.image = myImage; //OR myImageView.image = "images://smartface.png"
 *
 *     myPage.layout.addChild(myImageView);
 *
 * @property {UI.Image | String}  [image = null]
 * @android
 * @ios
 * @since 0.1
 */
ImageView.prototype.image = null;

/**
 * Gets/sets the tintColor.
 *
 *     @example
 *     const ImageView = require('sf-core/ui/imageview');
 *     const Image = require('sf-core/ui/image');
 *     const Color = require('sf-core/ui/color');
 *     const System = require('sf-core/device/system');
 *
 *     var image = Image.createFromFile("images://smartface.png");
 *
 *     var imageView = new ImageView();
 *     imageView.flexGrow = 1;
 *     imageView.tintColor = Color.RED;
 *     imageView.image = image;
 *
 * @property {UI.Color} tintColor
 * @android
 * @ios
 * @since 3.1.3
 */
ImageView.prototype.tintColor = null;

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
ImageView.prototype.imageFillType = UI.ImageView.FillType.NORMAL;

/**
 * Load image from the server and place the returned image into the ImageView.
 * If you pass any image to placeHolder parameter, placeHolder image will shown until image loaded.
 *
 * @method loadFromUrl
 * @param {Object} object
 * @param {String} object.url
 * @param {UI.Image} object.placeholder
 * @param {Boolean} object.fade = true
 * @param {Function} object.onSuccess
 * @param {Function} object.onFailure
 * @param {Object} object.ios
 * @param {Boolean} object.ios.isRefreshCached = false Even if the image is cached, respect the HTTP response cache control, and refresh the image from remote location if needed. This option helps deal with images changing behind the same request URL.
 * @android
 * @ios
 * @since 3.1.3
 */
ImageView.prototype.loadFromUrl = function(params) {};

/**
 * Load image from the file and place the returned image into the ImageView.
 *
 * @method loadFromFile
 * @param {Object} object
 * @param {IO.File} object.file
 * @param {Boolean} object.fade = true
 * @param {Number} object.width
 * @param {Number} object.height
 * @android
 * @ios
 * @since 3.1.0
 */
ImageView.prototype.loadFromFile = function(object) {};

/**
 * Fetch image from the server.
 * If you want better performance and automatically set image, use loadFromUrl. 
 * If you pass any image to placeHolder parameter, placeHolder image will shown until image loaded. 
 * In Android, this method is not recommended to use in listview.
 *
 * @method fetchFromUrl
 * @param {Object} object
 * @param {String} object.url
 * @param {UI.Image} object.placeholder
 * @param {Function} object.onSuccess
 * @param {UI.Image} object.onSuccess.image
 * @param {UI.ImageCacheType} object.onSuccess.cache
 * @param {Function} object.onFailure
 * @android
 * @ios
 * @since 3.0.2
 */
ImageView.prototype.fetchFromUrl = function(object) {};

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
 * @property {Number} ASPECTFILL
 * @android
 * @ios
 * The option to scale the content to fill the size of the view. Some portion of the content may be clipped to fill the view’s bounds.
 * @static
 * @readonly
 * @android
 * @ios
 * @since 3.0.2
 */
ImageView.FillType.ASPECTFILL;

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