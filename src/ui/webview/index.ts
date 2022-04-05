import { ConstructorOf } from '../../core/constructorof';
import { IWebView } from './webview';

const WebView: ConstructorOf<IWebView, Partial<IWebView>> = require(`./webview.${Device.deviceOS.toLowerCase()}`).default;
type WebView = IWebView;
export default WebView;
