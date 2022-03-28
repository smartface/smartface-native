import { TextDecoder, TextEncoder } from "util";

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

export interface HttpErrorResponse {
    errorCode: number;
    errorMessage: string
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

export class Blob {
	public static InternalAccessor = class {
		public static getBuffer(blob: Blob) {
			return blob._buffer;
		}
	};

	private _buffer: Uint8Array;
	private _size: number;
	private _type: string;

	public get size() {
		return this._size;
	}
	public get type() {
		return this._type;
	}

	constructor(chunks: Array<Blob | string> = [], opts: { type?: string } = {}) {
		const dataChunks: Uint8Array[] = [];
		for (const chunk of chunks) {
			if (chunk instanceof Blob) {
				dataChunks.push(chunk._buffer);
			} else if (typeof chunk === 'string') {
				const textEncoder = new TextEncoder();
				dataChunks.push(textEncoder.encode(chunk));
			} else {
				const textEncoder = new TextEncoder();
				dataChunks.push(textEncoder.encode(String(chunk)));
			}
		}

		const size = dataChunks.reduce((size, chunk) => size + chunk.byteLength, 0);
		const buffer = new Uint8Array(size);
		let offset = 0;
		for (let i = 0; i < dataChunks.length; i++) {
			const chunk = dataChunks[i];
			buffer.set(chunk, offset);
			offset += chunk.byteLength;
		}

		this._buffer = buffer;
		this._size = this._buffer.byteLength;

		this._type = opts.type || '';
		if (/[^\u0020-\u007E]/.test(this._type)) {
			this._type = '';
		} else {
			this._type = this._type.toLowerCase();
		}
	}

	public arrayBuffer(): Promise<ArrayBuffer> {
		return Promise.resolve(this._buffer);
	}

	public text(): Promise<string> {
		const textDecoder = new TextDecoder();

		return Promise.resolve(textDecoder.decode(this._buffer));
	}

	public slice(start?: number, end?: number, type?: string): Blob {
		const slice = this._buffer.slice(start || 0, end || this._buffer.length);

		return new Blob([slice], { type: type });
	}

	public stream() {
		throw new Error('stream is currently not supported');
	}

	public toString() {
		return '[object Blob]';
	}

	[Symbol.toStringTag] = 'Blob';
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