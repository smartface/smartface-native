const BottomTabBar = require("sf-core/ui/bottomtabbar");
// const Router = require("sf-core/router");

function Navigator(params) {
        var _items = {};
        var _itemInstances = {};
        var _index = null;
        var _switchCounter = 0;
        var _history = [];
        var _tag;
        
        Object.defineProperties(this, {
            'add': {
                value: function(to, page){
                    if(!_index)
                        _index = to;
                    _items[to] = page;
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
            'tag': {
                set: function(tag) {
                    _tag = tag;
                },
                get: function() {
                    return _tag;
                }
            },
            'index': {
                get: function() {
                    return _index;
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
                value: function(to, isSingleton){
                    if(!to) {
                        // TODO check isSingleton
                        return this.getRoute(_index, isSingleton);
                    }
                        
                    if(typeof(to) === 'string' && (typeof(isSingleton) === 'boolean')) {
                        if(to.includes('/')) {
                            var splittedPath = to.split("/");
                            if(!_items[splittedPath[0]])
                                throw new Error(splittedPath[0] + ' is not in routes.');
                            var subPath = to.substring(splittedPath[0].length + 1, to.length); // +1 is for /
                            if(_items[splittedPath[0]] instanceof require("sf-core/ui/navigator")) {
                                alert(splittedPath[0] + " is a Navigator. We don't implement nested navigation.");
                                return null;
                            }
                            else if(_items[splittedPath[0]] instanceof BottomTabBar) {
                                var page = _items[splittedPath[0]].getRoute(subPath, _items[splittedPath[0]].isSingleton);
                                if(!_items[splittedPath[0]].tag) 
                                    _items[splittedPath[0]].tag = splittedPath[0];
                                return page;
                            }
                        }
                        else if(!_items[to]) {
                            throw new Error(to + ' in not in navigator.');
                        }
                        
                        if(typeof(_items[to]) === 'function') {
                            if(!_itemInstances[to])
                                _itemInstances[to] = new _items[to]();
                                
                            var page = (isSingleton === true) ? (_itemInstances[to]) : (new _items[to]());
                            _history.push({path: to, page: page});
                            return page;
                        }
                        else if(_items[to] instanceof BottomTabBar){
                            _history.push({path: to, controller: _items[to]});
                            var page = _items[to].getRoute();
                            if(!_items[to].tag) 
                                _items[to].tag = to;
                            return page;
                            
                        }
                        else {
                            alert(splittedPath[0] + " is a Navigator. We don't implement nested navigation.");
                            return null;
                        }
                    }
                    else {
                        throw new Error('getRoute parameters should be a string and boolean.');
                    }
                },
                enumerable: true
            },
            'goBack': {
                value: function(parameters){
                    var current = _history[_history.length-1];
                    // if((current.controller) instanceof BottomTabBar) {
                    //     console.log("History: BottomTabBar " + current.controller.switchCounter);
                    //     for(var i = 0; i < current.controller.switchCounter; i++)
                    //         Router.pagesInstance.pop();
                    //     current.controller.switchCounter = 0;
                    // }
                    // if (Router.pagesInstance.pop()) {
                    //     current && current.page.onHide && current.page.onHide();
                    //     _history.pop();
                    //     if(_history.length > 0) {
                    //         current = _history[_history.length-1];
                    //         current.page.__pendingParameters = parameters;
                    //     }
                    //     return true;
                    // }
                    return false;
                },
                enumerable: true
            },
            'toString': {
                value: function(){
                    return 'Navigation';
                },
                enumerable: true, 
                configurable: true
            }
        });
        
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
}

module.exports = Navigator;