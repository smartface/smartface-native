function SecureData(params) {
    var _account = params && params.key;
    var _service = params && params.service;

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
                    reject(e.error.code);
                }
                else {
                    resolve(e.password);
                }
            });
        });
    };

    self.save = (e) => {
        return new Promise((resolve, reject) => {
            self.nativeObject.savePasswordWithBlock(e.value, function(e) {
                if (e.error) {
                    reject(e.error.code);
                }
                else {
                    resolve();
                }
            });
        });
    };

    self.delete = () => {
        return new Promise((resolve, reject) => {
            self.nativeObject.deleteItemWithBlock(function(e) {
                if (e.error) {
                    reject(e.error.code);
                }
                else {
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

module.exports = SecureData;