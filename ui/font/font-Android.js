const File           = require('sf-core/io/file');
const Path           = require('sf-core/io/path');
const NativeTypeface = requireClass("android.graphics.Typeface");
const AndroidUnitConverter          = require("sf-core/util/Android/unitconverter.js");

const activity = Android.getActivity();
const View = requireClass("android.view.View");

function Font(params) {
    
    Object.defineProperties(this,{
        'sizeOfString': {
            value: function(text, maxWidthDp){
                const TextView = requireClass("android.widget.TextView");
                const TypedValue = requireClass("android.util.TypedValue");
                
                var textView = new TextView(activity);
                textView.setText(text);
                textView.setTextSize(TypedValue.COMPLEX_UNIT_PX, this.size);
                var widthMeasureSpec = View.MeasureSpec.makeMeasureSpec(maxWidthDp, View.MeasureSpec.AT_MOST);
                var heightMeasureSpec = View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED);
                textView.measure(widthMeasureSpec, heightMeasureSpec);
                return {width: textView.getMeasuredWidth(), height: textView.getMeasuredHeight()};
            },
            enumerable: true
        },
        'toString': {
            value: function(){
                return 'Font';
            },
            enumerable: true, 
            configurable: true
        }
    })
    
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

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
        
            var fontStyle = 1;
            var fontSuffix = "_n";
            switch (style) {
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
            if (fontFamily && fontFamily.length > 0 && fontFamily !== Font.DEFAULT) {
                // Searching font on assets:
                var convertedFontName = fontFamily.split(" ").join(".") + fontSuffix + ".ttf";
                var fontFile = new File({
                    path: "assets://" + convertedFontName
                });
                if (fontFile.exists) {
                    font = Font.createFromFile(fontFile.fullPath, size);
                    addToCache(fontFamily, style, font);
                    return font;
                }
                else {
                    convertedFontName = fontFamily.split(" ").join(".") + fontSuffix + ".otf";
                    fontFile = new File({
                        path: "assets://" + convertedFontName
                    });
                    if (fontFile.exists) {
                        font = Font.createFromFile(fontFile.fullPath, size);
                        addToCache(fontFamily, style, font);
                        return font;
                    }
                    else {
                        typeface = NativeTypeface.create(fontFamily, fontStyle);
                    }
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
                if (fontFile.nativeObject) {
                    if (fontFile.type === Path.FILE_TYPE.ASSET) {
                        var assets = Android.getActivity().getAssets();
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

module.exports = Font;