import Image from "../../ui/image";
import Blob from "../../global/blob";
import File from "../../io/file";

type RequestOnload<T = {}> = (
	e: {
		statusCode: number;
		headers: { [key: string]: string };
	} & T
) => void;
type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";
type RequestParamsType<B = {}, L = {}> = {
	url: string;
} & B & {
		onLoad: RequestOnload<L>;
		onError: (e: {
			message: string;
			body: any;
			statusCode: number;
			headers: { [key: string]: string };
		}) => void;
	};
type ImageRequestParams = RequestParamsType<{}, { image: Image }>;
type StringRequestParams = RequestParamsType<{}, { string: string }>;
type JSONType = { [key: string]: string | number | null | boolean };
type FileRequestParams = RequestParamsType<
	{ fileName?: string },
	{ file?: File }
>;
type JSONRequestParams = RequestParamsType<{}, { JSON: JSONType }>;
type RequestParams = RequestParamsType<
	{
		method: RequestMethod;
		headers?: { [key: string]: any };
		user?: string;
		password?: string;
	},
	{ body?: Blob }
>;

interface IConstructorParams {
	/**
	 * Sets cookiePersistenceEnabled of Http. Enabling cookie persistence stores your cookies in memory and sends the stored cookies
	 * with every request. This property must be given in contructor.
	 *
	 * @property {Boolean} cookiePersistenceEnabled
	 * @android
	 * @default false
	 * @ios
	 * @since 3.1.2
	 */
	 cookiePersistenceEnabled?: boolean;
	 /**
		* Gets/sets request timeout. Time elapsed in millisecond. This parameter must be given in constructor.
		*
		* @property {Number} timeout
		* @default 60000
		* @android
		* @ios
		*/
	 timeout?: number;
	 /**
		* Gets/sets request headers.
		*
		* @property {Object} headers
		* @android
		* @ios
		*/
	 headers?: { [key: string]: string };
	 ios?: {
			 /**
			 * Uses the pinned certificates to validate the server trust. The server trust is considered valid if one of the pinned certificates match one of the server certificates.
			 * By validating both the certificate chain and host, certificate pinning provides a very secure form of server trust validation mitigating most, if not all, MITM attacks.
			 * Applications are encouraged to always validate the host and require a valid certificate chain in production environments.
			 * 
			 * @property {Array}    sslPinning   
			 * @property {String}   sslPinning.host
			 * @property {Array}    sslPinning.certificates Only DER format accepted.
			 * @property {Boolean}  [sslPinning.validateCertificateChain=true]
			 * @property {Boolean}  [sslPinning.validateHost=true]
			 * @ios
			 * @since 4.3.4
			 */
			 sslPinning?: {
				host: string,
				certificates: string[],
				validateCertificateChain?: boolean,
				validateHost?: boolean
			}[];
	 }
}

/**
 * @class Net.Http
 *
 * http module allows sending http requests.
 *
 *     @example
 *     const Http = require("@smartface/native/net/http");
 *     var http = new Http();
 *     http.request({
 *         'url':'YOUR_URL_HERE',
 *         'headers': {
 *             // YOUR_HEADER_HERE'
 *          },
 *         'method':'HTTP_METHOD_HERE',
 *         'body': 'YOUR_BODY_HERE',
 *         onLoad: function(response){
 *             // Handling image request response
 *             myImageView.image = Image.createFromBlob(response.body);
 *             // Handling text request response
 *             myLabel.text = response.body.toString();
 *         },
 *         onError: function(e){
 *             // Handle error like:
 *             if(e.statusCode === 500){
 *                 console.log("Internal Server Error Occurred.");
 *             }
 *             else{
 *                 console.log("Server responsed with: " + e.statusCode + ". Message is: " + e.message);
 *             }
 *         }
 *     });
 */
declare class Http implements IConstructorParams {
	constructor(params?: IConstructorParams);
	cookiePersistenceEnabled: boolean;
	timeout: number;
	headers: { [key: string]: string; };
	ios: {
		/**
		 * Uses the pinned certificates to validate the server trust. The server trust is considered valid if one of the pinned certificates match one of the server certificates.
		 * By validating both the certificate chain and host, certificate pinning provides a very secure form of server trust validation mitigating most, if not all, MITM attacks.
		 * Applications are encouraged to always validate the host and require a valid certificate chain in production environments.
		 * 
		 * @property {Array}    sslPinning   
		 * @property {String}   sslPinning.host
		 * @property {Array}    sslPinning.certificates Only DER format accepted.
		 * @property {Boolean}  [sslPinning.validateCertificateChain=true]
		 * @property {Boolean}  [sslPinning.validateHost=true]
		 * @ios
		 * @since 4.3.4
		 */
		sslPinning?: {
			host: string,
			certificates: string[],
			validateCertificateChain?: boolean,
			validateHost?: boolean
		}[];
	};
	/**
	 * Cancels all requests.
	 *
	 * @method cancelAll
	 * @android
	 * @ios
	 */
	cancelAll: () => void;
	/**
	 * @method requestFile
	 *
	 * Sends an http request to given url and saves response file
	 * to temp directory of application. If request ends successfully
	 * onLoad callback will be called with received File object.
	 *
	 * @param {Object} params
	 * @param {String} params.url URL of file
	 * @param {String} params.fileName File name
	 * @param {Function} params.onLoad Callback for success case
	 * @param {Object} params.onLoad.e
	 * @param {IO.File} params.onLoad.e.file
	 * @param {Number} params.onLoad.e.statusCode
	 * @param {Object} params.onLoad.e.headers
	 * @param {Function} params.onError Callback for error case
	 * @param {Object} params.onError.e
	 * @param {String} params.onError.e.message
	 * @param {Object} params.onError.e.body
	 * @param {Number} params.onError.e.statusCode
	 * @param {Object} params.onError.e.headers
	 * @return {Net.Http.Request}
	 * @since 0.1
	 */
	requestFile: (params: FileRequestParams) => Http.Request;
	/**
	 * @method requestImage
	 *
	 * Sends an http request to given url. If request ends successfully
	 * onLoad callback will be called with received UI.Image object.
	 *
	 * @param {Object} params
	 * @param {String} params.url URL of file
	 * @param {Function} params.onLoad Callback for success case
	 * @param {Object} params.onLoad.e
	 * @param {UI.Image} params.onLoad.e.image
	 * @param {Number} params.onLoad.e.statusCode
	 * @param {Object} params.onLoad.e.headers
	 * @param {Function} params.onError Callback for error case
	 * @param {Object} params.onError.e
	 * @param {String} params.onError.e.message
	 * @param {Object} params.onError.e.body
	 * @param {Number} params.onError.e.statusCode
	 * @param {Object} params.onError.e.headers
	 * @return {Net.Http.Request}
	 * @since 0.1
	 */
	requestImage: (params: ImageRequestParams) => Http.Request;
	/**
	 * @method requestString
	 *
	 * Sends an http request to given url. If request ends successfully
	 * onLoad callback will be called with received string.
	 *
	 * @param {Object} params
	 * @param {String} params.url URL of file
	 * @param {Function} params.onLoad Callback for success case
	 * @param {Object} params.onLoad.e
	 * @param {String} params.onLoad.e.string
	 * @param {Number} params.onLoad.e.statusCode
	 * @param {Object} params.onLoad.e.headers
	 * @param {Function} params.onError Callback for error case
	 * @param {Object} params.onError.e
	 * @param {String} params.onError.e.message
	 * @param {Object} params.onError.e.body
	 * @param {Number} params.onError.e.statusCode
	 * @param {Object} params.onError.e.headers
	 * @return {Net.Http.Request}
	 * @since 0.1
	 */
	requestString: (params: StringRequestParams) => Http.Request;
	/**
	 * @method requestJSON
	 *
	 * Sends an http request to given url. If request ends successfully
	 * onLoad callback will be called with received JSON object.
	 *
	 * @param {Object} params
	 * @param {String} params.url URL of file
	 * @param {Function} params.onLoad Callback for success case
	 * @param {Object} params.onLoad.e
	 * @param {Object} params.onLoad.e.JSON
	 * @param {Number} params.onLoad.e.statusCode
	 * @param {Object} params.onLoad.e.headers
	 * @param {Function} params.onError Callback for error case
	 * @param {Object} params.onError.e
	 * @param {String} params.onError.e.message
	 * @param {Object} params.onError.e.body
	 * @param {Number} params.onError.e.statusCode
	 * @param {Object} params.onError.e.headers
	 * @return {Net.Http.Request}
	 * @since 0.1
	 */
	requestJSON: (params: JSONRequestParams) => Http.Request;
	/**
	 * @method request
	 *
	 * Sends an http request defined with parameters.
	 *
	 * @param {Object} params Parameters
	 * @param {String} params.url URL
	 * @param {Object} params.headers Headers
	 * @param {String} params.method Http request method
	 * @param {String} params.body Http request body
	 * @param {String} params.user Username for authorization if needed
	 * @param {String} params.password Password for authorization if needed
	 * @param {Function} params.onLoad Callback for success case
	 * @param {Object} params.onLoad.e
	 * @param {Blob} params.onLoad.e.body
	 * @param {Number} params.onLoad.e.statusCode
	 * @param {Object} params.onLoad.e.headers
	 * @param {Function} params.onError Callback for error case
	 * @param {Object} params.onError.e
	 * @param {String} params.onError.e.message Message of the error
	 * @param {Object} params.onError.e.body Body of the error
	 * @param {Number} params.onError.e.statusCode Error status code
	 * @param {Object} params.onError.e.headers Headers sent with error
	 * @return {Net.Http.Request}
	 * @since 0.1
	 */
	request: (params: RequestParams) => Http.Request;
}
declare namespace Http {
	/**
	 * @class Net.Http.Request
	 *
	 * Http Request CANNOT be initialized. Use http's request methods instead.
	 *
	 *     @example
	 *     const Http = require("@smartface/native/net/http");
	 *
	 *     var http = new Http();
	 *     var myImageUrl = your-image-url;
	 *     var request = http.requestImage({url: myImageUrl, onLoad: onLoad, onError: onError});
	 *     request.cancel();
	 *
	 */
	class Request {
		constructor(nativeObject: any);
		/**
		 * @method cancel
		 *
		 * Stops listening the response of the request.
		 *
		 * @since 0.1
		 */
		cancel: () => void;
	}
}

export = Http;
