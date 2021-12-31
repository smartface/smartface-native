import ServiceCall from "../service";
function closeOfflineDatabase(e){};
class OfflineRequestServiceCall extends ServiceCall {
    /**
     * Creates an OfflineRequestServiceCall helper class
     * If there's no network connection, saves the request to perform later when 
     * network connection is available
     * @augments ServiceCall
     * @param {object} options
     * @param {String} options.baseUrl
     * @param {Boolean} [options.logEnabled]
     * @async @param {function} options.offlineRequestHandler - Gets request options to be modified 
     * when network connection is available and returns a promise
     * @example
     * import { OfflineRequestServiceCall } from '@smartface/native/net/offline';
     * sc = new OfflineRequestServiceCall({
     *     baseUrl: "http://smartface.io",
     *     logEnabled: true,
     *     offlineRequestHandler: requestOptions => {
     *         return new Promise((resolve, reject) => {
     *             amce.createRequestOptions(amceOptions)
     *                 .then(({ headers }) => {
     *                     resolve(Object.assign({}, requestOptions, headers));
     *                 });
     *         });
     *     }
     * });
     */
    constructor(options) {};

     /**
     * @method
     * @param {String} endpointPath 
     * @param {object} [options]
     * @async
     * @returns {Promise} 
     */
    request(endpointPath, options){};

    /**
     * Perform all pending requests in DB
     * @static
     * @method
     * @returns {Promise} 
     */
    static sendAll(){};

    /**
     * Clear all requests in DB
     * @static
     * @method
     * @returns {Promise} 
     */
    static clearJobs(){}
}

class OfflineResponseServiceCall extends ServiceCall {
    /**
     * Creates an OfflineResponseServiceCall helper class
     * Response is served from DB then request is made to update the DB
     * 
     * @augments ServiceCall
     * @param {object} options
     * @param {String} options.baseUrl
     * @param {Boolean} [options.logEnabled]
     * @param {function} [options.requestCleaner] - Returns modified request options
     * @example
     * import { OfflineResponseServiceCall } from '@smartface/native/net/offline';
     * sc = sc || new OfflineResponseServiceCall({
     *     baseUrl: "http://smartface.io",
     *     logEnabled: true,
     *     requestCleaner: requestOptions => {
     *         delete requestOptions.headers;
     *         return requestOptions;
     *     }
     * });     
     */
    constructor(options) {};

    /**
     * @method
     * @param {String} endpointPath 
     * @param {object} [options]}
     * @async
     * @returns {Promise} 
     */
    request(endpointPath, options){};
}

/**
 * Configures service-call-offline. Call this in your app once before using any functionality.
 * @function service-call-offline:init
 * @param {object} options configuration options
 * @param {fingerprint:CryptopgyFunction} [options.encryptionFunction] stored data is encrypted with the given function
 * @param {fingerprint:CryptopgyFunction} [options.decryptionFunction] stored data is decrypted with the given function
 * @public
 * @static
 * @example
 * import { init } from '@smartface/native/net/offline';
 * import Blob from '@smartface/native/global/blob';
 * 
 * const basicEncrypt = plainData => {
 *     let b = Blob.createFromUTF8String(plainData);
 *     let encryptedData = b.toBase64();
 *     return encryptedData;
 * };
 * 
 * const basicDecrypt = encryptedData => {
 *     let b = Blob.createFromBase64(encryptedData);
 *     let decryptedData = b.toString();
 *     return decryptedData;
 * };
 * 
 * // It is recommended this to be called in app.ts:
 * init({
 *     encryptionFunction: basicEncrypt,
 *     decryptionFunction: basicDecrypt
 * });
 * 
 */
function init(options){};

/**
 * @function
 * @async
 * @returns {Promise}
 */
function clearOfflineDatabase();

module.exports = {
  init,
  OfflineRequestServiceCall,
  OfflineResponseServiceCall,
  clearOfflineDatabase,
  closeOfflineDatabase: sameReturner
};
