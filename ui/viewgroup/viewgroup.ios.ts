import { EventEmitterWrapper } from 'core/eventemitter';
import { ExtractEventValues } from 'core/eventemitter/extract-event-values';
import IView, { IViewProps } from 'ui/view';
import { IViewGroup } from '.';
import { WithMobileOSProps } from '../../core/native-mobile-component';
import View from '../view/view.ios';
import { ViewGroupEvents } from './viewgroup-events';

function getKeyByValue(object, value) {
  for (const prop in object) {
    if (object[prop].id === value) return object[prop];
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
export default class ViewGroupIOS<TEvent extends string = ViewGroupEvents, TNative extends { [key: string]: any } = { [key: string]: any }, TProps extends IViewGroup = IViewGroup>
  extends View<ViewGroupEvents | ExtractEventValues<TEvent>, TNative, TProps>
{
  private _children = {};

  constructor(params?: TProps) {
    super(params);

    const EventFunctions = {
      [ViewGroupEvents.ViewAdded]: function (view) {
        this.onViewAdded = EventEmitterWrapper(this, ViewGroupEvents.ViewAdded, null, view);
      },
      [ViewGroupEvents.ViewRemoved]: function (view) {
        this.onViewRemoved = EventEmitterWrapper(this, ViewGroupEvents.ViewRemoved, null, view);
      },
      [ViewGroupEvents.ChildViewAdded]: function (view) {
        this.onChildViewAdded = EventEmitterWrapper(this, ViewGroupEvents.ChildViewAdded, null, view);
      },
      [ViewGroupEvents.ChildViewRemoved]: function (view) {
        this.onChildViewRemoved = EventEmitterWrapper(this, ViewGroupEvents.ChildViewRemoved, null, view);
      }
    };
    this.nativeObject.didAddSubview = this.onViewAddedHandler;
    this.nativeObject.willRemoveSubview = this.onViewRemovedHandler;
  }
  onViewAdded: (view: IView) => void;
  onViewRemoved: (view: IView) => void;
  addChild = function (view: View): void {
    view.parent = this;
    const uniqueId = view.uniqueId;
    this._children[uniqueId] = view;
    this.nativeObject.addSubview(view.nativeObject);
  };

  // TODO: Make View disposable and move that logic into
  removeChild = function (view) {
    view.nativeObject.removeFromSuperview();
    delete this._children[view.uniqueId];
    view.parent = undefined;
  };

  removeAll = function () {
    for (const child in this._children) {
      this._children[child].parent = undefined;
      this._children[child].nativeObject.removeFromSuperview();
    }
    this._children = {};
  };

  getChildCount = function () {
    return Object.keys(this._children).length;
  };

  getChildList = function () {
    const childList = [];
    for (const i in this._children) {
      childList.push(this._children[i]);
    }
    return childList;
  };

  findChildById = function (id: string) {
    return getKeyByValue(this._children, id);
  };

  onViewAddedHandler = function (e) {
    if (typeof this.onViewAdded === 'function') {
      const view = this._children[e.subview.uuid];
      this.onViewAdded(view);
      if (this.onChildViewAdded) {
        this.onChildViewAdded(view);
      }
    }
    if (typeof this.onViewAddedInnerCallback === 'function') {
      const view = this._children[e.subview.uuid];
      this.onViewAddedInnerCallback(view);
    }
  };

  onViewRemovedHandler = function (e) {
    if (typeof this.onViewRemoved === 'function') {
      const view = this._children[e.subview.uuid];
      this.onViewRemoved(view);
      if (this.onChildViewRemoved) {
        this.onChildViewRemoved(view);
      }
    }
    if (typeof this.onViewRemovedInnerCallback === 'function') {
      const view = this._children[e.subview.uuid];
      this.onViewRemovedInnerCallback(view);
    }
  };
}
