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
 *     myLabel.text = "Bold and Italic Font";
 *     myLabel.font = Font.create("Arial", 16, Font.BOLD|Font.ITALIC);
 *     myPage.layout.addChild(myLabel);
 */
function Font() {}

/**
 * @method create
 * @since 0.1
 * Creates a font instance with the given family name, size and style.
 * 
 *     @example
 *     const Font = require('nf-core/ui/font');
 *     var myFont = Font.create("Arial", 16, Font.NORMAL);
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
 * Creates a font instance with the given file path and size.
 * 
 *     @example 
 *     const Font = require('nf-core/ui/font');
 *     var myFont = Font.createFromFile("assets://MyFont.ttf", 16);
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
 * Represents normal font style
 * 
 * @property {Number} NORMAL 
 * @readonly
 * @static
 * @since 0.1
 */
Font.NORMAL = 1;

/**
 * Represents bold font style
 * 
 * @property {Number} BOLD 
 * @readonly
 * @static
 * @since 0.1
 */
Font.BOLD = 2;

/**
 * Represents italic font style
 * 
 * @property {Number} ITALIC 
 * @readonly
 * @static
 * @since 0.1
 */
Font.ITALIC = 4;

/**
 * Represents both bold and italic font style
 * 
 * @property {Number} BOLD_ITALIC 
 * @readonly
 * @static
 * @since 0.1
 */
Font.BOLD_ITALIC = 6;

module.exports = Font;