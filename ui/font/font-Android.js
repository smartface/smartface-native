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
    if(fontFamily && fontFamily.length > 0) {
        // Searching font on assets:
        var convertedFontName = fontFamily.replace(' ','.') + fontSuffix + ".ttf";
        var fontFile = new File({path: "assets://" + convertedFontName});
        if(fontFile.exists){
            return Font.createFromFile(fontFile.fullPath, size);
        }
        else{
            convertedFontName = fontFamily.replace(' ','.') + fontSuffix + ".otf";
            fontFile = new File({path: "assets://" + convertedFontName});
            if(fontFile.exists){
                return Font.createFromFile(fontFile.fullPath, size);
            }
            else{
                typeface = NativeTypeface.create(fontFamily,fontStyle);
            }
        }
    }
    else{
        typeface = NativeTypeface.defaultFromStyle(fontStyle);
    }
    
    return new Font({
        "nativeObject":typeface,
        "size":size
    });
}

Font.createFromFile = function(path, size) { 
    var typeface = NativeTypeface.DEFAULT;
    if(path){
        var fontFile = new File({path: path});
        if(fontFile.nativeObject){
            var bitmap;
            if(fontFile.type == Path.FILE_TYPE.ASSET){

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
}

Font.NORMAL = 1;
Font.BOLD = 2;
Font.ITALIC = 4;
Font.BOLD_ITALIC = 6;

//Default Font
Font.DEFAULT = Font.createFromFile(null,14);

module.exports = Font;