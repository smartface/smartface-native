const ViewGroup = require('../viewgroup');
const extend = require('js-base/core/extend');
 
const ScrollView = extend(ViewGroup)(
    function (_super, params) {
        _super(this);

        this.contentHeight = 0;
        this.contentWidth = 0;
        
        this.scrollX = 0;
        this.scrollY = 0;
        
        this.showHorizontalScrollBar = false;
        this.showVerticalScrollBar = false;
        
        // this.enableZoom = false;
        this.declerationRate = 0.5;
        
        this.onScrollBegin = function(){};
        this.onScrollEnd = function(){};
    }
);

module.exports = ScrollView;