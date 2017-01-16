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
    switch(style){
        case Font.NORMAL:
            fontStyle = NativeTypeface.NORMAL;
            break;
        case Font.BOLD:
            fontStyle = NativeTypeface.BOLD;
            break;
        case Font.ITALIC:
            fontStyle = NativeTypeface.ITALIC;
            break;
        case Font.BOLD_ITALIC:
            fontStyle = NativeTypeface.BOLD_ITALIC;
            break;
    }
    var typeface = fontFamily != undefined && fontFamily != null && fontFamily != ""
                    ? typeface = NativeTypeface.create(fontFamily,fontStyle)
                    : NativeTypeface.defaultFromStyle(fontStyle);
        
    return new Font({
        "nativeObject":typeface,
        "size":size
    });
}

Font.createFromFile = function(path, size) { 
    var typeface = NativeTypeface.DEFAULT;
    if(path){
        if(path.startsWith("assets://")){
            var assets = Android.getActivity().getAssets();
            var assetsPath = path.replace("assets://","");
            typeface = NativeTypeface.createFromAsset(assets,assetsPath);
        }
        else{
             typeface = NativeTypeface.createFromFile(path);
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

module.exports = Font;