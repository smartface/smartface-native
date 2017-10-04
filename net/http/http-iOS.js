const Blob = require("../../global/blob");

var http = function Http(params){
    var self = this;
    
    if (!self.nativeObject) {
        self.nativeObject = new __SF_Http();
    }
    
    ////////////////////////////////////////////////////////////////////////
    // Properties
    Object.defineProperty(self, 'timeout', {
        get: function() {
            return self.nativeObject.timeoutIntervalForRequest;
        },
        set: function(value) {
            self.nativeObject.timeoutIntervalForRequest = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'headers', {
        get: function() {
            return self.nativeObject.defaultHTTPHeaders;
        },
        set: function(value) {
            self.nativeObject.defaultHTTPHeaders = value;
        },
        enumerable: true
    });
    
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
    
    ////////////////////////////////////////////////////////////////////////
    // Functions
    this.cancelAll = function () {
        self.nativeObject.cancelAll();
    };
    
    this.requestFile = function(params) {
        
        var url = params.url;
        var fileName = params.fileName;
        var onLoad = params.onLoad;
        var onError = params.onError;
        
        return new http.Request(
                self.nativeObject.requestFile(
                    url,
                    fileName,
                    function(e){
                        const File = require('sf-core/io/file');
                        // Native returns file path first.
                        // Convert to sf-core file object.
                        e.file = new File({path:e.file});
                        if (onLoad) {
                        	onLoad(e);
                        }
                    },
                    function(e){
                        e.body = new Blob(e.body);
                        if (onError) {
                        	onError(e);
                        }
                    }
                )
            );
    };
    
    this.requestImage = function(params) {
        
        var url = params.url;
        var onLoad = params.onLoad;
        var onError = params.onError;
        
        return new http.Request(
                self.nativeObject.requestImage(
                    url,
                    function(e){
                        // Native returns UIImage instance.
                        // Convert to sf-core Image object.
                        const Image = require('sf-core/ui/image');
                        e.image = Image.createFromImage(e.image);
                        if (onLoad) {
                        	onLoad(e);
                        }
                    },
                    function(e){
                        e.body = new Blob(e.body);
                        if (onError) {
                        	onError(e);
                        }
                    }
                )
            );
    };

    this.requestString = function(params) {
        
        var url = params.url;
        var onLoad = params.onLoad;
        var onError = params.onError;
        
        return new http.Request(
                self.nativeObject.requestString(
                    url,
                    function(e){
                        if (onLoad) {
                        	onLoad(e);
                        }
                    },
                    function(e){
                        e.body = new Blob(e.body);
                        if (onError) {
                        	onError(e);
                        }
                    }
                )
            );
    };
    
    this.requestJSON = function(params) {
        
        var url = params.url;
        var onLoad = params.onLoad;
        var onError = params.onError;
        
        return new http.Request(
                self.nativeObject.requestJSON(
                    url,
                    function(e){
                        if (onLoad) {
                        	onLoad(e);
                        }
                    },
                    function(e){
                        e.body = new Blob(e.body);
                        if (onError) {
                        	onError(e);
                        }
                    }
                )
            );
    };
    
    this.request = function(params) {
        
        var onLoad = params.onLoad;
        var onError = params.onError;
        
        return new http.Request(
                self.nativeObject.request(
                    params,
                    function(e){
                        e.body = new Blob(e.body);
                        if (onLoad) {
                        	onLoad(e);
                        }
                    },
                    function(e){
                        e.body = new Blob(e.body);
                        if (onError) {
                        	onError(e);
                        }
                    }
                )
            );
    };
    
    this.upload = function(params) {
        var onLoad = params.onLoad;
        var onError = params.onError;
        
        // Get NSData inside JS object
        if( Object.prototype.toString.call( params.body ) === '[object Array]' ) {
            for (var i = 0; i < params.body.length; i++) { 
                params.body[i].value = params.body[i].value.nativeObject;
            }
        } else {
            params.body = params.body.nativeObject;
        }
        
        return new http.Request(
                self.nativeObject.upload(
                    params,
                    function(e){
                        e.body = new Blob(e.body);
                        if (onLoad) {
                        	onLoad(e);
                        }
                    },
                    function(e){
                        e.body = new Blob(e.body);
                        if (onError) {
                        	onError(e);
                        }
                    }
                )
            );
    };
};

http.Request = function Request(nativeObject) {
    var self = this;
    if (nativeObject) {
        self.nativeObject = nativeObject;
    }
    
    this.suspend = function(){
        if (self.nativeObject) {
            self.nativeObject.suspend();
        }
    };
    
    this.resume = function(){
        if (self.nativeObject) {
            self.nativeObject.resume();
        }
    };
    
    this.cancel = function(){
        if (self.nativeObject) {
            self.nativeObject.cancel();
        }
    };
};

module.exports = http;