export type Headers = { [key: string]: string | string[] };

export const XMLHttpRequestResponseType = {
    empty: '',
    text: 'text',
    json: 'json',
    blob: 'blob',
    arraybuffer: 'arraybuffer',
} as const;

export type ResponseTypes = ExtractValues<typeof XMLHttpRequestResponseType>;



type FormDataValue = string | { name?: string, type?: string, uri: string };
type FormDataNameValuePair = [string, FormDataValue];
export type FormDataPart = { keyValue: string, headers: Headers }
    | {
        uri: string,
        headers: Headers,
        name?: string,
        type?: string,
    };

export class FormData {
    _parts: Array<FormDataNameValuePair>;

    constructor() {
        this._parts = [];
    }

    append(key: string, value: FormDataValue) {
        // The XMLHttpRequest spec doesn't specify if duplicate keys are allowed.
        // MDN says that any new values should be appended to existing values.
        // In any case, major browsers allow duplicate keys, so that's what we'll do
        // too. They'll simply get appended as additional form data parts in the
        // request body, leaving the server to deal with them.
        this._parts.push([key, value]);
    }

    getParts(): Array<FormDataPart> {
        return this._parts.map(([name, value]) => {
            console.log('name:',name)
            console.log('value:',value)
            const contentDisposition = 'form-data; name="' + name + '"';

            const headers: Headers = { 'content-disposition': contentDisposition };

            // The body part is a "blob", which in React Native just means
            // an object with a `uri` attribute. Optionally, it can also
            // have a `name` and `type` attribute to specify filename and
            // content type (cf. web Blob interface.)
            if (typeof value === 'object' && value) {
                if (typeof value.name === 'string') {
                    headers['content-disposition'] += '; filename="' + value.name + '"';
                }
                if (typeof value.type === 'string') {
                    headers['content-type'] = value.type;
                }
                return { ...value, headers, fieldName: name };
            }
            // Convert non-object values to strings as per FormData.append() spec
            return { keyValue: String(value), headers, fieldName: name };
        });
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