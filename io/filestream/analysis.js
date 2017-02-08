/**
 * @class IO.FileStream
 * @since 0.1
 *
 * // @todo add description
 * 
 *     @example
 *     // @todo add example
 * 
 */
function FileStream(params) {
    
    /**
     * // @todo add description
     * 
     *     @example
     *     // @todo add example
     *
     * @property {IO.FileStream.StreamType} mode
     * @readonly
     * @since 0.1
     */
    this.mode;
    
    /**
     * // @todo add description
     * 
     *     @example
     *     // @todo add example
     *
     * @property {Boolean} isReadable
     * @readonly
     * @since 0.1
     */
    this.isReadable;
    
    /**
     * // @todo add description
     * 
     *     @example
     *     // @todo add example
     *
     * @property {Boolean} isWritable
     * @readonly
     * @since 0.1
     */
    this.isWritable;
    
    /**
     * // @todo add description
     * 
     *     @example
     *     // @todo add example
     *
     * @property {String} name
     * @readonly
     * @since 0.1
     */
    this.name;
    
    /**
     * // @todo add description
     * 
     *     @example
     *     // @todo add example
     *
     * @property {String} path
     * @readonly
     * @since 0.1
     */
    this.path;
    
    /**
     * // @todo add description
     * 
     *     @example
     *     // @todo add example
     *
     * @method close
     * @since 0.1
     */
    this.close = function(){};
    
    /**
     * // @todo add description
     * 
     *     @example
     *     // @todo add example
     *
     * @return {IO.Blob} // @todo add description
     * @method readBlob
     * @since 0.1
     */
    this.readBlob = function(){};
    
    /**
     * // @todo add description
     * 
     *     @example
     *     // @todo add example
     *
     * @return {String} // @todo add description
     * @method readToEnd
     * @since 0.1
     */
    this.readToEnd = function(){};
    
    /**
     * // @todo add description
     * 
     *     @example
     *     // @todo add example
     * 
     * @param {String} [text] // @todo add description
     * @return {Boolean} // @todo add description
     * @method write
     * @since 0.1
     */
    this.write = function(text){};
}

/**
 * @enum {Number} IO.FileStream.StreamType
 * @static
 * @readonly
 * @since 0.1
 *
 * // @todo add description.
 *
 *     @example
 *     // @todo add example
 *
 */
FileStream.StreamType = {};

/**
 * @property {Number} APPEND
 * // @todo add description.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FileStream.StreamType, 'APPEND', {
    value: 0,
    writable: false
});

/**
 * @property {Number} READ
 * // @todo add description.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FileStream.StreamType, 'READ', {
    value: 1,
    writable: false
});

/**
 * @property {Number} WRITE
 * // @todo add description.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FileStream.StreamType, 'WRITE', {
    value: 2,
    writable: false
});


module.exports = FileStream;