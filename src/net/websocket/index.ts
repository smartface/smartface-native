import { IWebSocket } from './websocket';

const WebSocket: ConstructorOf<IWebSocket, Partial<IWebSocket>> = require(`./websocket.${Device.deviceOS.toLowerCase()}`).default;
type WebSocket = IWebSocket;

export default WebSocket;
