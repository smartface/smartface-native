function Menu(params) {
    
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
    
    var _headerTitle = [];
    Object.defineProperty(this, 'headerTitle', {
        get: function() {
            return _headerTitle;
        },
        set: function(headerTitle) {
            _headerTitle = headerTitle;
        },
        enumerable: true
    });
   
    this.show = function(page) {
        
        var layout = page.layout;
        var layoutNativeObject = layout.nativeObject;
        var pageNativeObject = page.nativeObject;
        
        pageNativeObject.registerForContextMenu(layoutNativeObject);
        page.contextMenu = {items: _items, headerTitle: _headerTitle};
        layoutNativeObject.showContextMenu();
    };
    
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
    
}

module.exports = Menu;