const Blob = require("../../global/blob");

var http = function Http(){
    var self = this;
    
    var _sessionConfiguration = null;
    if (!self.nativeObject) {
        self.nativeObject = new __SF_Http();
        _sessionConfiguration = SF.requireClass("NSURLSessionConfiguration").defaultSessionConfiguration();
    }
    
    ////////////////////////////////////////////////////////////////////////
    // Properties
    Object.defineProperty(self, 'timeoutIntervalForRequest', {
        get: function() {
            console.log("JS Getter");
            return _sessionConfiguration.timeoutIntervalForRequest;
        },
        set: function(value) {
            console.log("JS Setter : " + value );
            _sessionConfiguration.timeoutIntervalForRequest = value;
        },
        enumerable: true
    });
    
    ////////////////////////////////////////////////////////////////////////
    // Functions
    this.requestFile = function(url, fileName, onLoad, onError) {
        return new http.Request(
                self.nativeObject.requestFile(
                    _sessionConfiguration,
                    url,
                    fileName,
                    function(e){
                        const File = require('sf-core/io/file');
                        // Native returns file path first.
                        // Convert to sf-core file object.
                        e.file = new File({path:e.file});
                        onLoad(e);
                    },
                    function(e){
                        e.body = new Blob(e.body);
                        onError(e);
                    }
                )
            );
    };
    
    this.requestImage = function(url, onLoad, onError) {
        return new http.Request(
                self.nativeObject.requestImage(
                    _sessionConfiguration,
                    url,
                    function(e){
                        // Native returns UIImage instance.
                        // Convert to sf-core Image object.
                        const Image = require('sf-core/ui/image');
                        e.image = Image.createFromImage(e.image);
                        onLoad(e);
                    },
                    function(e){
                        e.body = new Blob(e.body);
                        onError(e);
                    }
                )
            );
    };

    this.requestString = function(url, onLoad, onError) {
        return new http.Request(
                self.nativeObject.requestString(
                    _sessionConfiguration,
                    url,
                    function(e){
                        onLoad(e);
                    },
                    function(e){
                        e.body = new Blob(e.body);
                        onError(e);
                    }
                )
            );
    };
    
    this.requestJSON = function(url, onLoad, onError) {
        return new http.Request(
                self.nativeObject.requestJSON(
                    _sessionConfiguration,
                    url,
                    function(e){
                        onLoad(e);
                    },
                    function(e){
                        e.body = new Blob(e.body);
                        onError(e);
                    }
                )
            );
    };
    
    this.request = function(params, onLoad, onError) {
        return new http.Request(
                self.nativeObject.request(
                    _sessionConfiguration,
                    params,
                    function(e){
                        e.body = new Blob(e.body);
                        onLoad(e);
                    },
                    function(e){
                        e.body = new Blob(e.body);
                        onError(e);
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
        self.nativeObject.suspend();
    };
    
    this.resume = function(){
        self.nativeObject.resume();
    };
    
    this.cancel = function(){
        self.nativeObject.cancel();
    };
};

module.exports = new http();