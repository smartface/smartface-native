import { WebViewBase } from './webview';

const WebView: typeof WebViewBase = require(`./webview.${Device.deviceOS.toLowerCase()}`).default;

export default WebView;
