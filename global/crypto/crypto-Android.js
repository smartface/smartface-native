const SFCrypto = requireClass("io.smartface.android.sfcore.global.Crypto");

function Crypto() {}
Crypto.singletonObject = {};
Crypto.ios = {};
Crypto.ios.getExportedPublicKey = function() {};

const ENCRYPT_ALGORITHM = "RSA";
Crypto.generateKeyPair = function (params = {}) {
    const { keySize } = params;
    const keyPair = SFCrypto.generateKeyPair(keySize, ENCRYPT_ALGORITHM);
    Crypto.singletonObject.publicKey = keyPair.getPublic();
    Crypto.singletonObject.privateKey = keyPair.getPrivate();
    return true;
};

Crypto.getBase64PublicString = function() {
    return SFCrypto.toBase64String(Crypto.singletonObject.publicKey);
};

Crypto.getBase64PrivateString = function() {
    return SFCrypto.toBase64String(Crypto.singletonObject.privateKey);
};

Crypto.setPrivateKey = function(base64String) {
    const privateKey = SFCrypto.getKeyFromBase64String(base64String, true, ENCRYPT_ALGORITHM);
    Crypto.singletonObject.privateKey = privateKey;
};

Crypto.setPublicKey = function(base64String) {
    const publicKey = SFCrypto.getKeyFromBase64String(base64String, false, ENCRYPT_ALGORITHM);
    Crypto.singletonObject.publicKey = publicKey;
};

Crypto.setServerPublicKey = function(base64String) {
    const serverPublicKey = SFCrypto.getKeyFromBase64String(base64String, false, ENCRYPT_ALGORITHM);
    Crypto.singletonObject.serverPublicKey = serverPublicKey;
};

Crypto.encrypt = function(params = {}) {
    const { plainText, useServerKey, cipherType } = params;
    const key = useServerKey ? Crypto.singletonObject.serverPublicKey : Crypto.singletonObject.publicKey;
    return SFCrypto.encrypt(plainText, key, cipherType);
};

Crypto.decrypt = function(params = {}) {
    const { encryptedText, cipherType } = params;
    const key = Crypto.singletonObject.privateKey;
    return SFCrypto.decrypt(encryptedText, key, cipherType);
};

module.exports = Crypto