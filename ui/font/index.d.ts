import { FontStyle } from "./font-style";

export = Font;
/**
 * @class UI.Font
 * @since 0.1
 *
 * Font is useful when custom fonts are needed. It can be assigned
 * to UI objects holding text property (UI.Label, UI.Button etc).
 *
 *     @example
 *     const Font = require('@smartface/native/ui/font');
 *     const Label = require('@smartface/native/ui/label');
 *
 *     var myLabel = new Label();
 *     myLabel.text = "Bold_Italic Font";
 *     myLabel.font = Font.create("Arial-ItalicMT", 16);
 *     myPage.layout.addChild(myLabel);
 */
declare class Font extends NativeComponent {

/**
 * Gets size of font. 
 *
 * @property {Number} size
 * @readonly
 * @android
 * @ios
 * @since 4.2.3
 */
    readonly size: number;
/**
 * @method create
 * @android
 * @ios
 * @since 0.1
 * Creates a font instance with the given family name, size and style. Assigning font style is deprecated usage (may not work mostly) instead font name parameter must be specified according to actual name of font. 
 * To obtain actual font name for iOS, use {@link UI.Font#allFontNames  allFontNames} method. 
 * The actual name is same as named of font file in Android.
 *
 *     @example
 *     const Font = require('@smartface/native/ui/font');
 *     const Label = require('@smartface/native/ui/label');
 *     var myLabel = new Label({
 *         font: Font.create("Arial-ItalicMT", 16)
 *     });
 *     myLabel.text = "Label text";
 *
 * @param {String} fontFamily Font family name
 * @param {Number} size Font size
 * @param {Number} style Font style (UI.Font.NORMAL, UI.Font.BOLD etc.)
 * @return {UI.Font} A Font instance.
 * @static
 */
    static create(fontFamily: string, size: number, style?: FontStyle): Font;
/**
 * @method createFromFile
 * @android
 * @ios
 * Creates a font instance with the given file path and size.
 *
 *     @example
 *     const Font = require('@smartface/native/ui/font');
 *     const Label = require('@smartface/native/ui/label');
 *     var myLabel = new Label({
 *         font: Font.createFromFile("assets://MyFont.ttf", 16)
 *     });
 *     myLabel.text = "Label text";
 *
 * @param {String} path Font file path
 * @param {Number} size Font size
 * @return {UI.Font} A Font instance.
 * @since 0.1
 *
 * @static
 */
    static createFromFile(path: string, size: number): Font;
/**
 * @method allFontNames
 * @ios
 * Returns supported font names.
 *
 *     @example
 *     const Font = require('@smartface/native/ui/font');
 *     var fontNames = Font.ios.allFontNames();
 *     for (var index in fontNames) {
 *         console.log(fontNames[index]);
 *     }
 *
 * @return {String} supported font name array.
 * @since 0.1
 *
 * @static
 */
    static ios: { allFontNames(): string[] };
/**
 * This method returns the string size
 *
 * @param {String} string
 * @param {Number} maxWidth
 * @method sizeOfString
 * @android
 * @ios
 * @return {Object} &emsp;width : Number <br />&emsp;height : Number
 * @since 1.1.18
 */
	public sizeOfString(
		string: string,
		maxWidth: number
	): { width: number; height: number };
	ios: {
		allFontNames(): string;
	};
}
declare namespace Font {
/**
 * Default font family. This might be different for Android and iOS.
 *
 * @property {String} DEFAULT
 * @android
 * @ios
 * @readonly
 * @static
 * @since 0.1
 */
    const DEFAULT: "DEFAULT" | "iOS-System-Font";
/**
 * Represents normal font style
 *
 * @property {Number} NORMAL
 * @android
 * @ios
 * @readonly
 * @static
 * @since 0.1
 */
    const NORMAL: 1;
/**
 * Represents bold font style
 *
 * @property {Number} BOLD
 * @android
 * @ios
 * @readonly
 * @static
 * @since 0.1
 */
    const BOLD: 2;
/**
 * Represents italic font style
 *
 * @property {Number} ITALIC
 * @android
 * @ios
 * @readonly
 * @static
 * @since 0.1
 */
    const ITALIC: 4;
/**
 * Represents both bold and italic font style
 *
 * @property {Number} BOLD_ITALIC
 * @android
 * @ios
 * @readonly
 * @static
 * @since 0.1
 */
	const BOLD_ITALIC: 6;
}
