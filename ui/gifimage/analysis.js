/**
 * @class UI.GifImage
 * @since 3.1.3
 * 
 * GifImage is used to store the gif data read from the filesystem.
 * It can be set to UI objects' properties (e.g. UI.GifImageView.gifImage).
 * GifImage's file should not be in images folder. You can use assets folder.
 * 
 *     @example
 *     const GifImage = require('sf-core/ui/gifimage');
 *     const GifImageView = require('sf-core/ui/gifimageview');
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
function GifImage(params) {}

/**
 * Creates an gifImage object from given a blob. 
 *
 * @param {Blob} blob Contains gif datas.
 * @method createFromBlob
 * @return UI.GifImage
 * @static
 * @android
 * @ios
 * @since 3.1.3
 */
GifImage.createFromBlob = function(blob) {}

/**
 * Creates an GifImage instance from given file path. GifImage's file should not be in images folder. You can use assets folder.
 *  
 *     @example
 *     const GifImage = require('sf-core/ui/gifimage');
 *     var myGifImage = GifImage.createFromFile("assets://smartface.gif");
 * 
 * @param {String|IO.File} path GifImage file path
 * @method createFromFile
 * @return {UI.GifImage} An GifImage instance.
 * @android
 * @ios
 * @static
 * @since 3.1.3
 */
GifImage.createFromFile = function(path, width, height) {};

/**
 * Gets/Sets the loopCount of gifImage. This property is readonly on iOS.
 *
 * @android
 * @ios
 * @property {Number} loopCount
 * @since 3.1.3
 */
GifImage.prototype.loopCount;

/**
 * Gets/Sets the frameCount of gifImage.
 *
 * @android
 * @ios
 * @readonly
 * @property {Number} frameCount
 * @since 3.1.3
 */
GifImage.prototype.frameCount;

/**
 * Gets/Sets the posterImage of gifImage.
 *
 * @android
 * @ios
 * @readonly
 * @property {UI.Image} posterImage
 * @since 3.1.3
 */
GifImage.prototype.posterImage;

/**
 * Gets the frameCacheSizeCurrent of gifImage.
 *
 * @ios
 * @readonly
 * @property {Number} frameCacheSizeCurrent
 * @since 3.1.3
 */
GifImage.prototype.frameCacheSizeCurrent;

/**
 * Gets/Sets the instrinsicSize of gifImage.
 *
 * @android
 * @ios
 * @readonly
 * @property {Object} instrinsicSize
 * @property {Number} instrinsicSize.width
 * @property {Number} instrinsicSize.height
 * @since 3.1.3
 */
GifImage.prototype.instrinsicSize;

/**
 * Returns a Blob instance.
 *
 * @android
 * @ios
 * @method toBlob
 * @return Blob
 * @since 3.1.3
 */
GifImage.prototype.toBlob = function() {};

/**
 * Returns delay times for indexes.
 *
 * @ios
 * @method getDelayTimesForIndexes
 * @return {Object}
 * @since 3.1.3
 */
GifImage.prototype.getDelayTimesForIndexes = function() {};

module.exports = GifImage;
