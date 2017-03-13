/**
 * @class Net.Http.Request
 * 
 * Http Request should NOT be initialized. Use http's request methods instead.
 * 
 *     @example
 *     const http = require("nf-core/net/http");
 *
 *     var myImageUrl = your-image-url;
 *     var request = http.requestImage(myImageUrl, onLoad, onError);
 *     http.cancelRequest(request);
 * 
 */
const Request = function() {};

module.exports = Request;