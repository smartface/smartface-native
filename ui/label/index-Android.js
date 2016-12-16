function Label (options) {

    const TextView = android.widget.TextView || require("core-modules/android-mock/android.widget.TextView");
    this.inner = new TextView(Android.getActivity()); 

    Object.defineProperty(this, 'htmlText', {
        get: function() {
            return Html.toHtml(this.inner.getEditableText()).toString();
        },
        set: function(htmlText) {
            this.inner.setText(Html.fromHtml(htmlText));
        }
     });

     Object.defineProperty(this, 'font', {
        get: function() {
            return this.inner.getTypeface();
        },
        set: function(font) {
            this.inner.setTypeface(font);
        }
     });

    Object.defineProperty(this, 'multipleLine', {
        get: function() {
            return this.inner.getLineCount() != 1;
        },
        set: function(multipleLine) {
            this.inner.setSingleLine(!multipleLine);
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
            this.inner.setBackgroundDrawable(gd);
        }
     });


    Object.defineProperty(this, 'text', {
        get: function() {
            return this.inner.getText();
        },
        set: function(text) {
            this.inner.setText(text);
        }
    });

    var textAlignmentInitial;
    Object.defineProperty(this, 'textAlignment', {
        get: function() {
            return textAlignmentInitial;
        },
        set: function(textAlignment) {
            var alignment = Gravity.CENTER_HORIZONTAL | Gravity.LEFT;
            swith(textAlignment){
                case 0:
                    alignment = Gravity.TOP | Gravity.LEFT;
                    break;
                case 1:
                    talignment = Gravity.TOP | Gravity.CENTER_HORIZONTAL;
                    break;
                case 2:
                    alignment = Gravity.TOP | Gravity.RIGHT;
                    break;
                case 3:
                    alignment = Gravity.CENTER_HORIZONTAL | Gravity.LEFT;
                    break;
                case 4:
                    alignment = Gravity.CENTER;
                    break;
                case 5:
                    alignment = Gravity.CENTER_HORIZONTAL | Gravity.RIGHT;
                    break;
                case 6:
                    alignment = Gravity.BOTTOM | Gravity.LEFT;
                    break;
                case 7:
                    alignment = Gravity.BOTTOM | Gravity.CENTER_HORIZONTAL;
                    break;
                case 8:
                    alignment = Gravity.BOTTOM | Gravity.RIGHT;
                    break;                   
            }
            this.inner.setGravity(alignment);
        }
     });

    Object.defineProperty(this, 'color', {
        get: function() {
            return this.inner.getTextColor();
        },
        set: function(color) {
            this.inner.setTextColor(android.graphics.Color.parseColor.parseColor(color));
        }
     });
    
    if (props) {
        for (var prop in props) {
            this[prop] = props[prop];
        }
    }
}

module.exports = Label;