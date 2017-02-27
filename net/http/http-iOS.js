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

http.getFile = function(url, fileName, onLoad, onError) {
    return new http.Request(
            SMFHttp.getFileFrom(
                url,
                fileName,
                function(e){
                    const File = require('nf-core/io/file');
                    var file = new File({path:e});
                    onLoad(file);
                },
                function(e){
                    onError(e);
                }
            )
        );
};

http.getImage = function(url, onLoad, onError) {
    return new http.Request(
            SMFHttp.getImageFrom(
                url,
                function(e){
                    const Image = require('nf-core/ui/image');
                    var image = Image.createFromImage(e);
                    onLoad(image);
                },
                function(e){
                    onError(e);
                }
            )
        );
};

http.getString = function(url, onLoad, onError) {
    return new http.Request(
            SMFHttp.getStringFrom(
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

http.getJSON = function(url, onLoad, onError) {
    return new http.Request(
            SMFHttp.getJSONFrom(
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
            SMFHttp.requestWith(
                params,
                function(e){
                    onLoad(e);
                },
                function(e){
                    onError(e);
                }
            )
        );
};

module.exports = http;