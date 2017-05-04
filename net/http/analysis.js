/**
 * @class Net.Http
 * 
 * http module allows sending http requests.
 * 
 *     @example
 *     const http = require("sf-core/net/http");
 *     var myImageUrl = your-image-url;
 *     var request = http.requestImage(myImageUrl, onLoad, onError);
 * 
 *     function onLoad(response) {
 *         var image = response;
 *     }
 * 
 *     function onError(error) {
 *         alert(error);
 *     }
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
 * @param {IO.File} onLoad.e
 * @param {Function} onError Callback for error case
 * @param {String} onError.message
 * @param {String} onError.statusCode
 * @return {Net.Http.Request}
 * @since 0.1
 */
http.requestFile = function(url, fileName, onLoad, onError) {};

/**
 * @method requestImage
 * 
 * Sends an http request to given url. If request ends successfully
 * onLoad callback will be called with received UI.Image object.
 * 
 * @param {String} url URL of Image
 * @param {Function} onLoad Callback for success case
 * @param {UI.Image} onLoad.e
 * @param {Function} onError Callback for error case
 * @param {String} onError.message
 * @param {String} onError.statusCode
 * @return {Net.Http.Request}
 * @since 0.1
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
 * @param {String} onLoad.e
 * @param {Function} onError Callback for error case
 * @param {String} onError.message
 * @param {String} onError.statusCode
 * @return {Net.Http.Request}
 * @since 0.1
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
 * @param {String} onLoad.e
 * @param {Function} onError Callback for error case
 * @param {String} onError.message
 * @param {String} onError.statusCode
 * @return {Net.Http.Request}
 * @since 0.1
 */
http.requestJSON = function(url, onLoad, onError) {}

/**
 * @method request
 * 
 * Sends an http request defined with parameters.
 * 
 *     @example
 *     const http = require("sf-core/net/http");
 *     var myHeaders = {
 *         "Content-Type": "text/plain;charset=UTF-8"
 *     }
 * 
 *     var params = {
 *         url: your-url,
 *         body: your-body,
 *         method: "POST",
 *         headers: myHeaders
 *     }
 *     
 *     http.request(params, onLoad, onError);
 *     
 *     function onLoad(response) {
 *         var body = response.body;
 *         var headers = params.headers;
 *     }
 *     function onError(error) {
 *         alert(error);
 *     }
 * 
 * @param {Object} params Parameters
 * @param {String} params.url URL
 * @param {Object} params.headers Headers
 * @param {String} params.method Http request method
 * @param {String} params.body Http request body
 * @param {String} params.user Username for authorization if needed
 * @param {String} params.password Password for authorization if needed
 * @param {Function} onLoad Callback for success case
 * @param {Blob} onLoad.body
 * @param {Object} onLoad.headers
 * @param {Function} onError Callback for error case
 * @param {String} onError.message
 * @param {String} onError.statusCode
 * @return {Net.Http.Request}
 * @since 0.1
 */
http.request = function(params, onLoad, onError) {};

/**
 * @class Net.Http.Request
 * 
 * Http Request CANNOT be initialized. Use http's request methods instead.
 * 
 *     @example
 *     const http = require("sf-core/net/http");
 *
 *     var myImageUrl = your-image-url;
 *     var request = http.requestImage(myImageUrl, onLoad, onError);
 *     request.cancel();
 * 
 */
const Request = function() {

    /**
     * @method cancel
     * 
     * Stops listening the response of the request.
     * 
     * @since 0.1
     */
    this.cancel = function(){};
};

module.exports = http;