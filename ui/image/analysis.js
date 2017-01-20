/**
 * @class UI.Image
 * @since 0.1
 * 
 * This class represents images stored in file system. Instances of
 * Image class can be set to image property of an ImageView.
 * 
 *     @example
 *     const Image = require('sf-core/ui/image');
 *     const ImageView = require('sf-core/ui/imageview');
 *     var myImage = Image.createFromFile("images://smartface.png")
 *     var myImageView = new ImageView();
 *     myImageView.image = myImage;
 *     
 */
const Image = {}

/**
 * Creates an image object from given file path. Given path should be
 * full path of an existing image file on file system.
 * 
 *     @example
 *     const Image = require('sf-core/ui/image');
 *     const ImageView = require('sf-core/ui/imageview');
 *     var myImage = Image.createFromFile("images://smartface.png");
 *     var myImageView = new ImageView();
 *     myImageView.image = myImage;
 * 
 * @param {String} [path=""] Image file path
 * @method createFromFile
 * @static
 * @since 0.1
 */
Image.createFromFile = function(path) { }

module.exports = Image;