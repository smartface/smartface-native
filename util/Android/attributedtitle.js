const AttributedString = require("sf-core/ui/attributedstring");
const NativeSpannableStringBuilder = requireClass("android.text.SpannableStringBuilder");

function AttributedTitle(context) {
    const self = context;

    let _attributedTitle = undefined,
        _attributedTitleBuilder;
    Object.defineProperties(self.android, {
        'attributedTitle': {
            get: function() {
                return _attributedTitle;
            },
            set: function(value) {
                _attributedTitle = value;
                if (_attributedTitle instanceof AttributedString) {
                    if (_attributedTitleBuilder)
                        _attributedTitleBuilder.clear();
                    else
                        _attributedTitleBuilder = new NativeSpannableStringBuilder();

                    _attributedTitle.setSpan(_attributedTitleBuilder);

                    self._attributedTitleBuilder = _attributedTitleBuilder;

                    self.__setTitle(_attributedTitleBuilder);
                } else {
                    self.__setTitle(null);
                }
            },
            enumerable: true
        }
    });
};



module.exports = AttributedTitle;