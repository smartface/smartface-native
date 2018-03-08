/**
 * @class UI.Font
 * @since 0.1
 *
 * Font is useful when custom fonts are needed. It can be assigned
 * to UI objects holding text property (UI.Label, UI.Button etc).
 *
 *     @example
 *     const Font = require('sf-core/ui/font');
 *     const Label = require('sf-core/ui/label');
 *
 *     var myLabel = new Label();
 *     myLabel.text = "Bold_Italic Font";
 *     myLabel.font = Font.create("Arial", 16, Font.BOLD_ITALIC);
 *     myPage.layout.addChild(myLabel);
 */
function Font() {}

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
Font.prototype.sizeOfString = function(string,maxWidth) { }

/**
 * @method create
 * @android
 * @ios
 * @since 0.1
 * Creates a font instance with the given family name, size and style.
 *
 *     @example
 *     const Font = require('sf-core/ui/font');
 *     const Label = require('sf-core/ui/label');
 *     var myLabel = new Label({
 *         font: Font.create(Font.DEFAULT, 16, Font.NORMAL)
 *     });
 *     myLabel.text = "Label text";
 *
 * @param {String} fontFamily Font family name
 * @param {Number} size Font size
 * @param {Number} style Font style (UI.Font.NORMAL, UI.Font.BOLD etc.)
 * @return {UI.Font} A Font instance.
 * @static
 */
Font.create = function(fontFamily, size, style) { }

/**
 * @method createFromFile
 * @android
 * @ios
 * Creates a font instance with the given file path and size.
 *
 *     @example
 *     const Font = require('sf-core/ui/font');
 *     const Label = require('sf-core/ui/label');
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
Font.createFromFile = function(path, size) { }

/**
 * @method allFontNames
 * @ios
 * Returns supported font names.
 *
 *     @example
 *     const Font = require('sf-core/ui/font');
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
Font.ios.allFontNames = function() {}

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
Font.DEFAULT;

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
Font.NORMAL = 1;

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
Font.BOLD = 2;

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
Font.ITALIC = 4;

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
Font.BOLD_ITALIC = 6;

module.exports = Font;