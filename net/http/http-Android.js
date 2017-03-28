const Volley = requireClass("com.android.volley.toolbox.Volley");
const VolleyRequest  = requireClass("com.android.volley.Request");
const VolleyResponse = requireClass("com.android.volley.Response");
const NativeInteger  = requireClass("java.lang.Integer");
const NativeString   = requireClass("java.lang.String");

const Request = function() {
    Object.defineProperties(this, {
        'cancel': {
            value: function() {
                this.nativeObject.cancel();
            }
        }
    });
};

const http = {
    RequestQueue: Volley.newRequestQueue(Android.getActivity())
};

const methods = {
    "GET": 0,
    "POST" : 1,
    "PUT" : 2,
    "DELETE" : 3,
    "HEAD" : 4,
    "OPTIONS" : 5,
    "TRACE" : 6,
    "PATCH" : 7
};

http.requestString = function(url, onLoad, onError) {
    try {
        var responseListener = VolleyResponse.Listener.implement({
            onResponse: function(response) {
                onLoad(response);
            }
        });
        var responseErrorListener = VolleyResponse.ErrorListener.implement({
            onErrorResponse: function(error) {
                onError(error);
            }
        });
        
        if(checkInternet()) {
            const StringRequest = requireClass("com.android.volley.toolbox.StringRequest");

            var request = new Request();
            request.nativeObject = new StringRequest(VolleyRequest.Method.GET, url,
                    responseListener, responseErrorListener);

            http.RequestQueue.add(request.nativeObject);
            return request;
        }
        else {
            if(onError)
                onError("No network connection");
        }
    } catch(e) {
        if(onError)
            onError(e);
    }
};

http.requestImage = function(url, onLoad, onError) {
    try {
        var responseListener = VolleyResponse.Listener.implement({
            onResponse: function(response) {
                const Image = require("nf-core/ui/image");
                var image = new Image({bitmap: response});
                onLoad(image);
            }
        });
        var responseErrorListener = VolleyResponse.ErrorListener.implement({
            onErrorResponse: function(error) {
                onError(error);
            }
        });
        if(checkInternet()) {
            const ImageRequest = requireClass("com.android.volley.toolbox.ImageRequest");

            var request = new Request();
            request.nativeObject = new ImageRequest(url,responseListener,
                0, 0, null, null,responseErrorListener);

            http.RequestQueue.add(request.nativeObject);
            return request;
        }
        else {
            onError("No network connection");
        }
    } catch(e) {
        onError(e);
    }
};

http.requestJSON = function(url, onLoad, onError) {
    return http.requestString(url, function(response) {
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
    return http.requestString(url, function(response){
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
    var responseListener = VolleyResponse.Listener.implement({
            onResponse: function(response) {
                onLoad({body: response, headers: {}});
            }
        });
    var responseErrorListener = VolleyResponse.ErrorListener.implement({
        onErrorResponse: function(error) {
            onError(error);
        }
    });
    
    var method = new NativeInteger(methods[params.method]);
    var url = new NativeString(params.url);
    var parameters = [method, url, responseListener, responseErrorListener];
    var body = null;
    if(params.body)
        body = new NativeString(params.body);
    var request = new Request();
    
    var contentType = "text/plain";
    if (params.headers && params.headers["Content-Type"]) {
        contentType = params.headers["Content-Type"];
    }

    try {
        if(checkInternet()) {
            const StringRequest = requireClass("com.android.volley.toolbox.StringRequest");
            request.nativeObject = StringRequest.extend("SFStringRequest", {
                getBody: function() {
                    if(!body)
                        return [];
                    return body.getBytes();
                },
                getHeaders: function() {
                    return getHeaderHashMap(params);
                },
                getBodyContentType: function() {
                    return contentType;
                }
            }, parameters);    
        }
        else {
            if(onError)
                onError("No network connection");
        }
    }
    catch(err) {
        if(onError)
            onError(err);
    }

    http.RequestQueue.add(request.nativeObject);
    return request;
};

function getHeaderHashMap(params) {
    const NativeHashMap = requireClass("java.util.HashMap");
    var headers = new NativeHashMap();
    var credentials = "";
    if(params.user && params.password)
        credentials = params.user + ":" + params.password;
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

function checkInternet() {
    const Network = require("nf-core/device/network");
    if(Network.connectionType == Network.ConnectionType.None)
        return false;
    return true;
}

module.exports = http;