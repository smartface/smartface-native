const Pages = require("../../ui/pages");
const Navigator = require("../../ui/navigator");
const BottomTabBar = require("../../ui/bottomtabbar");

function Router(){}

var pagesInstance = null;
var routes = {};
var history = [];

    
Object.defineProperty(Router, 'routes', {
    get: function() {
        return routes;
    },
    enumerable: true
});

    
Object.defineProperty(Router, 'pagesInstance', {
    set: function(params) {
        if(params && params.pagesInstance) {
            pagesInstance = params.pagesInstance;
        }  
        else if(params.page, params.tag) {
            pagesInstance = new Pages({
                rootPage: params.page,
                tag: params.tag
            });
            pagesInstance.setHistory(history);
        }
    },
    get: function() {
        return pagesInstance;
    },
    enumerable: true
});

Object.defineProperty(Router, 'sliderDrawer', {
    get: function() 
    {
        var retval = null;
        if (pagesInstance) 
        {
            retval = pagesInstance.sliderDrawer;
        }
        return retval;
    },
    set: function(sliderDrawerValue) 
    {
        const SliderDrawer = require('../../ui/sliderdrawer');
        if (sliderDrawerValue instanceof SliderDrawer) 
        {
            if (pagesInstance) 
            {
                pagesInstance.sliderDrawer = sliderDrawerValue;
            }
        } 
        else 
        {
            throw TypeError("Object must be SliderDrawer instance");
        }
    },
    enumerable: true
});

Router.add = function(to, page, isSingleton) {
    if (typeof(to) !== "string") {
        throw TypeError("add takes string and Page as parameters");
    }

    if(typeof(page) !== 'function') {
        if (!routes[to]) {
            routes[to] = {
                isSingleton: true,//!!isSingleton,
                pageObject: page,
            };
        }
    } else if (!routes[to]) {
        routes[to] = {
            pageClass: page,
            isSingleton: true,//!!isSingleton,
            pageObject: null
        };
    }
};

Router.go = function(to, parameters, animated) {
    if (arguments.length < 3) {
        animated = true;
    }

    var route = getRoute(to);
    if(route.page) {
        route.page.__pendingParameters = parameters;
        if(!route.page.tag)     
            route.page.tag = to;
        
        if (pagesInstance === null) {
            Router.pagesInstance = {page: route.page, tag: route.page.tag};
        } 
        
        if(route.page.isNavigatorPageInBottomTabBar) {
            if(route.page.firstPageInNavigator)
                pagesInstance.push(route.page, false, route.page.tag, false);
        } else if(route.page.isBottomTabBarPage) { 
            pagesInstance.push(route.page, animated, route.page.tag, false);
        } else {
            pagesInstance.push(route.page, animated, route.page.tag, true);
        }
    }
    
    var current = history[history.length-1];
    current && current.page && current.page.onHide && current.page.onHide();
    if(!current)
        history.push({path: route.to, page: route.page, controller: route.controller});
    else if(current.path !== route.to) 
        history.push({path: route.to, page: route.page, controller: route.controller});
};

Router.goBack = function(to, parameters, animated) {
    if (!pagesInstance)
        return false;
    
    var current = history[history.length-1];
    if (to && isPathExistsInHistory(to)) {
        var item = getLastOccurenceFromHistory(to);
        if(item.controller instanceof BottomTabBar || item.controller instanceof Navigator) {
            history.splice(history.indexOf(item)+1);
            if(history.length > 0) {
                current.page = item.controller.itemInstances[item.controller.index];
                current.page.__pendingParameters = parameters;
                pagesInstance.push(current.page, animated, current.page.tag, false);
            }
            return true;
        }
        else if (pagesInstance.popTo(item.path, item.page)) {
            current && current.page.onHide && current.page.onHide();
            history.splice(history.indexOf(item)+1);
            if(history.length > 0) {
                current = history[history.length-1];
                current.page.__pendingParameters = parameters;
            }
            return true;
        }
    } else {
        if((current.controller) instanceof Navigator) { 
            current.controller.goBack(parameters);
            return true;
        }
        else if((current.controller) instanceof BottomTabBar) {
            var tabbar = current.controller;
            var itemKey = Object.keys(tabbar.items)[tabbar.currentIndex];
            var tabbarItem = tabbar.items[itemKey];
            if(tabbarItem.route instanceof Navigator) {
                if(!tabbarItem.route.goBack(parameters)) {
                    current && current.page.onHide && current.page.onHide();
                    history.pop();
                    if(history.length > 0) {
                        current = history[history.length-1];
                        pagesInstance.push(current.page, animated, current.page.tag, false);
                        return true;
                    }
                    return false;
                }
            }
            return true;
        }
        
        if (pagesInstance.pop()) {
            current && current.page.onHide && current.page.onHide();
            history.pop();
            if(history.length > 0) {
                current = history[history.length-1];
                current.page.__pendingParameters = parameters;
            }
            return true;
        }
    }
    return false;
};

Router.getCurrent = function() {
    return history[history.length-1].path;
};

// Added for android.
Router.getCurrentPage = function() {
    return history[history.length-1];
};

Router.removeFromHistory = function(count) {
    for(var i = 0; i < count; i++) {
        if(pagesInstance.pop())
            history.pop();
    }
};

function getRoute(to) {
    if(to && to.includes("/")) {
        var splittedPath = to.split("/");
        if(!routes[splittedPath[0]])
            throw new Error(splittedPath[0] + ' is not in routes.');
            
        var subPath = to.substring(splittedPath[0].length + 1, to.length); // +1 is for /
        if (((routes[splittedPath[0]].pageObject) instanceof require("../../ui/navigator")) ||
            ((routes[splittedPath[0]].pageObject) instanceof BottomTabBar)) {
                
            var page = routes[splittedPath[0]].pageObject.getRoute(subPath, routes[splittedPath[0]].isSingleton);
            if(!routes[splittedPath[0]].pageObject.tag) 
                routes[splittedPath[0]].pageObject.tag = splittedPath[0];
            return {to: splittedPath[0], controller: routes[splittedPath[0]].pageObject, page: page};
        } else if(((routes[splittedPath[0]].pageObject) instanceof BottomTabBar)) {
            var page = routes[splittedPath[0]].pageObject.getRoute(subPath, routes[splittedPath[0]].isSingleton, true);
            if(!routes[splittedPath[0]].pageObject.tag) 
                routes[splittedPath[0]].pageObject.tag = splittedPath[0];
            if(page.firstPageInNavigator)
                page = null;
            return {to: splittedPath[0], controller: routes[splittedPath[0]].pageObject, page: page};
        } else {
            throw new Error(splittedPath[0] + ' is not a Navigator or a BottomTabBar');
        }
    }
    
    if (!routes[to]) {
        throw Error(to + " is not in routes");
    }
    if (routes[to].isSingleton && isPathExistsInHistory(to)) {
        throw Error(to + " is set as singleton and exists in history");
    }
    
    if((routes[to].pageObject) && ((routes[to].pageObject) instanceof Navigator)) {
        var page =  routes[to].pageObject.getRoute(null, routes[to].isSingleton);
        return {to: to, controller: routes[to].pageObject, page: page};
    }
    
    if((routes[to].pageObject) && ((routes[to].pageObject) instanceof BottomTabBar)) { // Implement again!
        var page =  routes[to].pageObject.getRoute(null, routes[to].isSingleton);
        if(!routes[to].pageObject.tag) 
            routes[to].pageObject.tag = to;
        return {to: to, controller: routes[to].pageObject, page: page};
    }
    
    else {
        if (routes[to].isSingleton) {
            var page = (routes[to].pageObject ||
                    (routes[to].pageObject = new (routes[to].pageClass)()));
            page.tag = to;
            return {to: to, page : page};
        } else {
            var page = new (routes[to].pageClass)();
            page.tag = to;
            return {to: to, page: page};
        }
    }
}

function isPathExistsInHistory(path) {
    function historyFilter(value) {
        return value.path === path;
    }
    return history.filter(historyFilter).length > 0;
}

function getLastOccurenceFromHistory(path) {
    if (!isPathExistsInHistory(path)) return null;

    function historyFilter(value) {
        return value.path === path;
    }
    return history.filter(historyFilter).pop();
}

module.exports = Router;