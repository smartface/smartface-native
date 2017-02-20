/**
 * @class Net.http
 * 
 * http module allows sending http requests.
 */
var http = {};

/**
 * @method getFile
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
http.getFile = function(url, fileName, onLoad, onError) {}

/**
 * @method getImage
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
http.getImage = function(url, onLoad, onError) {}

/**
 * @method getString
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
http.getString = function(url, onLoad, onError) {}

/**
 * @method getJSON
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
http.getJSON = function(url, onLoad, onError) {}

/**
 * @method request
 * 
 * Sends an http request defined with parameters.
 * 
 * @param {Object} params Parameters
 * @param {String} params.url URL
 * @param {String} params.method Http request method
 * @param {String} params.body Http request body
 * @param {Function} onLoad Callback for success case
 * @param {Function} onError Callback for error case
 * @since 0.2
 */
http.request = function(params, onLoad, onError) {}

module.exports = http;