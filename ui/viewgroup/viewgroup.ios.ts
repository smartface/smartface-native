import { EventEmitterWrapper } from "core/eventemitter";
import { EventType } from "core/eventemitter/EventType";
import View from "../view/view.ios";
import { IViewGroup } from "./viewgroup";

const EventList = require('./events');

function getKeyByValue(object, value) {
  for (var prop in object) {
    if (object.hasOwnProperty(prop)) {
      if (object[prop].id === value) return object[prop];
    }
  }
}
/**
 * @class UI.ViewGroup
 * @since 0.1
 * @extends View
 * A ViewGroup is a special view that can contain other views (called children) like layouts and views.
 * ViewGroup is an abstract class. You can't create instance from it.
 */
// ViewGroup.prototype = Object.create(View.prototype);
export default class ViewGroupIOS<TEvent extends EventType = EventType, TNative extends {[key: string]: any} = {[key: string]: any}> extends View<TEvent, TNative> {
    static Events = { ...EventList, ...View.Events };
    private _children = {};

    constructor(params: Partial<IViewGroup>){
        super();

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
        
        // EventEmitterCreator(this, EventFunctions);
        this.nativeObject.didAddSubview = this.onViewAddedHandler;
        this.nativeObject.willRemoveSubview = this.onViewRemovedHandler;

        // TODO: Recheck after es6 compile
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    
        //Android spec methods
        this.android.requestDisallowInterceptTouchEvent = () => {};
    
    
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

  addChild = function (view: View): void {
    view.parent = this;
    const uniqueId = view.uniqueId;
    this._children[uniqueId] = view;
    this.nativeObject.addSubview(view.nativeObject);
  };

  removeChild = function (view) {
    view.nativeObject.removeFromSuperview();
    delete this._children[view.uniqueId];
    view.parent = undefined;
  };

  removeAll = function () {
    for (var child in this._children) {
      this._children[child].parent = undefined;
      this._children[child].nativeObject.removeFromSuperview();
    }
    this._children = {};
  };

  getChildCount = function () {
    return Object.keys(this._children).length;
  };

  getChildList = function () {
    var childList = [];
    for (var i in this._children) {
      childList.push(this._children[i]);
    }
    return childList;
  };

  findChildById = function (id) {
    return getKeyByValue(this._children, id);
  };

  onViewAddedHandler = function (e) {
    if (typeof this.onViewAdded === 'function') {
      var view = this._children[e.subview.uuid];
      this.onViewAdded(view);
      if (this.onChildViewAdded) {
        this.onChildViewAdded(view);
      }
    }
    if (typeof this.onViewAddedInnerCallback === 'function') {
      var view = this._children[e.subview.uuid];
      this.onViewAddedInnerCallback(view);
    }
  };

  onViewRemovedHandler = function (e) {
    if (typeof this.onViewRemoved === 'function') {
      var view = this._children[e.subview.uuid];
      this.onViewRemoved(view);
      if (this.onChildViewRemoved) {
        this.onChildViewRemoved(view);
      }
    }
    if (typeof this.onViewRemovedInnerCallback === 'function') {
      var view = this._children[e.subview.uuid];
      this.onViewRemovedInnerCallback(view);
    }
  };
}
