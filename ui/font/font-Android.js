/*globals requireClass*/
const File = require('../../io/file');
const Path = require('../../io/path');
const AndroidConfig = require("../../util/Android/androidconfig.js");
const NativeTypeface = requireClass("android.graphics.Typeface");

const activity = AndroidConfig.activity;
const View = requireClass("android.view.View");

function Font(params) {

    Object.defineProperties(this, {
        'sizeOfString': {
            value: function(text, maxWidthDp) {
                const TextView = requireClass("android.widget.TextView");
                const TypedValue = requireClass("android.util.TypedValue");

                var textView = new TextView(activity);
                textView.setText(text);
                textView.setTextSize(TypedValue.COMPLEX_UNIT_PX, this.size);
                alert("maxWidthDp: " + maxWidthDp + "     MeasureSpec.AT_MOST: " + View.MeasureSpec.AT_MOST);
                var widthMeasureSpec = View.MeasureSpec.makeMeasureSpec(parseInt(maxWidthDp), View.MeasureSpec.AT_MOST);
                var heightMeasureSpec = View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED);
                textView.measure(widthMeasureSpec, heightMeasureSpec);
                return { width: textView.getMeasuredWidth(), height: textView.getMeasuredHeight() };
            },
            enumerable: true
        },
        'toString': {
            value: function() {
                return 'Font';
            },
            enumerable: true,
            configurable: true
        }
    });

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

Font.prototype.toString = function() {
    return 'Font';
};

Object.defineProperties(Font, {
    // Properties
    'DEFAULT': {
        value: "DEFAULT",
        enumerable: true
    },
    'NORMAL': {
        value: 1,
        enumerable: true
    },
    'BOLD': {
        value: 2,
        enumerable: true
    },
    'ITALIC': {
        value: 4,
        enumerable: true
    },
    'BOLD_ITALIC': {
        value: 6,
        enumerable: true
    },
    // Methods
    'create': {
        value: function(fontFamily, size, style) {
            var fromCache = getFromCache(fontFamily, style, size);
            if (fromCache !== undefined) {
                return fromCache;
            }

            var fontStyle = NativeTypeface.NORMAL;
            var fontSuffix = "";
            var fontSuffix2 = "";
                
            if (style !== undefined) {
                switch (style) {
                    case Font.NORMAL:
                        fontStyle = NativeTypeface.NORMAL;
                        fontSuffix = "_n";
                        fontSuffix2 = "";
                        break;
                    case Font.BOLD:
                        fontStyle = NativeTypeface.BOLD;
                        fontSuffix = "_b";
                        fontSuffix2 = "-Bold";
                        break;
                    case Font.ITALIC:
                        fontStyle = NativeTypeface.ITALIC;
                        fontSuffix = "_i";
                        fontSuffix2 = "-Italic";
                        break;
                    case Font.BOLD_ITALIC:
                        fontStyle = NativeTypeface.BOLD_ITALIC;
                        fontSuffix = "_bi";
                        fontSuffix2 = "-BoldItalic"; 
                        break;
                }
            }
            var typeface;
            var font;
            if (fontFamily && fontFamily.length > 0 && fontFamily !== Font.DEFAULT) {
                // Searching font on assets:
                var base = fontFamily.split(" ").join(".");
                var convertedFontName = base + fontSuffix + ".ttf";
                var convertedFontName2 = base + fontSuffix2 + ".ttf";
                var convertedFontName3 = base + fontSuffix + ".otf";
                var convertedFontName4 = base + fontSuffix2 + ".otf";
 
                var selectedFont = undefined;
                
                var fontFile = new File({
                    path: "assets://" + convertedFontName
                });
                
                var fontFile2 = new File({
                    path: "assets://" + convertedFontName2
                });
                
                var fontFile3 = new File({
                    path: "assets://" + convertedFontName3
                });
                
                var fontFile4 = new File({
                    path: "assets://" + convertedFontName4
                });
                
                if(fontFile.exists){
                    selectedFont = fontFile;
                }
                else if(fontFile2.exists){
                    selectedFont = fontFile2;  
                }
                else if(fontFile3.exists){
                    selectedFont = fontFile3;  
                }
                else if(fontFile4.exists){
                    selectedFont = fontFile4;  
                }
                
                if (selectedFont !== undefined) {
                    font = Font.createFromFile(selectedFont.fullPath, size);
                    addToCache(fontFamily, style, font);
                    return font;
                }
                else {
                    typeface = NativeTypeface.create(fontFamily, fontStyle);
                }
            }
            else {
                typeface = NativeTypeface.defaultFromStyle(fontStyle);
            }

            font = new Font({
                "nativeObject": typeface,
                "size": size
            });
            addToCache(fontFamily, style, font);
            return font;
        },
        enumerable: true
    },
    'createFromFile': {
        value: function(path, size) {
            var typeface = NativeTypeface.DEFAULT;
            if (path) {
                var fontFile = new File({
                    path: path
                });
                if (fontFile.exists && fontFile.nativeObject) {
                    if (fontFile.type === Path.FILE_TYPE.ASSET) {
                        var assets = AndroidConfig.activity.getAssets();
                        typeface = NativeTypeface.createFromAsset(assets, fontFile.name);
                    }
                    else {
                        typeface = NativeTypeface.createFromFile(fontFile.nativeObject);
                    }
                }
            }

            return new Font({
                "nativeObject": typeface,
                "size": size
            });
        },
        enumerable: true
    },

});

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

Font.ios = {};

module.exports = Font;