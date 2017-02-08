/**
 * @class IO.File
 * @since 0.1
 *
 * // @todo add description
 * 
 *     @example
 *     // @todo add example
 * 
 */
function File(params) {
    
    /**
     * // @todo add description
     * 
     *     @example
     *     // @todo add example
     *
     * @property {Number} creationDate
     * @readonly
     * @since 0.1
     */
    this.creationDate;
    
    /**
     * // @todo add description
     * 
     *     @example
     *     // @todo add example
     *
     * @property {Boolean} exists
     * @readonly
     * @since 0.1
     */
    this.exists;
    
    /**
     * // @todo add description
     * 
     *     @example
     *     // @todo add example
     *
     * @property {String} extension
     * @readonly
     * @since 0.1
     */
    this.extension;
    
    /**
     * // @todo add description
     * 
     *     @example
     *     // @todo add example
     *
     * @property {Boolean} isDirectory
     * @readonly
     * @since 0.1
     */
    this.isDirectory;
    
    /**
     * // @todo add description
     * 
     *     @example
     *     // @todo add example
     *
     * @property {Boolean} isFile
     * @readonly
     * @since 0.1
     */
    this.isFile;
    
    /**
     * // @todo add description
     * 
     *     @example
     *     // @todo add example
     *
     * @property {Number} modifiedDate
     * @readonly
     * @since 0.1
     */
    this.modifiedDate;
    
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
     * @property {IO.File} parent
     * @readonly
     * @since 0.1
     */
    this.parent;
    
    /**
     * // @todo add description
     * 
     *     @example
     *     // @todo add example
     *
     * @property {String} [path = param.path]
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
     * @property {Number} size
     * @readonly
     * @since 0.1
     */
    this.size;
    
    /**
     * // @todo add description
     * 
     *     @example
     *     // @todo add example
     *
     * @property {Boolean} writable
     * @readonly
     * @since 0.1
     */
    this.writable;
    
    /**
     * // @todo add description
     * 
     *     @example
     *     // @todo add example
     *
     * @param {IO.File|String} [destination] // @todo add description
     * @return {Boolean} // @todo add description
     * @method copy
     * @since 0.1
     */
    this.copy = function(destination){};
    
    /**
     * // @todo add description
     * 
     *     @example
     *     // @todo add example
     *
     * @param {Boolean} [withParents = false]
     * @return {Boolean} // @todo add description
     * @method createDirectory
     * @since 0.1
     */
    this.createDirectory = function(withParents){};
    
    /**
     * // @todo add description
     * 
     *     @example
     *     // @todo add example
     *
     * @param {Boolean} [createParents = false]
     * @return {Boolean} // @todo add description
     * @method createFile
     * @since 0.1
     */
    this.createFile = function(createParents){};
    
    /**
     * // @todo add description
     * 
     *     @example
     *     // @todo add example
     * 
     * @param {Boolean} [withChilds = false]
     * @return {Boolean} // @todo add description
     * @method remove
     * @since 0.1
     */
    this.remove = function(withChilds){};
    
    /**
     * // @todo add description
     * 
     *     @example
     *     // @todo add example
     *
     * @return {IO.File[]} // @todo add description
     * @method getFiles
     * @since 0.1
     */
    this.getFiles = function(){};
    
    /**
     * // @todo add description
     * 
     *     @example
     *     // @todo add example
     *
     * @param {IO.File|String} [destination]
     * @return {Boolean} // @todo add description
     * @method move
     * @since 0.1
     */
    this.move = function(destination){};
    
    /**
     * // @todo add description
     * 
     *     @example
     *     // @todo add example
     *
     * @param {IO.FileStream.StreamType} [mode] // @todo add description
     * @return {IO.FileStream} // @todo add description
     * @method openStream
     * @since 0.1
     */
    this.openStream = function(mode){};
    
    /**
     * // @todo add description
     * 
     *     @example
     *     // @todo add example
     *
     * @param {String} [newName]
     * @return {Boolean} // @todo add description
     * @method copy
     * @since 0.1
     */
    this.rename = function(newName){};
}

module.exports = File;