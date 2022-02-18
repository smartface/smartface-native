import { AbstractWebView } from './webview';

const WebView: typeof AbstractWebView = require(`./webview.${Device.deviceOS.toLowerCase()}`).default;

export default WebView;
