/**
 * Types of errors that may occur for SecureData.
 * 
 * @class SecureData.Error
 * @since 4.0.2
 */
const SecureDataError = {};

/**
 * @property {Number} NOVALUE
 * @ios
 * @android
 * @static
 * @readonly
 * @since 4.0.2
 */
SecureDataError.NOVALUE = 0;

/**
 * @property {Number} UNHANDLEDERROR
 * @ios
 * @android
 * @static
 * @readonly
 * @since 4.0.2
 */
SecureDataError.UNHANDLEDERROR = 1;

module.exports = SecureDataError;