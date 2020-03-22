/*globals requireClass*/
const ViewHolder = require('./viewholder');
const NativeYogaLayout = requireClass('com.facebook.yoga.android.YogaLayout');

// const ListViewItem = extend(ViewHolder)(
ListViewItem.prototype = Object.create(ViewHolder.prototype)
function ListViewItem(params) {
    ViewHolder.call(this);

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

    this.ios.expandSwipe = function(){};
		
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}
Object.defineProperties(ListViewItem.prototype, {
    'toString': {
        value: function() {
            return 'ListViewItem';
        },
        enumerable: true,
        configurable: true
    }
});

module.exports = ListViewItem;