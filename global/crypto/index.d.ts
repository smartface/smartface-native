declare const Crypto: {
    /**
     * Generates RSA private and public key.
     * To retrieve the keys, you can use getBase64PublicString and getBase64PrivateString methods.
     * On iOS, public key should be retrieved with getExportedPublicKey function
     * @param params 
     * @returns If they keypair generated successfully, it will return true
     */
    generateKeyPair(params: { keySize: number }): boolean;
    /**
     * If useServerKey parameter is set to true while calling encrypt method, 
     * the key entered via setServerPublicKey will be used.
     */
    encrypt(params: { plainText: string, useServerKey?: boolean, cipherType: string }): string;
    decrypt(params: { encryptedText: string, cipherType: string }): string;
    getBase64PublicString(): string;
    getBase64PrivateString(): string;
    setPrivateKey(base64String: string): void;
    setPublicKey(base64String: string): void;
    /**
     * If useServerKey parameter is set to true while calling encrypt method, 
     * this key will be used to encrypt the text.
     */
    setServerPublicKey(base64String: string): void;
    ios: {
        getExportedPublicKey(): string;
    }
}

export = Crypto;