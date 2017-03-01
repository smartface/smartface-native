const Pages = require("../pages");

function Router(){};

var pagesInstance = null;
var routes = {};
var history = [];

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
}

Router.go = function(to, parameters, animated) {
    if (arguments.length < 3) {
        animated = true;
    }

    var toPage = getRoute(to);
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
    current && current.onHide && current.onHide();
    history.push(to);
}

Router.goBack = function(to) {
    if (!pagesInstance || history.length <= 1) {
        return false;
    }
    
    var current = history[history.length-1];
    if (to && history.lastIndexOf(to) !== -1) {
        if (pagesInstance.popTo(to)) {
            current && current.onHide && current.onHide();
            history.splice(history.indexOf(to)+1);
            return true;
        }
    } else {
        if (pagesInstance.pop()) {
            current && current.onHide && current.onHide();
            history.pop();
            return true;
        }
    }
    return false;
}

function getRoute(to) {
    if (!routes[to]) {
        throw Error(to + " is not in routes");
    }
    if (routes[to].isSingleton && history.indexOf(to) !== -1) {
        throw Error(to + " is set as singleton and exists in history");
    }

    if (routes[to].isSingleton) {
        return routes[to].pageObject ||
                (routes[to].pageObject = new (routes[to].pageClass)());
    } else {
        return new (routes[to].pageClass)();
    }
}

module.exports = Router;