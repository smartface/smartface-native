
/**
 * @class UI.Blob
 * @since 0.1
 * 
 * Blob is a binary large object.
 *
 *     // todo Add example
 */
function Blob(params) {
    
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
    
    /**
     * Creates a new Blob object with given parameters.
     *
     * @method Blob
     * @param {Array} content Content of the Blob data.
     * @param {Object} properties Values of the Blob properties.
     * @return {UI.Blob} 
     * @since 0.1
     */
    this.Blob = function(parts, properties) {};
}