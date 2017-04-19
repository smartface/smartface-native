const Volley                = requireClass("com.android.volley.toolbox.Volley");
const VolleyRequest         = requireClass("com.android.volley.Request");
const VolleyResponse        = requireClass("com.android.volley.Response");
const VolleyParseError      = requireClass("com.android.volley.ParseError");
const VolleyHttpHeaderParser= requireClass("com.android.volley.toolbox.HttpHeaderParser");
const NativeInteger         = requireClass("java.lang.Integer");
const NativeString          = requireClass("java.lang.String");
const GZIPInputStream       = requireClass("java.util.zip.GZIPInputStream");
const ByteArrayInputStream  = requireClass("java.io.ByteArrayInputStream");
const InputStreamReader     = requireClass("java.io.InputStreamReader");
const BufferedReader        = requireClass("java.io.BufferedReader");

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
    var responseListener = VolleyResponse.Listener.implement({
            onResponse: function(response) {
                onLoad({body: response, headers: responseHeaders});
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
                    var parsed = new NativeString();
                    var value = null;
                    if(params.headers)
                        value = params.headers["Accept-Encoding"];

                    getResponseHeaders(response, responseHeaders);
                    if(value && value.indexOf("gzip") !== -1) { // contains gzip
                        try {
                            parsed = parseGZIPResponse(response);
                        } 
                        catch (error) {
                            // If header contains encoding different from gzip or
                            // response is not gzip, try to parse as normal
                            try {
                                parsed = parseTextResponse(response);
                            } 
                            catch (error) {
                                var parseError = new VolleyParseError();
                                return VolleyResponse.error(parseError);
                            }
                        }
                    }
                    else {
                        try {
                            parsed = parseTextResponse(response);
                        } 
                        catch (error) {
                            var parseError = new VolleyParseError();
                            return VolleyResponse.error(parseError);
                        }
                    }
                    var cacheHeaders = VolleyHttpHeaderParser.parseCacheHeaders(response);
                    return VolleyResponse.success(parsed, cacheHeaders);
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

function parseGZIPResponse(response){
    var parsed = '';
    var inputStream = new ByteArrayInputStream(response.data);
    var gzipStream = new GZIPInputStream(inputStream);
    var reader = new InputStreamReader(gzipStream);
    var bufferedReader = new BufferedReader(reader);
    for (var line = new NativeString(); (line = bufferedReader.readLine()) !== null; parsed += line) ;
    bufferedReader.close();
    gzipStream.close();
    return parsed;
}

function parseTextResponse(response){
    var parsed = "";
    try {
        var parseCharset = VolleyHttpHeaderParser.parseCharset(response.headers,'UTF-8');
        parsed = new NativeString(response.data, parseCharset);
    } catch (error) {
        parsed = new NativeString(response.data);
    }
    return parsed;
}

function getResponseHeaders(response, responseHeaders) {
    var headers = response.headers;
    if(headers && headers.keySet()) {
        var iterator = headers.keySet().iterator();
        while(iterator.hasNext()) {
            var key = iterator.next().substring(0); // iterator.next() is a java.lang.String not javascript string
            if(key && headers.get(key)) {
                responseHeaders[key] = headers.get(key).substring(0);
            }
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
        for(i = 0; i < keys.length; i++) {
            var value = params.headers[keys[i]];
            if(typeof(keys[i]) === "string" && typeof(value) === "string")
                headers.put(keys[i], value);
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