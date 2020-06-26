import Color = require("../color");
import { WebBrowserParams } from "./webbrowserparams";

export declare class WebBrowserOptions implements WebBrowserParams {
	constructor(params?: WebBrowserParams);
	url: string;
	barColor: Color;
	ios: { itemColor: Color; statusBarVisible: boolean };
}
