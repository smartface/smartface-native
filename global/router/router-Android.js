const Pages = require("sf-core/ui/pages");
const BottomTabBar = require("sf-core/ui/bottomtabbar");
const Navigator = require("sf-core/navigator");

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
    
    if(page instanceof BottomTabBar || page instanceof Navigator) {
        if (!routes[to]) {
            routes[to] = {
                isSingleton: !!isSingleton,
                pageObject: page
            };
        }
    }
    else if (!routes[to]) {
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

    var toPage = getRoute(to);
    toPage.__pendingParameters = parameters;
    if (pagesInstance === null) {
        pagesInstance = new Pages({
            rootPage: toPage,
            tag: to
        });
        pagesInstance.setHistory(history);
    } else {
        if('animated' in toPage && !toPage.animated)
            animated = false;
        pagesInstance.push(toPage, animated, to);
    }
    
    var current = history[history.length-1];
    current && current.page.onHide && current.page.onHide();
    history.push({path: to, page: toPage});
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
        var parentNavigator = Router.routes[current.path].parentNavigator;
        if(parentNavigator) {
            parentNavigator.switchCounter -= 1;
        }
        else if(Router.routes[current.path].pageObject.switchCounter > 0) { 
            for(var i = 0; i < Router.routes[current.path].pageObject.switchCounter; i++)
                pagesInstance.pop();
            Router.routes[current.path].pageObject.switchCounter = 0;
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
        var subStr = to.split("/");
        var route = Router.routes[subStr[0]];
        if(!Router.routes[to] && (route.pageObject) instanceof Navigator) {
            var navigation = route.pageObject;
            var pageClass = navigation.items[subStr[1]];
            if(!pageClass)
                throw Error(subStr[1] + " is not in routes.");
            var page;
            if(route.isSingleton) {
                page = navigation.itemInstances[subStr[1]];
            }
            else {
                page = new pageClass();
            }
            Router.routes[to] = {
                pageObject: page,
                pageClass: pageClass,
                isSingleton: route.isSingleton
            };
        }
        else if((route.pageObject) instanceof BottomTabBar){ 
            if(!Router.routes[subStr[0]])
                throw Error(subStr[0] + " is not in routes.");
            var tab = Router.routes[subStr[0]].pageObject;
            if(!tab.items[subStr[1]])
                throw Error(subStr[1] + " is not in tabs.");
            // TODO Add controls. Throws error.
            if((tab.items[subStr[1]].route) instanceof Navigator) {
                var tabItem = tab.items[subStr[1]].route;
                var page = null;
                var pageClass = null;
                if(subStr.length > 2) {
                    if(!tabItem.items[subStr[2]]) 
                        throw new Error(subStr[2] + ' is not in navigators.');
                    page = new (tabItem.items[subStr[2]])();
                    pageClass = tabItem.items[subStr[2]];
                }
                else {
                    page = new (tabItem.items[tabItem.index])(); 
                    pageClass = tabItem.items[tabItem.index];
                }
                   
                if (!Router.routes[subStr[0]]) {
                    Router.routes[subStr[0]] = {
                        // isSingleton: !!isSingleton,
                        pageObject: tab
                    };
                }
                
                page.parentTab = subStr[0];
                page.selectedIndex = tab.currentIndex;
                page.animated = false;
                page.tabBarItems = tab.itemInstances;
                page.headerBar.visible = false;
                
                if(!Router.routes[to]) {
                    Router.routes[to] = {
                        // isSingleton: !!isSingleton,
                        pageObject: page,
                        parentNavigator: tabItem,
                        pageClass: pageClass 
                    };
                }
                else {
                    page = Router.routes[to].pageObject;
                }
                tabItem.switchCounter += 1;
                return page;
            }
        }
    }
    
    if (!routes[to]) {
        throw Error(to + " is not in routes");
    }
    if (routes[to].isSingleton && isPathExistsInHistory(to)) {
        throw Error(to + " is set as singleton and exists in history");
    }
    
    if((routes[to].pageObject) && ((routes[to].pageObject) instanceof BottomTabBar)) {
        var tabItems = [];
        var tab = routes[to].pageObject;
        var page = null;
        if(tab.items) {
            var keys = Object.keys(tab.items);
            var selectedIndex = 0;
            for(var i = 0; i < keys.length; i++) {
                var tabItemPage = new (tab.items[keys[i]].page)(); 
                if(keys[i] === tab.index) {
                    selectedIndex = i;
                }
                tabItemPage.headerBar.visible = false;
                tabItems.push(tabItemPage);
            }
            page = tabItems[selectedIndex];
            page.parentTab = to;
            page.selectedIndex = selectedIndex;
            page.tabBarItems = tabItems;
            
            tab.itemInstances = tabItems; // TODO don't set each time
        }
        tab.switchCounter = 0;
        return page;
    }
    else if((routes[to].pageObject) instanceof Navigator) {
        var index = routes[to].pageObject.index;
        if (routes[to].isSingleton) {
            return routes[to].pageObject.itemInstances[index];
        } else {
            return new (routes[to].pageObject.items[index])();
        }
    }
    else {
        if (routes[to].isSingleton) {
            return routes[to].pageObject ||
                    (routes[to].pageObject = new (routes[to].pageClass)());
        } else {
            return new (routes[to].pageClass)();
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