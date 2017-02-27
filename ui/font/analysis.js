/**
 * @class UI.Font
 * @since 0.1
 *
 * Font is useful when custom fonts are needed. It can be assigned
 * to UI objects holding text property (UI.Label, UI.Button etc).
 *
 *     @example
 *     const Font = require('nf-core/ui/font');
 *     const Label = require('nf-core/ui/label');
 *
 *     var myLabel = new Label();
 *     myLabel.text = "Bold_Italic Font";
 *     myLabel.font = Font.create("Arial", 16, Font.BOLD_ITALIC);
 *     myPage.layout.addChild(myLabel);
 */
function Font() {}

/**
 * @method create
 * @android
 * @ios
 * @since 0.1
 * Creates a font instance with the given family name, size and style.
 *
 *     @example
 *     const Font = require('nf-core/ui/font');
 *     const Label = require('nf-core/ui/label');
 *     var myLabel = new Label();
 *     myLabel.font = myFont;
 * 
 *     @example
 *     const Font = require('nf-core/ui/font');
 *     const Label = require('nf-core/ui/label');
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
 *     const Font = require('nf-core/ui/font');
 *     const Label = require('nf-core/ui/label');
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
 * Default system font. This might be different for Android and iOS.
 *
 * @property {UI.Font} DEFAULT
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
