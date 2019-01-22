/*globals requireClass*/
const AndroidUnitConverter = require("../../util/Android/unitconverter.js");
const extend = require('js-base/core/extend');
const FlexLayout = require('../flexlayout');
const StaggeredGridLayoutManager = requireClass('android.support.v7.widget.StaggeredGridLayoutManager');

const GridViewItem = extend(FlexLayout)(
    function(_super, params) {
        _super(this);

        if (!this.nativeInner) {
            if (params && params.nativeInner) {
                this.nativeInner = params.nativeInner;
            }
            else {
                const SFRecyclerViewHolder = requireClass("io.smartface.android.sfcore.ui.listview.SFRecyclerViewHolder");
                this.nativeInner = new SFRecyclerViewHolder(this.nativeObject);
            }
            //StaggeredGridLayoutManager layout params are provides a few related feature. 
            this.nativeObject.setLayoutParams(new StaggeredGridLayoutManager.LayoutParams(-1, -1));
        }

        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    },
    function(gridViewItemPrototype) {
        Object.defineProperties(gridViewItemPrototype, {
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
                    return 'GridViewItem';
                },
                enumerable: true,
                configurable: true
            }
        });
    }
);

module.exports = GridViewItem;
