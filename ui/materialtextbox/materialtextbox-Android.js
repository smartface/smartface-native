const TextBox = require('../textbox');
const extend = require('js-base/core/extend');

const AndroidConfig = require("../../util/Android/androidconfig.js");

const NativeTextInputEditText = requireClass("android.support.design.widget.TextInputEditText");
const NativeTextInputLayout = requireClass("android.support.design.widget.TextInputLayout");

const MaterialTextbox = extend(TextBox)(
    function(_super, params) {
        const self = this;
        _super(this);

        const activity = AndroidConfig.activity;

        self.nativeObject = new NativeTextInputLayout(activity);
        // if (!self.nativeObject) {
            var nativeTextInputEditText= new NativeTextInputEditText(self.nativeObject.getContext());
        // }
        self.nativeObject.addView(nativeTextInputEditText);
        self.nativeObject.setBoxBackgroundMode(2);

        var _title;
        var _titleColor;
        Object.defineProperties(self, {
            'title': {
                get: function() {
                    return _title;
                },
                set: function(titleText) {
                    if (typeof titleText === 'string') {
                        _title = titleText;
                        self.nativeObject.setHintEnabled(true);
                        self.nativeObject.setHint(titleText);
                    }
                }
            },
            'titleColor': {
                get: function() {
                    return _titleColor;
                },
                set: function(titleColor) {
                    if (typeof titleText === 'string') {
                        _title = titleColor;

                    }
                }
            }
        });


    }
)

module.exports = MaterialTextbox;
