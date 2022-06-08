import { IWebBrowser } from './webbrowser';

const WebBrowser: ConstructorOf<IWebBrowser, Partial<IWebBrowser>> = require(`./webbrowser.${Device.deviceOS.toLowerCase()}`).default;
type WebBrowser = IWebBrowser;

export default WebBrowser;
