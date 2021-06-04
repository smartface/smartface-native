
function AES() {}

const SFCrypto = new __SF_SMFCrypto(); 

AES.generateKey = function (length = 32) {
    return SFCrypto.generateAESKey(length);
}

AES.encryptGCMAsync = function (params = {}) {
    const { plainText, key , ivSize = 16, onComplete = () => { }, onFailure = () => { } } = params;
    SFCrypto.encryptAES(plainText, key, ivSize, onComplete, onFailure);
};

AES.decryptGCMAsync = function (params = {}) {
    const { encryptedText, key, iv , onComplete = () => { }, onFailure = () => { } } = params;
    SFCrypto.decryptAES(encryptedText, key, iv, onComplete, onFailure);
};

module.exports = AES