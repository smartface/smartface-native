import { AbstractWebBrowser } from './webbrowser';

const WebBrowser: typeof AbstractWebBrowser = require(`./webbrowser.${Device.deviceOS.toLowerCase()}`).default;
type WebBrowser = AbstractWebBrowser;

export default WebBrowser;
