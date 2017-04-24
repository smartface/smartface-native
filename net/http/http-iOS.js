const Blob = require("../../global/blob");

var http = {};

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

http.requestFile = function(url, fileName, onLoad, onError) {
    return new http.Request(
            __SF_Http.requestFileFrom(
                url,
                fileName,
                function(e){
                    const File = require('sf-core/io/file');
                    var file = new File({path:e});
                    onLoad(file);
                },
                function(e){
                    onError(e);
                }
            )
        );
};

http.requestImage = function(url, onLoad, onError) {
    return new http.Request(
            __SF_Http.requestImageFrom(
                url,
                function(e){
                    const Image = require('sf-core/ui/image');
                    var image = Image.createFromImage(e);
                    onLoad(image);
                },
                function(e){
                    onError(e);
                }
            )
        );
};

http.requestString = function(url, onLoad, onError) {
    return new http.Request(
            __SF_Http.requestStringFrom(
                url,
                function(e){
                    onLoad(e);
                },
                function(e){
                    onError(e);
                }
            )
        );
};

http.requestJSON = function(url, onLoad, onError) {
    return new http.Request(
            __SF_Http.requestJSONFrom(
                url,
                function(e){
                    onLoad(e);
                },
                function(e){
                    onError(e);
                }
            )
        );
};

http.request = function(params, onLoad, onError) {
    return new http.Request(
            __SF_Http.requestWith(
                params,
                function(e){
                    e.body = new Blob(e.body);
                    onLoad(e);
                },
                function(e){
                    onError(e);
                }
            )
        );
};

module.exports = http;