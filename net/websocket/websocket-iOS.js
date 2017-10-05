const Blob = require("sf-core/blob");

const SRReadyState = {
    SR_CONNECTING : 0,
    SR_OPEN : 1,
    SR_CLOSING : 2,
    SR_CLOSED : 3
}

var webSocket = function WebSocket(params){
    var self = this;
    
    if (!self.nativeObject) {
        var alloc;
        var invocationAlloc = __SF_NSInvocation.createClassInvocationWithSelectorInstance("alloc", "SRWebSocket");
        if (invocationAlloc) {
            invocationAlloc.setClassTargetFromString("SRWebSocket");
            invocationAlloc.setSelectorWithString("alloc");
            invocationAlloc.retainArguments();
            
            invocationAlloc.invoke();
            alloc = invocationAlloc.getReturnValue();
        }
        
        var nsURL;
        var nsURLRequest;
        
        if (params && params.url) {
           nsURL = __SF_NSURL.URLWithString(params.url);
           nsURLRequest = __SF_NSURLRequest.requestWithURL(nsURL); 
        }else{
            throw new Error('invalid arguments');
        }
        
        var socket;
        var invocationInit = __SF_NSInvocation.createInvocationWithSelectorInstance("initWithURLRequest:", alloc);
        if (invocationInit) {
            invocationInit.target = alloc;
            invocationInit.setSelectorWithString("initWithURLRequest:");
            invocationInit.retainArguments();
            invocationInit.setNSObjectArgumentAtIndex(nsURLRequest,2);    

            invocationInit.invoke();
            socket = invocationInit.getReturnValue();
        }
        self.nativeObject = socket;
    }
    
    self.open = function () {
        var readyState;
        var invocationReadyState = __SF_NSInvocation.createInvocationWithSelectorInstance("readyState", self.nativeObject);
        if (invocationReadyState) {
            invocationReadyState.target = self.nativeObject;
            invocationReadyState.setSelectorWithString("readyState");
            invocationReadyState.retainArguments();
            
            invocationReadyState.invoke();
            readyState = invocationReadyState.getNSIntegerReturnValue();
        }
        
        if (readyState !== SRReadyState.SR_CONNECTING) {
            throw new Error('Cannot call open more than once.');
        }
        
        var invocationOpen = __SF_NSInvocation.createInvocationWithSelectorInstance("open", self.nativeObject);
        if (invocationOpen) {
            invocationOpen.target = self.nativeObject;
            invocationOpen.setSelectorWithString("open");
            invocationOpen.retainArguments();
            
            invocationOpen.invoke();
        }
    };
    self.open();
    
    Object.defineProperty(self, 'url', {
        get: function() 
        {
            var url;
            var invocationUrl= __SF_NSInvocation.createInvocationWithSelectorInstance("url", self.nativeObject);
            if (invocationUrl) {
                invocationUrl.target = self.nativeObject;
                invocationUrl.setSelectorWithString("url");
                invocationUrl.retainArguments();
                
                invocationUrl.invoke();
                url = invocationUrl.getReturnValue();
            }
            if (url) {
                return url.absoluteString;
            }else{
                return undefined;
            }
        },
        enumerable: true
    });
    
    self.close = function (params) {
        var readyState;
        var invocationReadyState = __SF_NSInvocation.createInvocationWithSelectorInstance("readyState", self.nativeObject);
        if (invocationReadyState) {
            invocationReadyState.target = self.nativeObject;
            invocationReadyState.setSelectorWithString("readyState");
            invocationReadyState.retainArguments();
            
            invocationReadyState.invoke();
            readyState = invocationReadyState.getNSIntegerReturnValue();
        }
        
        if (params && params.code){
            if (readyState === SRReadyState.SR_CONNECTING) {
                var invocationDelegate = __SF_NSInvocation.createInvocationWithSelectorInstance("setDelegate:", socket);
                if (invocationDelegate) {
                    invocationDelegate.target = socket;
                    invocationDelegate.setSelectorWithString("setDelegate:");
                    invocationDelegate.retainArguments();
                    invocationDelegate.setNSObjectArgumentAtIndex(undefined,2);
                    
                    invocationDelegate.invoke();
                }
                if (typeof self.onClose === 'function') {
                    self.onClose({code: params.code, reason: params.reason});
                }
            }else{
                var invocationcloseWithCode = __SF_NSInvocation.createInvocationWithSelectorInstance("closeWithCode:reason:", self.nativeObject);
                if (invocationcloseWithCode) {
                    invocationcloseWithCode.target = self.nativeObject;
                    invocationcloseWithCode.setSelectorWithString("closeWithCode:reason:");
                    invocationcloseWithCode.retainArguments();
                    invocationcloseWithCode.setNSIntegerArgumentAtIndex(params.code,2); 
                    if (params.reason) {
                        invocationcloseWithCode.setNSStringArgumentAtIndex(params.reason,3); 
                    }else{
                        invocationcloseWithCode.setNSStringArgumentAtIndex(undefined,3); 
                    }
                
                    invocationcloseWithCode.invoke();
                }
            }
        }else{
            throw new Error('Code parameter cannot be null');
        }
    };
    
    self.send = function (params) {
        var error;
        if (params && (params.data instanceof Blob)) {
            var invocationSendData = __SF_NSInvocation.createInvocationWithSelectorInstance("sendData:", self.nativeObject);
            if (invocationSendData) {
                invocationSendData.target = self.nativeObject;
                invocationSendData.setSelectorWithString("sendData:");
                invocationSendData.retainArguments();
                invocationSendData.setNSObjectArgumentAtIndex(params.data.nativeObject,2);
                
                invocationSendData.invoke();
                error = invocationSendData.getReturnValue();
            }
        }else{
            var invocationSendString = __SF_NSInvocation.createInvocationWithSelectorInstance("sendString:", self.nativeObject);
            if (invocationSendString) {
                invocationSendString.target = self.nativeObject;
                invocationSendString.setSelectorWithString("sendString:");
                invocationSendString.retainArguments();
                invocationSendString.setNSStringArgumentAtIndex(params.data,2);
                
                invocationSendString.invoke();
                error = invocationSendString.getReturnValue();
            }
        }
        return (error) ? false : true;
    };
    
    var WebSocketDelegate = SF.defineClass("WebSocketControllerDelegate : NSObject <SRWebSocketDelegate>", {
        webSocketDidOpen : function(webSocket) {
            if (typeof self.onOpen === 'function') {
                self.onOpen();
            }
        },webSocketDidReceiveMessageWithString : function(webSocket, string) {
            if (typeof self.onMessage === 'function') {
                self.onMessage({string : string});
            }
        },webSocketDidReceiveMessageWithData : function(webSocket, data){
            if (typeof self.onMessage === 'function') {
                var blob = new Blob(data);
                self.onMessage({blob : blob});
            }
        },webSocketDidFailWithError : function(webSocket, error){
            if (typeof self.onFailure === 'function') {
                self.onFailure({code: error.code, message: error.localizedDescription});
            }
        },webSocketDidCloseWithCodeReasonWasClean : function(webSocket,code,reason,wasClean){
            var tempReason;
            if (reason !== "undefined") {
                tempReason = reason;
            }
            if (typeof self.onClose === 'function') {
                self.onClose({code: code, reason: tempReason});
            }
        }
    });

    self.delegateInstance = WebSocketDelegate.new();
    
    var invocationDelegate = __SF_NSInvocation.createInvocationWithSelectorInstance("setDelegate:", socket);
    if (invocationDelegate) {
        invocationDelegate.target = socket;
        invocationDelegate.setSelectorWithString("setDelegate:");
        invocationDelegate.retainArguments();
        invocationDelegate.setNSObjectArgumentAtIndex(self.delegateInstance,2);
        
        invocationDelegate.invoke();
    }
    
};


module.exports = webSocket;