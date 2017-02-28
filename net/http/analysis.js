/**
 * @class Net.http
 * 
 * http module allows sending http requests.
 */
var http = {};

/**
 * @method requestFile
 * 
 * Sends an http request to given url and saves response file
 * to temp directory of application. If request ends successfully
 * onLoad callback will be called with received File object.
 * 
 * @param {String} url URL of file
 * @param {String} fileName File name
 * @param {Function} onLoad Callback for success case
 * @param {Function} onError Callback for error case
 * @return UI.File
 * @since 0.2
 */
http.requestFile = function(url, fileName, onLoad, onError) {}

/**
 * @method requestImage
 * 
 * Sends an http request to given url. If request ends successfully
 * onLoad callback will be called with received UI.Image object.
 * 
 * @param {String} url URL of Image
 * @param {Function} onLoad Callback for success case
 * @param {Function} onError Callback for error case
 * @return UI.Image
 * @since 0.2
 */
http.requestImage = function(url, onLoad, onError) {}

/**
 * @method requestString
 * 
 * Sends an http request to given url. If request ends successfully
 * onLoad callback will be called with received string.
 * 
 * @param {String} url URL
 * @param {Function} onLoad Callback for success case
 * @param {Function} onError Callback for error case
 * @return String
 * @since 0.2
 */
http.requestString = function(url, onLoad, onError) {}

/**
 * @method requestJSON
 * 
 * Sends an http request to given url. If request ends successfully
 * onLoad callback will be called with received JSON object.
 * 
 * @param {String} url URL
 * @param {Function} onLoad Callback for success case
 * @param {Function} onError Callback for error case
 * @return String
 * @since 0.2
 */
http.requestJSON = function(url, onLoad, onError) {}

/**
 * @method request
 * 
 * Sends an http request defined with parameters.
 * 
 * @param {Object} params Parameters
 * @param {String} params.url URL
 * @param {Object} params.headers Headers
 * @param {String} params.method Http request method
 * @param {String} params.body Http request body
 * @param {String} params.user Username for authorization if needed
 * @param {String} params.password Password for authorization if needed
 * @param {onLoad} onLoad Callback for success case
 * @param {onError} onError Callback for error case
 * @since 0.2
 */
http.request = function(params, onLoad, onError) {}
/**
 * @callback onLoad
 * @param {object} e.headers
 * @param {string} e.body
 */

 /**
 * @callback onError
 * @param {object} e
 * @param {string} e.message
 */

module.exports = http;