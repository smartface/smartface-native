const AbsoluteContainer = require('sf-core/ui/absolutelayout');

function Page(params) {
    var self = this;

    self.nativeObject = new UIViewController();

    self.nativeObject.view.backgroundColor = UIColor.whiteColor();
        
    Object.defineProperty(self, 'onShow', {
        get: function() {
            return self.nativeObject.onShow;
        },
        set: function(value) {
            self.nativeObject.onShow = value;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'onHide', {
        get: function() {
            return self.nativeObject.onHide;
        },
        set: function(value) {
            self.nativeObject.onHide = value;
        },
        enumerable: true
    });

    var pageView = new AbsoluteContainer();
        pageView.setPosition({
            left: self.nativeObject.view.frame.x,
    	    top: self.nativeObject.view.frame.y,
    	    width: self.nativeObject.view.frame.width,
    	    height: self.nativeObject.view.frame.height,
    });
    
    self.nativeObject.view.addSubview(pageView.nativeObject);
    
    self.add = function(object){
        pageView.addChild(object);
    }

    self.remove = function(object){
        object.nativeObject.removeFromSuperview();
    }

    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = Page;