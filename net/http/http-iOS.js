var http = {};

http.getFile = function(url, fileName, onLoad, onError) {
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
    );
};

http.getImage = function(url, onLoad, onError) {
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
    );
};

http.getString = function(url, onLoad, onError) {
    SMFHttp.getStringFrom(
        url,
        function(e){
            onLoad(e);
        },
        function(e){
            onError(e);
        }
    );
};

http.getJSON = function(url, onLoad, onError) {
    SMFHttp.getJSONFrom(
        url,
        function(e){
            onLoad(e);
        },
        function(e){
            onError(e);
        }
    );
};

http.request = function(params, onLoad, onError) {
    SMFHttp.requestWith(
        params,
        function(e){
            onLoad(e);
        },
        function(e){
            onError(e);
        }
    );
};

module.exports = http;