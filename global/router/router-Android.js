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
        const SliderDrawer = require('sf-core/ui/sliderdrawer');
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
                isSingleton: !!isSingleton,
                pageObject: page,
            };
        }
    } else if (!routes[to]) {
        routes[to] = {
            pageClass: page,
            isSingleton: !!isSingleton,
            pageObject: null
        };
    }
};

Router.go = function(to, parameters, animated) {
    if (arguments.length < 3) {
        animated = true;
    }

    var route = getRoute(to);
    route.page.__pendingParameters = parameters;
    if(!route.page.tag)     
        route.page.tag = to;
    if (pagesInstance === null) {
        pagesInstance = new Pages({
            rootPage: route.page,
            tag: route.page.tag
        });
        pagesInstance.setHistory(history);
    } else {
        if(route.page.isNavigatorPageInBottomTabBar)
            pagesInstance.push(route.page, false, route.page.tag);
        else 
            pagesInstance.push(route.page, animated, route.page.tag);
    }
    
    var current = history[history.length-1];
    current && current.page.onHide && current.page.onHide();
    history.push({path: route.to, page: route.page, item: route.item});
};

Router.goBack = function(to, parameters, animated) {
    if (!pagesInstance || history.length <= 1)
        return false;
    
    var current = history[history.length-1];
    if (to && isPathExistsInHistory(to)) {
        var item = getLastOccurenceFromHistory(to);
        if (pagesInstance.popTo(item.path, item.page)) {
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
        }
        else {
            for(var i = 0; i < current.page.switchCounter; i++)
                pagesInstance.pop();
            current.page.switchCounter = 0;
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
        if (((routes[splittedPath[0]].pageObject) instanceof require("sf-core/ui/navigator")) ||
            ((routes[splittedPath[0]].pageObject) instanceof BottomTabBar)) {
                
            var page = routes[splittedPath[0]].pageObject.getRoute(subPath, routes[splittedPath[0]].isSingleton);
            if(!routes[splittedPath[0]].pageObject.tag) 
                routes[splittedPath[0]].pageObject.tag = splittedPath[0];
            return {to: splittedPath[0], controller: routes[splittedPath[0]].pageObject, page: page};
        }
        else {
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
            return {to: to, page : (routes[to].pageObject ||
                    (routes[to].pageObject = new (routes[to].pageClass)()))};
        } else {
            return {to: to, page: new (routes[to].pageClass)()};
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