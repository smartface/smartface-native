const Pages = require("./pages");

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
    current && current.page.onHide && current.page.onHide();
    history.push({path: to, page: toPage});
}

Router.goBack = function(to) {
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
}

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
    return history.filter((value) => {return value.path === path}).length > 0;
}

function getLastOccurenceFromHistory(path) {
    if (!isPathExistsInHistory(path)) return null;
    return history.filter((value) => {return value.path === path}).pop();
}

module.exports = Router;