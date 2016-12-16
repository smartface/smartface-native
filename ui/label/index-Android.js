const View = require('../view');
const extend = require('js-base/core/extend');
const Label = extend(View)(
    function (_super, params) {
        _super(this);

        this.nativeObject = new android.widget.TextView(Android.getActivity()); 

        Object.defineProperty(this, 'htmlText', {
            get: function() {
                return android.text.Html.toHtml(this.nativeObject.getEditableText()).toString();
            },
            set: function(htmlText) {
                this.nativeObject.setText(android.text.Html.fromHtml(htmlText));
            }
        });

        Object.defineProperty(this, 'font', {
            get: function() {
                return this.nativeObject.getTypeface();
            },
            set: function(font) {
                this.nativeObject.setTypeface(font);
            }
        });

        Object.defineProperty(this, 'multipleLine', {
            get: function() {
                return this.nativeObject.getLineCount() != 1;
            },
            set: function(multipleLine) {
                this.nativeObject.setSingleLine(!multipleLine);
            }
        });

        var styleInitial;
        Object.defineProperty(this, 'style', {
            get: function() {
                return styleInitial;
            },
            set: function(style) {
                styleInitial = style;
                var gd = new android.graphics.drawable.GradientDrawable();
                gd.setStroke(style.borderWidth, android.graphics.Color.parseColor.parseColor(style.borderColor));
                this.nativeObject.setBackgroundDrawable(gd);
            }
        });

        Object.defineProperty(this, 'text', {
            get: function() {
                return this.nativeObject.getText();
            },
            set: function(text) {
                this.nativeObject.setText(text);
            }
        });

        var textAlignmentInitial;
        Object.defineProperty(this, 'textAlignment', {
            get: function() {
                return textAlignmentInitial;
            },
            set: function(textAlignment) {
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
                this.nativeObject.setGravity(alignment);
            }
        });

        Object.defineProperty(this, 'color', {
            get: function() {
                return this.nativeObject.getTextColor();
            },
            set: function(color) {
                this.nativeObject.setTextColor(android.graphics.Color.parseColor.parseColor(color));
            }
        });

        Object.defineProperty(this, 'showScrollBar', {
            get: function() {
                return this.nativeObject.isHorizontalScrollBarEnabled();
            },
            set: function(showScrollBar) {
                this.nativeObject.setHorizontalScrollBarEnabled(showScrollBar);
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
