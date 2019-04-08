/*globals requireClass*/
const extend = require('js-base/core/extend');
const ViewHolder = require('./viewholder');
const NativeYogaLayout = requireClass('com.facebook.yoga.android.YogaLayout');

const ListViewItem = extend(ViewHolder)(
    function(_super, params) {
        _super(this);

        if (!this.nativeInner) {
            if (params && params.nativeInner) {
                this.nativeInner = params.nativeInner;
            } else {
                const SFRecyclerViewHolder = requireClass("io.smartface.android.sfcore.ui.listview.SFRecyclerViewHolder");
                this.nativeInner = new SFRecyclerViewHolder(this.nativeObject);
            }

            var layoutParams = new NativeYogaLayout.LayoutParams(-1, -2);
            this.nativeObject.setLayoutParams(layoutParams);
        }

        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    },
    function(listViewItemPrototype) {
        Object.defineProperties(listViewItemPrototype, {
            'toString': {
                value: function() {
                    return 'ListViewItem';
                },
                enumerable: true,
                configurable: true
            }
        });
    }
);

module.exports = ListViewItem;