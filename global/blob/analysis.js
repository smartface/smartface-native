
/**
 * @class Blob
 * @since 0.1
 * 
 * Blob is a binary large object.
 * 
 *     @example
 *     const Blob = require('sf-core/blob');
 *     var myBase64Str = "SGVsbG8gV29ybGQ=";
 *     var blob = Blob.createFromBase64(myBase64Str);
 */
function Blob(parts, properties) {}
    
/**
 * Returns the type of Blob data.
 *
 * @property {String} type
 * @readonly
 * @since 0.1
 */
Blob.prototype.type;

/**
 * Returns blob size.
 *
 * @property {Number} size
 * @readonly
 * @since 0.1
 */
Blob.prototype.size;

/**
 * Returns a new Blob object containing the data in the specified range of bytes of the existing Blob.
 *
 * @method slice
 * @since 0.1
 */
Blob.prototype.slice = function(start, end, type) {};

/**
 * Returns a base64 String
 *
 * @method toBase64
 * @since 0.1
 */
Blob.prototype.toBase64 = function() {};

/**
 * Returns a utf8 String
 *
 * @method toString
 * @since 0.1
 */
Blob.prototype.toString = function() {};

/**
 * Creates a blob object from given a base64String.
 *
 * @param {String} base64String
 * @method createFromBase64
 * @return Blob
 * @static
 * @since 0.1
 */
Blob.createFromBase64 = function(base64) { };

/**
 * Creates a blob object from given a utf8 string.
 *
 * @param {String} utf8String
 * @method createFromUTF8String
 * @return Blob
 * @static
 * @since 0.1
 */
Blob.createFromUTF8String = function(utf8String) { };

module.exports = Blob;