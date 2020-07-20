/*globals requireClass*/
const OkHttpClientBuilder = requireClass("okhttp3.OkHttpClient$Builder");
const OkHttpRequestBuilder = requireClass("okhttp3.Request$Builder");
const RequestBody = requireClass("okhttp3.RequestBody");
const TimeUnit = requireClass("java.util.concurrent.TimeUnit");
const MediaType = requireClass("okhttp3.MediaType");
const AndroidConfig = require("sf-core/util/Android/androidconfig");
const SFHttpCallback = requireClass("io.smartface.android.sfcore.net.SFHttpCallback");
const SFHttp= requireClass("io.smartface.android.sfcore.net.SFHttp");

const Blob = require("../../blob");

const WITHOUT_BODY_METHODS = {
    "GET": 0,
    "HEAD": 1,
    "COPY": 2,
    "PURGE": 3
};
 
const CONTENT_TYPE_KEY = "CONTENT-TYPE";
var activity = AndroidConfig.activity;

var _instanceCollection = [];
const Request = function() {
    Object.defineProperties(this, {
        'cancel': {
            value: function() {
                this.nativeObject.cancel();
            }
        }
    });
};

function http(params) {
    const self = this;

    self.clientBuilder = new OkHttpClientBuilder();

    var _timeout, // default OkHttp timeout. There is no way getting timout for public method.
        _defaultHeaders;
    Object.defineProperty(self, "timeout", {
        get: function() {
            return _timeout;
        },
        set: function(value) {
            if (typeof(value) !== "number")
                throw new Error("timeout must be a number.");

            _timeout = value;
            self.clientBuilder.connectTimeout(_timeout, TimeUnit.MILLISECONDS);
            self.clientBuilder.readTimeout(_timeout, TimeUnit.MILLISECONDS);
            self.clientBuilder.writeTimeout(_timeout, TimeUnit.MILLISECONDS);
        },
        enumerable: true
    });

    Object.defineProperty(self, "headers", {
        get: function() {
            return _defaultHeaders;
        },
        set: function(headers) {
            if (headers)
                _defaultHeaders = headers;
        },
        enumerable: true
    });

    self.android = {};

    var _cookiePersistenceEnabled = false;
    Object.defineProperty(self, 'cookiePersistenceEnabled', {
        get: function() {
            return _cookiePersistenceEnabled;
        },
        set: function(value) {
            if (typeof value !== "boolean")
                return;
            _cookiePersistenceEnabled = value;
            if (_cookiePersistenceEnabled) {
                self.clientBuilder.cookieJar(SFHttp.createCookieJar());
            } else {
                const NativeCookieJar = requireClass("okhttp3.CookieJar");
                self.clientBuilder.cookieJar(NativeCookieJar.NO_COOKIES);
            }
        },
        enumerable: true
    });

    _instanceCollection.push(this);
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            self[param] = params[param];
        }
    }

    if (!Number.isInteger(self.timeout)) {
        self.timeout = 60000;
    }
    self.client = self.clientBuilder.build();
}

http.__cancelAll = function() {
    for (let i = 0; i < _instanceCollection.length; i++) {
        _instanceCollection[i].cancelAll();
    }
};

http.prototype.cancelAll = function() {
    var dispatcher = this.client.dispatcher();
    dispatcher && dispatcher.cancelAll();
};

http.prototype.upload = function(params) {
    params && (params.method = "POST");
    return this.request(params, true, true);
};

http.prototype.requestString = function(params) {
    if (!params)
        throw new Error("Required request parameters.");
    var requestOnLoad = params.onLoad;
    params.onLoad = function(e) {
        if (e && e.body)
            e.string = e.body.toString();
        requestOnLoad && requestOnLoad(e);
    };
    return this.request(params, false, false);
};

http.prototype.requestImage = function(params) {
    if (!params)
        throw new Error("Required request parameters.");

    var requestOnLoad = params.onLoad;
    const Image = require("sf-core/ui/image");

    params.onLoad = function(e) {
        if (e && e.body) {
            e.image = Image.createFromBlob(e.body);
        }

        requestOnLoad && requestOnLoad(e);
    };
    return this.request(params, false, false);
};

http.prototype.requestJSON = function(params) {
    if (!params)
        throw new Error("Required request parameters.");

    var requestOnLoad = params.onLoad;
    params.onLoad = function(e) {
        if (e && e.body) {
            e.JSON = JSON.parse(e.string);
        }
        requestOnLoad && requestOnLoad(e);
    };
    return this.requestString(params, false, false);
};

http.prototype.requestFile = function(params) {
    if (!params)
        throw new Error("Required request parameters.");

    var requestOnLoad = params.onLoad;
    params.onLoad = function(e) {
        const IO = require("sf-core/io");
        var cacheDir = activity.getCacheDir().getAbsolutePath();
        var path;
        if (params.fileName)
            path = cacheDir + IO.Path.Separator + params.fileName;
        else
            path = cacheDir + params.url.substring(params.url.lastIndexOf('/'));
        var file = new IO.File({
            path: path
        });
        if (e && e.body) {
            var stream = file.openStream(IO.FileStream.StreamType.WRITE, IO.FileStream.ContentMode.BINARY);
            stream.write(e.body);
            stream.close();
            e.file = file;
        }

        requestOnLoad && requestOnLoad(e);
    };

    return this.request(params, false, false);
};

http.prototype.request = function(params, isMultipart) {
    if (!checkInternet()) {
        params && typeof params.onError === "function" && params.onError({
            message: "No network connection"
        });
        return;
    }
    
    var request = new Request();
    var callback = SFHttpCallback.getCallback({
        onFailure: function(msg) {
            params && typeof params.onError === "function" && params.onError({
                message: msg
            });
        },
        onResponse: function(isSuccessful, code, headers, bytes, message) {
            var statusCode = code;
            var responseHeaders = getResponseHeaders(headers);

            if (statusCode != 304 && bytes) {
                var responseBody = new Blob(bytes, {
                    type: {}
                });
            }

            if (isSuccessful) {
                if (params && typeof params.onLoad === "function") {
                    params.onLoad({
                        statusCode: statusCode,
                        headers: responseHeaders,
                        body: responseBody
                    });
                }
            } else if(params && typeof params.onError === "function") {
                params.onError({
                    statusCode: statusCode,
                    headers: responseHeaders,
                    message: message,
                    body: responseBody
                });
            }
        }
    });
    var okhttpRequest = createRequest(params, isMultipart, this.headers);
    request.nativeObject = this.client.newCall(okhttpRequest);
    request.nativeObject.enqueue(callback);
    return request;
};

function createRequest(params, isMultipart, httpManagerHeaders) {
    if (!params || !params.url) {
        throw new Error("URL parameter is required.");
    }
    var builder = new OkHttpRequestBuilder();
    builder = builder.url(params.url);

    var contentType = null;
    if (params.headers) {
        var keys = Object.keys(params.headers);
        for (var i = 0; i < keys.length; i++) {
            if (keys[i].toUpperCase() === CONTENT_TYPE_KEY)
                contentType = params.headers[keys[i]];
            builder.addHeader(keys[i], params.headers[keys[i]]);
        }
    }

    if (httpManagerHeaders) {
        keys = Object.keys(httpManagerHeaders);
        for (var i = 0; i < keys.length; i++) {
            if (keys[i].toUpperCase() === CONTENT_TYPE_KEY)
                contentType = httpManagerHeaders[keys[i]];
            builder.addHeader(keys[i], httpManagerHeaders[keys[i]]);
        }
    }

    if (params.method) {
        if (params.method in WITHOUT_BODY_METHODS) {
            builder = builder.method(params.method, null);
        } else {
            var body = createRequestBody(params.body, contentType, isMultipart);
            builder = builder.method(params.method, body);
        }
    }
    return builder.build();
}

function createRequestBody(body, contentType, isMultipart) {
    if (!body) {
        return RequestBody.create(null, array([], "byte"));
    }
    if (!isMultipart || body instanceof Blob) {
        var mediaType = null;
        if (contentType)
            mediaType = MediaType.parse(contentType);
        var content = null;
        if (body instanceof Blob)
            content = array(body.parts, "byte");
        else if (typeof(body) === "string")
            content = body;
        return RequestBody.create(mediaType, content);
    } else {
        return createMultipartBody(body);
    }
}

function createMultipartBody(bodies) {
    const MultipartBody = requireClass("okhttp3.MultipartBody");
    var builder = new MultipartBody.Builder();
    builder.setType(MultipartBody.FORM);
    for (var i = 0; i < bodies.length; i++) {
        if (!bodies[i].name) {
            throw new Error("Name of the upload part data cannot be empty.");
        }
        if (bodies[i].contentType)
            var mediaType = MediaType.parse(bodies[i].contentType);
        if (bodies[i].value)
            var body = RequestBody.create(mediaType, array(bodies[i].value.parts, "byte"));
        if (!body) {
            throw new Error("Upload method must include request body.");
        }
        var fileName = null;
        if (bodies[i].fileName)
            fileName = bodies[i].fileName;
        builder.addFormDataPart(bodies[i].name, fileName, body);
    }
    return builder.build();
}

// TODO: [AND-3663] To obfuscate okttp3.Headers class, implement this function in java side.
function getResponseHeaders(headers) {
    var responseHeaders = {};
    var headersSize = headers.size();
    for (var i = 0; i < headersSize; i++) {
        responseHeaders[headers.name(i)] = headers.value(i);
    }
    return responseHeaders;
}

function checkInternet() {
    const Network = require("../../device/network");
    if (Network.connectionType === Network.ConnectionType.None)
        return false;
    return true;
}

module.exports = http;