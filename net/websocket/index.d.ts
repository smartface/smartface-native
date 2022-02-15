import { EventEmitter, IEventEmitter } from "../../core/eventemitter/event-emitter";
import Blob from "../../global/blob";

declare enum Events {
	/**
	 * Invoked when the web socket has been closed.
	 * @param {Object} e
	 * @param {Number} e.code
	 * @param {String} e.reason
	 * @event
	 * @since 1.1.17
	 */
	Close = "close",
	/**
	 * Invoked when an error occured on reading or writing to the network.
	 * @param {Object} e
	 * @param {String} e.message
	 * @param {Number} e.code
	 * @event
	 * @since 1.1.17
	 */
	Failure = "failure",
	/**
	 * Invoked when a message has been received.
	 * @param {Object} params
	 * @param {String} params.string
	 * @param {Blob} params.blob
	 * @event
	 * @since 1.1.17
	 */
	Message = "message",
	/**
	 * Invoked when a web socket has been accepted by the web socket server.
	 * @event
	 * @since 1.1.17
	 */
	Open = "open",
}

/**
 *
 * WebSocket creates a web socket client. It connects to a WebSocket server and then sending
 * and receiving data on the connection. {@link Net.WebSocket#url url}  parameter must be passed in constructor.
 *
 *     @example
 *     const WebSocket = require("@smartface/native/net/websocket");
 *
 *     var myWebSocket = new WebSocket({url: "your-server-url"});
 *     myWebSocket.onOpen = function() {
 *         console.log("Web socket opened.");
 *         console.log("Send string.");
 *         myWebSocket.send("some data");
 *     };
 *
 *     myWebSocket.onClose = function(e) {
 *         console.log("Socket closed.");
 *     }
 *
 *     myWebSocket.onMessage = function(e) {
 *         console.log("Message received.");
 *         console.log("Close socket connection.");
 *         myWebSocket.close({code: 1000});
 *     };
 *
 * @class Net.WebSocket
 * @since 1.1.17
 */
declare class WebSocket
	extends NativeComponent
	implements IEventEmitter<Events>
{
	constructor(params?: Partial<WebSocket>);
	protected emitter: EventEmitter<Events>;
	on(eventName: Events, callback: (...args: any[]) => void): () => void;
	once(eventName: Events, callback: (...args: any[]) => void): () => void;
	off(eventName: Events, callback: (...args: any[]) => void): void;
	emit(event: Events, ...args: any[]): void;

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
  readonly headers: Record<string, string>;

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
	readonly url: string;
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
	 * ````
	 * import WebSocket from '@smartface/native/net/websocket';
	 *
	 * const webSocket = new WebSocket();
	 * webSocket.on(WebSocket.Events.Open, () => {
	 *  console.info('onOpen');
	 * });
	 * ````
	 */
	onOpen(): void;
	/**
	 * Invoked when a message has been received.
	 * @param {Object} params
	 * @param {String} params.string
	 * @param {Blob} params.blob
	 * @deprecated
	 * @event
	 * @since 1.1.17
	 * @example
	 * ````
	 * import WebSocket from '@smartface/native/net/websocket';
	 *
	 * const webSocket = new WebSocket();
	 * webSocket.on(WebSocket.Events.Message, (params) => {
	 *  console.info('onMessage', params);
	 * });
	 * ````
	 */
	onMessage(e: { string: string; blob: Blob }): void;
	/**
	 * Invoked when the web socket has been closed.
	 * @param {Object} e
	 * @param {Number} e.code
	 * @param {String} e.reason
	 * @deprecated
	 * @event
	 * @since 1.1.17
	 * @example
	 * ````
	 * import WebSocket from '@smartface/native/net/websocket';
	 *
	 * const webSocket = new WebSocket();
	 * webSocket.on(WebSocket.Events.Close, (params) => {
	 *  console.info('onClose', params);
	 * });
	 * ````
	 */
	onClose(e: { code: number; reason: string }): void;
	/**
	 * Invoked when an error occured on reading or writing to the network.
	 * @param {Object} e
	 * @param {String} e.message
	 * @param {Number} e.code
	 * @deprecated
	 * @event
	 * @since 1.1.17
	 * @example
	 * ````
	 * import WebSocket from '@smartface/native/net/websocket';
	 *
	 * const webSocket = new WebSocket();
	 * webSocket.on(WebSocket.Events.Failure, (params) => {
	 *  console.info('onFailure', params);
	 * });
	 * ````
	 */
	onFailure(e: { code: number; message: string }): void;

	static Events: typeof Events;
}

export = WebSocket;
