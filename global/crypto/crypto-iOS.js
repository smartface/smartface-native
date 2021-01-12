
function Crypto() {}
Crypto.ios = {};

const SFCrypto = new __SF_SMFRSA(); 
Crypto.generateKeyPair = function (params = {}) {
    let {keySize} = params;
    return SFCrypto.generateKeyPair(keySize);
};

Crypto.encrypt = function(params) {
    let {plainText, useServerKey = false} = params;
    return SFCrypto.encrypt(plainText, useServerKey);
};

Crypto.decrypt = function(params) {
    let {encryptedText} = params;
    return SFCrypto.decrypt(encryptedText);
};

Crypto.getBase64PublicString = function() {
    return SFCrypto.toBase64String(false);
};

Crypto.getBase64PrivateString = function() {
    return SFCrypto.toBase64String(true);
};

Crypto.setPrivateKey = function(base64String) {
    SFCrypto.setPrivateKeyFromBase64String(base64String)
};

Crypto.setPublicKey = function(base64String) {
    SFCrypto.setPublicKeyFromBase64String(base64String)
};

Crypto.setServerPublicKey = function(base64String) {
    SFCrypto.setServerPublicKeyFromBase64String(base64String)
};

Crypto.ios.getExportedPublicKey = function () {
    return SFCrypto.getExportedPublicKey();
}

module.exports = Crypto