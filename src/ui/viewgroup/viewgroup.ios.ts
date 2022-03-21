import { IViewGroup } from '.';
import { ExtractEventValues } from '../../core/eventemitter/extract-event-values';
import { IView } from '../view';
import ViewIOS from '../view/view.ios';
import { ViewGroupEvents } from './viewgroup-events';

/**
 * @class UI.ViewGroup
 * @since 0.1
 * @extends View
 * A ViewGroup is a special view that can contain other views (called children) like layouts and views.
 * ViewGroup is an abstract class. You can't create instance from it.
 */
// ViewGroup.prototype = Object.create(View.prototype);
export default class ViewGroupIOS<TEvent extends string = ViewGroupEvents, TNative extends { [key: string]: any } = { [key: string]: any }, TProps extends IViewGroup = IViewGroup>
  extends ViewIOS<ViewGroupEvents | ExtractEventValues<TEvent>, TNative, TProps>
  implements IViewGroup
{
  private _children: Record<string, IView> = {};
  onChildViewAdded: IViewGroup['onViewAdded'];
  onChildViewRemoved: IViewGroup['onViewRemoved'];
  constructor(params?: Partial<TProps>) {
    super(params);
    this.nativeObject.didAddSubview = (e: __SF_UIView) => {
      const view = this._children[e.subview.uuid];
      if (view) {
        this.onViewAdded?.(view);
        this.onChildViewAdded?.(view);
      }
    };
    this.nativeObject.willRemoveSubview = (e: __SF_UIView) => {
      const view = this._children[e.subview.uuid];
      if (view) {
        this.onViewRemoved?.(view);
        this.onChildViewRemoved?.(view);
      }
    };
  }
  onViewAdded: (view: IView) => void;
  onViewRemoved: (view: IView) => void;
  addChild(view: IView): void {
    view.parent = this;
    const uniqueId = view.uniqueId;
    this._children[uniqueId] = view;
    this.nativeObject.addSubview(view.nativeObject);
  }

  // TODO: Make View disposable and move that logic into
  removeChild(view: ViewIOS) {
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
    return Object.values(this._children);
  }

  findChildById(id: string) {
    for (const prop in this._children) {
      if (this._children[prop].id === id) {
        return this._children[prop];
      }
    }
  }
}
