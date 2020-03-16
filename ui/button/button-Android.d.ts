import Label = require("../label");
import { IButton } from "./IButton";
declare class ButtonAndroid extends Label implements IButton {
	enabled: boolean;
	backgroundImage: any;
	onPress: () => void;
	onLongPress: () => void;
}

export = ButtonAndroid;
