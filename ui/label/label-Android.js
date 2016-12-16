const View = require('../view');
const extend = require('js-base/core/extend');
const Label = extend(View)(
    function (_super, params) {
        _super(this);

        this.nativeObject = new android.widget.TextView(Android.getActivity()); 
        var self = this;

        Object.defineProperty(this, 'htmlText', {
            get: function() {
                var editableText = self.nativeObject.getEditableText();
                var htmlText = android.text.Html.toHtml(editableText)
                return htmlText.toString();
            },
            set: function(htmlText) {
                var htmlTextNative = android.text.Html.fromHtml(htmlText);
                self.nativeObject.setText(htmlTextNative);
            }
        });

        Object.defineProperty(this, 'font', {
            get: function() {
                return self.nativeObject.getTypeface();
            },
            set: function(font) {
                self.nativeObject.setTypeface(font);
            }
        });

        Object.defineProperty(this, 'multipleLine', {
            get: function() {
                return self.nativeObject.getLineCount() != 1;
            },
            set: function(multipleLine) {
                self.nativeObject.setSingleLine(!multipleLine);
            }
        });

        Object.defineProperty(this, 'text', {
            get: function() {
                return self.nativeObject.getText();
            },
            set: function(text) {
                self.nativeObject.setText(text);
            }
        });

        var textAlignmentInitial;
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
                        talignment = android.view.Gravity.TOP | android.view.Gravity.CENTER_HORIZONTAL;
                        break;
                    case 2:
                        alignment = android.view.Gravity.TOP | android.view.Gravity.RIGHT;
                        break;
                    case 3:
                        alignment = android.view.Gravity.CENTER_HORIZONTAL | android.view.Gravity.LEFT;
                        break;
                    case 4:
                        alignment = android.view.Gravity.CENTER;
                        break;
                    case 5:
                        alignment = android.view.Gravity.CENTER_HORIZONTAL | android.view.Gravity.RIGHT;
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
            }
        });

        Object.defineProperty(this, 'color', {
            get: function() {
                return self.nativeObject.getTextColor();
            },
            set: function(color) {
                var colorParam = android.graphics.Color.parseColor(color);
                self.nativeObject.setTextColor(colorParam);
            }
        });

        Object.defineProperty(this, 'showScrollBar', {
            get: function() {
                return self.nativeObject.isHorizontalScrollBarEnabled();
            },
            set: function(showScrollBar) {
                self.nativeObject.setHorizontalScrollBarEnabled(showScrollBar);
            }
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
