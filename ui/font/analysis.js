/**
 * @class Font
 * 
 * This class is useful when custom or styled font is needed. Created
 * font objects can be assigned to objects which shows text (Label, Button etc.).
 * 
 *      @example
 *      var label = new Label();
 *      label.style = new Style();
 *      label.style.font = Font.create("Arial", 16, Font.BOLD);
 * 
 *      @example
 *      var label = new Label();
 *      label.style = new Style({
 *          font: Font.createFromFile("assets://MyFont.ttf", 16);
 *      });
 */
function Font() {}

/**
 * Creates a font object with given family name.
 * 
 *      @example
 *      var label = new Label();
 *      label.style = new Style();
 *      label.style.font = Font.create("Arial", 16, Font.NORMAL);
 * 
 * @param fontFamily Font family name
 * @param size Font size
 * @param style Font style (NORMAL, BOLD etc.)
 * 
 * @static
 */
Font.create = function(fontFamily, size, style) { }

/**
 * Creates a font object from given file path. Path should be a
 * correct font path.
 * 
 *      @example
 *      label.style.font = Font.createFromFile("assets://Arial.ttf", 16);
 * 
 * @param path Font file path
 * @param size Font size
 * 
 * @static
 */
Font.createFromFile = function(path, size) { }

/**
 * Represents normal font style
 */
Font.NORMAL = 1;

/**
 * Represents bold font style
 */
Font.BOLD = 2;

/**
 * Represents italic font style
 */
Font.ITALIC = 4;

/**
 * Represents bolditalic font style
 */
Font.BOLDITALIC = 6;

module.exports = Font;