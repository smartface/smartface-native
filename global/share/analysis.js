/**
 * @class Share
 * @static
 * @since 0.1
 * 
 * Share allows sending a text, an image or a file over 
 * other apps on the device. Blacklist works for iOS only. 
 * 
 */
const Share = {};

/**
 * Shares a text.
 * 
 *     @example
 *     const Share = require('sf-core/share');
 *     Share.shareText("Hello from sf-core", myPage, [Share.ios.Twitter, Share.ios.Facebook]);
 *
 * @method shareText
 * @param {String} text
 * @param {UI.Page} page
 * @param {Array} blacklist
 * @ios
 * @android
 * @since 0.1
 */
Share.shareText = function(text, page, blacklist) {};

/**
 * Shares an image.
 *
 *     @example
 *     const Share = require('sf-core/share');
 *     const Image = require('sf-core/ui/image');
 *    
 *     var image = Image.createFromFile('path to the image');
 *     Share.shareImage(image, myPage, []);
 *
 * @method shareImage
 * @param {UI.Image} image
 * @param {UI.Page} page
 * @param {Array} blacklist
 * @android
 * @ios
 * @since 0.1
 */
Share.shareImage = function(image, page, blacklist) {};

/**
 * Shares a file.
 * 
 *     @example
 *     const Share = require('sf-core/share');
 *     const File = require('sf-core/io/file');
 *    
 *     var file = new File({path: 'path to the file'});
 *     Share.shareFile(file, myPage, []);
 *
 * @method shareFile
 * @param {IO.File} file
 * @param {UI.Page} page
 * @param {Array} blacklist
 * @ios
 * @android
 * @since 0.1
 */
Share.shareFile = function(file, page, blacklist) {};

/**
 * @property {String} AirDrop
 * @static
 * @readonly
 * @ios
 * @since 0.1
 */
Share.ios.AirDrop = "...";

/**
 * @property {String} Facebook
 * @static
 * @readonly
 * @ios
 * @since 0.1
 */
Share.ios.Facebook = "...";

/**
 * @property {String} Twitter
 * @static
 * @readonly
 * @ios
 * @since 0.1
 */
Share.ios.Twitter = "...";

/**
 * @property {String} Flickr
 * @static
 * @readonly
 * @ios
 * @since 0.1
 */
Share.ios.Flickr = "...";

/**
 * @property {String} Message
 * @static
 * @readonly
 * @ios
 * @since 0.1
 */
Share.ios.Message = "...";

/**
 * @property {String} Mail
 * @static
 * @readonly
 * @ios
 * @since 0.1
 */
Share.ios.Mail = "...";

/**
 * @property {String} Vimeo
 * @static
 * @readonly
 * @ios
 * @since 0.1
 */
Share.ios.Vimeo = "...";

module.exports = Share;