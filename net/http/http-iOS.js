const Blob = require("../../global/blob");

/**
 * 
 * @constructor
 * @params {object} params 
 */
function Http(params) {
    var self = this;

    if (!self.nativeObject) {
        self.nativeObject = new __SF_Http();
    }

    ////////////////////////////////////////////////////////////////////////
    // Properties
    Object.defineProperty(self, 'timeout', {
        get: function () {
            return self.nativeObject.timeoutIntervalForRequest * 1000;
        },
        set: function (value) {
            self.nativeObject.timeoutIntervalForRequest = value / 1000;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'headers', {
        get: function () {
            return self.nativeObject.defaultHTTPHeaders;
        },
        set: function (value) {
            self.nativeObject.defaultHTTPHeaders = value;
        },
        enumerable: true
    });

    var _ios = {};
    Object.defineProperty(self, 'ios', {
        get: function() {
            return _ios;
        },
        set: function(value) {
            if (typeof value === 'object') {
                Object.assign(_ios, value);
            }
        },
        enumerable: true
    });

    let _sslPinning;
    Object.defineProperty(self.ios, "sslPinning", {
        get: function () {
            return _sslPinning;
        },
        set: function (values) {
            _sslPinning = values;

            self.nativeObject.serverTrustPolicies = values.map(value => {

                const { certificates, host, validateCertificateChain = true, validateHost = true } = value;

                let nSURLCertificates = certificates.map(function (path, index) {
                    let certFile = new File({
                        path: path
                });
                    return certFile.ios.getNSURL();
                })
                return __SF_SMFServerTrustPolicy.createServerTrustPolicyWithHostCertificateURLsValidateCertificateChainValidateHost(
                    host,
                    nSURLCertificates,
                    validateCertificateChain,
                    validateHost
                );
            })
        },
        enumerable: true
    });

    if (params) {
        for (var param in params) {
    
            this[param] = params[param];
        }
    }

    ////////////////////////////////////////////////////////////////////////
    // Functions
    this.cancelAll = function () {
        self.nativeObject.cancelAll();
    };

    this.requestFile = function (params) {

        var url = params.url;
        var fileName = params.fileName;
        var onLoad = params.onLoad;
        var onError = params.onError;

        return new Http.Request(
            self.nativeObject.requestFile(
                url,
                fileName,
                function (e) {
                    const File = require('../../io/file');
                    // Native returns file path first.
                    // Convert to sf-core file object.
                    if (e.file) {
                        e.file = new File({
                            path: e.file
                        });
                    }
                    if (e.body) {
                        e.body = new Blob(e.body);
                    }
                    if (typeof onLoad === "function") {
                        onLoad(e);
                    }
                },
                function (e) {
                    if (e.body) {
                        e.body = new Blob(e.body);
                    }
                    if (typeof onError === "function") {
                        onError(e);
                    }
                }
            )
        );
    };

    this.requestImage = function (params) {

        var url = params.url;
        var onLoad = params.onLoad;
        var onError = params.onError;

        return new Http.Request(
            self.nativeObject.requestImage(
                url,
                function (e) {
                    // Native returns UIImage instance.
                    // Convert to sf-core Image object.
                    if (e.image) {
                        const Image = require('../../ui/image');
                        e.image = Image.createFromImage(e.image);
                    }
                    if (e.body) {
                        e.body = new Blob(e.body);
                    }
                    if (typeof onLoad === "function") {
                        onLoad(e);
                    }

                },
                function (e) {
                    if (e.body) {
                        e.body = new Blob(e.body);
                    }
                    if (typeof onError === "function") {
                        onError(e);
                    }
                }
            )
        );
    };

    this.requestString = function (params) {

        var url = params.url;
        var onLoad = params.onLoad;
        var onError = params.onError;

        return new Http.Request(
            self.nativeObject.requestString(
                url,
                function (e) {
                    if (e.body) {
                        e.body = new Blob(e.body);
                    }
                    if (typeof onLoad === "function") {
                        onLoad(e);
                    }
                },
                function (e) {
                    if (e.body) {
                        e.body = new Blob(e.body);
                    }
                    if (typeof onError === "function") {
                        onError(e);
                    }
                }
            )
        );
    };

    this.requestJSON = function (params) {

        var url = params.url;
        var onLoad = params.onLoad;
        var onError = params.onError;

        return new Http.Request(
            self.nativeObject.requestJSON(
                url,
                function (e) {
                    if (e.body) {
                        e.body = new Blob(e.body);
                    }
                    if (typeof onLoad === "function") {
                        onLoad(e);
                    }
                },
                function (e) {
                    if (e.body) {
                        e.body = new Blob(e.body);
                    }
                    if (typeof onError === "function") {
                        onError(e);
                    }
                }
            )
        );
    };

    this.request = function (params) {

        var onLoad = params.onLoad;
        var onError = params.onError;

        return new Http.Request(
            self.nativeObject.request(
                params,
                function (e) {
                    if (e.body) {
                        e.body = new Blob(e.body);
                    }
                    if (typeof onLoad === "function") {
                        onLoad(e);
                    }
                },
                function (e) {
                    if (e.body) {
                        e.body = new Blob(e.body);
                    }
                    if (typeof onError === "function") {
                        onError(e);
                    }
                }
            )
        );
    };

    this.upload = function (params) {
        var onLoad = params.onLoad;
        var onError = params.onError;

        // Get NSData inside JS object
        if (Object.prototype.toString.call(params.body) === '[object Array]') {
            for (var i = 0; i < params.body.length; i++) {
                params.body[i].value = params.body[i].value.nativeObject;
            }
        } else {
            params.body = params.body.nativeObject;
        }

        return new Http.Request(
            self.nativeObject.upload(
                params,
                function (e) {
                    if (e.body) {
                        e.body = new Blob(e.body);
                    }
                    if (typeof onLoad === "function") {
                        onLoad(e);
                    }
                },
                function (e) {
                    if (e.body) {
                        e.body = new Blob(e.body);
                    }
                    if (typeof onError === "function") {
                        onError(e);
                    }
                }
            )
        );
    };
};

/** 
 * @class
 */
function Request(nativeObject) {
    var self = this;
    if (nativeObject) {
        self.nativeObject = nativeObject;
    }

    this.suspend = function () {
        if (self.nativeObject) {
            self.nativeObject.suspend();
        }
    };

    this.resume = function () {
        if (self.nativeObject) {
            self.nativeObject.resume();
        }
    };

    this.cancel = function () {
        if (self.nativeObject) {
            self.nativeObject.cancel();
        }
    };
};

Http.Request = Request;

module.exports = Http;