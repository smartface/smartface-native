import { EventEmitterWrapper } from 'core/eventemitter';
import { ExtractEventValues } from 'core/eventemitter/extract-event-values';
import IView, { IViewProps } from 'ui/view';
import { IViewGroup } from '.';
import { WithMobileOSProps } from '../../core/native-mobile-component';
import ViewIOS from '../view/view.ios';
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
export default class ViewGroupIOS<TEvent extends string = ViewGroupEvents, TNative extends { [key: string]: any } = { [key: string]: any }, TProps extends IViewGroup = IViewGroup> extends View<
  ViewGroupEvents | ExtractEventValues<TEvent>,
  TNative,
  TProps
> {
  private _children = {};
  onViewRemovedInnerCallback: IViewGroup['onViewRemoved'];
  onViewAddedInnerCallback: IViewGroup['onViewAdded'];
  onChildViewAdded: IViewGroup['onViewAdded'];
  onChildViewRemoved: IViewGroup['onViewRemoved'];
  constructor(params?: TProps) {
    super(params);
    this.nativeObject.didAddSubview = this.onViewAddedHandler;
    this.nativeObject.willRemoveSubview = this.onViewRemovedHandler;
  }
  onViewAdded: (view: IView) => void;
  onViewRemoved: (view: IView) => void;
  addChild(view: View): void {
    view.parent = this;
    const uniqueId = view.uniqueId;
    this._children[uniqueId] = view;
    this.nativeObject.addSubview(view.nativeObject);
  }

  // TODO: Make View disposable and move that logic into
  removeChild(view: View) {
    view.nativeObject.removeFromSuperview();
    delete this._children[view.uniqueId];
    view.parent = undefined;
  }

  removeAll() {
    for (const child in this._children) {
      this._children[child].parent = undefined;
      this._children[child].nativeObject.removeFromSuperview();
    }
    this._children = {};
  }

  getChildCount() {
    return Object.keys(this._children).length;
  }

  getChildList() {
    const childList = [];
    for (const i in this._children) {
      childList.push(this._children[i]);
    }
    return childList;
  }

  findChildById(id: string) {
    return getKeyByValue(this._children, id);
  }

  onViewAddedHandler(e: __SF_UIView) {
    const view = this._children[e.subview.uuid];
    this.onViewAdded?.(view);
    this.onChildViewAdded?.(view);
    this.onViewAddedInnerCallback?.(view);
  }

  onViewRemovedHandler(e: __SF_UIView) {
    const view = this._children[e.subview.uuid];
    this.onViewRemoved?.(view);
    this.onChildViewRemoved?.(view);
    this.onViewRemovedInnerCallback?.(view);
  }
}
