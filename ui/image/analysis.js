/**
 * @class UI.Image
 * @since 0.1
 * 
 * Image is used to store the image data read from the filesystem.
 * It can be set to UI objects' properties (e.g. UI.ImageView.image).
 * 
 *     @example
 *     const Image = require('nf-core/ui/image');
 *     const ImageView = require('nf-core/ui/imageview');
 *     
 *     var myImage = Image.createFromFile("images://nativeface.png")
 *     var myImageView = new ImageView({
 *         image: myImage,
 *         width:"50%", height: "50%"
 *     });
 *     
 *     myPage.layout.addChild(myImageView);
 *     
 */
const Image = {}

/**
 * Creates an Image instance from given file path.
 *  
 *     @example
 *     const Image = require('nf-core/ui/image');
 *     var myImage = Image.createFromFile("images://nativeface.png");
 * 
 * @param {String} path Image file path
 * @method createFromFile
 * @return {UI.Image} An Image instance.
 * @static
 * @since 0.1
 */
Image.createFromFile = function(path) { }

module.exports = Image;