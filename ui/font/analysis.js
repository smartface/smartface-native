/**
 * @class UI.Font
 * @since 0.1
 * 
 * This class is useful when custom or styled font is needed.Created font
 * objects can be assigned to objects which shows text (Label, Button etc.).
 * 
 *     @example
 *     const Font = require('sf-core/ui/font');
 *     const Label = require('sf-core/ui/label');
 *     var myLabel = new Label();
 *     myLabel.text = "Label text";
 *     myLabel.font = Font.create("Arial", 16, Font.BOLD);
 */
function Font() {}

/**
 * @method create
 * @since 0.1
 * Creates a font object with given family name.
 * 
 *     @example
 *     const Font = require('sf-core/ui/font');
 *     const Label = require('sf-core/ui/label');
 *     var myLabel = new Label();
 *     myLabel.text = "Label text";
 *     myLabel.font = Font.create("Arial", 16, Font.NORMAL);
 * 
 * @param fontFamily Font family name
 * @param size Font size
 * @param style Font style (NORMAL, BOLD etc.)
 * 
 * @static
 */
Font.create = function(fontFamily, size, style) { }

/**
 * @method createFromFile
 * Creates a font object from given file path.Path should be a
 * correct font path.
 * 
 *     @example 
 *     const Font = require('sf-core/ui/font');
 *     const Label = require('sf-core/ui/label');
 *     var myLabel = new Label({
 *         font: Font.createFromFile("assets://MyFont.ttf", 16);
 *     });
 *     myLabel.text = "Label text";
 * 
 * @param path Font file path
 * @param size Font size
 * @since 0.1
 * 
 * @static
 */
Font.createFromFile = function(path, size) { }

/**
 * Represents normal font style
 * 
 * @property {Number} NORMAL 
 * @static
 * @since 0.1
 */
Font.NORMAL = 1;

/**
 * Represents bold font style
 * 
 * @property {Number} BOLD 
 * @static
 * @since 0.1
 */
Font.BOLD = 2;

/**
 * Represents italic font style
 * 
 * @property {Number} ITALIC 
 * @static
 * @since 0.1
 */
Font.ITALIC = 4;

/**
 * Represents bold italic font style
 * 
 * @property {Number} BOLD_ITALIC 
 * @static
 * @since 0.1
 */
Font.BOLD_ITALIC = 6;

module.exports = Font;