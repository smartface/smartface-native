/*globals requireClass*/
const Color = require("sf-core/ui/color");
const TypeUtil = require('../../util/type');
const AndroidConfig = require("../../util/Android/androidconfig");
const { COMPLEX_UNIT_DIP } = require("../../util/Android/typevalue.js");

const parentPicker = function(subClass) {
    var self = subClass;

    var _title = null;
    var _titleColor = Color.BLACK;
    var _titleFont;

    Object.defineProperties(self, {
        'title': {
            get: function() {
                return _title;
            },
            set: function(title) {
                if (TypeUtil.isString(title))
                    _title = title;
            },
            enumerable: true
        },
        'titleColor': {
            get: function() {
                return _titleColor;
            },
            set: function(color) {
                if (color instanceof Color)
                    _titleColor = color;
            },
            enumerable: true
        },
        'titleFont': {
            get: function() {
                return _titleFont;
            },
            set: function(font) {
                const Font = require('sf-core/ui/font');
                if (font instanceof Font)
                    _titleFont = font;
            },
            enumerable: true
        }
    });

    self.__createTitleView = function() {
        const NativeTextView = requireClass("android.widget.TextView");
        const Color = require('sf-core/ui/color');

        const CENTER = 17;

        var titleTextView = new NativeTextView(AndroidConfig.activity);
        titleTextView.setText(self.title);
        titleTextView.setBackgroundColor(Color.TRANSPARENT.nativeObject);
        titleTextView.setPaddingRelative(10, 20, 10, 10);
        titleTextView.setGravity(CENTER);

        self.titleColor && titleTextView.setTextColor(self.titleColor.nativeObject);
        self.titleFont && titleTextView.setTypeface(self.titleFont.nativeObject);
        self.titleFont && titleTextView.setTextSize(COMPLEX_UNIT_DIP, self.titleFont.size);

        return titleTextView;
    };
};

module.exports = parentPicker;