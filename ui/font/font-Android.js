const File = require('nf-core/io/file');
const Path = require('nf-core/io/path');

function Font(params) {
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

const NativeTypeface = requireClass("android.graphics.Typeface");

Font.create = function(fontFamily, size, style) {
    var fromCache = getFromCache(fontFamily, style, size);
    if (fromCache !== undefined) {
        return fromCache;
    }

    var fontStyle = 1;
    var fontSuffix = "_n";
    switch(style){
        case Font.NORMAL:
            fontStyle = NativeTypeface.NORMAL;
            fontSuffix = "_n";
            break;
        case Font.BOLD:
            fontStyle = NativeTypeface.BOLD;
            fontSuffix = "_b";
            break;
        case Font.ITALIC:
            fontStyle = NativeTypeface.ITALIC;
            fontSuffix = "_i";
            break;
        case Font.BOLD_ITALIC:
            fontStyle = NativeTypeface.BOLD_ITALIC;
            fontSuffix = "_bi";
            break;
    }
    var typeface;
    var font;
    if(fontFamily && fontFamily.length > 0 && fontFamily !== Font.DEFAULT) {
        // Searching font on assets:
        var convertedFontName = fontFamily.replace(' ','.') + fontSuffix + ".ttf";
        var fontFile = new File({path: "assets://" + convertedFontName});
        if(fontFile.exists){
            var font = Font.createFromFile(fontFile.fullPath, size);
            addToCache(fontFamily, style, font);
            return font;
        }
        else{
            convertedFontName = fontFamily.replace(' ','.') + fontSuffix + ".otf";
            fontFile = new File({path: "assets://" + convertedFontName});
            if(fontFile.exists){
                font = Font.createFromFile(fontFile.fullPath, size);
                addToCache(fontFamily, style, font);
                return font;
            }
            else{
                typeface = NativeTypeface.create(fontFamily, fontStyle);
            }
        }
    }
    else{
        typeface = NativeTypeface.defaultFromStyle(fontStyle);
    }
    
    font = new Font({
        "nativeObject":typeface,
        "size":size
    });
    addToCache(fontFamily, style, font);
    return font;
};

Font.createFromFile = function(path, size) { 
    var typeface = NativeTypeface.DEFAULT;
    if(path){
        var fontFile = new File({path: path});
        if(fontFile.nativeObject){
            if(fontFile.type === Path.FILE_TYPE.ASSET){
                var assets = Android.getActivity().getAssets();
                typeface = NativeTypeface.createFromAsset(assets,fontFile.name);
            }
            else{
                typeface = NativeTypeface.createFromFile(fontFile.nativeObject);
            }
        }
    }

    return new Font({
        "nativeObject":typeface,
        "size":size
    });
};

var fontCache = {};
function getFromCache(family, style, size) {
    if (fontCache[family] && fontCache[family][style]) {
        return new Font({
            "nativeObject": fontCache[family][style].nativeObject,
            size: size
        });
    }
    return undefined;
}

function addToCache(family, style, font) {
    if (fontCache[family] === undefined) {
        fontCache[family] = {};
    }
    fontCache[family][style] = font;
}

//Default Font
Font.DEFAULT = "DEFAULT";

Font.NORMAL = 1;
Font.BOLD = 2;
Font.ITALIC = 4;
Font.BOLD_ITALIC = 6;

module.exports = Font;