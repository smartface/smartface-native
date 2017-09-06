/**
 * @param {Object} params 
 * @param {String} params.url
 * 
 * @class Net.WebSocket
 */
function WebSocket(params) {
    this.url = ""; // readonly
    
    this.open = function(){};
     
    /**
     * @param {Object} params 
     * @param {int} params.code
     * @param {String} params.reason
     */
    this.close = function(params){};
    
    /**
     * @param {Object} params 
     * @param {String|Blob} params.data
     * @return {Boolean}
     */
    this.send = function(params) {};
    
    /**
     * @param {Object} params 
     * @param {Blob} params.data
     */
    this.ping = function() {};
    
    /**
     * @param {Object} params 
     * @param {String} params.string
     * @param {Blob} params.blob
     * @callback
     */
    this.onMessage = function(e){};
    
    /**
     * @callback
     */
    this.onOpen = function(){};
    
    /**
     * @param {Object} e 
     * @param {int} e.code
     * @param {String} e.reason
     * @callback
     */
    this.onClose = function(e){};
    
    /**
     * @param {Object} e 
     * @param {String} e.message
     * @param {Number} e.code
     * @callback
     */
    this.onFailure = function(e){};
    
    /**
     * @param {Object} e 
     * @param {Blob} e.blob
     * @callback
     */
    this.onPong = function(e){};
}

module.exports = WebSocket;