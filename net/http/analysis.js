/**
 * @class Net.Http
 * 
 * http module allows sending http requests.
 * 
 *     @example
 *     const Http = require("sf-core/net/http");
 *     var http = new Http();
 *     http.request({
 *         'url':'YOUR_URL_HERE',
 *         'headers': {
 *             // YOUR_HEADER_HERE'
 *          },
 *         'method':'HTTP_METHOD_HERE',
 *         'body': 'YOUR_BODY_HERE',
 *         onLoad: function(response){
 *             // Handling image request response 
 *             myImageView.image = Image.createFromBlob(response.body);
 *             // Handling text request response
 *             myLabel.text = response.body.toString();
 *         },
 *         onError: function(e){
 *             // Handle error like:
 *             if(e.statusCode === 500){
 *                 console.log("Internal Server Error Occurred.");
 *             }
 *             else{
 *                 console.log("Server responsed with: " + e.statusCode + ". Message is: " + e.message);
 *             }
 *         }
 *     });
 */
var Http = function(params){    
    /**
     * Gets/sets request timeout.
     *
     * @property {Number} timeout
     * @default Defaults to 60 second
     * @android
     * @ios
     */
    this.timeout = 60000;
    
    /**
     * Gets/sets request headers.
     *
     * @property {Object} headers
     * @android
     * @ios
     */
    this.headers = {};
    
    /**
     * Cancels all requests.
     *
     * @method cancelAll
     * @android
     * @ios
     */
    this.cancelAll = function(){};
    /**
     * @method requestFile
     * 
     * Sends an http request to given url and saves response file
     * to temp directory of application. If request ends successfully
     * onLoad callback will be called with received File object.
     * 
     * @param {Object} params 
     * @param {String} params.url URL of file
     * @param {String} params.fileName File name
     * @param {Function} params.onLoad Callback for success case
     * @param {Object} params.onLoad.e
     * @param {IO.File} params.onLoad.e.file
     * @param {Number} params.onLoad.e.statusCode
     * @param {Object} params.onLoad.e.headers
     * @param {Function} params.onError Callback for error case
     * @param {Object} params.onError.e 
     * @param {String} params.onError.e.message
     * @param {Object} params.onError.e.body
     * @param {Number} params.onError.e.statusCode
     * @param {Object} params.onError.e.headers
     * @return {Net.Http.Request}
     * @since 0.1
     */
    this.requestFile = function(params) {};
    /*
     * @param {Object} params 
     * @param {String} params.url URL
     * @param {Object} params.headers Headers
     * @param {String} params.method Http request method 
     * @param {Object[]|Blob} params.body 
     * @param {String} params.body.name
     * @param {String} params.body.fileName
     * @param {String} params.body.contentType
     * @param {Blob} params.body.value
     * @param {String} params.user Username for authorization if needed
     * @param {String} params.password Password for authorization if needed
     * @param {Function} params.onLoad Callback for success case
     * @param {Object} params.onLoad.e
     * @param {Blob} params.onLoad.e.body
     * @param {Number} params.onLoad.e.statusCode
     * @param {Object} params.onLoad.e.headers
     * @param {Function} params.onError Callback for error case
     * @param {Object} params.onError.e 
     * @param {Object} params.onError.e.body Body of the error
     * @param {Number} params.onError.e.statusCode Error status code
     * @param {Object} params.onError.e.headers Headers sent with error
    */
    this.upload = function(params) {};
    
    
    /**
     * @method requestImage
     * 
     * Sends an http request to given url. If request ends successfully
     * onLoad callback will be called with received UI.Image object.
     * 
     * @param {Object} params 
     * @param {String} params.url URL of file
     * @param {Function} params.onLoad Callback for success case
     * @param {Object} params.onLoad.e
     * @param {UI.Image} params.onLoad.e.image
     * @param {Number} params.onLoad.e.statusCode
     * @param {Object} params.onLoad.e.headers
     * @param {Function} params.onError Callback for error case
     * @param {Object} params.onError.e 
     * @param {String} params.onError.e.message
     * @param {Object} params.onError.e.body
     * @param {Number} params.onError.e.statusCode
     * @param {Object} params.onError.e.headers
     * @return {Net.Http.Request}
     * @since 0.1
     */
    this.requestImage = function(params) {};

    /**
     * @method requestString
     * 
     * Sends an http request to given url. If request ends successfully
     * onLoad callback will be called with received string.
     * 
     * @param {Object} params 
     * @param {String} params.url URL of file
     * @param {Function} params.onLoad Callback for success case
     * @param {Object} params.onLoad.e
     * @param {String} params.onLoad.e.string
     * @param {Number} params.onLoad.e.statusCode
     * @param {Object} params.onLoad.e.headers
     * @param {Function} params.onError Callback for error case
     * @param {Object} params.onError.e 
     * @param {String} params.onError.e.message
     * @param {Object} params.onError.e.body
     * @param {Number} params.onError.e.statusCode
     * @param {Object} params.onError.e.headers
     * @return {Net.Http.Request}
     * @since 0.1
     */
    this.requestString = function(params) {};

    /**
     * @method requestJSON
     * 
     * Sends an http request to given url. If request ends successfully
     * onLoad callback will be called with received JSON object.
     * 
     * @param {Object} params 
     * @param {String} params.url URL of file
     * @param {Function} params.onLoad Callback for success case
     * @param {Object} params.onLoad.e
     * @param {Object} params.onLoad.e.JSON
     * @param {Number} params.onLoad.e.statusCode
     * @param {Object} params.onLoad.e.headers
     * @param {Function} params.onError Callback for error case
     * @param {Object} params.onError.e 
     * @param {String} params.onError.e.message
     * @param {Object} params.onError.e.body
     * @param {Number} params.onError.e.statusCode
     * @param {Object} params.onError.e.headers
     * @return {Net.Http.Request}
     * @since 0.1
     */
    this.requestJSON = function(params) {};

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
     * @param {Function} params.onLoad Callback for success case
     * @param {Object} params.onLoad.e
     * @param {Blob} params.onLoad.e.body
     * @param {Number} params.onLoad.e.statusCode
     * @param {Object} params.onLoad.e.headers
     * @param {Function} params.onError Callback for error case
     * @param {Object} params.onError.e 
     * @param {String} params.onError.e.message Message of the error
     * @param {Object} params.onError.e.body Body of the error
     * @param {Number} params.onError.e.statusCode Error status code
     * @param {Object} params.onError.e.headers Headers sent with error
     * @return {Net.Http.Request}
     * @since 0.1
     */
    this.request = function(params) {};
};


/**
 * @class Net.Http.Request
 * 
 * Http Request CANNOT be initialized. Use http's request methods instead.
 * 
 *     @example
 *     const Http = require("sf-core/net/http");
 *
 *     var http = new Http();
 *     var myImageUrl = your-image-url;
 *     var request = http.requestImage({url: myImageUrl, onLoad: onLoad, onError: onError});
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

module.exports = Http;
