const Volley                = requireClass("com.android.volley.toolbox.Volley");
const VolleyRequest         = requireClass("com.android.volley.Request");
const VolleyResponse        = requireClass("com.android.volley.Response");
const VolleyHttpHeaderParser= requireClass("com.android.volley.toolbox.HttpHeaderParser");
const NativeInteger         = requireClass("java.lang.Integer");
const NativeString          = requireClass("java.lang.String");
const NativeBase64          = requireClass("android.util.Base64");

const CONTENT_TYPE_KEY = "CONTENT-TYPE";

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
        
    try {
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
    var responseListener = VolleyResponse.Listener.implement({
        onResponse: function(response) {
            const Image = require("sf-core/ui/image");
            var image = new Image({bitmap: response});
            onLoad(image);
        }
    });
    var responseErrorListener = VolleyResponse.ErrorListener.implement({
        onErrorResponse: function(error) {
            onError(error);
        }
    });
    
    try {
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
        // var responseJSON = JSON.parse(response); // todo getJSON doesn't work.
        // onLoad(responseJSON);        // response is java.lang.String.
        if(onLoad)
            onLoad(response);
    }, onError);
};
http.requestFile = function(url, fileName, onLoad, onError) {
    return http.requestString(url, function(response){
        var success = true;
        try {
            const IO = require("../../io");
            if(!fileName)
                fileName = url.substring(url.lastIndexOf('/'));
            var file = new IO.File({path: fileName});
            var stream = file.openStream(IO.FileStream.StreamType.WRITE);
            stream.write(response);
            stream.close();
        } catch (e) {
            success = true;
            onError(e);
        }
        if(success) {
            onLoad(file);
        }
    }, onError);
};
http.request = function(params, onLoad, onError) {
    var responseHeaders = {};
    var responseType = "application/x-www-form-urlencoded; charset=" + "UTF-8";
    var responseListener = VolleyResponse.Listener.implement({
            onResponse: function(response) {
                const Blob = require("sf-core/blob");
                
                var encodedStr = new NativeString(response);
                var bytes = encodedStr.getBytes();
                var decoded = NativeBase64.decode(bytes, NativeBase64.DEFAULT);
                var blob = new Blob(decoded, {type: responseType});
                onLoad({body: blob, headers: responseHeaders});
            }
        });
    var responseErrorListener = VolleyResponse.ErrorListener.implement({
        onErrorResponse: function(error) {
            onError(error.getMessage());
        }
    });
    
    var method = new NativeInteger(methods[params.method]);
    var url = new NativeString(params.url);
    var parameters = [method, url, responseListener, responseErrorListener];
    var body = null;
    if(params.body)
        body = new NativeString(params.body);
    var request = new Request();
    
    var contentType = "application/x-www-form-urlencoded; charset=" + "UTF-8";
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
                },
                parseNetworkResponse: function(response) { // Added to resolve AND-2743 bug.
                    getResponseHeaders(response, responseHeaders, responseType);
                    
                    var cacheHeaders = VolleyHttpHeaderParser.parseCacheHeaders(response);
                    var encoded = NativeBase64.encode(response.data, NativeBase64.DEFAULT);
                    var encodedStr = new NativeString(encoded);
                    return VolleyResponse.success(encodedStr, cacheHeaders);
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

function getResponseHeaders(response, responseHeaders, responseType) {
    var headers = response.headers;
    if(headers && headers.keySet()) {
        var iterator = headers.keySet().iterator();
        while(iterator.hasNext()) {
            var key = iterator.next().substring(0); // iterator.next() is a java.lang.String not javascript string
            if(key && headers.get(key)) {
                responseHeaders[key] = headers.get(key).substring(0);
            }
        }
        
        if(headers.get("Content-Type")) {
            responseType = headers.get("Content-Type").substring(0);
        }
    }
}
function getHeaderHashMap(params) {
    const NativeHashMap = requireClass("java.util.HashMap");
    var headers = new NativeHashMap();
    var credentials = "";
    if(params.user && params.password) {
        credentials = params.user + ":" + params.password;
        const NativeBase64 = requireClass("android.util.Base64");
        var bytes = new NativeString(credentials).getBytes();
        var encodedString = NativeBase64.encodeToString(bytes, 2); // 2 = NativeBase64.NO_WRAP
        var auth = "Basic " + encodedString;
        headers.put("Authorization", auth);   
    }
    
    if(params.headers) {
        var i;
        var keys = Object.keys(params.headers);
        for (i = 0; i < keys.length; i++) {
            var value = params.headers[keys[i]];
            if (typeof(keys[i]) === "string" && typeof(value) === "string" &&
                keys[i].toUpperCase() !== CONTENT_TYPE_KEY) {
                headers.put(keys[i], value);
            }
        }
    }
    return headers;
}
function checkInternet() {
    const Network = require("sf-core/device/network");
    if(Network.connectionType === Network.ConnectionType.None)
        return false;
    return true;
}
module.exports = http;