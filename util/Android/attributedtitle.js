/* global requireClass */
const AttributedString = require("sf-core/ui/attributedstring");
const NativeSpannableStringBuilder = requireClass("android.text.SpannableStringBuilder");

function AttributedTitle(context) {
    const self = context;

    let _attributedTitle = undefined;
    Object.defineProperties(self.android, {
        'attributedTitle': {
            get: function() {
                return _attributedTitle;
            },
            set: function(value) {
                _attributedTitle = value;
                if (_attributedTitle instanceof AttributedString) {
                    if (self._attributedTitleBuilder)
                        self._attributedTitleBuilder.clear();
                    else
                        self._attributedTitleBuilder = new NativeSpannableStringBuilder();

                    _attributedTitle.setSpan(self._attributedTitleBuilder);
                    self.__setTitle(self._attributedTitleBuilder);
                } else {
                    self.__setTitle(null);
                }
            },
            enumerable: true
        }
    });
}



module.exports = AttributedTitle;