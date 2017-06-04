const Pages = require("sf-core/ui/pages");
const BottomTabBar = require("sf-core/ui/bottomtabbar");
const TabBarItem = require("sf-core/ui/tabbaritem");
const Navigator = require("sf-core/navigator");

/**
 * @class UI.Router
 * @since 0.1
 * 
 * Router is used for navigating between pages with given paths and parameters.
 * Simply define a route to a page, then from other pages go to that page with
 * predefined route without loading page again. While navigation from one page
 * to another you can also give parameters which will be available in onShow
 * callback of page to be shown.
 * 
 *     @example
 *     const Router = require('sf-core/ui/router');
 *     Router.add('login', require('pages/pgLogin'));
 *     Router.add('dashboard', require('pages/pgDashboard'));
 *     Router.go('login');
 *     ...
 *     // When user logins you can pass information to dashboard page
 *     Router.go('dashboard', {
 *         userId: loginInfo.userId,
 *         userName: loginInfo.userName
 *     });
 */
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

/**
 * Gets/sets sliderDrawer of the Router.
 *
 *     @example
 *     const Router = require('sf-core/ui/router');
 *     Router.add('login', require('pages/pgLogin'));
 *     Router.go('login');
 *     const SliderDrawer = require('sf-core/ui/sliderdrawer');
 *     var mySliderDrawer = new SliderDrawer();
 *     Router.sliderDrawer = mySliderDrawer;
 *
 * @property {UI.SliderDrawer} [sliderDrawer = null]
 * @android
 * @ios
 * @static
 * @since 0.1
 */
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

/**
 * Adds given page class to routes by matching it with given route path. You
 * can define if page instance will be singleton object or a new instance 
 * created everytime when UI.Router.go called.
 * 
 * @param {String} to Route path to page class
 * @param {UI.Page} page Page class to be used for creating and showing instances
 * @param {Boolean} isSingleton If given as true, single instance will be created
 *                              and everytime that instance will be shown
 * @static
 * @android
 * @ios
 */
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

/**
 * Navigates to given route path. If route path is not defined an exception will
 * be thrown. Also if route path defined as singleton object and it exists in
 * page history an exception will be thrown. For singleton pages you should
 * use UI.Router.goBack to navigate them if they're in the history.
 * 
 * @param {String} to Route path to go
 * @param {Object} parameters Parameters to be passed UI.Page.onShow callback of
 *                            navigated page 
 * @param {Boolean} animated Navigate with animation, if not given it is set to
 *                           true as default
 * @static
 * @android
 * @ios
 */
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
        console.log("animated " + animated);
        pagesInstance.push(toPage, animated, to);
    }
    
    var current = history[history.length-1];
    current && current.page.onHide && current.page.onHide();
    history.push({path: to, page: toPage});
};

/**
 * Navigates back to a page in history. If no route path is given to function
 * it will navigate to last page in history. To pass to last page, first parameter
 * should be null.
 * 
 * @param {String} to Optional, route path to navigate back
 * @param {Boolean} animated Navigate with animation, if not given it is set to
 *                           true as default
 * @param {Object} parameters Parameters to be passed UI.Page.onShow callback of
 *                            navigated page 
 * @return {Boolean} True if navigated successfully, false otherwise
 * @static
 * @android
 * @ios
 */
Router.goBack = function(to, parameters, animated) {
    if (!pagesInstance || history.length <= 1) {
        console.log('history.lenght = ' + history.length);
        return false;
    }
    
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
            console.log('history.lenght = ' + history.length);
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

/**
 * Gets current route path.
 * 
 * @return {String} Current route path
 * @static
 * @android
 * @ios
 */
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
    console.log('removeFromHistory ( ' + count + ') : ' + history.length + ' ' + pagesInstance.length);
}

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
            console.log("(route.pageObject) instanceof BottomTabBar");
            if(!Router.routes[subStr[0]])
                throw Error(subStr[0] + " is not in routes.");
            var tab = Router.routes[subStr[0]].pageObject;
            if(!tab.items[subStr[1]])
                throw Error(subStr[1] + " is not in tabs.");
            // TODO Add controls. Throws error.
            if((tab.items[subStr[1]].route) instanceof Navigator) {
                var tabItem = tab.items[subStr[1]].route;
                console.log("TabBarItem is a navigator.");
                var page;
                if(subStr.length > 2) {
                    if(!tabItem.items[subStr[2]]) 
                        throw new Error(subStr[2] + ' is not in navigators.');
                    page = new (tabItem.items[subStr[2]])();
                }
                   
                if (!Router.routes[subStr[0]]) {
                    console.log("-- !Router.routes[" + subStr[0] + ']');
                    Router.routes[subStr[0]] = {
                        // isSingleton: !!isSingleton,
                        pageObject: tab
                    };
                }
                else {
                    console.log("-- Router.routes[" + subStr[0] + ']');
                }
                
                page.parentTab = subStr[0];
                page.selectedIndex = tab.currentIndex;
                page.animated = false;
                page.tabBarItems = tab.itemInstances;
                page.headerBar.visible = false;
                
                if(!Router.routes[to]) {
                    console.log('parentNavigator ' + to);
                    Router.routes[to] = {
                        // isSingleton: !!isSingleton,
                        pageObject: page,
                        parentNavigator: tabItem,
                        pageClass: tabItem.items[subStr[2]] // TODO 2 olmayadabilir.
                    };
                }
                else {
                    page = Router.routes[to].pageObject;
                }
                tabItem.switchCounter += 1;
                console.log('Navigator.switchCounter ' + tabItem.switchCounter);
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
        var page;
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
            console.log('!isSingleton');
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