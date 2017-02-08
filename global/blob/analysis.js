
/**
 * @class Blob
 * @since 0.1
 * 
 * Blob is a binary large object.
 * 
 *     @example
 *     const Image = require('sf-core/ui/image');
 *     const ImageFormat = require('sf-core/ui/imageformat');
 *     var myImage = Image.createFromFile("images://smartface.png")
 *     var blob = myImage.compress(ImageFormat.JPEG, 100); 
 *     var blobSize = blob.size, blobType = blob.type;
 */
function Blob(parts, properties) {
    
    /**
     * Returns the type of Blob data.
     *
     * @property {String} type
     * @readonly
     * @since 0.1
     */
    this.type;
    
    /**
     * Returns blob size.
     *
     * @property {Number} size
     * @readonly
     * @since 0.1
     */
    this.size;
    
    /**
     * Returns a new Blob object containing the data in the specified range of bytes of the existing Blob.
     *
     * @method slice
     * @since 0.1
     */
    this.slice = function(start, end, type) {};
}