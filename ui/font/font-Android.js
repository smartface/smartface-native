function Font(params) {
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

Font.create = function(fontFamily, size, style) { 
    var fontStyle = 1;
    switch(style){
        case 1:
            fontStyle = android.graphics.Typeface.NORMAL;
            break;
        case 2:
            fontStyle = android.graphics.Typeface.BOLD;
            break;
        case 4:
            fontStyle = android.graphics.Typeface.ITALIC;
            break;
        case 6:
            fontStyle = android.graphics.Typeface.BOLD_ITALIC;
            break;
    }
    var typeface = fontFamily != undefined && fontFamily != null
                    ? android.graphics.Typeface.create(fontFamily,fontStyle)
                    : null;
    return new Font({
        "nativeObject":typeface,
        "size":size
    });
}

Font.createFromFile = function(path, size) { 
    var typeface = path != undefined && path != null
                    ? android.graphics.Typeface.createFromFile(path)
                    : null;
    return new Font({
        "nativeObject":typeface,
        "size":size
    });
}

Font.NORMAL = 1;
Font.BOLD = 2;
Font.ITALIC = 4;
Font.BOLDITALIC = 6;

module.exports = Font;