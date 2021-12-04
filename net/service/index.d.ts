/**
 * Smartface HttpService module
 * @module HttpService
 * @type {object}
 * @author Alper Ozisik <alper.ozisik@smartface.io>
 * @author Ozcan Ovunc <ozcan.ovunc@smartface.io>
 * @copyright Smartface 2021
 */

declare interface IRequestOptions {
    /**
     * HTTP method of this request
     */
    method: string;
    /**
     * Request payload body. This object will be automatically stringified
     */
    body?: { [key: string]: any } | string;
    /**
     * Query string string object. Combines with the url
     */
    q?: string;
    /**
     * Alias for options.q
     */
    query?: string;
    /**
     * Request specific headers. In conflict with configuration, those values are used
     */
    headers?: { [key: string]: any } | string;
    /**
     * Request specific log option
     */
    logEnabled?: boolean;
    /**
     * Basic authentication user. Must be used with options.password
     */
    user?: string;
    /**
     * Basic authentication password. Must be used with options.user
     */
    password?: string;
    /**
     * Resolved promise contains full response including `headers`, `body` and `status`
     */
    fullResponse?: boolean;
}

/**
 * Helper class for calling JSON based restful services.
 * @public
 */
export default class {
    /**
     * @property {string} baseUrl
     */
    baseUrl: string;
    /**
     * Creates an HttpService helper class with common configuration to be used across multiple service calls.
     * @param {object} options - Cofiguration of service call helper object (required)
     * @param {string} options.baseUrl - Base URL of all future service calls (required)
     * @param {number} [options.timeout = 60000] - Timeout value for service calls. If not provided it uses the default timeout value from sf-core http
     * @param {boolean} [options.logEnabled = false] - Logs the service requests & responses to console
     * @param {object} [options.headers] - Sets the default headers for this configuration
     * @example
     * 
     * // services/serviceConfig.ts
     * import HttpService from '@smartface/native/net/service';
     * export const sc = new HttpService({
     *     baseUrl: "http://api.myBaseUrl.com",
     *     logEnabled: true,
     *     headers: {
     *        apiVersion: "1.0"
     *     }
     * });
     * 
     * // services/user.ts
     * import { sc } from 'services/serviceConfig"';
     * 
     * function login(userName, password) {
     *     return new Promise((resolve, reject) => {
     *         sc.request(`/auth/login?emine=3`, {
     *             method: "POST",
     *             body: {
     *                 userName,
     *                 password
     *             }
     *         }).then(response => {
     *             sc.setHeader("Authorization", "Bearer " + response.token);
     *             resolve(response);
     *         }).catch(err => {
     *             reject(err);
     *         });
     *     });
     * }
     * 
     * 
     * // pages/pgLogin.ts
     * import userService from 'services/user';
     * 
     * this.btnLogin.onPress = () => {
     *      userService.login(this.tbUserName.text, this.tbPassword.text).then(()=> {
     *         this.router.push("dashboard"); 
     *      }).catch(()=> {
     *          alert("Cannot login");
     *      });
     * };
     */
    constructor(options: { 
        baseUrl: string;
        timeout?: number;
        logEnabled?: boolean;
        headers?: { [key: string]: any } | string;
    });

    /**
     * Sets headers for this configuration. Either sets one by each call or sets them in bulk
     * @method
     * @param {string} key - Header name to set
     * @param {string} value - Value to set of the key. If value is not a string, key is removed from header
     * @example
     * //After login
     * sc.setHeader("Authorization", "Basic 12345");
     * @example
     * //After logout
     * sc.setHeader("Authorization");
     */
    setHeader(key: string, value: string): void;

    /**
     * Sets headers for this configuration. Either sets one by each call or sets them in bulk
     * @method
     * @param {object} headers - headers object to set multipe header values at once
     * @example
     * // set multiple headers at once
     * sc.setHeader({
     *  environment: "test",
     *  apiVersion: "1.2"  //replaces the existing
     * });
     */
    setHeader(headers: object): void;

    /**
     * Gets a copy of headers used
     * @method
     * @returns {object} headers
     */
    getHeaders(): { [key: string]: any };

    /**
     * creates a request options object for http request
     * @method
     * @example
     * const reqOps = sc.createRequestOptions(`/auth/login`, {
     *        method: "POST",
     *        body: {
     *            userName,
     *            password
     *        },
     *        headers: {
     *            "Content-Type": "application/json"
     *        }
     *    });
     *    HttpService.request(reqOps).then((result) => {
     *        //logic
     *    }).catch((err) => {
     *        //logic
     *    });
     */
    createRequestOptions(endpointPath: string, options: IRequestOptions): object;

    /**
     * Combines HttpService.createRequestOptions and HttpService.request
     * @method
     * @see HttpService.createRequestOptions
     * @see HttpService.request
     * @example
     * function login(userName, password) {
     *      return sc.request("/auth/login", {
     *          method: "POST",
     *          body: {
     *              userName,
     *              password
     *          }
     *      });
     *  }
     */
    request(endpointPath: string, options: IRequestOptions): Promise<any>;

    /**
     * Performs a request and returns a promise to handle
     * @static
     * @method
     * @example
     * var reqOps = sc.createRequestOptions(`/auth/login`, {
     *        method: "POST",
     *        body: {
     *            userName,
     *            password
     *        },
     *        headers: {
     *            "Content-Type": "application/json"
     *        }
     *    });
     *    HttpService.request(reqOps).then((result) => {
     *        //logic
     *    }).catch((err) => {
     *        //logic
     *    });
     */
    static request(options: IRequestOptions): Promise<any>;

    /**
     * Default values of headers
     * @static
     * @readonly
     * @property {object} header object
     */
    static get BASE_HEADERS(): {
        "Content-Type": string,
        "Accept": string,
        "Accept-Language": string,
        "Cache-Control": string
    }
}
