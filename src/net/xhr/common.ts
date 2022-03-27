export type Headers = { [key: string]: string | string[] };
export interface HttpRequestOptions {
    url: string;
    method: string;
    headers?: Headers;
    content?: string | FormData | ArrayBuffer;
    timeout?: number;
}

export const XMLHttpRequestResponseType = {
    empty: '',
    text: 'text',
    json: 'json',
    blob: 'blob',
    arraybuffer: 'arraybuffer',
} as const;

export type ResponseTypes = ExtractValues<typeof XMLHttpRequestResponseType>;


export interface HttpResponse {
    statusCode: number;
    headers: Headers;
    //TODO: Add JSON, Blob, ArrayBuffer support
    content?: String;
    responseURL?: string
}

export class FormData {
    private _data: Map<string, any>;

    constructor() {
        this._data = new Map<string, any>();
    }

    append(name: string, value: any) {
        this._data.set(name, value);
    }

    toString(): string {
        const arr = new Array<string>();

        this._data.forEach(function (value, name, map) {
            arr.push(`${encodeURIComponent(name)}=${encodeURIComponent(value)}`);
        });

        return arr.join('&');
    }
}

export const statuses = {
    100: 'Continue',
    101: 'Switching Protocols',
    200: 'OK',
    201: 'Created',
    202: 'Accepted',
    203: 'Non - Authoritative Information',
    204: 'No Content',
    205: 'Reset Content',
    206: 'Partial Content',
    300: 'Multiple Choices',
    301: 'Moved Permanently',
    302: 'Found',
    303: 'See Other',
    304: 'Not Modified',
    305: 'Use Proxy',
    307: 'Temporary Redirect',
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Required',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    406: 'Not Acceptable',
    407: 'Proxy Authentication Required',
    408: 'Request Timeout',
    409: 'Conflict',
    410: 'Gone',
    411: 'Length Required',
    412: 'Precondition Failed',
    413: 'Request Entity Too Large',
    414: 'Request - URI Too Long',
    415: 'Unsupported Media Type',
    416: 'Requested Range Not Satisfiable',
    417: 'Expectation Failed',
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
    505: 'HTTP Version Not Supported',
};