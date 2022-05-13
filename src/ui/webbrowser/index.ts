import { WebBrowserBase } from './webbrowser';

const WebBrowser: typeof WebBrowserBase = require(`./webbrowser.${Device.deviceOS.toLowerCase()}`).default;
type WebBrowser = WebBrowserBase;

export default WebBrowser;
