
function Crypto() { }
Crypto.ios = {};

const SFCrypto = new __SF_SMFCrypto();
Crypto.generateKeyPair = function (params = {}) {
    const { keySize } = params;
    return SFCrypto.generateKeyPair(keySize);
};

Crypto.encrypt = function (params) {
    const { plainText, key, cipherType } = params;
    return SFCrypto.encrypt(plainText, key);
};

Crypto.decrypt = function (params) {
    const { encryptedText, key, cipherType } = params;
    return SFCrypto.decrypt(encryptedText, key);
};

Crypto.ios.getExportedPublicKey = function (key) {
    return SFCrypto.getExportedPublicKey(key);
};

module.exports = Crypto