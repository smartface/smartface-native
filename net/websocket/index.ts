import { WebSocketBase } from './websocket';

const WebSocket: typeof WebSocketBase = require(`./websocket.${Device.deviceOS.toLowerCase()}`).default;
type WebSocket = WebSocketBase;

export default WebSocket;
