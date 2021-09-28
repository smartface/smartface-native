/*globals requireClass*/
const OkHttpRequest = requireClass("okhttp3.Request");
const OkHttpClient = requireClass("okhttp3.OkHttpClient");
const ByteString = requireClass("okio.ByteString");

const {
    EventEmitterMixin,
    EventEmitter
  } = require("../../core/eventemitter");
const Events = require('./events');

const Blob = require("../../blob");
const AndroidConfig = require("../../util/Android/androidconfig");

const activity = AndroidConfig.activity;
const Runnable = requireClass("java.lang.Runnable");

WebSocket.prototype = Object.assign({}, EventEmitterMixin);

function WebSocket(params) {
    if (!params || !params.url) {
        throw new Error("url must be initialized.");
    }
    this.emitter = new EventEmitter();
    var _listener, _request, _client;
    var {url, headers} = params;

    createClientAndRequest();
    createWebSocketListener();
    this.nativeObject = _client.newWebSocket(_request, _listener);

    var _onOpenCallback, _onFailureCallback, _onMessageCallback, _onCloseCallback;

    const EventFunctions = {
        [Events.Close]: function() {
            _onCloseCallback = (e) => {
                this.emitter.emit(Events.Close, e);
            }
        },
        [Events.Failure]: function() {
            _onFailureCallback = (e) => {
                this.emitter.emit(Events.Failure, e);
            }
        },
        [Events.Message]: function() {
            _onMessageCallback = (e) => {
                this.emitter.emit(Events.Message, e);
            }
        },
        [Events.Open]: function() {
            _onOpenCallback = (e) => {
                this.emitter.emit(Events.Open, e);
            }
        }
    }

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

    Object.defineProperty(this, 'on', {
        value: (event, callback) => {
            EventFunctions[event].call(this);
            this.emitter.on(event, callback);
        }
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
                _onOpenCallback && _onOpenCallback();
            },
            onMessage: function(data) {
                if (typeof(data) === "string" || !data) {
                    _onMessageCallback && _onMessageCallback({
                        string: data
                    });
                } else {
                    // TODO: onMessage doesn't invoke with bytestring parameter. 
                    // Check this implementation after AND-2702 bug is resolved.
                    _onMessageCallback && _onMessageCallback({
                        blob: new Blob(data.toByteArray(), {
                            type: ""
                        })
                    });
                }
            },
            onClosing: function(code, reason) {
                _onCloseCallback && _onCloseCallback({
                    code: code,
                    reason: reason
                });
            },
            onFailure: function(throwableMessage, responseCode) {
                var code = responseCode;
                var reason = throwableMessage;
                _onFailureCallback && _onFailureCallback({
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
module.exports = WebSocket;