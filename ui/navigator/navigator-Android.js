const BottomTabBar = require("../bottomtabbar");
// const Router = require("../../router");

function Navigator(params) {
        var _items = {};
        var _itemInstances = {};
        var _index = null;
        var _history = [];
        var _rootPage;
        var _rootItemPage;
        var _tag;
        
        this.stack = [];
        
        Object.defineProperties(this, {
            'add': {
                value: function(to, page){
                    if(!_index) {
                        _index = to;
                        _rootPage = to;
                    }
                    _items[to] = page;
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
                    isSingleton = true;
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
                            if(_items[splittedPath[0]] instanceof require("../navigator")) {
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
                            var page;
                            if(isSingleton) {
                                page = _itemInstances[to];
                            } else {
                                page = new _items[to]();
                                _itemInstances[to] = page;
                            }
                        
                            // _history.push({path: to, page: page});
                            page.tag = to;
                            _index = to;
                            return page;
                        }
                        else if(_items[to] instanceof BottomTabBar){
                            // _history.push({path: to, controller: _items[to]});
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
            'go': {
                value: function(to, isSingleton, isGoing){
                    if(!_items[to])
                        throw new Error(to + ' is not in Navigator.');
                    if(isGoing) {
                        var page = this.getRoute(to, isSingleton);
                        if(!_rootItemPage)
                            _rootItemPage = page;
                        if(_rootPage === to) {
                            _history = [];
                        }
                        this.push(page, to, true);
                        return page;
                    } else {
                        _index = to;
                        return null;
                    }
                },
                enumerable: true
            },
            'push': {
                value: function(page, to, addStack, isAttach) {
                    const Router = require("sf-core/router");
                    this.stack.push({page: page, to: to});
                    if(!Router.pagesInstance)
                        Router.pagesInstance = {page: page, tag:  page.tag};
                    Router.pagesInstance.push(page, false, page.tag, false);
                    if(addStack)
                        _history.push({page: page, to: to});
                }  
            },
            'rootItemPage': {
                get: function() {
                    return _rootItemPage;
                } 
            },
            'goBack': {
                value: function(parameters){
                    const Router = require("sf-core/router");
                    if(_history.length < 1)
                        return false;
                    var current = _history[_history.length-1];
                    current && current.page && current.page.onHide && current.page.onHide();
                    _history.pop();
                    if(_history.length > 0) {
                        current = _history[_history.length-1];
                        _index = current.to;
                    } else {
                        _index = _rootPage;
                        current = {page: _itemInstances[_index]};
                    }
                    if(!Router.pagesInstance)
                        Router.pagesInstance = {page: current.page, tag: current.tag};
                    
                    current.page.__pendingParameters = parameters;
                    Router.pagesInstance.push(current.page, false, current.page.to);
                    return true;
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