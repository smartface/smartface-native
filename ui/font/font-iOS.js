const File = require("sf-core/io/file");

function Font () {}

Font.create = function(fontFamily, size, style) {
    if (style === this.NORMAL) {
        if (fontFamily === Font.DEFAULT){
            return __SF_UIFont.systemFontOfSize(size);
        }else{
            var retval = null;
            if (getFileFont(fontFamily,size,"_n")) {
                retval = getFileFont(fontFamily,size,"_n");
            } else if (getFileFont(fontFamily,size,"-Regular")) {
                retval = getFileFont(fontFamily,size,"-Regular");
            } else {
                retval = __SF_UIFont.fontWithNameSize(fontFamily,size);
            }
            return retval;
        }
    }else if(style === this.BOLD){
        if (fontFamily === Font.DEFAULT){
            return __SF_UIFont.boldSystemFontOfSize(size);
        }else{
            var retval = null;
            if (getFileFont(fontFamily,size,"_b")) {
                retval = getFileFont(fontFamily,size,"_b");
            } else if (getFileFont(fontFamily,size,"-Bold")) {
                retval = getFileFont(fontFamily,size,"-Bold");
            } else {
                retval = __SF_UIFont.fontWithNameSize(fontFamily,size).bold();
            }
            return retval;
        }
    }
    else if(style === this.ITALIC){
        if (fontFamily === Font.DEFAULT){
            return __SF_UIFont.italicSystemFontOfSize(size);
        }else{
            var retval = null;
            if (getFileFont(fontFamily,size,"_i")) {
                retval = getFileFont(fontFamily,size,"_i");
            } else if (getFileFont(fontFamily,size,"-Italic")) {
                retval = getFileFont(fontFamily,size,"-Italic");
            } else {
                retval = __SF_UIFont.fontWithNameSize(fontFamily,size).italic();
            }
            return retval;
        }
    }else if(style === this.BOLD_ITALIC){
        if (fontFamily === Font.DEFAULT){
            return __SF_UIFont.systemFontOfSize(size).boldItalic();
        }else{
            var retval = null;
            if (getFileFont(fontFamily,size,"_bi")) {
                retval = getFileFont(fontFamily,size,"_bi");
            } else if (getFileFont(fontFamily,size,"-BoldItalic")) {
                retval = getFileFont(fontFamily,size,"-BoldItalic");
            } else {
                retval = __SF_UIFont.fontWithNameSize(fontFamily,size).boldItalic();
            }
            return retval;
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

Font.ios = {};
Font.ios.allFontNames = function() {
    var retval = [];
    const UIFont = SF.requireClass("UIFont");
    var familyNames = UIFont.familyNames()
    for (var familyNameindex in familyNames) {
        var fontNames = UIFont.fontNamesForFamilyName(familyNames[familyNameindex]);
        for (var fontNameindex in fontNames) {
            retval.push(fontNames[fontNameindex]);
        }
    }
    return retval;
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