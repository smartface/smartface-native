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
        
        var _rowHeight = 0;
        Object.defineProperty(this, 'rowHeight', {
            get: function() {
                return _rowHeight;
            },
            set: function(rowHeight) {
                _rowHeight = rowHeight;
            },
            enumerable: true
        });
        
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = ListViewItem;