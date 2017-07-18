const Blob = require("../../global/blob");

var http = function Http(){
    var self = this;
    if (!self.nativeObject) {
        self.nativeObject = new __SF_Http();
    }
    
    ////////////////////////////////////////////////////////////////////////
    // Properties
    Object.defineProperty(self, 'timeoutIntervalForRequest', {
        get: function() {
            console.log("JS Getter");
            return self.nativeObject.timeoutIntervalForRequest;
        },
        set: function(value) {
            console.log("JS Setter : " + value );
            self.nativeObject.timeoutIntervalForRequest = value;
        },
        enumerable: true
    });
    
    ////////////////////////////////////////////////////////////////////////
    // Functions
    this.requestFile = function(url, fileName, onLoad, onError) {
        return new http.Request(
                self.nativeObject.requestFileFrom(
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
                self.nativeObject.requestImageFrom(
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
                self.nativeObject.requestStringFrom(
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
                self.nativeObject.requestJSONFrom(
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
                self.nativeObject.requestWith(
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