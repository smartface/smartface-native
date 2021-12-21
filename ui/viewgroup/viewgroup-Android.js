/*globals array,requireClass,release */
const View = require('../view');
const TypeUtil = require("../../util/type");
const NativeViewGroup = requireClass("android.view.ViewGroup");
const { EventEmitterCreator, EventEmitterWrapper } = require("../../core/eventemitter");
const EventList = require('./events');

ViewGroup.prototype = Object.create(View.prototype);
ViewGroup.Events = { ...View.Events, ...EventList };

const EventFunctions = {
    [EventList.ViewAdded]: function () {
      this.onViewAdded = EventEmitterWrapper(this, EventList.ViewAdded, null);
    },
    [EventList.ViewRemoved]: function () {
      this.onViewRemoved = EventEmitterWrapper(this, EventList.ViewRemoved, null);
    },
    [EventList.ChildViewAdded]: function () {
      this.onChildViewAdded = EventEmitterWrapper(this, EventList.ChildViewAdded, null);
    },
    [EventList.ChildViewRemoved]: function () {
      this.onChildViewRemoved = EventEmitterWrapper(this, EventList.ChildViewRemoved, null);
    },
  };
function ViewGroup(params) {
    if (!this.nativeObject) {
        throw new Error("Can't create instance from ViewGroup. It is an abstract class.");
    }
    this.childViews = {};
    View.call(this);
    const eventEmitterCallback = () => {
        if (!this.didSetHierarchyChangeListener) {
            setHierarchyChangeListener(this);
        }
    }
    EventEmitterCreator(this, EventFunctions, eventEmitterCallback);

    Object.defineProperties(this.android, {
        'requestDisallowInterceptTouchEvent': {
            value: (disallow) => {
                this.nativeObject.requestDisallowInterceptTouchEvent(disallow);
            },
            enumerable: true
        }
    });

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }

    this.addChild = function(view) {
        view.parent = this;
        this.childViews[view.id] = view;
        if (this instanceof require("../flexlayout")) {
            this.nativeObject.addView(view.nativeObject, view.yogaNode);
        }
    }
    // const parentOnFunction = this.on;
    // Object.defineProperty(this, 'on', {
    //     value: (event, callback) => {
    //         if (typeof EventFunctions[event] === 'function') {
    //             EventFunctions[event].call(this);
    //             if (!this.didSetHierarchyChangeListener) {
    //                 setHierarchyChangeListener(this);
    //             }
    //             this.emitter.on(event, callback);
    //         }
    //         else {
    //             parentOnFunction(event, callback);
    //         }
    //     },
    //     configurable: true
    // });
}
ViewGroup.prototype._onViewAdded = null;
ViewGroup.prototype._onViewRemoved = null;
ViewGroup.prototype._onChildViewAdded = null;
ViewGroup.prototype._onChildViewRemoved = null;

Object.defineProperties(ViewGroup.prototype, {
    'removeChild': {
        value: function(view) {
            this.nativeObject.removeView(view.nativeObject);
            if (this.childViews[view.id]) {
                delete this.childViews[view.id];
            }
            view.parent = undefined;
        },
        enumerable: true,
        writable: true
    },
    'removeAll': {
        value: function() {
            this.nativeObject.removeAllViews();

            var ids = Object.keys(this.childViews);
            for (var i = 0; i < ids.length; i++) {
                this.childViews[ids[i]].parent = undefined;
            }
            this.childViews = {};
        },
        enumerable: true
    },
    'getChildCount': {
        value: function() {
            return this.nativeObject.getChildCount();
        },
        enumerable: true
    },
    'getChildList': {
        value: function() {
            var childList = [];
            for (var i in this.childViews) {
                childList.push(this.childViews[i]);
            }
            return childList;
        },
        enumerable: true
    },
    'findChildById': {
        value: function(id) {
            return this.childViews[id] ? this.childViews[id] : null;
        },
        enumerable: true
    },
    'onViewAdded': { //ToDo: Remove when event emitter being implemented. 
        get: function() {
            return this._onViewAdded;
        },
        set: function(callback) {
            if (TypeUtil.isFunction(callback)) {
                this._onViewAdded = callback;
                if (!this.didSetHierarchyChangeListener) setHierarchyChangeListener(this);
            }
        },
        enumerable: true
    },
    'onChildViewAdded': {
        get: function() {
            return this._onChildViewAdded;
        },
        set: function(callback) {
            if (TypeUtil.isFunction(callback)) {
                this._onChildViewAdded = callback;
                if (!this.didSetHierarchyChangeListener) setHierarchyChangeListener(this);
            }
        },
        enumerable: true
    },
    'onViewRemoved': { //ToDo: Remove when event emitter being implemented. 
        get: function() {
            return this._onViewRemoved;
        },
        set: function(callback) {
            if (TypeUtil.isFunction(callback)) {
                this._onViewRemoved = callback;
                if (!this.didSetHierarchyChangeListener) setHierarchyChangeListener(this);
            }
        },
        enumerable: true
    },
    'onChildViewRemoved': {
        get: function() {
            return this._onChildViewRemoved;
        },
        set: function(callback) {
            if (TypeUtil.isFunction(callback)) {
                this._onChildViewRemoved = callback;
                if (!this.didSetHierarchyChangeListener) setHierarchyChangeListener(this);
            }
        },
        enumerable: true
    },
    'toString': {
        value: function() {
            return 'ViewGroup';
        },
        enumerable: true,
        configurable: true
    }
});

function setHierarchyChangeListener(object) {
    object.nativeObject.setOnHierarchyChangeListener(NativeViewGroup.OnHierarchyChangeListener.implement({
        'onChildViewAdded': function(parent, child) {
            this.onChildViewAdded && this.onChildViewAdded(this.childViews[child.getId()]);
            this.onViewAdded && this_onViewAdded(this.childViews[child.getId()]);
        }.bind(object),
        'onChildViewRemoved': function(parent, child) {
            this.onChildViewRemoved && this.onChildViewRemoved(this.childViews[child.getId()]);
            this.onViewRemoved && this.onViewRemoved(this.childViews[child.getId()]);
        }.bind(object),
    }));

    object.didSetHierarchyChangeListener = true;
}

module.exports = ViewGroup;