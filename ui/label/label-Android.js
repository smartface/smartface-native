const View = require('../view');
const TextAlignment = require("sf-core/ui/textalignment");
const TypeUtil = require("sf-core/util/type");
const extend = require('js-base/core/extend');
const Label = extend(View)(
    function (_super, params) {
        var self = this;
        if(!self.nativeObject){
            self.nativeObject = new android.widget.TextView(Android.getActivity());
        }
        _super(this);

        Object.defineProperty(this, 'htmlText', {
            get: function() {
                var text = self.nativeObject.getText();
                if(text){
                    var htmlText = android.text.Html.toHtml(text);
                    return htmlText.toString();
                }
                else{
                    return "";
                }
                
            }, 
            set: function(htmlText) {
                var linkMovement = android.text.method.LinkMovementMethod.getInstance();
                self.nativeObject.setMovementMethod(linkMovement);
                var htmlTextNative = android.text.Html.fromHtml(htmlText);
                self.nativeObject.setText(htmlTextNative);
            },
            enumerable: true
        });

        Object.defineProperty(this, 'font', {
            get: function() {
                return self.nativeObject.getTypeface();
            },
            set: function(font) {
                if(font){
                    if(font.nativeObject != undefined && font.nativeObject != null)
                        self.nativeObject.setTypeface(font.nativeObject);
                    if(font.size != undefined && font.size != null && TypeUtil.isNumeric(font.size))
                        self.nativeObject.setTextSize(font.size);
                }
            },
            enumerable: true
        });

        Object.defineProperty(this, 'multipleLine', {
            get: function() {
                return self.nativeObject.getLineCount() != 1;
            },
            set: function(multipleLine) {
                self.nativeObject.setSingleLine(!multipleLine);
                self.nativeObject.setMaxLines (multipleLine ? java.lang.Integer.MAX_VALUE : 1);
            },
            enumerable: true
        });

        // @todo property returns CharSquence object not string. Caused by issue AND-2508
        Object.defineProperty(this, 'text', {
            get: function() {
                return self.nativeObject.getText().toString();
            },
            set: function(text) {
                self.nativeObject.setText(text);
                self.nativeObject.setAutoLinkMask (0);
                // @todo this will cause performace issues in feature. Must be replaced.
                self.nativeObject.requestLayout();
            },
            enumerable: true
        });

        var textAlignmentInitial = 0;
        Object.defineProperty(this, 'textAlignment', {
            get: function() {
                return textAlignmentInitial;
            },
            set: function(textAlignment) {
                textAlignmentInitial = textAlignment;
                var alignment = android.view.Gravity.CENTER_VERTICAL | android.view.Gravity.LEFT;
                switch(textAlignment){
                    case TextAlignment.TOPLEFT:
                        alignment = android.view.Gravity.TOP | android.view.Gravity.LEFT;
                        break;
                    case TextAlignment.TOPCENTER:
                        alignment = android.view.Gravity.TOP | android.view.Gravity.CENTER_HORIZONTAL;
                        break;
                    case TextAlignment.TOPRIGHT:
                        alignment = android.view.Gravity.TOP | android.view.Gravity.RIGHT;
                        break;
                    case TextAlignment.MIDLEFT:
                        alignment = android.view.Gravity.CENTER_VERTICAL | android.view.Gravity.LEFT;
                        break;
                    case TextAlignment.MIDCENTER:
                        alignment = android.view.Gravity.CENTER;
                        break;
                    case TextAlignment.MIDRIGHT:
                        alignment = android.view.Gravity.CENTER_VERTICAL | android.view.Gravity.RIGHT;
                        break;
                    case TextAlignment.BOTTOMLEFT:
                        alignment = android.view.Gravity.BOTTOM | android.view.Gravity.LEFT;
                        break;
                    case TextAlignment.BOTTOMCENTER:
                        alignment = android.view.Gravity.BOTTOM | android.view.Gravity.CENTER_HORIZONTAL;
                        break;
                    case TextAlignment.BOTTOMRIGHT:
                        alignment = android.view.Gravity.BOTTOM | android.view.Gravity.RIGHT;
                        break;                   
                }
                self.nativeObject.setGravity(alignment);
            },
            enumerable: true
        });

        Object.defineProperty(this, 'textColor', {
            get: function() {
                return self.nativeObject.getCurrentTextColor();
            },
            set: function(textColor) {
                var colorParam = textColor;
                if(!TypeUtil.isNumeric(textColor)){
                    colorParam = android.graphics.Color.parseColor(textColor);
                }
                self.nativeObject.setTextColor(colorParam);
            },
            enumerable: true
        });

        // @todo not shows scrollbar exactly. AND-2501
        Object.defineProperty(this, 'showScrollBar', {
            get: function() {
                return self.nativeObject.isVerticalScrollBarEnabled();
            },
            set: function(showScrollBar) {
                self.nativeObject.setMovementMethod(showScrollBar ? new android.text.method.ScrollingMovementMethod() : null);
                self.nativeObject.setScrollContainer (showScrollBar)
                self.nativeObject.setVerticalScrollBarEnabled(showScrollBar);
                self.nativeObject.setScrollBarStyle(android.view.View.SCROLLBARS_INSIDE_INSET)
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
