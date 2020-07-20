const Invocation = require('sf-core/util/iOS/invocation.js');

function Menu(params) {

    var self = this;

    var _headerTitle = "";
    Object.defineProperty(this, 'headerTitle', {
        get: function() {
            return _headerTitle;
        },
        set: function(headerTitle) {
            _headerTitle = headerTitle;
        },
        enumerable: true
    });

    var _items = [];
    Object.defineProperty(this, 'items', {
        get: function() {
            return _items;
        },
        set: function(items) {
            _items = items;
        },
        enumerable: true
    });

    self.show = function(page) {
        self.nativeObject = __SF_UIAlertController.createAlertController(0);

        if (self.headerTitle && self.headerTitle !== "") {
            self.nativeObject.title = self.headerTitle;
        }

        for (var i = 0; i < self.items.length; i++) {
            var action = __SF_UIAlertAction.createAction(self.items[i].title, self.items[i].ios.style, self.items[i].onSelectedListener);
            self.nativeObject.addAction(action);
        }

        var popOver = self.nativeObject.valueForKey("popoverPresentationController");
        if  (popOver) {
            var argSourceView= new Invocation.Argument({
                type: "id",
                value: page.layout.nativeObject
            });
            Invocation.invokeInstanceMethod(popOver, "setSourceView:", [argSourceView]);

            var argSourceRect = new Invocation.Argument({
                type: "CGRect",
                value: {
                    x: page.layout.nativeObject.bounds.width/2,
                    y: page.layout.nativeObject.bounds.height/2,
                    width: 0,
                    height: 0
                }
            });
            Invocation.invokeInstanceMethod(popOver, "setSourceRect:", [argSourceRect]);
            
            var argPermittedArrowDirections = new Invocation.Argument({
                type: "NSInteger",
                value: 0
            });
            Invocation.invokeInstanceMethod(popOver, "setPermittedArrowDirections:", [argPermittedArrowDirections]);
        }

        page.nativeObject.presentViewController(self.nativeObject);
    };
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = Menu;