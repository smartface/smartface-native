/**
 * @class UI.GifImageView
 * @extends UI.ImageView
 * @since 3.1.3
 * 
 * GifImageView is simply an gifimage container where UI.GifImage is displayed inside.
 * 
 *     @example
 *     const GifImage = require('sf-core/ui/gifimage');
 *     const GifImageView = require('sf-core/ui/gifimageview');
 *     
 *     var myGifImage = GifImage.createFromFile("assets://smartface.gif")
 *     var myGifImageView = new GifImageView({
 *         gifimage: myImage,
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
 * @since 3.1.3
 */
GifImageView.prototype.gifImage = undefined;

/**
 * Gets the currentFrame.
 *
 * @property {UI.Image}  currentFrame
 * @readonly
 * @android
 * @ios
 * @since 3.1.3
 */
GifImageView.prototype.currentFrame;

/**
 * Gets the currentFrameIndex.
 *
 * @property {Number}  currentFrameIndex
 * @readonly
 * @android
 * @ios
 * @since 3.1.3
 */
GifImageView.prototype.currentFrameIndex;

/**
 * Gets the isAnimating.
 *
 * @property {Boolean}  isAnimating
 * @readonly
 * @android
 * @ios
 * @since 3.1.3
 */
GifImageView.prototype.isAnimating;

/**
 * You should call this method when you want start gif's animation.
 *
 * @method startAnimating
 * @android
 * @ios
 * @since 3.1.3
 */
GifImageView.prototype.startAnimating = function(){};

/**
 * You should call this method when you want stop gif's animation.
 *
 * @method stopAnimating
 * @android
 * @ios
 * @since 3.1.3
 */
GifImageView.prototype.stopAnimating = function(){};

/**
 * This event is called when every gif's loop ends.
 *
 * @event loopCompletionCallback
 * @param {Number} loopCountRemaining
 * @ios
 * @since 3.1.3
 */
GifImageView.prototype.loopCompletionCallback = function(params){};

module.exports = GifImageView;
