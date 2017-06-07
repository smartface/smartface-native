const Color      = require("sf-core/ui/color");
const TabBarItem = require("sf-core/ui/tabbaritem");

const MAXITEMCOUNT = 5;

function BottomTabBar(params) {
        var _items = {};
        var _itemInstances = null;
        var _itemColors;
        var _index;
        var _itemCount = 0;
        var _currentIndex = 0;
        var _backgroundColor;
        var _switchCounter = 0;
        var _tag;
        
        Object.defineProperties(this, {
            'add': {
                value: function(path, item){
                    if(_itemCount === this.android.maxItemCount) {
                        throw new Error("Maximum number of items supported by BottomTabBar is 5.");
                    }
                    const TabBarItem = require("sf-core/ui/tabbaritem");
                    if(typeof(path) === "string" && item instanceof TabBarItem) { 
                        _items[path] = item;
                        _itemCount++;
                    }
                    else {
                        throw new Error('Parameters of add method must be a string and a TabBarItem.');
                    }
                },
                enumerable: true
            },
            'itemColor': {
                set: function(colors) {
                    if(colors && colors.normal && colors.checked) {
                        if(((colors.normal) instanceof Color) && ((colors.checked) instanceof Color))
                            _itemColors = colors;
                        else
                            throw new Error("itemColor should be an object that contains instances of Color");
                    }
                    else {
                        throw new Error("itemColor should be an object that contains normal and checked state.");
                    }
                },
                get: function(){
                    return _itemColors;
                },
                enumerable: true
            },
            'backgroundColor': {
                set: function(color) {
                    if(color instanceof Color) {
                        _backgroundColor = color;
                    }
                },
                get: function(){
                    return _backgroundColor;
                },
                enumerable: true
            },
            'switchCounter': {
                set: function(count) {
                    _switchCounter = count;
                },
                get: function(){
                    return _switchCounter;
                },
                enumerable: true
            },
            'setIndex': {
                value: function(tag){
                    if(tag in _items) {
                        _index = tag;
                        _currentIndex = (Object.keys(_items)).indexOf(tag);
                    } else {
                        throw new Error(tag +" is not in tabs.");
                    }
                },
                enumerable: true
            },
            'index': {
                get: function() {
                    return _index;
                }
            },
            'currentIndex': {
                set: function(index) {
                    _currentIndex = index;
                },
                get: function() {
                    return _currentIndex;
                }
            },
            'items': {
                get: function() {
                    return _items;
                }
            },
            'itemInstances': {
                get: function() {
                    return _itemInstances;
                }
            },
            'getRoute': {
                value: function(to){
                    if(!to) {
                        if(typeof(_items[_index].page) === 'function') {
                            console.log('Page.');
                            if(!_itemInstances) {  
                               this.createItemInstances();
                            }
                            var keys = Object.keys(_items);
                            var page = _itemInstances[keys.indexOf(_index)];
                            this.setPageProperties(page, _index);
                            return page; // TODO Add isSingleton control.
                        }
                        else {
                            console.log('Not Page. Get route');
                            return _items[_index].getRoute();
                        }
                    }
                    else if(typeof(to) === 'string') {
                        console.log('BottomTabBar.getRoute ' + to);
                        if(to.includes('/')) {
                            var splittedPath = to.split("/");
                            var subPath = to.substring(splittedPath[0].length + 1, to.length); // +1 is for /
                            var page = _items[splittedPath[0]].route.getRoute(subPath, true); // TODO Check isSingleton
                            this.setPageProperties(page, to);
                            page.isNavigatorPageInBottomTabBar = true;
                            return page;
                        }
                        else if(!_items[to]) {
                            throw new Error(to + ' is not in bottom tab bar.');
                        }
                        
                        if(_items[to] instanceof TabBarItem){
                            if(!_itemInstances) {   
                               this.createItemInstances();
                            }
                            var keys = Object.keys(_items);
                            console.log("_itemInstances " + _itemInstances.length + ' index ' + keys.indexOf(to));
                            this.selectedIndex = keys.indexOf(to);
                            var page = _itemInstances[this.selectedIndex];
                            this.setPageProperties(page, to);
                            return page;
                        }
                        else {
                            console.log(to + ' is not a TabBarItem.')
                        }
                    }
                    return null;
                },
                enumerable: true
            },
            'tag': {
                set: function(tag) {
                    _tag = tag;
                },
                get: function() {
                    return _tag;
                }
            },
            'createItemInstances': {
                value: function(){
                    var keys = Object.keys(_items);
                    _itemInstances = [];
                    for(var i = 0; i < keys.length; i++) {
                        var page = new _items[keys[i]].page();
                        if(typeof(_items[keys[i]].route) === 'function') {
                            console.log(keys[i] + ' typeof.Route ' + typeof(_items[keys[i]].route));
                            page.isBottomTabBarPage = true;
                        }
                        _itemInstances.push(page);
                    } 
                },
                enumerable: true
            },
            'toString': {
                value: function(){
                    return 'Tab';
                },
                enumerable: true, 
                configurable: true
            },
            'setPageProperties': {
                value: function(page, to){
                    page.parentTab = this;
                    page.selectedIndex = _currentIndex;
                    page.tabBarItems = _itemInstances;
                    // if(!page.tag)
                    //     page.tag = to + " - " + page.selectedIndex;
                },
                enumerable: true
            }
        });
        
        this.android = {};
        Object.defineProperty(this.android, 'maxItemCount', {
            get: function() {
                return MAXITEMCOUNT;
            },
            enumerable: true
        });

        this.backgroundColor = Color.WHITE; // Don't remove. If don't set backgroundColor,
                                            // elevation doesn't work with default background white color.
        
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
}

module.exports = BottomTabBar;