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
    
    self.show = function(page){
        self.nativeObject = __SF_UIAlertController.createAlertController(0);
        
        if (self.headerTitle && self.headerTitle !== ""){
             self.nativeObject.title = self.headerTitle;
        }
        
        for (var i = 0; i < self.items.length; i++){
            var action = __SF_UIAlertAction.createAction(self.items[i].title,0,self.items[i].onSelectedListener);
            self.nativeObject.addAction(action);
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