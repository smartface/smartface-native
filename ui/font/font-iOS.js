const File = require("sf-core/io/file");

function Font () {}

Font.create = function(fontFamily, size, style) {
    if (style === this.NORMAL) {
        if (fontFamily === Font.DEFAULT){
            return __SF_UIFont.systemFontOfSize(size);
        }else{
            var font = getFileFont(fontFamily,size,"_n");
            if (font) {
                return font;
            }else{
                return __SF_UIFont.fontWithNameSize(fontFamily,size);
            }
        }
    }else if(style === this.BOLD){
        if (fontFamily === Font.DEFAULT){
            return __SF_UIFont.boldSystemFontOfSize(size);
        }else{
            var font = getFileFont(fontFamily,size,"_b");
            if (font) {
                return font;
            }else{
                return __SF_UIFont.fontWithNameSize(fontFamily,size).bold();
            }
        }
    }
    else if(style === this.ITALIC){
        if (fontFamily === Font.DEFAULT){
            return __SF_UIFont.italicSystemFontOfSize(size);
        }else{
            var font = getFileFont(fontFamily,size,"_i");
            if (font) {
                return font;
            }else{
                return __SF_UIFont.fontWithNameSize(fontFamily,size).italic();
            }
        }
    }else if(style === this.BOLD_ITALIC){
        if (fontFamily === Font.DEFAULT){
            return __SF_UIFont.systemFontOfSize(size).boldItalic();
        }else{
            var font = getFileFont(fontFamily,size,"_bi");
            if (font) {
                return font;
            }else{
                return __SF_UIFont.fontWithNameSize(fontFamily,size).boldItalic();
            }
        }
    }else{
        if (fontFamily === Font.DEFAULT){
            return __SF_UIFont.systemFontOfSize(size);
        }else{
            var font = getFileFont(fontFamily,size,"_n");
            if (font) {
                return font;
            }else{
                return __SF_UIFont.fontWithNameSize(fontFamily,size);
            }
        }
    }
        
}
function getFileFont(fontFamily,size,fontSuffix){
    var convertedFontName = fontFamily.split(" ").join(".") + fontSuffix + ".ttf";
    var font = __SF_UIFont.createFromFileWithFilenameStringSize(File.getDocumentsDirectory() + "/" + convertedFontName, size);
    if (font != __SF_UIFont.systemFontOfSize(size)) {
        return font;
    }
    
    convertedFontName = fontFamily.split(" ").join(".") + fontSuffix + ".ttf";
    font = __SF_UIFont.createFromFileWithFilenameStringSize(File.getMainBundleDirectory() + "/" + convertedFontName, size);
    if (font != __SF_UIFont.systemFontOfSize(size)) {
        return font;
    }
    
    convertedFontName = fontFamily.split(" ").join(".") + fontSuffix + ".otf";
    font = __SF_UIFont.createFromFileWithFilenameStringSize(File.getDocumentsDirectory() + "/" + convertedFontName, size);
    if (font != __SF_UIFont.systemFontOfSize(size)) {
        return font;
    }
    
    convertedFontName = fontFamily.split(" ").join(".") + fontSuffix + ".otf";
    font = __SF_UIFont.createFromFileWithFilenameStringSize(File.getMainBundleDirectory() + "/" + convertedFontName, size);
    if (font != __SF_UIFont.systemFontOfSize(size)) {
        return font;
    }
    
    return undefined;
}

Font.createFromFile = function(path, size) {
    if (!size){
        size = 15;
    }
    var filePath = new File({path:path});
    var actualPath = filePath.nativeObject.getActualPath();
    return  __SF_UIFont.createFromFileWithFilenameStringSize(actualPath, size);
}

Font.DEFAULT = "iOS-System-Font";

Font.NORMAL = 1;
Font.BOLD = 2;
Font.ITALIC = 4;
Font.BOLD_ITALIC = 6;

module.exports = Font;