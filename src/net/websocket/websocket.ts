import Blob from '../../global/blob';
import { INativeComponent } from '../../core/inative-component';
import { IEventEmitter } from '../../core/eventemitter/event-emitter';
import { WebSocketEvents } from './websocket-events';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { MobileOSProps } from '../../core/native-mobile-component';

export interface IWebSocket extends INativeComponent, IEventEmitter<WebSocketEvents> {
  /**
   * Gets headers of socket connection.
   * If you want to change the headers, you have to call the constructor again (create a new instance).
   *
   * @property {Object} headers
   * @readonly
   * @android
   * @ios
   * @since 1.1.17
   */
  headers: Record<string, string>;

  /**
   * Gets url of socket connection.
   * If you want to change the URL, you have to call the constructor again (create a new instance).
   *
   * @property {String} url
   * @readonly
   * @android
   * @ios
   * @since 1.1.17
   */
  url: string;
  /**
   * Close the web socket.
   * @param {Object} params
   * @param {Number} params.code
   * @param {String} [params.reason]
   * @since 1.1.17
   */
  close(params: { code: number; reason?: string }): void;
  /**
   * Send data to a web socket server.
   * @param {Object} params
   * @param {String|Blob} params.data
   * @return {Boolean}
   * @since 1.1.17
   */
  send(params: { data: string | Blob }): boolean;
  /**
   * Invoked when a web socket has been accepted by the web socket server.
   * @event
   * @deprecated
   * @since 1.1.17
   * @example
   * ```
   * import WebSocket from '@smartface/native/net/websocket';
   *
   * const webSocket = new WebSocket();
   * webSocket.on(WebSocket.Events.Open, () => {
   *  console.info('onOpen');
   * });
   * ```
   */
  onOpen: () => void;
  /**
   * Invoked when a message has been received.
   * @param {Object} params
   * @param {String} params.string
   * @param {Blob} params.blob
   * @deprecated
   * @event
   * @since 1.1.17
   * @example
   * ```
   * import WebSocket from '@smartface/native/net/websocket';
   *
   * const webSocket = new WebSocket();
   * webSocket.on(WebSocket.Events.Message, (params) => {
   *  console.info('onMessage', params);
   * });
   * ```
   */
  onMessage: (e: { string?: string; blob?: Blob }) => void;
  /**
   * Invoked when the web socket has been closed.
   * @param {Object} e
   * @param {Number} e.code
   * @param {String} e.reason
   * @deprecated
   * @event
   * @since 1.1.17
   * @example
   * ```
   * import WebSocket from '@smartface/native/net/websocket';
   *
   * const webSocket = new WebSocket();
   * webSocket.on(WebSocket.Events.Close, (params) => {
   *  console.info('onClose', params);
   * });
   * ```
   */
  onClose: (e: { code: number; reason: string }) => void;
  /**
   * Invoked when an error occured on reading or writing to the network.
   * @param {Object} e
   * @param {String} e.message
   * @param {Number} e.code
   * @deprecated
   * @event
   * @since 1.1.17
   * @example
   * ```
   * import WebSocket from '@smartface/native/net/websocket';
   *
   * const webSocket = new WebSocket();
   * webSocket.on(WebSocket.Events.Failure, (params) => {
   *  console.info('onFailure', params);
   * });
   * ```
   */
  onFailure: (e: { code: number; message: string }) => void;
}

export declare class WebSocketBase<TEvent extends string = WebSocketEvents> extends NativeEventEmitterComponent<TEvent | WebSocketEvents, any> implements IWebSocket {
  protected __createNativeObject__(params?: Partial<Record<string, any>>);
  constructor(params?: Partial<IWebSocket>);
  onOpen: () => void;
  onMessage: (e: { string?: string | undefined; blob?: Blob | undefined }) => void;
  onClose: (e: { code: number; reason: string }) => void;
  onFailure: (e: { code: number; message: string }) => void;
  headers: Record<string, string>;
  get url(): string;
  set url(value: string);
  close(params: { code: number; reason?: string | undefined }): void;
  send(params: { data: string | Blob }): boolean;
}
