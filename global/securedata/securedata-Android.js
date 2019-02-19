const Application = require("sf-core/application");
const NativeSFKeyStore = requireClass('io.smartface.android.sfcore.global.SFKeyStore');

function SecureData(params) {
    const self = this;
    
    let key = params && params.key;
    if (!key) {
        throw new Error("Constructor must have key parameter.");
    }

    if (!self.nativeObject) {
        self.nativeObject = new NativeSFKeyStore(key);
    }

    Object.defineProperty(self, 'key', {
        get: function() {
            return key;
        },
        enumerable: true
    });

    self.read = () => {
        return new Promise((resolve, reject) => {
            try {
                let decryptData = self.nativeObject.decryptData();
                resolve(decryptData);
            }
            catch (e) {
                reject();
                Application.onUnhandledError && Application.onUnhandledError(e);
            }
        });
    };

    self.save = (params) => {
        return new Promise((resolve, reject) => {
            try {
                self.nativeObject.encryptData(params.value);
                resolve();
            }
            catch (e) {
                reject();
                Application.onUnhandledError && Application.onUnhandledError(e);
            }
        });
    };

    self.delete = () => {
        return new Promise((resolve, reject) => {
            try {
                self.nativeObject.deleteEntry();
                resolve();
            }
            catch (e) {
                reject();
                Application.onUnhandledError && Application.onUnhandledError(e);
            }
        });
    };

    self.ios = {};
}
module.exports = SecureData;
