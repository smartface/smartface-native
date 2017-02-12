const ViewGroup = require('../viewgroup');
const extend = require('js-base/core/extend');
 
const ScrollView = extend(ViewGroup)(
    function (_super, params) {
        _super(this);

        this.contentHeight = 0;
        this.contentWidth = 0;
        
        this.contentX = 0;
        this.contentY = 0;
        
        this.showHorizontalScrollBar = false;
        this.showVerticalScrollBar = false;
        
        // this.enableZoom = false;
        this.decelerationRate = 0.5;
        
        this.onScrollBegin = function(){};
        this.onScrollEnd = function(){};
        this.onScrollBeginDecelerating = function() {};
        this.onScrollEndDecelerating = function() {};

    }
);

module.exports = ScrollView;