const SFCrypto = requireClass("io.smartface.android.sfcore.global.crypto.RSACrypto");

function RSA() {}
RSA.ios = {};
RSA.ios.getExportedPublicKey = function() {};

const ENCRYPT_ALGORITHM = "RSA";
RSA.generateKeyPair = function (params = {}) {
    const { keySize = 2048 } = params;
    const keyPair = SFCrypto.generateKeyPair(keySize, ENCRYPT_ALGORITHM);

    return {
        publicKey: keyPair.getPublicKeyBase64(),
        privateKey: keyPair.getPrivateKeyBase64()
    };
};

RSA.encrypt = function(params = {}) {
    const { plainText, key, cipherType } = params;

    return SFCrypto.encrypt(plainText, key, cipherType, ENCRYPT_ALGORITHM);
};

RSA.decrypt = function(params = {}) {
    const { encryptedText, key, cipherType } = params;

    return SFCrypto.decrypt(encryptedText, key, cipherType, ENCRYPT_ALGORITHM);
};

module.exports = RSA