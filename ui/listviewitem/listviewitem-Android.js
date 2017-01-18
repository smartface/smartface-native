const ViewGroup = require('../viewgroup');
const extend = require('js-base/core/extend');

const NativeAbsoluteLayout  = requireClass("android.widget.AbsoluteLayout");
const NativeRecyclerView    = requireClass("android.support.v7.widget.RecyclerView");

const ListViewItem = extend(ViewGroup)(
    function (_super, params) {
        var self = this;
        self.nativeObject = new NativeAbsoluteLayout(Android.getActivity());
        self.nativeInner = NativeRecyclerView.ViewHolder.extend("SFViewHolder",{},[self.nativeObject]);
        _super(this);
        self.nativeInner.itemView = self.nativeObject;
    }
);

module.exports = ListViewItem;