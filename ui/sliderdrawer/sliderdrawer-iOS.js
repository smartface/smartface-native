const extend = require('js-base/core/extend');
const Page = require('sf-core/ui/page');
const AbsoluteLayout = require('sf-core/ui/absolutelayout');

const SliderDrawer = extend(Page)(
    function (_super, params) {
        var self = this;
        
        var _position = 0;
        var _enabled = true;
        var _drawerWidth = 100;

        if(!self.nativeObject){
            self.nativeObject = __SF_SliderDrawer.new();
            self.nativeObject.position = _position;
            self.nativeObject.enabled = _enabled;
        }
        
        _super(self);
        
        self.pageView = new AbsoluteLayout();
        self.pageView.nativeObject.frame = __SF_UIScreen.mainScreen().bounds;

        self.nativeObject.onViewLoad  = function(){
            self.pageView.nativeObject.backgroundColor = __SF_UIColor.whiteColor();
            return self.pageView.nativeObject;
        };
        
        self.nativeObject.onViewLayoutSubviews = function(){
            self.pageView.nativeObject.frame = {
                x : self.drawerPosition ? __SF_UIScreen.mainScreen().bounds.width - self.pageView.nativeObject.frame.width : 0,
                y : 0,
                height: __SF_UIScreen.mainScreen().bounds.height,
                width: self.width
            };
            
            self.pageView.left = self.pageView.nativeObject.frame.x;
            self.pageView.top = self.pageView.nativeObject.frame.y;
            self.pageView.width = self.pageView.nativeObject.frame.width;
            self.pageView.height = self.pageView.nativeObject.frame.height;
            
            self.pageView.applyLayout();
        };
        
        Object.defineProperties(this,{
            'drawerPosition' : {
                get: function(){
                    return _position;
                },
                set: function(position){
                    _position = position;
                    self.nativeObject.position = _position;
                },
                enumerable: true
            },
            'enabled' : {
                get: function(){
                    return _enabled;
                },
                set: function(enabled){
                    _enabled = enabled;
                    self.nativeObject.enabled = _enabled;
                },
                enumerable: true
            },
            'width': {
                get: function() {
                    return _drawerWidth;
                },
                set: function(width) {
                    _drawerWidth = width;
                    self.pageView.nativeObject.frame = {
                        x : self.pageView.nativeObject.frame.x,
                        y: self.pageView.nativeObject.frame.y,
                        height: self.pageView.nativeObject.frame.height,
                        width: _drawerWidth
                    };
                    self.pageView.width = _drawerWidth;
                },
                enumerable: true,
                configurable: true
            }
        });
        
        this.show = function(){
            self.nativeObject.show();
        };
        
        this.hide = function(){
            self.nativeObject.hide();
        };
        
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

SliderDrawer.Position = {};
Object.defineProperties(SliderDrawer.Position,{ 
    'LEFT': {
        value: 0,
        writable: false
    },
    'RIGHT': {
        value: 1,
        writable: false
    }
});

module.exports = SliderDrawer;