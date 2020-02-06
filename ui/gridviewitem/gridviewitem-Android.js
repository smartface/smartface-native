/*globals requireClass*/
const StaggeredGridLayoutManagerLayoutParams = requireClass('androidx.recyclerview.widget.StaggeredGridLayoutManager$LayoutParams');
const LayoutParams = require("../../util/Android/layoutparams");
const ViewHolder = require("sf-core/ui/listviewitem/viewholder");
const extend = require('js-base/core/extend');

const GridViewItem = extend(ViewHolder)(
    function(_super, params) {
        _super(this);
        if (!this.nativeInner) {
            if (params && params.nativeInner) {
                this.nativeInner = params.nativeInner;
            } else {
                const SFRecyclerViewHolder = requireClass("io.smartface.android.sfcore.ui.listview.SFRecyclerViewHolder");
                this.nativeInner = new SFRecyclerViewHolder(this.nativeObject);
            }
        }

        //StaggeredGridLayoutManager layout params are provides a few related feature. 
        this.nativeObject.setLayoutParams(new StaggeredGridLayoutManagerLayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT));

        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    },
    function(gridViewItemPrototype) {
        Object.defineProperties(gridViewItemPrototype, {
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