const Volley = requireClass("com.android.volley.toolbox.Volley");
const Request = requireClass("com.android.volley.Request");
const Response = requireClass("com.android.volley.Response");
const NativeInteger = requireClass("java.lang.Integer");
const NativeString = requireClass("java.lang.String");

var http = {};

http.requestString = function(url, onLoad, onError) {
    try {
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

http.requestImage = function(url, onLoad, onError) {
    try {
        var responseListener = Response.Listener.implement({
            onResponse: function(response) {
                const Image = require("nf-core/ui/image");
                var image = new Image({bitmap: response});
                onLoad(image);
            }
        });
        var responseErrorListener = Response.ErrorListener.implement({
            onErrorResponse: function(error) {
                onError(error);
            }
        });
        
        const ImageRequest = requireClass("com.android.volley.toolbox.ImageRequest");
        var myRequest = new ImageRequest(url,responseListener, 
            0, 0, null, null,responseErrorListener);
            
        var requestQueue = Volley.newRequestQueue(Android.getActivity());
        requestQueue.add(myRequest);
    } catch(e) {
        onError(e);
    }
};

http.requestJSON = function(url, onLoad, onError) {
    http.getString(url, function(response) {
            try {
                // var responseJSON = JSON.parse(response); // todo getJSON doesn't work.
                // onLoad(responseJSON);        // response is java.lang.String.
                if(onLoad)
                    onLoad(response);
            } catch (e) {
                if(onError)
                    onError(e);
            }
    }, onError);
};

http.requestFile = function(url, fileName, onLoad, onError) {
    http.getString(url, function(response){
            try {
                const IO = require("../../io");
                var filePath;
                if(!fileName)
                    filePath = url.substring(url.lastIndexOf('/'));
                filePath = fileName;
                var file = new IO.File({path: filePath});
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
                onLoad({body: response, headers: {}});
            }
        });
    var responseErrorListener = Response.ErrorListener.implement({
        onErrorResponse: function(error) {
            onError(error);
        }
    });
    
    var method = new NativeInteger(params.method);
    var url = new NativeString(params.url);
    var parameters = [method, url,
        responseListener, responseErrorListener];
    var body = null;
    if(params.body)
        body = new NativeString(params.body);
    var request = {};
    
    try {
        const StringRequest = requireClass("com.android.volley.toolbox.StringRequest");
        request.nativeObject = StringRequest.extend("SFStringRequest", {
            getBody: function() {
                if(!body)
                    return [];
                return body.getBytes();
            },
            getHeaders: function() {
                return getHeaderHashMap(params);
            }
        }, parameters);
    }
    catch(err) {
        if(onError)
            onError(err);
    }
    var requestQueue = Volley.newRequestQueue(Android.getActivity());
    requestQueue.add(request.nativeObject);
};


function getHeaderHashMap(params) {
    const NativeHashMap = requireClass("java.util.HashMap");
    var headers = new NativeHashMap();
    var credentials = "";
    if(params.user && params.password)
        credentials = params.username + ":" + params.password;
    const NativeBase64 = requireClass("android.util.Base64");
    var bytes = new NativeString(credentials).getBytes();
    var encodedString = NativeBase64.encodeToString(bytes, 2); // 2 = NativeBase64.NO_WRAP
    var auth = "Basic " + encodedString;
    headers.put("Authorization", auth);
    
    if(params.headers) {
        var i;
        var keys = Object.keys(params.headers);
        for(i = 0; i < keys.length; i++) {
            var value = params.headers[keys[i]];
            if(typeof(keys[i]) == "string" && typeof(value) == "string")
                headers.put(keys[i], value);
        }
    }
    return headers;
}

module.exports = http;