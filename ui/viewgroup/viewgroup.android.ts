/*globals array,requireClass,release */

import { TypeUtil } from '../../util';
import { EventEmitterWrapper } from '../../core/eventemitter';
import { ViewAndroid } from '../view/view.android';
import { ViewGroupEvents } from './viewgroup-events';
import { IViewGroup } from '.';

const NativeRoundRectShape = requireClass('android.graphics.drawable.shapes.RoundRectShape');
const NativeShapeDrawable = requireClass('android.graphics.drawable.ShapeDrawable');
const NativeViewGroup = requireClass('android.view.ViewGroup');

export default class ViewGroupAndroid<
  TEvent extends string = ViewGroupEvents,
  TNative extends { [key: string]: any } = { [key: string]: any },
  TProps extends IViewGroup = IViewGroup
> extends ViewAndroid<TEvent, TNative, TProps> {
  static Events = ViewGroupEvents;
  private _onViewAdded = null;
  private _onViewRemoved = null;
  private _onChildViewAdded = null;
  private _onChildViewRemoved = null;
  private childViews = {};
  private didSetHierarchyChangeListener: boolean;

  constructor(params?: Partial<TProps>) {
    super(params);
    if (!this.nativeObject) {
      throw new Error("Can't create instance from ViewGroup. It is an abstract class.");
    }
    const eventEmitterCallback = () => {
      if (!this.didSetHierarchyChangeListener) {
        this.setHierarchyChangeListener();
      }
    };

    const EventFunctions = {
      [ViewGroupEvents.ViewAdded]: function () {
        this.onViewAdded = EventEmitterWrapper(this, ViewGroupEvents.ViewAdded, null);
      },
      [ViewGroupEvents.ViewRemoved]: function () {
        this.onViewRemoved = EventEmitterWrapper(this, ViewGroupEvents.ViewRemoved, null);
      },
      [ViewGroupEvents.ChildViewAdded]: function () {
        this.onChildViewAdded = EventEmitterWrapper(this, ViewGroupEvents.ChildViewAdded, null);
      },
      [ViewGroupEvents.ChildViewRemoved]: function () {
        this.onChildViewRemoved = EventEmitterWrapper(this, ViewGroupEvents.ChildViewRemoved, null);
      }
    };
    // EventEmitterCreator(this, EventFunctions, eventEmitterCallback);
    this.addAndroidProps({
      requestDisallowInterceptTouchEvent: (disallow) => {
        this.nativeObject.requestDisallowInterceptTouchEvent(disallow);
      }
    });
    // Object.defineProperties(this.android, {
    //   requestDisallowInterceptTouchEvent: {
    //     value: (disallow) => {
    //       this.nativeObject.requestDisallowInterceptTouchEvent(disallow);
    //     },
    //     enumerable: true
    //   }
    // });
  }

  addChild = function (view) {
    view.parent = this;
    this.childViews[view.id] = view;
    if (this instanceof require('../flexlayout')) {
      this.nativeObject.addView(view.nativeObject, view.yogaNode);
    }
  };

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
  removeChild(view) {
    this.nativeObject.removeView(view.nativeObject);
    if (this.childViews[view.id]) {
      delete this.childViews[view.id];
    }
    view.parent = undefined;
  }

  removeAll() {
    this.nativeObject.removeAllViews();

    const ids = Object.keys(this.childViews);
    for (let i = 0; i < ids.length; i++) {
      this.childViews[ids[i]].parent = undefined;
    }
    this.childViews = {};
  }

  getChildCount() {
    return this.nativeObject.getChildCount();
  }

  getChildList() {
    const childList = [];
    for (let i in this.childViews) {
      childList.push(this.childViews[i]);
    }
    return childList;
  }
  findChildById(id) {
    return this.childViews[id] ? this.childViews[id] : null;
  }

  get onViewAdded() {
    return this._onViewAdded;
  }

  //ToDo: Remove when event emitter being implemented.
  set onViewAdded(callback) {
    if (TypeUtil.isFunction(callback)) {
      this._onViewAdded = callback;
      if (!this.didSetHierarchyChangeListener) this.setHierarchyChangeListener();
    }
  }
  get onChildViewAdded() {
    return this._onChildViewAdded;
  }

  set onChildViewAdded(callback) {
    if (TypeUtil.isFunction(callback)) {
      this._onChildViewAdded = callback;
      if (!this.didSetHierarchyChangeListener) this.setHierarchyChangeListener();
    }
  }

  get onViewRemoved() {
    return this._onViewRemoved;
  }
  set onViewRemoved(callback) {
    if (TypeUtil.isFunction(callback)) {
      this._onViewRemoved = callback;
      if (!this.didSetHierarchyChangeListener) this.setHierarchyChangeListener();
    }
  }
  get onChildViewRemoved() {
    return this._onChildViewRemoved;
  }
  set onChildViewRemoved(callback) {
    if (TypeUtil.isFunction(callback)) {
      this._onChildViewRemoved = callback;
      if (!this.didSetHierarchyChangeListener) this.setHierarchyChangeListener();
    }
  }
  toString() {
    return 'ViewGroup';
  }

  private setHierarchyChangeListener() {
    this.nativeObject.setOnHierarchyChangeListener(
      NativeViewGroup.OnHierarchyChangeListener.implement({
        onChildViewAdded: (parent, child) => {
          this.onChildViewAdded && this.onChildViewAdded(this.childViews[child.getId()]);
          this.onViewAdded && this._onViewAdded(this.childViews[child.getId()]);
        },
        onChildViewRemoved: (parent, child) => {
          this.onChildViewRemoved && this.onChildViewRemoved(this.childViews[child.getId()]);
          this.onViewRemoved && this.onViewRemoved(this.childViews[child.getId()]);
        }
      })
    );

    this.didSetHierarchyChangeListener = true;
  }

  // This method is needed to respect border radius of the view.
  private getRippleMask(borderRadius) {
    const outerRadii = [];
    outerRadii.length = 8;
    outerRadii.fill(borderRadius);

    const roundRectShape = new NativeRoundRectShape(array(outerRadii, 'float'), null, null);
    const shapeDrawable = new NativeShapeDrawable(roundRectShape);

    return shapeDrawable;
  }
}
