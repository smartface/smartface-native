/**
 * @class UI.Image
 * @since 0.1
 * 
 * This class used for creating Image objects. 
 * 
 *     @example
 *     const Image = require('sf-core/ui/image');
 *     const ImageView = require('sf-core/ui/imageView');
 *     var myImage = Image.createFromFile("images://smartface.png")
 *     var myImageView = new myImageView();
 *     myImageView.imageSource = myImage;
 *     
 */
const Image = {}

/**
 * Creates a image object from given file path. Path should be a
 * correct image path.
 * 
 *     @example
 *     const Image = require('sf-core/ui/image');
 *     const ImageView = require('sf-core/ui/imageView');
 *     var myImage = Image.createFromFile("images://smartface.png")
 *     var myImageView = new myImageView();
 *     myImageView.imageSource = myImage;
 * 
 * @param {String} [path=""] Image file path
 * @method createFromFile
 * @static
 * @since 0.1
 */
Image.createFromFile = function(path) { }

module.exports = Image;