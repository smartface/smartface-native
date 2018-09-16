const FragmentTransaction = require("../../util/Android/fragmenttransition");
const Application = require("../../application");

function NavigationController() {
    var historyStack = [];
    var pageIDCollectionInStack = {};
    
    this.childControllers = [];
    
    var _willShowCallback;
    var _onTransitionCallback;
    Object.defineProperties(this, {
        'historyStack': {
            get: function() {
                return historyStack;
            },
            enumerable: true
        },
        'willShow': {
            get: function() {
                _willShowCallback;
            },
            set: function(callback) {
                _willShowCallback = callback;
            },
            enumerable: true
        },
        'onTransition': {
            get: function() {
                _onTransitionCallback;
            },
            set: function(callback) {
                _onTransitionCallback = callback;
            },
            enumerable: true
        }
    });

    // Use this function to show page or controller without back stack operation.
    // Show page or controller that exists in history
    this.show = function(params) {
        if (!pageIDCollectionInStack[params.page.pageID]) {
            throw new Error("This page doesn't exist in history!");
        }

        params.animated && (params.animationType = FragmentTransaction.AnimationType.RIGHTTOLEFT);

        _willShowCallback && (_willShowCallback({ page: params.page, animated: params.animated }));
        FragmentTransaction.push(params);

        _onTransitionCallback && (_onTransitionCallback({
            currentPage: Application.currentPage,
            targetPage: params.page,
            operation: NavigationController.OperationType.PUSH
        }));
    };

    this.push = function(params) {
        // implemented only for Page
        // user should be fill this array
        // self.childControllers.push(params.page); 
        
        if (!params.page.pageID) {
            params.page.pageID = FragmentTransaction.generatePageID();
        }
        console.log("Push pageID: " + params.page.pageID);
        if (pageIDCollectionInStack[params.page.pageID]) {
            throw new Error("This page exist in history!");
        }
        pageIDCollectionInStack[params.page.pageID] = params.page;

        params.animated && (params.animationType = FragmentTransaction.AnimationType.RIGHTTOLEFT);
        historyStack.push(params.page);

        _willShowCallback && (_willShowCallback({ page: params.page, animated: params.animated }));
        FragmentTransaction.push(params);

        _onTransitionCallback && (_onTransitionCallback({
            currentPage: Application.currentPage,
            targetPage: params.page,
            operation: NavigationController.OperationType.PUSH
        }));
    };

    this.pop = function(params) {
        console.log("NavigationController.pop historyStack.length: " + historyStack.length);
        if (historyStack.length < 2) {
            throw new Error("There is no page in history!");
        }
        // remove current page from history and its id from collection
        var currentPage = historyStack.pop();
        pageIDCollectionInStack[currentPage.pageID] = null;

        var targetPage = historyStack[historyStack.length - 1];
        !params && (params = {});
        params.page = targetPage;
        console.log("NavigationController.pop targetPage.pageID: " + targetPage.pageID);
        _willShowCallback && (_willShowCallback({ page: params.page, animated: params.animated }));
        FragmentTransaction.pop(params);
        
        _onTransitionCallback && (_onTransitionCallback({
            currentPage: Application.currentPage,
            targetPage: params.page,
            operation: NavigationController.OperationType.POP
        }));
    };

    this.popTo = function(params) {
        console.log("NavigationController.pop historyStack.length: " + historyStack.length);
        if (historyStack.length < 2) {
            throw new Error("There is no page in history!");
        }

        // check whether target page exist in history
        if (!pageIDCollectionInStack[params.page.pageID]) {
            throw new Error("Target page doesn't exist in history!");
        }
        
        // remove current page from history and its id from collection
        while (historyStack[historyStack.length - 1].pageID != params.page.pageID) {
            var page = historyStack.pop();
            pageIDCollectionInStack[page.pageID] = null;
        }

        console.log("NavigationController.pop historyStack.length: " + historyStack.length);
        var targetPage = historyStack[historyStack.length - 1];
        params.page = targetPage;
        console.log("NavigationController.pop targetPage.pageID: " + targetPage.pageID);
        FragmentTransaction.pop(params);
        _onTransitionCallback && (_onTransitionCallback({
            currentPage: Application.currentPage,
            targetPage: params.page,
            operation: NavigationController.OperationType.POP
        }));
    };
}

NavigationController.OperationType = {};
NavigationController.OperationType.PUSH = 1;
NavigationController.OperationType.POP = 0;

module.exports = NavigationController;