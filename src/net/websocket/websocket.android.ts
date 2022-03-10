import { eventCallbacksAssign } from '../../core/eventemitter/eventCallbacksAssign';
import Blob from '../../global/blob';
import { BlobBase } from '../../global/blob/blob';
import AndroidConfig from '../../util/Android/androidconfig';
import { IWebSocket, WebSocketBase } from './websocket';
import { WebSocketEvents } from './websocket-events';

/*globals requireClass*/
const OkHttpRequest = requireClass('okhttp3.Request');
const OkHttpClient = requireClass('okhttp3.OkHttpClient');
const ByteString = requireClass('okio.ByteString');

const activity = AndroidConfig.activity;
const Runnable = requireClass('java.lang.Runnable');

const Events = {
  ...WebSocketEvents
};

export default class WebSocketAndroid extends WebSocketBase {
  private _listener: any;
  private _request: any;
  private _client: any;
  private _onOpenCallback: any;
  private _onFailureCallback: any;
  private _onMessageCallback: any;
  private _onCloseCallback: any;
  private _url: string;

  constructor(params?: Partial<IWebSocket>) {
    super(params);

    if (!params || !params.url) {
      throw new Error('url must be initialized.');
    }

    // Assign parameters given in constructor
    for (const param in params) {
      this[param] = params[param];
    }

    this._url = params.url;

    this.createClientAndRequest();
    this.createWebSocketListener();
    this.nativeObject = this._client.newWebSocket(this._request, this._listener);

    const EventFunctions = {
      [Events.Close]: (e) => {
        this._onCloseCallback?.(e);
      },
      [Events.Failure]: (e) => {
        this._onFailureCallback?.(e);
      },
      [Events.Message]: (e) => {
        this._onMessageCallback?.(e);
      },
      [Events.Open]: (e) => {
        this._onOpenCallback?.(e);
      }
    };
    eventCallbacksAssign(this, EventFunctions);
  }

  get url(): string {
    return this._url;
  }

  onOpen(): void {
    this._onOpenCallback();
  }

  onFailure(e: { code: number; message: string }): void {
    this._onFailureCallback(e);
  }

  onMessage(e: { string: string; blob: BlobBase }): void {
    this._onMessageCallback(e);
  }

  onClose(e: { code: number; reason: string }): void {
    this._onCloseCallback(e);
  }

  createClientAndRequest() {
    const clientBuilder = new OkHttpClient.Builder();
    this._client = clientBuilder.build();

    const requestBuilder = new OkHttpRequest.Builder().url(this.url);

    for (const key in this.headers) {
      requestBuilder.addHeader(key, this.headers[key]);
    }
    this._request = requestBuilder.build();
  }

  createWebSocketListener() {
    const overrideMethods = {
      onOpen: () => {
        this._onOpenCallback?.();
      },
      onMessage: (data) => {
        if (typeof data === 'string' || !data) {
          this._onMessageCallback?.({ string: data });
        } else {
          // TODO: onMessage doesn't invoke with bytestring parameter.
          // Check this implementation after AND-2702 bug is resolved.
          this._onMessageCallback?.({
            blob: new Blob(data.toByteArray(), {
              type: ''
            })
          });
        }
      },
      onClosing: (code, reason) => {
        this._onCloseCallback?.({
          code: code,
          reason: reason
        });
      },
      onFailure: (throwableMessage, responseCode) => {
        this._onFailureCallback?.({
          code: responseCode,
          reason: throwableMessage
        });
      }
    };

    const SFWebSocketListener = requireClass('io.smartface.android.sfcore.net.SFWebSocketListener');
    this._listener = new SFWebSocketListener(overrideMethods);
  }

  close(params: any) {
    if (!params || !params.code) throw new Error('code parameter is required.');
    if (this.nativeObject) {
      if (params.reason) this.nativeObject.close(params.code, params.reason);
      else this.nativeObject.close(params.code, null);
    }
  }

  send(params: any) {
    if (this.nativeObject && params) {
      if (params.data instanceof Blob) {
        const bytes = params.data.parts;
        const byteString = ByteString.of(bytes, 0, arrayLength(bytes));
        return this.nativeObject.send(byteString);
      } else if (typeof params.data === 'string') {
        return this.nativeObject.send(params.data);
      } else {
        throw new Error('WebSocket can send string or Blob.');
      }
    }
  }
}
