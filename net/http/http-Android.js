var html = {};

const Volley = requireClass("com.android.volley.toolbox.Volley");
const Request = requireClass("com.android.volley.Request");
const Response = requireClass("com.android.volley.Response");
// const requestQueue = Volley.newRequestQueue(Android.getActivity());

html.getString = function(url, onLoad, onError) {
    try {
        var responseListener = Response.Listener.implement({
            onResponse: function(response) {
                console.log(response);
                onLoad(response);
            }
        });
        var responseErrorListener = Response.ErrorListener.implement({
            onErrorResponse: function(error) {
                onError(error);
            }
        });
        
        const StringRequest = requireClass("com.android.volley.toolbox.StringRequest");
        var myRequest = new StringRequest(Request.Method.GET, url,
                responseListener, responseErrorListener);

        var requestQueue = Volley.newRequestQueue(Android.getActivity());
        requestQueue.add(myRequest);
    } catch(e) {
        console.log(e);
        onError(e);
    }
}

html.getImage = function(url, onLoad, onError) {
    try {
        var responseListener = Response.Listener.implement({
            onResponse: function(response) {
                console.log("got image");
                const Image = require("../../ui/image");
                onLoad(new Image({bitmap: response}));
            }
        });
        var responseErrorListener = Response.ErrorListener.implement({
            onErrorResponse: function(error) {
                console.log("got image error");
                onError(error);
            }
        });
        
        const ScaleType = requireClass("android.widget.ImageView").ScaleType;
        const ImageRequest = requireClass("com.android.volley.toolbox.ImageRequest");
        const Config = requireClass("android.graphics.Bitmap").Config;
        var myRequest = new ImageRequest(Request.Method.GET, url,
                responseListener, 0, 0, ScaleType.FIT_XY, Config.ARGB_8888,
                responseErrorListener);
        requestQueue.add(myRequest);
    } catch(e) {
        console.log("There is exception");
        onError(e);
    }
}

http.getJSON = function(url, onLoad, onError) {
    http.getString(url, function(response) {
            try {
                onLoad(JSON.parse(response));
            } catch (e) {
                onError(e);
            }
        }, onError);
}

http.getFile = function(url, onLoad, onError) {
    http.getString(url, function(response){
            try {
                const IO = require("../../io");
                var filePath = IO.Path.DataDirectory + "/" +
                        url.substring(url.lastIndexOf('/'));
                var file = new IO.File({path: filePath});
                var stream = file.openStream(IO.FileStream.StreamType.WRITE);
                stream.write(response);
                stream.close();
                onLoad(file);
            } catch (e) {
                onError(e);
            }
        }, onError);
}

module.exports = html;