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
        self.nativeObject = UIAlertController.createAlertController(0);
        
        if (self.headerTitle && self.headerTitle !== ""){
             self.nativeObject.title = self.headerTitle;
        }
        
        for (var item in self.items){
            var action = UIAlertAction.createAction(self.items[item].title,0,self.items[item].onSelectedListener);
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