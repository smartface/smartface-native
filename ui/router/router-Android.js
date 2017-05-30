const Pages = require("sf-core/ui/pages");

function Router(){}

var pagesInstance = null;
var routes = {};
var history = [];

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
    
    if (!routes[to]) {
        routes[to] = {
            pageClass: page,
            isSingleton: !!isSingleton,
            pageObject: null
        }
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
        pagesInstance.push(toPage, animated, to);
    }
    
    var current = history[history.length-1];
    current && current.page.onHide && current.page.onHide();
    history.push({path: to, page: toPage});
};

Router.goBack = function(to, parameters, animated) {
    if (!pagesInstance || history.length <= 1) {
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
            return true;
        }
    } else {
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