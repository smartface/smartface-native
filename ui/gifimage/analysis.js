/**
 * @class UI.GifImage
 * @since 3.1.3
 * 
 * Image is used to store the image data read from the filesystem.
 * It can be set to UI objects' properties (e.g. UI.ImageView.image).
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
 *     
 *     myPage.layout.addChild(myImageView);
 *     
 */
function GifImage(params) {}


module.exports = GifImage;
