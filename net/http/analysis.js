/**
 * @class Net.Http
 * 
 * http module allows sending http requests.
 * 
 *     @example
 *     const Http = require("sf-core/net/http");
 *     Http.request(
 *         {
 *             'url':'YOUR_URL_HERE',
 *             'headers': {
 *                 // YOUR_HEADER_HERE',
 *             },
 *             'method':'HTTP_METHOD_HERE',
 *             'body': 'YOUR_BODY_HERE',
 *         },
 *         function(response){
 *             // Handling image request response 
 *             myImageView.image = Image.createFromBlob(response.body);
 *             // Handling text request response
 *             myLabel.text = response.body.toString();
 *         },
 *         function(e){
 *             // Handle error like:
 *             if(e.statusCode === 500){
 *                 console.log("Internal Server Error Occurred.");
 *             }
 *             else{
 *                 console.log("Server responsed with: " + e.statusCode + ". Message is: " + e.message);
 *             }
 *         }
 *     );
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
 * @param {Object} onError.params 
 * @param {String} onError.params.message
 * @param {Object} onError.params.body
 * @param {String} onError.params.statusCode
 * @param {Object} onError.params.headers
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
 * @param {Object} onError.params 
 * @param {String} onError.params.message
 * @param {Object} onError.params.body
 * @param {String} onError.params.statusCode
 * @param {Object} onError.params.headers
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
 * @param {Object} onError.params 
 * @param {String} onError.params.message
 * @param {Object} onError.params.body
 * @param {String} onError.params.statusCode
 * @param {Object} onError.params.headers
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
 * @param {Object} onError.params 
 * @param {String} onError.params.message
 * @param {Object} onError.params.body
 * @param {String} onError.params.statusCode
 * @param {Object} onError.params.headers
 * @return {Net.Http.Request}
 * @since 0.1
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
 * @param {Function} onLoad Callback for success case
 * @param {Object} onLoad.params
 * @param {Blob} onLoad.params.body
 * @param {Number} onLoad.params.statusCode
 * @param {Object} onLoad.params.headers
 * @param {Function} onError Callback for error case
 * @param {Object} onError.params 
 * @param {Object} onError.params.body Body of the error
 * @param {String} onError.params.statusCode Error status code
 * @param {Object} onError.params.headers Headers sent with error
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
function Request(){}

/**
 * @method cancel
 * 
 * Stops listening the response of the request.
 * 
 * @since 0.1
 */
Request.prototype.cancel = function(){};

module.exports = http;