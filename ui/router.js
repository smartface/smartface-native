const Pages = require("./pages");

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
function Router(){};

var pagesInstance = null;
var routes = {};
var history = [];

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
    
    if (!routes[to]) {
        routes[to] = {
            pageClass: page,
            isSingleton: !!isSingleton,
            pageObject: null
        }
    }
};

/**
 * Navigates to given route path. If route path is not defined an exception will
 * be thrown. Also if route path defined as singleton object and it exists in
 * page history an exception will be thrown. For singleton pages you should
 * use UI.Router.goBack to navigate them if they're in the history.
 * 
 * @param {String} to Route path to go
 * @param {Object} parameters Parameters to be passed onShow callback of
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
        pagesInstance.push(toPage, animated, to);
    }
    
    var current = history[history.length-1];
    current && current.page.onHide && current.page.onHide();
    history.push({path: to, page: toPage});
};

/**
 * Navigates back to a page in history. If no route path is given to function
 * it will navigate to last page in history.
 * 
 * @param {String} to Optional, route path to navigate back
 * @param {Boolean} animated Navigate with animation, if not given it is set to
 *                           true as default
 * @return {Boolean} True if navigated successfully, false otherwise
 * @static
 * @android
 * @ios
 */
Router.goBack = function(to, animated) {
    if (!pagesInstance || history.length <= 1) {
        return false;
    }
    
    var current = history[history.length-1];
    if (to && isPathExistsInHistory(to)) {
        var item = getLastOccurenceFromHistory(to);
        if (pagesInstance.popTo(item.path, item.page)) {
            current && current.page.onHide && current.page.onHide();
            history.splice(history.indexOf(item)+1);
            return true;
        }
    } else {
        if (pagesInstance.pop()) {
            current && current.page.onHide && current.page.onHide();
            history.pop();
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

function getRoute(to) {
    if (!routes[to]) {
        throw Error(to + " is not in routes");
    }
    if (routes[to].isSingleton && isPathExistsInHistory(to)) {
        throw Error(to + " is set as singleton and exists in history");
    }

    if (routes[to].isSingleton) {
        return routes[to].pageObject ||
                (routes[to].pageObject = new (routes[to].pageClass)());
    } else {
        return new (routes[to].pageClass)();
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