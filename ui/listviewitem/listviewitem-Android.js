const AndroidUnitConverter  = require("nf-core/util/Android/unitconverter.js");
const extend                = require('js-base/core/extend');
const FlexLayout            = require('nf-core/ui/flexlayout');
const NativeRecyclerView    = requireClass("android.support.v7.widget.RecyclerView");
// due to performance this must required here. 
const NativeYogaLayout      = requireClass('com.facebook.yoga.android.YogaLayout'); 

const ListViewItem = extend(FlexLayout)(
    function (_super, params) {
        var self = this;
        _super(this);
        self.nativeInner = NativeRecyclerView.ViewHolder.extend("SFViewHolder",{},[self.nativeObject]);
        self.nativeInner.itemView = self.nativeObject;
        
        var layoutParams = new NativeYogaLayout.LayoutParams(-1,-2);
        self.nativeObject.setLayoutParams(layoutParams);
        
        // Added due to problem in row height for RecyclerView
        Object.defineProperty(this, 'height', {
            get: function() {
                return AndroidUnitConverter.pixelToDp(self.nativeObject.getLayoutParams().height);
            },
            set: function(height) {
                self.nativeObject.getLayoutParams().height = AndroidUnitConverter.dpToPixel(height);
            },
            enumerable: true,
            configurable: true
        });
        
        // Added due to problem in row width for RecyclerView
        Object.defineProperty(this, 'width', {
            get: function() {
                return AndroidUnitConverter.pixelToDp(self.nativeObject.getLayoutParams().width);
            },
            set: function(width) {
                self.nativeObject.getLayoutParams().width = AndroidUnitConverter.dpToPixel(width);
            },
            enumerable: true,
            configurable: true
        });

        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = ListViewItem;
