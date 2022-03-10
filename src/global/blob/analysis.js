/**
 * @class Blob
 * @since 0.1
 * 
 * Blob is a binary large object.
 * 
 *     @example
 *     const Blob = require('@smartface/native/blob');
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
 * Converts to base64 asynchronously 
 *
 * @method toBase64Async
 * @param {Object} params Object describing parameters for the function.
 * @param {Function} params.onComplete Triggers when conversion is over.
 * @param {String} params.onComplete.base64
 * @param {Function} [params.onFailure] Triggers when failure situation occurred.
 * @android
 * @ios
 * @since 4.3.0
 */
Blob.prototype.toBase64Async = function(params) {};

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
Blob.createFromBase64 = function(base64) {};

/**
 * Creates a blob object from given a utf8 string.
 *
 * @param {String} utf8String
 * @method createFromUTF8String
 * @return Blob
 * @static
 * @since 0.1
 */
Blob.createFromUTF8String = function(utf8String) {};

module.exports = Blob;