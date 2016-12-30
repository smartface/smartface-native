const View = require('../view');
const TextAlignment = require("sf-core/ui/textalignment");
const TypeUtil = require("sf-core/util/type");
const extend = require('js-base/core/extend');

const Label = extend(View)(
    function (_super, params) {
        var self = this;
        if(!self.nativeObject){
            self.nativeObject = new android.widget.ScrollView(Android.getActivity());
            self.nativeInner = new android.widget.TextView(Android.getActivity());
        }
        _super(this);

        // ViewGroup.LayoutParams.MATCH_PARENT = -1
        var innerlayoutParams = new android.view.ViewGroup.LayoutParams(-1, -1);
        self.nativeInner.setLayoutParams(innerlayoutParams);
        self.nativeObject.addView(self.nativeInner);
        self.nativeObject.setSmoothScrollingEnabled(true);
        self.nativeObject.setHorizontalScrollBarEnabled(false);
        self.nativeObject.setVerticalScrollBarEnabled(false);

        Object.defineProperty(this, 'htmlText', {
            get: function() {
                var text = self.nativeInner.getText();
                if(text){
                    var htmlText = android.text.Html.toHtml(text);
                    return htmlText.toString();
                }
                else{
                    return "";
                }
                
            }, 
            set: function(htmlText) {
                var htmlTextNative = android.text.Html.fromHtml(htmlText);
                self.nativeInner.setText(htmlTextNative);
            },
            enumerable: true
        });

        Object.defineProperty(this, 'font', {
            get: function() {
                return self.nativeInner.getTypeface();
            },
            set: function(font) {
                if(font){
                    if(font.nativeInner != undefined && font.nativeInner != null)
                        self.nativeInner.setTypeface(font.nativeObject);
                    if(font.size != undefined && font.size != null && TypeUtil.isNumeric(font.size))
                        self.nativeInner.setTextSize(font.size);
                }
            },
            enumerable: true
        });

        Object.defineProperty(this, 'multipleLine', {
            get: function() {
                return self.nativeInner.getLineCount() != 1;
            },
            set: function(multipleLine) {
                self.nativeInner.setSingleLine(!multipleLine);
                self.nativeInner.setMaxLines (multipleLine ? java.lang.Integer.MAX_VALUE : 1);
            },
            enumerable: true
        });

        // @todo property returns CharSquence object not string. Caused by issue AND-2508
        Object.defineProperty(this, 'text', {
            get: function() {
                return self.nativeInner.getText().toString();
            },
            set: function(text) {
                self.nativeInner.setText(text);
                // @todo this will cause performance issues in feature. Must be replaced.
                self.nativeInner.requestLayout();
            },
            enumerable: true
        });

        // Gravity.CENTER_VERTICAL = 16, Gravity.CENTER_HORIZONTAL = 1, Gravity.CENTER = 17
        // Gravity.BOTTOM = 80, Gravity.RIGHT = 5, Gravity.LEFT = 3, Gravity.TOP = 48
        var textAlignmentInitial = TextAlignment.MIDLEFT;
        self.nativeInner.setGravity(16 | 3);
        Object.defineProperty(this, 'textAlignment', {
            get: function() {
                return textAlignmentInitial;
            },
            set: function(textAlignment) {
                textAlignmentInitial = textAlignment;
                var alignment = 16 | 3;
                switch(textAlignment){
                    case TextAlignment.TOPLEFT:
                        alignment = 48 | 3;
                        break;
                    case TextAlignment.TOPCENTER:
                        alignment = 48 | 1;
                        break;
                    case TextAlignment.TOPRIGHT:
                        alignment = 48 | 5;
                        break;
                    case TextAlignment.MIDLEFT:
                        alignment = 16 | 3;
                        break;
                    case TextAlignment.MIDCENTER:
                        alignment = 17;
                        break;
                    case TextAlignment.MIDRIGHT:
                        alignment = 16 | 5;
                        break;
                    case TextAlignment.BOTTOMLEFT:
                        alignment = 80 | 3;
                        break;
                    case TextAlignment.BOTTOMCENTER:
                        alignment = 80 | 1;
                        break;
                    case TextAlignment.BOTTOMRIGHT:
                        alignment = 80 | 5;
                        break;                   
                }
                self.nativeInner.setGravity(alignment);
            },
            enumerable: true
        });

        Object.defineProperty(this, 'textColor', {
            get: function() {
                return self.nativeInner.getCurrentTextColor();
            },
            set: function(textColor) {
                var colorParam = textColor;
                if(!TypeUtil.isNumeric(textColor)){
                    colorParam = android.graphics.Color.parseColor(textColor);
                }
                self.nativeInner.setTextColor(colorParam);
            },
            enumerable: true
        });

        Object.defineProperty(this, 'showScrollBar', {
            get: function() {
                return self.nativeObject.isVerticalScrollBarEnabled();
            },
            set: function(showScrollBar) {
                self.nativeObject.setVerticalScrollBarEnabled(showScrollBar);
            },
            enumerable: true
        });
        
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = Label;
