/*globals requireClass*/
const OkHttpRequest = requireClass("okhttp3.Request");
const OkHttpClient = requireClass("okhttp3.OkHttpClient");
const ByteString = requireClass("okio.ByteString");

const Blob = require("../../blob");
const AndroidConfig = require("../../util/Android/androidconfig");

const activity = AndroidConfig.activity;
const Runnable = requireClass("java.lang.Runnable");

function WebSocket(params) {
    if (!params || !params.url) {
        throw new Error("url must be initialized.");
    }
    var _listener, _request, _client;
    var {url, headers} = params;

    createClientAndRequest();
    createWebSocketListener();
    this.nativeObject = _client.newWebSocket(_request, _listener);

    var _onOpenCallback, _onFailureCallback, _onMessageCallback, _onCloseCallback;
    Object.defineProperty(this, 'url', {
        get: function() {
            return url;
        },
        enumerable: true
    });

    Object.defineProperty(this, 'onOpen', {
        get: function() {
            return _onOpenCallback;
        },
        set: function(callback) {
            _onOpenCallback = callback.bind(this);
        },
        enumerable: true
    });

    Object.defineProperty(this, 'onFailure', {
        get: function() {
            return _onFailureCallback;
        },
        set: function(callback) {
            _onFailureCallback = callback.bind(this);
        },
        enumerable: true
    });

    Object.defineProperty(this, 'onMessage', {
        get: function() {
            return _onMessageCallback;
        },
        set: function(callback) {
            _onMessageCallback = callback.bind(this);
        },
        enumerable: true
    });

    Object.defineProperty(this, 'onClose', {
        get: function() {
            return _onCloseCallback;
        },
        set: function(callback) {
            _onCloseCallback = callback.bind(this);
        },
        enumerable: true
    });

    this.close = function(params) {
        if (!params || !params.code)
            throw new Error("code parameter is required.");
        if (this.nativeObject) {
            if (params.reason)
                this.nativeObject.close(params.code, params.reason);
            else
                this.nativeObject.close(params.code, null);
        }
    };
    this.send = function(params) {
        if (this.nativeObject && params) {
            if ((params.data) instanceof Blob) {
                var bytes = params.data.parts;
                var byteString = ByteString.of(bytes, 0, arrayLength(bytes));
                return this.nativeObject.send(byteString);
            } else if (typeof(params.data) === "string") {
                return this.nativeObject.send(params.data);
            } else {
                throw new Error("WebSocket can send string or Blob.");
            }
        }
    };

    function createClientAndRequest() {
        var clientBuilder = new OkHttpClient.Builder();
        _client = clientBuilder.build();

        var requestBuilder = new OkHttpRequest.Builder().url(url);

        for(key in headers) {
            requestBuilder.addHeader(key, headers[key]);
        }
        _request = requestBuilder.build();
    }

    function createWebSocketListener() {
        var overrideMethods = {
            onOpen: function() {
                _onOpenCallback && runOnUiThread(_onOpenCallback);
            },
            onMessage: function(data) {
                if (typeof(data) === "string" || !data) {
                    _onMessageCallback && runOnUiThread(_onMessageCallback, {
                        string: data
                    });
                } else {
                    // TODO: onMessage doesn't invoke with bytestring parameter. 
                    // Check this implementation after AND-2702 bug is resolved.
                    _onMessageCallback && runOnUiThread(_onMessageCallback, {
                        blob: new Blob(data.toByteArray(), {
                            type: ""
                        })
                    });
                }
            },
            onClosing: function(code, reason) {
                _onCloseCallback && runOnUiThread(_onCloseCallback, {
                    code: code,
                    reason: reason
                });
            },
            onFailure: function(throwableMessage, responseCode) {
                var code = responseCode;
                var reason = throwableMessage;
                _onFailureCallback && runOnUiThread(_onFailureCallback, {
                    code: code,
                    reason: reason
                });
            }
        };

        const SFWebSocketListener = requireClass("io.smartface.android.sfcore.net.SFWebSocketListener");
        _listener = new SFWebSocketListener(overrideMethods);
    }

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }

}

function runOnUiThread(callback, params) {
    var runnable = Runnable.implement({
        run: function() {
            callback(params);
        }
    });
    activity.runOnUiThread(runnable);
}
module.exports = WebSocket;