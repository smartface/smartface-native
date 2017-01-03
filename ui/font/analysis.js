/**
 * @class UI.Font
 * @since 0.1
 * 
 * This class is useful when custom or styled font is needed. Created
 * font objects can be assigned to objects which shows text (Label, Button etc.).
 * 
 *     @example
 *     const Font = require('sf-core/ui/font');
 *     const Label = require('sf-core/ui/label');
 *     var myLabel = new Label();
 *     myLabel.font = Font.create("Arial", 16, Font.BOLD);
 */
function Font() {}

/**
 * @method create
 * Creates a font object with given family name.
 * 
 *     @example
 *     const Font = require('sf-core/ui/font');
 *     const Label = require('sf-core/ui/label');
 *     var myLabel = new Label();
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
 * Creates a font object from given file path. Path should be a
 * correct font path.
 * 
 *     @example 
 *     const Font = require('sf-core/ui/font');
 *     const Label = require('sf-core/ui/label');
 *     var label = new Label({
 *         font: Font.createFromFile("assets://MyFont.ttf", 16);
 *     });
 * 
 * @param path Font file path
 * @param size Font size
 * 
 * @static
 */
Font.createFromFile = function(path, size) { }

/**
 * Represents normal font style
 * 
 * @property {Number} NORMAL 
 * @static
 */
Font.NORMAL = 1;

/**
 * Represents bold font style
 * 
 * @property {Number} BOLD 
 * @static
 */
Font.BOLD = 2;

/**
 * Represents italic font style
 * 
 * @property {Number} ITALIC 
 * @static
 */
Font.ITALIC = 4;

/**
 * Represents bold italic font style
 * 
 * @property {Number} BOLD_ITALIC 
 * @static
 */
Font.BOLD_ITALIC = 6;

module.exports = Font;