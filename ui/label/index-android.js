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

    this.style = {};
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

    Object.defineProperty(this, 'textAlignment', {
        get: function() {
            return this.inner.getTextAlignment();
        },
        set: function(textAlignment) {
            this.inner.setTextAlignment(textAlignment);
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