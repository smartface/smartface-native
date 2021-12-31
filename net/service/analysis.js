/**
 * Smartface HttpService module
 * @module HttpService
 * @type {object}
 * @author Alper Ozisik <alper.ozisik@smartface.io>
 * @author Ozcan Ovunc <ozcan.ovunc@smartface.io>
 * @copyright Smartface 2021
 */

 const IRequestOptions = {
  /**
   * HTTP method of this request
   * @type {String}
   */
  method,
  /**
   * Request payload body. This object will be automatically stringified
   * @type {object | string} [body]
   */
  body,
  /**
   * Query string string object. Combines with the url
   * @type {string} [q]
   */
  q,
  /**
   * Alias for options.q
   * @type {String} query
   */
  query,
  /**
   * Request specific headers. In conflict with configuration, those values are used
   * @type {object | string} [headers]
   */
  headers,
  /**
   * Request specific log option
   * @type {Boolean} logEnabled
   */
  logEnabled,
  /**
   * Basic authentication user. Must be used with options.password
   * @type {String} [user]
   */
  user,
  /**
   * Basic authentication password. Must be used with options.user
   * @type {String} [password]
   */
  password?: string,
  /**
   * Resolved promise contains full response including `headers`, `body` and `status`
   * @type {Boolean} [fullResponse]
   */
  fullResponse?: boolean
}

/**
* Helper class for calling JSON based restful services.
* @public
*/
class ServiceCall {
  /**
   * @property {string} baseUrl
   */
  baseUrl;
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
  constructor(options);

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
  setHeader(key, value) {};

  /**
   * Sets headers for this configuration. Either sets one by each call or sets them in bulk
   * @method
   * @param {object} headers - headers object to set multiple header values at once
   * @example
   * // set multiple headers at once
   * sc.setHeader({
   *  environment: "test",
   *  apiVersion: "1.2"  //replaces the existing
   * });
   */
  setHeader(headers){};

  /**
   * Gets a copy of headers used
   * @method
   * @returns {object} headers
   */
  getHeaders(){};

  /**
   * creates a request options object for http request
   * @method
   * @param {String} endpointPath
   * @param {IRequestOptions} options
   * @returns {object}
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
  createRequestOptions(endpointPath, options) {};

  /**
   * Combines HttpService.createRequestOptions and HttpService.request
   * @method
   * @param {String} endpointPath
   * @param {IRequestOptions} options
   * @returns {Promise}
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
  request(endpointPath, options){};

  /**
   * Performs a request and returns a promise to handle
   * @static
   * @param {IRequestOptions} options
   * @returns {Promise}
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
  static request(options){};

  /**
   * Default values of headers
   * @static
   * @readonly
   * @property {object} header object
   * @returns {object}
   */
  static get BASE_HEADERS();
}

module.exports = ServiceCall