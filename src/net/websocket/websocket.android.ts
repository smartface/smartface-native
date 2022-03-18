import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { MobileOSProps } from '../../core/native-mobile-component';
import Blob from '../../global/blob';
import BlobAndroid from '../../global/blob/blob.android';
import { IWebSocket } from './websocket';
import { WebSocketEvents } from './websocket-events';

/*globals requireClass*/
const OkHttpRequest = requireClass('okhttp3.Request');
const OkHttpClient = requireClass('okhttp3.OkHttpClient');
const ByteString = requireClass('okio.ByteString');
const SFWebSocketListener = requireClass('io.smartface.android.sfcore.net.SFWebSocketListener');

export default class WebSocketAndroid<TEvent extends string = WebSocketEvents, TProps extends MobileOSProps = MobileOSProps>
  extends NativeEventEmitterComponent<TEvent | WebSocketEvents, any, TProps>
  implements IWebSocket
{
  protected createNativeObject() {
    return null;
  }
  private _listener: any;
  private _request: any;
  private _client: any;
  private _url: string;

  constructor(params?: TProps & Partial<IWebSocket>) {
    super(params);

    if (!params || !params.url) {
      throw new Error('url must be initialized.');
    }

    this._url = params.url;

    this.createClientAndRequest();
    this.createWebSocketListener();
    this.nativeObject = this._client.newWebSocket(this._request, this._listener);
  }
  onOpen: () => void;
  onMessage: (e: { string?: string | undefined; blob?: Blob | undefined }) => void;
  onClose: (e: { code: number; reason: string }) => void;
  onFailure: (e: { code: number; message: string }) => void;
  headers: Record<string, string>;

  get url(): string {
    return this._url;
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
        this.onOpen?.();
        this.emit('open');
      },
      onMessage: (data: any) => {
        if (typeof data === 'string' || !data) {
          this.onMessage?.({ string: data });
        } else {
          // TODO: onMessage doesn't invoke with bytestring parameter.
          // Check this implementation after AND-2702 bug is resolved.
          const params = {
            blob: new Blob(data.toByteArray(), {
              type: ''
            })
          };
          this.onMessage?.(params);
          this.emit('message', params);
        }
      },
      onClosing: (code: number, reason: number) => {
        const params = {
          code: code,
          reason: String(reason)
        };
        this.onClose?.(params);
        this.emit('close', params);
      },
      onFailure: (throwableMessage: number, responseCode: number) => {
        const params = {
          code: responseCode,
          message: String(throwableMessage)
        };
        this.onFailure?.(params);
        this.emit('failure');
      }
    };

    this._listener = new SFWebSocketListener(overrideMethods);
  }

  close(params: Parameters<IWebSocket['close']>['0']) {
    if (!params?.code) {
      throw new Error('code parameter is required.');
    }
    this.nativeObject?.close(params.code, params.reason || null);
  }

  send(params: Parameters<IWebSocket['send']>['0']) {
    if (this.nativeObject && params) {
      throw new Error('WebSocket can send string or Blob.');
    }
    let data = '';
    if (params.data instanceof BlobAndroid) {
      const bytes = params.data.parts;
      data = ByteString.of(bytes, 0, arrayLength(bytes));
    } else if (typeof params.data === 'string') {
      data = params.data;
    }
    return this.nativeObject.send(data);
  }
}
