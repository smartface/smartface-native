import WebSocket = require("./websocket")
import Http = require("./http")

declare const _exports : {
  WebSocket: WebSocket,
  Http: Http
}
export = _exports;