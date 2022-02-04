/**
 * 
 * WebSocket creates a web socket client. It connects to a WebSocket server and then sending 
 * and receiving data on the connection. {@link Net.WebSocket#url url}  parameter must be passed in constructor.
 * 
 *     @example
 *     const WebSocket = require("@smartface/native/net/websocket");
 * 
 *     var myWebSocket = new WebSocket({url: "your-server-url"});
 *     myWebSocket.onOpen = function() {
 *         console.log("Web socket opened.");
 *         console.log("Send string.");
 *         myWebSocket.send({data: "some data"});
 *     };
 * 
 *     myWebSocket.onClose = function(e) {
 *         console.log("Socket closed.");
 *     }
 * 
 *     myWebSocket.onMessage = function(e) {
 *         console.log("Message received.");
 *         console.log("Close socket connection.");
 *         myWebSocket.close({code: 1000});
 *     };
 * 
 * @class Net.WebSocket
 * @since 1.1.17
 */
function WebSocket(params) {
  /**
   * Gets url of socket connection.
   * If you want to change the url, you have to call the constructor again (create a new instance).
   *
   * @property {String} url
   * @readonly
   * @android
   * @ios
   * @since 1.1.17
   */
  this.url;

  /**
	 * Gets headers of socket connection.
   * If you want to change the headers, you have to call the constructor again (create a new instance).
	 *
	 * @property {Object} headers
	 * @readonly
	 * @android
	 * @ios
	 * @since 1.1.17
	 */
  this.headers = {};

  /**
   * Close the web socket.
   * @param {Object} params 
   * @param {Number} params.code
   * @param {String} [params.reason]
   * @since 1.1.17
   */
  this.close = function (params) { };

  /**
   * Send data to a web socket server.
   * @param {Object} params 
   * @param {String|Blob} params.data
   * @return {Boolean}
   * @since 1.1.17
   */
  this.send = function (params) { };

  /**
   * Invoked when a web socket has been accepted by the web socket server.
   * @event
   * @deprecated
   * @since 1.1.17
   */
  this.onOpen = function () { };

  /**
   * Invoked when a message has been received. 
   * @param {Object} params 
   * @param {String} params.string
   * @param {Blob} params.blob
   * @deprecated
   * @event
   * @since 1.1.17
   */
  this.onMessage = function (e) { };

  /**
   * Invoked when the web socket has been closed.
   * @param {Object} e 
   * @param {Number} e.code
   * @param {String} e.reason
   * @deprecated
   * @event
   * @since 1.1.17
   */
  this.onClose = function (e) { };

  /**
   * Invoked when an error occured on reading or writing to the network.
   * @param {Object} e 
   * @param {String} e.message
   * @param {Number} e.code
   * @deprecated
   * @event
   * @since 1.1.17
   */
  this.onFailure = function (e) { };



  /**
  * Invoked when a web socket has been accepted by the web socket server.
  * @event
  * @since 1.1.17
  */
  this.Events.Open = "open";

  /**
   * Invoked when a message has been received. 
   * @param {Object} params 
   * @param {String} params.string
   * @param {Blob} params.blob
   * @event
   * @since 1.1.17
   */
  this.Events.Message = "message";

  /**
   * Invoked when the web socket has been closed.
   * @param {Object} e 
   * @param {Number} e.code
   * @param {String} e.reason
   * @event
   * @since 1.1.17
   */
  this.Events.Close = "close";

  /**
   * Invoked when an error occured on reading or writing to the network.
   * @param {Object} e 
   * @param {String} e.message
   * @param {Number} e.code
   * @event
   * @since 1.1.17
   */
  this.Events.Failure = "failure";
}

/**
 * Event to be implemented
 * @param {string} event - Event type to be created
 * @param {*} callback
 * @returns {Function} unlistener function. Call it to remove the event
 * @android
 * @ios
 */
WebSocket.prototype.on = function (event, callback) { }
/**
 * Event to be removed
 * @param {string} event - Event type to be created
 * @param {*} callback
 * @returns {Function} unlistener function. Call it to remove the event
 * @android
 * @ios
 */
WebSocket.prototype.off = function (event, callback) { }

/**
 * Event to be emitted
 * @param {string} event - Event type to be triggered
 * @param {*} detail - Pass appropiate parameter to invoke the relevant event
 * @android
 * @ios
 */
WebSocket.prototype.emit = function (event, detail) { }


module.exports = WebSocket;