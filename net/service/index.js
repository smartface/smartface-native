const Http = require('../http');
const queryString = require('query-string');

const reHTTPUrl = /^http(s?):\/\//i;
const reParseBodyAsText = /(?:application\/(?:x-csh|json|javascript|rtf|xml)|text\/.*|.*\/.*(:?\+xml|xml\+).*)/i;
const reJSON = /^application\/json/i;

const METHODS_WITHOUT_BODY = ["GET", "HEAD"];
const BASE_HEADERS = Object.freeze({
	"Content-Type": "application/json",
	"Accept": "application/json",
	//@ts-ignore
	"Accept-Language": global.Device.language || "en",
	"Cache-Control": "no-cache",
});

const DEFAULT_TIMEOUT = 60000;

class HttpService {
	constructor(options) {
		this.baseUrl = options.baseUrl;
		this.logEnabled = !!options.logEnabled;
		const httpOptions = {
			timeout: options.timeout || DEFAULT_TIMEOUT,
			ios: {
				sslPinning: options.sslPinning || []
			},
			headers: options.headers || BASE_HEADERS
		};
		this._http = new Http(httpOptions);
	}

	setHeader(key, value) {
		if (typeof key === "object") {
			for (let k in key) {
				let v = key[k];
				this.setHeader(k, v);
			}
		} else if (typeof key === "string") {
			if (value) {
				this._http.headers[key] = String(value);
			} else {
				delete this._http.headers[key];
			}
		} else {
			throw Error("key must be string or object");
		}
	}

	getHeaders() {
		return this._http.headers;
	}

	get baseUrl() {
		return this._baseUrl || '';
	}

	set baseUrl(value) {
		this._baseUrl = value;
	}

	get logEnabled() {
		return this._logEnabled || false;
	}

	set logEnabled(value) {
		this._logEnabled = value;
	}

	createRequestOptions(
		endpointPath,
		options
	) {
		const url = `${this._baseUrl}${endpointPath}`;
		if (!reHTTPUrl.test(url)) {
			throw Error(`URL is not valid for http(s) request: ${url}`);
		}
		return {
			url,
			logEnabled: !!this.logEnabled,
			headers: this.getHeaders(),
			...options
		}
	}

	request(endpointPath, options) {
		const url = `${this._baseUrl}${endpointPath}`;
		if (!reHTTPUrl.test(url)) {
			throw Error(`URL is not valid for http(s) request: ${url}`);
		}
		const requestOptions = {
			url,
			logEnabled: !!this.logEnabled, 
			...options
		}
		
		let { fullResponse = false } = requestOptions;
		let query = requestOptions.q || requestOptions.query;
		requestOptions.url = String(requestOptions.url);
		if (query) {
			let urlParts = requestOptions.url.split("?");
			let q = Object.assign(queryString.parse(urlParts[1]), query);
			let qString = queryString.stringify(q);
			urlParts[1] = qString;
			requestOptions.url = urlParts.join("?");
		}

		return new Promise((resolve, reject) => {
			let copiedOptions = {
                onLoad: (response) => {
                    try {
                        response.logEnabled = !!this.logEnabled;
                        HttpService.bodyParser(requestOptions.url || '', response);
                        if (response.body && response.body.success === false){
                            reject(fullResponse ? response : response.body);
                        }
                        else { 
                            resolve(fullResponse ? response : response.body);
                        }
                    } catch (ex) {
                        reject(ex);
                    }
                },
                onError: (e) => {
                    e.logEnabled = !!this.logEnabled;
                    HttpService.bodyParser(requestOptions.url || '', e);
                    e.requestUrl = requestOptions.url;

                    reject(e);
                },
                headers: {},
                ...requestOptions 
            };

			if (METHODS_WITHOUT_BODY.indexOf(copiedOptions.method) !== -1) {
				if (copiedOptions.body) {
					delete copiedOptions.body;
				}
				if (copiedOptions.headers && copiedOptions.headers["Content-Type"])
					delete copiedOptions.headers["Content-Type"];
					if(copiedOptions.logEnabled) {
						console.log("request: ", copiedOptions.url, " ", copiedOptions);
					}
			} else {
				if(copiedOptions.logEnabled) {
					console.log("request: ", copiedOptions.url, " ", copiedOptions);
				}
				if (copiedOptions.body && typeof copiedOptions.body === "object") {
					if (copiedOptions.headers["Content-Type"].startsWith("application/json")) {
						copiedOptions.body = JSON.stringify(copiedOptions.body);
					} else if (copiedOptions.headers["Content-Type"].includes("x-www-form-urlencoded")) {
						copiedOptions.body = HttpService.convertObjectToFormData(copiedOptions.body);
					}
				}
			}
			this._http.request(copiedOptions);
		});
	}

	static bodyParser(requestUrl, response) {
		const contentType =
			(response.headers && HttpService.getContentType(response.headers)) || "";
		reJSON.lastIndex = reParseBodyAsText.lastIndex = 0;
		if (reParseBodyAsText.test(contentType))
			response.body = response.body.toString();
		response.body = response.body || "{}";

		if (reJSON.test(contentType)) {
			try {
				response.body = JSON.parse(response.body);
				response.logEnabled &&
					console.log(
						"Request url ",
						requestUrl,
						" Response body ",
						response.body
					);
			} catch (ex) {
				response.logEnabled &&
					console.log(
						"Request url ",
						requestUrl,
						" Response is not a  JSON\nResponse Body ",
						response.body
					);
			}
		}
		if (response.logEnabled && typeof response.body === "string")
			console.log(
				"Request url ",
				requestUrl,
				" Response body (non-json) ",
				response.body
			);
	}

	static convertObjectToFormData(body) {
		let formData = "";
		let bodyKeys = Object.keys(body);
		bodyKeys.forEach((key, index) => {
			let isLastItem = bodyKeys.length - 1 === index;
			formData += key;
			formData += "=";
			formData += body[key];
			if (!isLastItem) {
				formData += "&";
			}
		});
		return formData;
	}

	static getContentType(headers) {
		let contentType = headers["Content-Type"];
		if (!contentType) {
			for (let h in headers) {
				if (h.toLowerCase() === "content-type") {
					contentType = headers[h];
					break;
				}
			}
		}
		return contentType;
	}
}

module.exports = exports = HttpService;
