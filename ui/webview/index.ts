import { AbstractWebView } from './webview';

const WebView: typeof AbstractWebView = require(`./webview.${Device.deviceOS.toLowerCase()}`).default;
type WebView = AbstractWebView;

export default WebView;
