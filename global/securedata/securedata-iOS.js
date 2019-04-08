function SecureData(params) {
    var _account = params && params.key;
    var _service = params && params.ios && params.ios.service;

    if (!_account || !_service) {
        throw new Error("Constructor must have service and key parameter.");
    }

    var self = this;

    if (!self.nativeObject) {
        self.nativeObject = new __SF_KeychainPasswordItem(_service, _account, undefined);
    }

    Object.defineProperty(self, 'service', {
        get: function() {
            return _service;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'key', {
        get: function() {
            return _account;
        },
        enumerable: true
    });

    self.read = () => {
        return new Promise((resolve, reject) => {
            self.nativeObject.readPasswordWithBlock(function(e) {
                if (e.error) {
                    var errorMessage;
                    if (e.error.code == 1) {
                        errorMessage = SecureData._iOS._Message.NOPASSWORD;
                    } else if (e.error.code == 2) {
                        errorMessage = SecureData._iOS._Message.UNEXPECTEDPASSWORDDATA;
                    } else {
                        errorMessage = SecureData._iOS._Message.UNHANDLEDERROR;
                    }
                    reject(errorMessage);
                } else {
                    resolve(e.password);
                }
            });
        });
    };

    self.save = (e) => {
        return new Promise((resolve, reject) => {
            self.nativeObject.savePasswordWithBlock(e.value, function(e) {
                if (e.error) {
                    reject(SecureData._iOS._Message.UNHANDLEDERROR);
                } else {
                    resolve();
                }
            });
        });
    };

    self.delete = () => {
        return new Promise((resolve, reject) => {
            self.nativeObject.deleteItemWithBlock(function(e) {
                if (e.error) {
                    reject(SecureData._iOS._Message.UNHANDLEDERROR);
                } else {
                    resolve();
                }
            });
        });
    };

    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

SecureData._iOS = {};

SecureData._iOS._Message = {
    NOPASSWORD: "The specified item could not be found in the keychain.",
    UNEXPECTEDPASSWORDDATA: "Unexpected data in the keychain.",
    UNHANDLEDERROR: "Keychain unhandled error."
};

module.exports = SecureData;