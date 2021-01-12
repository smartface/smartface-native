const SFCrypto = requireClass("io.smartface.android.sfcore.global.Crypto");

function Crypto() {}
Crypto.singletonObject = {};
Crypto.ios = {};
Crypto.ios.getExportedPublicKey = function() {};

Crypto.generateKeyPair = function (params = {}) {
    let {keySize, algorithm="RSA"} = params;
    var keyPair = SFCrypto.generateKeyPair(keySize, algorithm);
    Crypto.singletonObject.publicKey = keyPair.getPublic();
    Crypto.singletonObject.privateKey = keyPair.getPrivate();
};

Crypto.getBase64PublicString = function() {
    return SFCrypto.toBase64String(Crypto.singletonObject.publicKey);
};

Crypto.getBase64PrivateString = function() {
    return SFCrypto.toBase64String(Crypto.singletonObject.privateKey);
};

Crypto.setPrivateKey = function(base64String) {
    let privateKey = SFCrypto.getKeyFromBase64String(base64String, true, "RSA");
    Crypto.singletonObject.privateKey = privateKey;
};

Crypto.setPublicKey = function(base64String) {
    let publicKey = SFCrypto.getKeyFromBase64String(base64String, false, "RSA");
    Crypto.singletonObject.publicKey = publicKey;
};

Crypto.setServerPublicKey = function(base64String) {
    let serverPublicKey = SFCrypto.getKeyFromBase64String(base64String, false, "RSA");
    Crypto.singletonObject.serverPublicKey = serverPublicKey;
};

Crypto.encrypt = function(params = {}) {
    let {plainText, useServerKey, cipherType} = params;
    let key = useServerKey ? Crypto.singletonObject.serverPublicKey : Crypto.singletonObject.publicKey;
    return SFCrypto.encrypt(plainText, key, cipherType);
};

Crypto.decrypt = function(params = {}) {
    let {encryptedText, cipherType} = params;
    let key = Crypto.singletonObject.privateKey;
    return SFCrypto.decrypt(encryptedText, key, cipherType);
};

module.exports = Crypto