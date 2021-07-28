/**
 * @class UI.GifImageView
 * @extends UI.ImageView
 * @since 3.2.0
 * 
 * GifImageView is simply an gifimage container where UI.GifImage is displayed inside.
 * 
 *     @example
 *     const GifImage = require('@smartface/native/ui/gifimage');
 *     const GifImageView = require('@smartface/native/ui/gifimageview');
 *     
 *     var myGifImage = GifImage.createFromFile("assets://smartface.gif")
 *     var myGifImageView = new GifImageView({
 *         gifImage: myGifImage,
 *         width: 200, height: 200
 *     });
 *     
 *     myPage.layout.addChild(myGifImageView);
 *     
 */
function GifImageView(params) {}

/**
 * Gets/sets the gifImage. GifImage object can be set.
 *
 * @property {UI.GifImage}  [gifImage = undefined]
 * @android
 * @ios
 * @since 3.2.0
 */
GifImageView.prototype.gifImage = undefined;

/**
 * Gets the currentFrame.
 *
 * @property {UI.Image}  currentFrame
 * @readonly
 * @android
 * @ios
 * @since 3.2.0
 */
GifImageView.prototype.currentFrame;

/**
 * Gets the currentFrameIndex.
 *
 * @property {Number}  currentFrameIndex
 * @readonly
 * @android
 * @ios
 * @since 3.2.0
 */
GifImageView.prototype.currentFrameIndex;

/**
 * Gets the isAnimating.
 *
 * @property {Boolean}  isAnimating
 * @readonly
 * @android
 * @ios
 * @since 3.2.0
 */
GifImageView.prototype.isAnimating;

/**
 * You should call this method when you want start gif's animation.
 *
 * @method startAnimating
 * @android
 * @ios
 * @since 3.2.0
 */
GifImageView.prototype.startAnimating = function() {};

/**
 * You should call this method when you want stop gif's animation.
 *
 * @method stopAnimating
 * @android
 * @ios
 * @since 3.2.0
 */
GifImageView.prototype.stopAnimating = function() {};

/**
 * This event is called when every gif's loop ends.
 *
 * @event loopCompletionCallback
 * @param {Number} loopCountRemaining
 * @ios
 * @since 3.2.0
 */
GifImageView.prototype.loopCompletionCallback = function(params) {};

/**
 * Gets/sets the tintColor. Must create a new image object with the imageWithRenderingMode(Image.iOS.RenderingMode.TEMPLATE) method to work correctly on the iOS.
 * 
 * @property {UI.Color} tintColor
 * @android
 * @removed
 * @ios
 * @since 3.2.0
 */
GifImageView.prototype.tintColor = null;

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
 * @param {Function} object.onError
 * @android
 * @removed
 * @ios
 * @since 3.2.0
 */
GifImageView.prototype.loadFromUrl = function(params) {};

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
 * @removed
 * @ios
 * @since 3.2.0
 */
GifImageView.prototype.loadFromFile = function(object) {};

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
 * @param {Function} object.onError
 * @removed
 * @android
 * @ios
 * @since 3.2.0
 */
GifImageView.prototype.fetchFromUrl = function(object) {};

module.exports = GifImageView;