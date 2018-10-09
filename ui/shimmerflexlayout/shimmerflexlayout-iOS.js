const extend = require('js-base/core/extend');
const View = require('sf-core/ui/view');


const ShimmerFlexLayout = extend(View)(
    function (_super, params) {
        var self = this;
        
        if(!self.nativeObject) {
            self.nativeObject = new __SF_FBShimmeringView();
        }
        
        _super(this);
        
        Object.defineProperty(this, 'startShimmer', {
            value: function() {
                self.nativeObject.shimmering = true;
            },
            enumerable: true
        });
        
        Object.defineProperty(this, 'stopShimmer', {
            value: function() {
                self.nativeObject.shimmering = false;
            },
            enumerable: true
        });
        
        Object.defineProperty(this, 'isShimmering', {
            get: function() {
                return self.nativeObject.shimmering;
            },
            enumerable: true
        });
        
        Object.defineProperty(this.ios, 'shimmeringHighlightLength', {
            get: function() {
                return self.nativeObject.shimmeringHighlightLength;
            },
            set: function(value){
                self.nativeObject.shimmeringHighlightLength = value;
            },
            enumerable: true
        });
        
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = ShimmerFlexLayout;