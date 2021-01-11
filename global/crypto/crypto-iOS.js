
function Crypto() {}

const SFCrypto = new __SF_SMFRSA(1); 
Crypto.generateKeyPair = function (params = {}) {
    let {keySize, onResult} = params;
    SFCrypto.generateKeyPair(keySize, function(params) {
        onResult && onResult(params);
    });
};

Crypto.setPublicServerKey = function(key) {
    SFCrypto.setPublicServerKey(key);
};

Crypto.encrypt = function(params = {}) {
    let {plainText, usePrivateKey, useServerKey = false} = params;
    return SFCrypto.encrypt(plainText, usePrivateKey, useServerKey);
};

Crypto.decrypt = function(params = {}) {
    let {encryptedText, usePrivateKey} = params;
    return SFCrypto.decrypt(encryptedText, usePrivateKey);
};

module.exports = Crypto