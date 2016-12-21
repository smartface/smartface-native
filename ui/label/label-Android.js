const View = require('../view');
const extend = require('js-base/core/extend');
const Label = extend(View)(
    function (_super, params) {
        _super(this);

        this.nativeObject = new android.widget.TextView(Android.getActivity()); 
        var self = this;
        
        Object.defineProperty(this, 'htmlText', {
            get: function() {
                var text = self.nativeObject.getText();
                var htmlText = android.text.Html.toHtml(text);
                return htmlText.toString();
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
                    if(font.size != undefined && font.size != null)
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

        Object.defineProperty(this, 'text', {
            get: function() {
                return self.nativeObject.getText().toString();
            },
            set: function(text) {
                self.nativeObject.setText(text);
                self.nativeObject.setAutoLinkMask (0);
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
                var alignment = android.view.Gravity.CENTER_HORIZONTAL | android.view.Gravity.LEFT;
                switch(textAlignment){
                    case 0:
                        alignment = android.view.Gravity.TOP | android.view.Gravity.LEFT;
                        break;
                    case 1:
                        alignment = android.view.Gravity.TOP | android.view.Gravity.CENTER_HORIZONTAL;
                        break;
                    case 2:
                        alignment = android.view.Gravity.TOP | android.view.Gravity.RIGHT;
                        break;
                    case 3:
                        alignment = android.view.Gravity.CENTER_VERTICAL | android.view.Gravity.LEFT;
                        break;
                    case 4:
                        alignment = android.view.Gravity.CENTER;
                        break;
                    case 5:
                        alignment = android.view.Gravity.CENTER_VERTICAL | android.view.Gravity.RIGHT;
                        break;
                    case 6:
                        alignment = android.view.Gravity.BOTTOM | android.view.Gravity.LEFT;
                        break;
                    case 7:
                        alignment = android.view.Gravity.BOTTOM | android.view.Gravity.CENTER_HORIZONTAL;
                        break;
                    case 8:
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
                var colorParam = android.graphics.Color.parseColor(textColor);
                self.nativeObject.setTextColor(colorParam);
            },
            enumerable: true
        });

        Object.defineProperty(this, 'showScrollBar', {
            get: function() {
                return self.nativeObject.isVerticalScrollBarEnabled();
            },
            set: function(showScrollBar) {
                if(showScrollBar){
                    self.nativeObject.setMovementMethod(new android.text.method.ScrollingMovementMethod());
                }
                else{
                    self.nativeObject.setMovementMethod(null);
                }
                self.nativeObject.setScrollContainer (true)
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
