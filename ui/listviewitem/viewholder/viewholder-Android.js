const AndroidUnitConverter = require("../../../util/Android/unitconverter.js");
const extend = require('js-base/core/extend');
const FlexLayout = require('../../flexlayout');

const ViewHolder = extend(FlexLayout)(
    function(_super, params) {
        _super(this);
    },
    function(listViewItemPrototype) {
        Object.defineProperties(listViewItemPrototype, {
            // Added due to problem in row height for RecyclerView
            'height': {
                get: function() {
                    return AndroidUnitConverter.pixelToDp(this.nativeObject.getLayoutParams().height);
                },
                set: function(height) {
                    this.nativeObject.getLayoutParams().height = AndroidUnitConverter.dpToPixel(height);
                },
                enumerable: true,
                configurable: true
            },
            // Added due to problem in row width for RecyclerView
            'width': {
                get: function() {
                    return AndroidUnitConverter.pixelToDp(this.nativeObject.getLayoutParams().width);
                },
                set: function(width) {
                    this.nativeObject.getLayoutParams().width = AndroidUnitConverter.dpToPixel(width);
                },
                enumerable: true,
                configurable: true
            },
            'toString': {
                value: function() {
                    return 'ViewHolder';
                },
                enumerable: true,
                configurable: true
            }
        });
    }
);

module.exports = ViewHolder;