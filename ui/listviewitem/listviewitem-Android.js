const AndroidUnitConverter  = require("sf-core/util/Android/unitconverter.js");
const extend                = require('js-base/core/extend');
const FlexLayout            = require('sf-core/ui/flexlayout');
const NativeRecyclerView    = requireClass("android.support.v7.widget.RecyclerView");
const NativeYogaLayout      = requireClass('com.facebook.yoga.android.YogaLayout'); 

const ListViewItem = extend(FlexLayout)(
    function (_super, params) {
        _super(this);
        
        if(!this.nativeInner){
            if(params && params.nativeInner){
                this.nativeInner = params.nativeInner;
            }
            else{
                this.nativeInner = NativeRecyclerView.ViewHolder.extend("SFViewHolder",{},[this.nativeObject]);
                this.nativeInner.itemView = this.nativeObject;
            }
        }

        Object.defineProperties(this, {
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
                value: function(){
                    return 'ListViewItem';
                },
                enumerable: true, 
                configurable: true
            }
        });

        if(!this.isNotSetDefaults){
            var layoutParams = new NativeYogaLayout.LayoutParams(-1,-2);
            this.nativeObject.setLayoutParams(layoutParams);
        }
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = ListViewItem;
