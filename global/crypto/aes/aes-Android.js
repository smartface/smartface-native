
const AESCrypto = requireClass('io.smartface.android.sfcore.global.crypto.AESCrypto');

const AES = {};

AES.encryptGCMAsync = function (params = {}) {
    const { plainText, key , ivSize = 16, onComplete = () => { }, onFailure = () => { } } = params;
    
    AESCrypto.encryptGCMAsync(plainText, key, ivSize, {
        onComplete,
        onFailure
    });
};

AES.decryptGCMAsync = function (params = {}) {
    const { encryptedText, key, iv , onComplete = () => { }, onFailure = () => { } } = params;
    
    AESCrypto.decryptGCMAsync(encryptedText, key, iv, {
        onComplete,
        onFailure
    });
};

AES.generateKey = function (length = 32) {
    return AESCrypto.generateKey(length);
}

module.exports = AES