label.style.font = Font.create("Arial", Font.NORMAL, size);
label.style.font = Font.createFromFile(filePath, size);
label.style.font = Font.create(null, Font.NORMAL, size);

/**
 * @class Font
 * 
 * This class is useful when custom or styled font is needed. Created
 * font objects can be assigned to objects which shows text (Label, Button etc.).
 * 
 *      @example
 *      var label = new Label();
 *      label.style.font = Font.create("Arial", 16, Font.BOLD);
 * 
 *      @example
 *      var label = new Label();
 *      label.style.font = Font.createFromFile("assets://MyFont.ttf", 16);
 */
function Font() {}

Font.NORMAL = 1;

Font.BOLD = 2;

Font.ITALIC = 4;

Font.BOLDITALIC = 6;

/**
 * 
 */
Font.create = function(font, size, style) { }

Font.createFromFile = function(path, size) { }

module.exports = Font;