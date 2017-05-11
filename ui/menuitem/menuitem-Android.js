const NativeSpannable = requireClass("android.text.Spanned");
const NativeColorSpan = requireClass("android.text.style.ForegroundColorSpan");
const NativeSpannableStringBuilder = requireClass("android.text.SpannableStringBuilder");

function MenuItem(params) {
    this.android = {};
    this.android.titleSpanned;

    var _title;
    var _titleColor;
    
    Object.defineProperties(this, {
        'title': {
            get: function() {
                return _title;
            },
            set: function(title) {
               _title = title;
               this.android.titleSpanned = spanTitle(_title, _titleColor);
            },
            enumerable: true
        },
        'onSelected':{
            value: function(e){
                e.call(this);
            },
            enumerable: true
        },
        'toString': {
            value: function(){
                return 'MenuItem';
            },
            enumerable: true, 
            configurable: true
        }
    });
    
    Object.defineProperties(this.android, {
        'titleColor': {
            get: function() {
                return _titleColor;
            },
            set: function(color) {
                if (color) {
                    _titleColor = color;
                    this.titleSpanned = spanTitle(_title, _titleColor);
                }
            },
            enumerable: true
        }
    });
    
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

function spanTitle(_title, _titleColor) {
    if (_title && _titleColor) {
        var colorSpan = new NativeColorSpan(_titleColor); // TODO: refactor according to AND-2685
        
        var spannableStringBuilder = new NativeSpannableStringBuilder(_title);
        spannableStringBuilder.setSpan(colorSpan, 0, _title.length, NativeSpannable.SPAN_INCLUSIVE_INCLUSIVE);
        return spannableStringBuilder;
    }
    return null;
};

MenuItem.ios = {
    Style: {
        DEFAULT: 0,
        CANCEL: 1,
        DESTRUCTIVE: 2
    }
}

module.exports = MenuItem;