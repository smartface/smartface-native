/**
 * 
 * WebSocket creates a web socket client. It connects to a WebSocket server and then sending 
 * and receiving data on the connection. {@link Net.WebSocket#url url}  parameter must be passed in constructor.
 * 
 *     @example
 *     const WebSocket = require("sf-core/net/websocket");
 * 
 *     var myWebSocket = new WebSocket({url: "your-server-url"});
 *     myWebSocket.onOpen = function() {
 *         console.log("Web socket opened.");
 *         console.log("Send string.");
 *         myWebSocket.send("some data");
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
     *
     * @property {String} url
     * @readonly
     * @android
     * @ios
     * @since 1.1.17
     */
    this.url; 
    
    /**
     * Close the web socket.
     * @param {Object} params 
     * @param {Number} params.code
     * @param {String} [params.reason]
     * @since 1.1.17
     */
    this.close = function(params){};
    
    /**
     * Send data to a web socket server.
     * @param {Object} params 
     * @param {String|Blob} params.data
     * @return {Boolean}
     * @since 1.1.17
     */
    this.send = function(params) {};
    
    /**
     * Invoked when a web socket has been accepted by the web socket server.
     * @event
     * @since 1.1.17
     */
    this.onOpen = function(){};
    
    /**
     * Invoked when a message has been received. 
     * @param {Object} params 
     * @param {String} params.string
     * @param {Blob} params.blob
     * @event
     * @since 1.1.17
     */
    this.onMessage = function(e){};
    
    /**
     * Invoked when the web socket has been closed.
     * @param {Object} e 
     * @param {Number} e.code
     * @param {String} e.reason
     * @event
     * @since 1.1.17
     */
    this.onClose = function(e){};
    
    /**
     * Invoked when an error occured on reading or writing to the network.
     * @param {Object} e 
     * @param {String} e.message
     * @param {Number} e.code
     * @event
     * @since 1.1.17
     */
    this.onFailure = function(e){};
}

module.exports = WebSocket;