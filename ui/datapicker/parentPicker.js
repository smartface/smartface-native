/*globals requireClass*/
const Color = require("sf-core/ui/color");
const TypeUtil = require('../../util/type');
const AndroidConfig = require("../../util/Android/androidconfig");

const parentPicker = function(subClass){
    var self = subClass;
    
    var _title = "Picker";
    var _titleColor = Color.BLACK;
    var _titleFont;
    var _doneButtonText = "Ok";
    var _doneButtonFont, _doneButtonColor;
    var _cancelButtonText = "Cancel";
    var _cancelButtonFont, _cancelButtonColor;

    Object.defineProperties(self, {
        'title': {
            get: function() {
                return _title;
            },
            set: function(title) {
                if(TypeUtil.isString(title))
                    _title = title;
            },
            enumerable: true
        },
        'titleColor': {
            get: function() {
                return _titleColor;
            },
            set: function(color) {
                if(color instanceof Color)
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
                if(font instanceof Font)
                    _titleFont = font;
            },
            enumerable: true
        },
        'cancelButtonColor': {
            get: function() {
                return _cancelButtonColor;
            },
            set: function(color) {
                if(color instanceof Color)
                    _cancelButtonColor = color;
            },
            enumerable: true
        },
        'cancelButtonFont': {
            get: function() {
                return _cancelButtonFont;
            },
            set: function(font) {
                const Font = require('sf-core/ui/font');
                    if (font instanceof Font)
                        _cancelButtonFont = font;
            },
            enumerable: true
        },
        'cancelButtonText': {
            get: function() {
                return _cancelButtonText;
            },
            set: function(text) {
                if(TypeUtil.isString(text))
                    _cancelButtonText = text;
            },
            enumerable: true
        },
        'doneButtonColor': {
            get: function() {
                return _doneButtonColor;
            },
            set: function(color) {
                if(color instanceof Color)
                    _doneButtonColor = color;
            },
            enumerable: true
        },
        'doneButtonText': {
            get: function() {
                return _doneButtonText;
            },
            set: function(text) {
                if(TypeUtil.isString(text))
                    _doneButtonText = text;
            },
            enumerable: true
        },
        'doneButtonFont': {
            get: function() {
                return _doneButtonFont;
            },
            set: function(font) {
                const Font = require('sf-core/ui/font');
                    if (font instanceof Font)
                        _doneButtonFont = font;
            },
            enumerable: true
        }
    });
    
    self.createTitleView = function() {
        const picker = this;
    
        const NativeTextView = requireClass("android.widget.TextView");
        const Color = require('sf-core/ui/color');
    
        const CENTER = 17;
    
        var titleTextView = new NativeTextView(AndroidConfig.activity);
        titleTextView.setText(picker.title);
        titleTextView.setBackgroundColor(Color.TRANSPARENT.nativeObject);
        titleTextView.setPaddingRelative(10, 20, 10, 10);
        titleTextView.setGravity(CENTER);
        picker.titleColor && titleTextView.setTextColor(picker.titleColor.nativeObject);
        picker.titleFont && titleTextView.setTypeface(picker.titleFont.nativeObject);
        picker.titleFont && titleTextView.setTextSize(picker.titleFont.size);
    
        return titleTextView;
    }
    
    self.makeCustomizeButton = function(negativeButton,positiveButton){
        const picker = this;
    
        picker.cancelButtonText && negativeButton.setText(picker.cancelButtonText);
        picker.doneButtonText && positiveButton.setText(picker.doneButtonText);
        picker.cancelButtonColor && negativeButton.setTextColor(picker.cancelButtonColor.nativeObject);
        picker.doneButtonColor && positiveButton.setTextColor(picker.doneButtonColor.nativeObject);
        picker.cancelButtonFont && negativeButton.setTypeface(picker.cancelButtonFont.nativeObject);
        picker.doneButtonFont && positiveButton.setTypeface(picker.doneButtonFont.nativeObject);
    }
}

module.exports = parentPicker;
