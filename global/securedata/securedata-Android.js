const NativeSFKeyStore = requireClass('io.smartface.android.sfcore.global.SFKeyStore');
const AndroidConfig = require("../../util/Android/androidconfig.js");

function SecureData(params) {
    const self = this;

    let key = params && params.key;
    if (!key) {
        throw new Error("Constructor must have key parameter.");
    }

    if (!self.nativeObject) {
        self.nativeObject = new NativeSFKeyStore(key);
        AndroidConfig.activity.getLifecycle().addObserver(self.nativeObject);
    }

    Object.defineProperty(self, 'key', {
        get: function() {
            return key;
        },
        enumerable: true
    });

    self.read = () => {
        return new Promise((resolve, reject) => {
            self.nativeObject.decryptData(function(msg, error) {
                if (error)
                    reject(msg);
                else
                    resolve(msg);
            });
        });
    };

    self.save = (params) => {
        return new Promise((resolve, reject) => {
            self.nativeObject.encryptData(params.value, function(msg, error) {
                if (error)
                    reject(msg);
                else
                    resolve();
            });
        });
    };

    self.delete = () => {
        return new Promise((resolve, reject) => {
            self.nativeObject.deleteEntry(function(msg, error) {
                if (error)
                    reject(msg);
                else
                    resolve();
            });
        });
    };
    self.ios = {};
}
module.exports = SecureData;
