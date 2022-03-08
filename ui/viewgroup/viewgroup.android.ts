import { ViewAndroid } from '../view/view.android';
import { ViewGroupEvents } from './viewgroup-events';
import { IViewGroup } from '.';
import FlexLayout from '../flexlayout';

const NativeRoundRectShape = requireClass('android.graphics.drawable.shapes.RoundRectShape');
const NativeShapeDrawable = requireClass('android.graphics.drawable.ShapeDrawable');
const NativeViewGroup = requireClass('android.view.ViewGroup');

export default class ViewGroupAndroid<TEvent extends string = ViewGroupEvents, TNative extends { [key: string]: any } = { [key: string]: any }, TProps extends IViewGroup = IViewGroup>
  extends ViewAndroid<TEvent | ViewGroupEvents, TNative, TProps>
  implements IViewGroup
{
  static Events = ViewGroupEvents;
  childViews: Record<string, ViewAndroid> = {};

  constructor(params?: Partial<TProps>) {
    super(params);
    if (!this.nativeObject) {
      throw new Error("Can't create instance from ViewGroup. It is an abstract class.");
    }
    this.addAndroidProps({
      requestDisallowInterceptTouchEvent: (disallow) => {
        this.nativeObject.requestDisallowInterceptTouchEvent(disallow);
      }
    });
    this.setHierarchyChangeListener();
  }
  onViewAdded: IViewGroup['onViewAdded'];
  onViewRemoved: IViewGroup['onViewRemoved'];
  updateRippleEffectIfNeeded?: () => void;
  requestDisallowInterceptTouchEvent?(disallow: boolean): void {
    throw new Error('Method not implemented.');
  }

  addChild(view: ViewAndroid) {
    view.parent = this;
    this.childViews[view.id] = view;
    if (this instanceof FlexLayout) {
      this.nativeObject.addView(view.nativeObject, view.android.yogaNode);
    }
  }
  removeChild(view: ViewAndroid) {
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
  toString() {
    return 'ViewGroup';
  }

  private setHierarchyChangeListener() {
    this.nativeObject.setOnHierarchyChangeListener(
      NativeViewGroup.OnHierarchyChangeListener.implement({
        onChildViewAdded: (parent, child) => {
          const childView = this.childViews[child.getId()];
          this.onViewAdded?.(childView);
          this.emit('viewAdded', childView);
        },
        onChildViewRemoved: (parent, child) => {
          const childView = this.childViews[child.getId()];
          this.onViewRemoved?.(childView);
          this.emit('viewRemoved', childView);
        }
      })
    );
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
