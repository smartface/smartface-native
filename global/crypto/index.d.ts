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
    /**
     * Returns the last generated public key of keyPair
     */
    getBase64PublicString(): string;
    /**
     * Returns the last generated private key of keyPair
     */
    getBase64PrivateString(): string;
    /**
     * Overrides the private key to be used with keyPair
     */
    setPrivateKey(base64String: string): void;
    /**
     * Overrides the public key to be used with keyPair
     */
    setPublicKey(base64String: string): void;
    /**
     * If useServerKey parameter is set to true while calling encrypt method, 
     * this key will be used to encrypt the text. Useful when two-way encryption is needed
     */
    setServerPublicKey(base64String: string): void;
    ios: {
        /**
         * On iOS, instead of using getBase64PublicString to retrieve generated public key, using this will yield better result.
         * @ios
         */
        getExportedPublicKey(): string;
    }
}

export = Crypto;