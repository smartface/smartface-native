const SFCrypto = requireClass("io.smartface.android.sfcore.global.Crypto");

function Crypto() {}

Crypto.generateKeyPair = function (params = {}) {
    let {keySize, algorithm} = params;
    var keyPair = SFCrypto.generateKeyPair(keySize, algorithm);
    return {
        public: keyPair.getPublic(),
        private: keyPair.getPrivate()
    }
};

Crypto.toBase64String = function(key) {
    return SFCrypto.toBase64String(key);
};

Crypto.getKeyFromBase64String = function(params) {
    let {base64String, isPrivate, algorithm} = params;
    return SFCrypto.getKeyFromBase64String(base64String, isPrivate, algorithm);
};

Crypto.encrypt = function(params = {}) {
    let {plainText, key, cipherType} = params;
    return SFCrypto.encrypt(plainText, key, cipherType);
};

Crypto.decrypt = function(params = {}) {
    let {encryptedText, key, cipherType} = params;
    return SFCrypto.decrypt(encryptedText, key, cipherType);
};

module.exports = Crypto