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

    self.add = function(object){
        self.nativeObject.view.addSubview(object.nativeObject);
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