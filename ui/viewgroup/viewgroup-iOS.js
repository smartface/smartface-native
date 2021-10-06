const View = require('../view');
const { EventEmitterCreator } = require("../../core/eventemitter");
const EventList = require('./events');

const Events = { ...View.Events, ...EventList };

const EventFunctions = {
    [EventList.ViewAdded]: function (view) {
      this.onViewAdded = EventEmitterWrapper(this, EventList.ViewAdded, null, view);
    },
    [EventList.ViewRemoved]: function (view) {
      this.onViewRemoved = EventEmitterWrapper(this, EventList.ViewRemoved, null, view);
    },
    [EventList.ChildViewAdded]: function (view) {
      this.onChildViewAdded = EventEmitterWrapper(this, EventList.ChildViewAdded, null, view);
    },
    [EventList.ChildViewRemoved]: function (view) {
      this.onChildViewRemoved = EventEmitterWrapper(this, EventList.ChildViewRemoved, null, view);
    },
  };

/**
 * @class UI.ViewGroup
 * @since 0.1
 * @extends View
 * A ViewGroup is a special view that can contain other views (called children) like layouts and views.
 * ViewGroup is an abstract class. You can't create instance from it.
 */
ViewGroup.prototype = Object.create(View.prototype);
function ViewGroup(params) {
    var self = this;

    self.childs = {};

    View.apply(this);
    EventEmitterCreator(this, View, EventFunctions, Events);

    this.addChild = function(view) {
        view.parent = self;
        var uniqueId = view.uniqueId;
        self.childs[uniqueId] = view;
        self.nativeObject.addSubview(view.nativeObject);
    };

    this.removeChild = function(view) {
        view.nativeObject.removeFromSuperview();
        delete self.childs[view.uniqueId];
        view.parent = undefined;
    };

    this.removeAll = function() {
        for (var child in self.childs) {
            self.childs[child].parent = undefined;
            self.childs[child].nativeObject.removeFromSuperview();
        }
        self.childs = {};
    };


    this.getChildCount = function() {
        return Object.keys(self.childs).length;
    };

    this.getChildList = function() {
        var childList = [];
        for (var i in self.childs) {
            childList.push(self.childs[i]);
        }
        return childList;
    };

    this.findChildById = function(id) {
        return getKeyByValue(self.childs, id);
    };

    function getKeyByValue(object, value) {
        for (var prop in object) {
            if (object.hasOwnProperty(prop)) {
                if (object[prop].id === value)
                    return object[prop];
            }
        }
    }

    self.onViewAddedHandler = function(e) {
        if (typeof self.onViewAdded === "function") {
            var view = self.childs[e.subview.uuid];
            self.onViewAdded(view);
            if (self.onChildViewAdded) {
                self.onChildViewAdded(view);
            }
        }
        if (typeof self.onViewAddedInnerCallback === "function") {
            var view = self.childs[e.subview.uuid];
            self.onViewAddedInnerCallback(view);
        }
    }
    self.nativeObject.didAddSubview = self.onViewAddedHandler;

    self.onViewRemovedHandler = function(e) {
        if (typeof self.onViewRemoved === "function") {
            var view = self.childs[e.subview.uuid];
            self.onViewRemoved(view);
            if (self.onChildViewRemoved) {
                self.onChildViewRemoved(view);
            }
        }
        if (typeof self.onViewRemovedInnerCallback === "function") {
            var view = self.childs[e.subview.uuid];
            self.onViewRemovedInnerCallback(view);
        }
    }
    self.nativeObject.willRemoveSubview = self.onViewRemovedHandler;

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }

    //Android spec methods
    self.android.requestDisallowInterceptTouchEvent = () => {};


    const parentOnFunction = this.on;
    Object.defineProperty(this, 'on', {
        value: (event, callback) => {
            if (typeof EventFunctions[event] === 'function') {
                EventFunctions[event].call(this);
                this.emitter.on(event, callback);
            }
            else {
                parentOnFunction(event, callback);
            }
        },
        configurable: true
    });
}

module.exports = ViewGroup;