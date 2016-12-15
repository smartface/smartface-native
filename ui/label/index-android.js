/**
 * @class Label
 *
 *
 * Label is a UI object to display a text on the screen. Label can contain only a single type font.
 *
 * @example
 * const Label = require('sf-core/ui/label');
 * var myLabel = new Label({
 *     text: "This is my label",
 *     visible: true
 * });
 * myLabel.backgroundColor = "#00FFFFFF";
 */
function Label (options) {

    const TextView = android.widget.TextView || require("core-modules/android-mock/android.widget.TextView");
    this.inner = new TextView("Landroid/app/Activity"); 

    /**
     * Gets/sets HTML text value. This property helps user showing HTML
     * tagged texts in Label view.
     * 
     * @example
     * // In this example 'This link' text inside Label will shown blue and
     * // underlined
     * var label = new Label();
     * label.htmlText = "<a href='http://smartface.io'>This link</a> will redirect you to Smartface website.";
     * 
     * @member {string} htmlText HTML text to display in object
     */

    Object.defineProperty(this, 'htmlText', {
        get: function() {
            return Html.toHtml(this.inner.getEditableText()).toString();
        },
        set: function(htmlText) {
            this.inner.setText(Html.fromHtml(htmlText));
        }
     });

    /**
     * Gets/sets font of label view. When set to null label uses system font.
     * It is set to null by default.
     * 
     * @member {Font} font Font of label view.
     */
     Object.defineProperty(this, 'font', {
        get: function() {
            return this.inner.getTypeface();
        },
        set: function(font) {
            this.inner.setTypeface(font);
        }
     });

    /**
     * Gets/sets allowing multiple line for label view. If set to true
     * and text is too long to show in single line label shows text as 
     * multiline. 
     * 
     * @member {boolean} multipleLine Show multiple line in label 
     */
    Object.defineProperty(this, 'multipleLine', {
        get: function() {
            return this.inner.getLineCount() != 1;
        },
        set: function(multipleLine) {
            this.inner.setSingleLine(!multipleLine);
        }
     });

    /**
     * Gets/sets style of view. 
     * 
     * @member {Style} style Style of view
     */
    this.style = {};

    /**
     * Gets/sets text inside label view.
     * 
     * @member {string} text Text inside label
     */
     Object.defineProperty(this, 'text', {
        get: function() {
            return this.inner.getText();
        },
        set: function(text) {
            this.inner.setText(text);
        }
     });

    /**
     * Gets/sets text alignment of label view. UI.TextAlignment constants
     * can be used.
     * 
     * @example
     * var label = new Label();
     * label.textAlignment = TextAlignment.CENTER;
     * 
     * @member {number} textAlignment Text alignment
     */
    Object.defineProperty(this, 'textAlignment', {
        get: function() {
            return this.inner.getTextAlignment();
        },
        set: function(textAlignment) {
            this.inner.setTextAlignment(textAlignment);
        }
     });
    /**
     * Gets/sets text color of view.
     * 
     * @member {Color} textColor Text Color
     */
    Object.defineProperty(this, 'color', {
        get: function() {
            return this.inner.getTextColor();
        },
        set: function(color) {
            this.inner.setTextColor(Color.parseColor(color);
        }
     });
    
    // Assign properties given in constructor
    if (props) {
        for (var prop in props) {
            this[prop] = props[prop];
        }
    }
}

module.exports = Label;