const Volley = requireClass("com.android.volley.toolbox.Volley");
const Request = requireClass("com.android.volley.Request");
const Response = requireClass("com.android.volley.Response");

var http = {};

http.getString = function(url, onLoad, onError) {
    try {
        var responseListener = Response.Listener.implement({
            onResponse: function(response) {
                if(onLoad)
                    onLoad(response);
                else
                    return response;
            }
        });
        var responseErrorListener = Response.ErrorListener.implement({
            onErrorResponse: function(error) {
                if(onError)
                    onError(error);
                else
                    return null;
            }
        });
        
        const StringRequest = requireClass("com.android.volley.toolbox.StringRequest");
        var myRequest = new StringRequest(Request.Method.GET, url,
                responseListener, responseErrorListener);

        var requestQueue = Volley.newRequestQueue(Android.getActivity());
        requestQueue.add(myRequest);
    } catch(e) {
        if(onError)
            onError(e);
    }
};

http.getImage = function(url, onLoad, onError) {
    try {
        var responseListener = Response.Listener.implement({
            onResponse: function(response) {
                const Image = require("nf-core/ui/image");
                var image = new Image({bitmap: response});
                if(onLoad)
                    onLoad(image);
                else 
                    return image;
            }
        });
        var responseErrorListener = Response.ErrorListener.implement({
            onErrorResponse: function(error) {
                if(onError)
                    onError(error);
                else 
                    return null;
            }
        });
        
        const ImageRequest = requireClass("com.android.volley.toolbox.ImageRequest");
        var myRequest = new ImageRequest(url,responseListener, 
            0, 0, null, null,responseErrorListener);
        console.log("myRequest");
        var requestQueue = Volley.newRequestQueue(Android.getActivity());
        requestQueue.add(myRequest);
    } catch(e) {
        console.log("There is exception");
        onError(e);
    }
};

http.getJSON = function(url, onLoad, onError) {
    http.getString(url, function(response) {
            try {
                // var responseJSON = JSON.parse(response); // todo getJSON doesn't work.
                // onLoad(responseJSON);        // response is java.lang.String.
                if(onLoad)
                    onLoad(response);
                else
                    return response;
            } catch (e) {
                if(onError)
                    onError(e);
            }
    }, onError);
};

http.getFile = function(url, fileName, onLoad, onError) {
    http.getString(url, function(response){
            try {
                const IO = require("../../io");
                var filePath;
                if(!fileName)
                    filePath = url.substring(url.lastIndexOf('/'));
                filePath = fileName;
                var file = new IO.File({path: filePath});
                console.log("filePath " + filePath);
                var stream = file.openStream(IO.FileStream.StreamType.WRITE);
                stream.write(response);
                stream.close();
                onLoad(file);
            } catch (e) {
                onError(e);
            }
        }, onError);
};

http.request = function(params, onLoad, onError) {
    var responseListener = Response.Listener.implement({
            onResponse: function(response) {
                onLoad(response);
            }
        });
    var responseErrorListener = Response.ErrorListener.implement({
        onErrorResponse: function(error) {
            onError(error);
        }
    });
    
    const NativeInteger = requireClass("java.lang.Integer");
    var intVal = new NativeInteger(1);
    console.log("int " + intVal);
    const NativeString = requireClass("java.lang.String");
    var str = new NativeString("http://requestb.in/1in5fqo1");
    
    var parameters = [intVal, str,
        responseListener, responseErrorListener];
    console.log("parameters " + parameters);
    var request = {};
    console.log("request " + request);
    var body = new NativeString(params.body);
    console.log("body " + body);
    
    try {
        const StringRequest = requireClass("com.android.volley.toolbox.StringRequest");
        request.nativeObject = StringRequest.extend("SFStringRequest", {
            getBody: function() {
                console.log("body " + body);
                if(!body)
                    return null;
                    
                // console.log("NativeString " + NativeString);
                // var bodyStr = new NativeString(body);
                // console.log("bodyStr " + bodyStr);
                return body.getBytes();
            }
        }, parameters);
    }
    catch(err) {
        alert("Msg " + err);
    }
    
    // var requestQueue = Volley.newRequestQueue(Android.getActivity());
    // console.log("requestQueue " + requestQueue);
    // requestQueue.add(self.nativeObject);
};

module.exports = http;