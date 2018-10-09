const extend = require('js-base/core/extend');
const View = require('sf-core/ui/view');


const ShimmerFlexLayout = extend(View)(
    function (_super, params) {
        var self = this;
        
        if(!self.nativeObject) {
            self.nativeObject = new __SF_FBShimmeringView();
        }
        
        _super(this);
        
        this.android.build = function(){};
        
        Object.defineProperty(this, 'startShimmering', {
            value: function() {
                self.nativeObject.shimmering = true;
            },
            enumerable: true
        });
        
        Object.defineProperty(this, 'stopShimmering', {
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
        
        Object.defineProperty(this, 'shimmeringDirection', {
            get: function() {
                return self.nativeObject.shimmeringDirection;
            },
            set: function(value){
                self.nativeObject.shimmeringDirection = value;
            },
            enumerable: true
        });
        
        var _contentLayout;
        Object.defineProperty(this, 'contentLayout', {
            get: function() {
                return _contentLayout;
            },
            set: function(value){
                _contentLayout = value;
                self.nativeObject.contentView = value.nativeObject;
            },
            enumerable: true
        });
        
        Object.defineProperty(this.ios, 'highlightLength', {
            get: function() {
                return self.nativeObject.shimmeringHighlightLength;
            },
            set: function(value){
                self.nativeObject.shimmeringHighlightLength = value;
            },
            enumerable: true
        });
        
        Object.defineProperty(this, 'pauseDuration', {
            get: function() {
                return self.nativeObject.shimmeringPauseDuration * 1000;
            },
            set: function(value){
                self.nativeObject.shimmeringPauseDuration = (value / 1000);
            },
            enumerable: true
        });
        
        Object.defineProperty(this, 'baseAlpha', {
            get: function() {
                return self.nativeObject.shimmeringOpacity;
            },
            set: function(value){
                self.nativeObject.shimmeringOpacity = value;
            },
            enumerable: true
        });
        
        Object.defineProperty(this.ios, 'animationAlpha', {
            get: function() {
                return self.nativeObject.shimmeringAnimationOpacity;
            },
            set: function(value){
                self.nativeObject.shimmeringAnimationOpacity = value;
            },
            enumerable: true
        });
        
        Object.defineProperty(this.ios, 'speed', {
            get: function() {
                return self.nativeObject.shimmeringSpeed;
            },
            set: function(value){
                self.nativeObject.shimmeringSpeed = value;
            },
            enumerable: true
        });
        
        Object.defineProperty(this.ios, 'beginFadeDuration', {
            get: function() {
                return self.nativeObject.shimmeringBeginFadeDuration * 1000;
            },
            set: function(value){
                self.nativeObject.shimmeringBeginFadeDuration = (value / 1000);
            },
            enumerable: true
        });
        
        Object.defineProperty(this.ios, 'endFadeDuration', {
            get: function() {
                return self.nativeObject.shimmeringEndFadeDuration * 1000;
            },
            set: function(value){
                self.nativeObject.shimmeringEndFadeDuration = (value / 1000);
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

ShimmerFlexLayout.Android = {}; 
ShimmerFlexLayout.Android.Shimmer = {}; 

ShimmerFlexLayout.ShimmeringDirection = {
    RIGHT : 0,
    LEFT: 1,
    UP: 2,
    DOWN:3
};


module.exports = ShimmerFlexLayout;