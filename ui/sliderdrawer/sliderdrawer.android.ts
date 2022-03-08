import { ISliderDrawer, SliderDrawerPosition, SliderDrawerState } from '.';
import { IFlexLayout } from '../../primitive/iflexlayout';
import { SliderDrawerEvents } from './sliderdrawer-events';
import Application from '../../application';
import { UnitConverter } from '../../util';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import Color from '../color';

const NativeDrawerLayout = requireClass('androidx.drawerlayout.widget.DrawerLayout');

export default class SliderDrawerAndroid<TEvent extends string = SliderDrawerEvents> extends NativeEventEmitterComponent<TEvent | SliderDrawerEvents> implements ISliderDrawer {
  private _layout: IFlexLayout;
  private _position;
  private _onShow;
  private _onHide;
  private _onLoad;
  __isAttached = false;
  private _enabled = true;
  private _state = SliderDrawerAndroid.State.CLOSED;
  private drawerLayoutParams: any;
  drawerListener: any;
  constructor(params: Partial<ISliderDrawer> = {}) {
    super();
    const { ...restParams } = params;
    this.drawerLayoutParams = new NativeDrawerLayout.LayoutParams(-1, -1);
    this.drawerLayoutParams.gravity = 3; // Gravity.LEFT

    this.drawerListener = NativeDrawerLayout.DrawerListener.implement({
      onDrawerClosed: (drawerView: any) => {
        this._onHide?.();
        this.emit('hide');
        this._state = SliderDrawerAndroid.State.CLOSED;
      },
      onDrawerOpened: (drawerView: any) => {
        this._onShow?.();
        this.emit('show');
        this._state = SliderDrawerAndroid.State.OPEN;
      },
      onDrawerSlide: (drawerView, slideOffset) => {},
      onDrawerStateChanged: (newState: number) => {
        if (newState === 1) {
          // STATE_DRAGGING
          this._state = SliderDrawerAndroid.State.DRAGGED;
        }
      }
    });

    // setting default values
    this.width = 200;
    this.layout.nativeObject.setLayoutParams(this.drawerLayoutParams);
    this.layout.nativeObject.setFitsSystemWindows(true);

    Object.assign(this, restParams);
  }
  backgroundColor: Color = new Color();
  show(): void {
    this.__isAttached && this.__showSliderDrawer();
  }
  hide(): void {
    this.__isAttached && this.__showSliderDrawer();
  }
  toString() {
    return 'SliderDrawer';
  }
  get state(): ISliderDrawer['state'] {
    return this._state;
  }
  get drawerPosition(): ISliderDrawer['drawerPosition'] {
    return this._position;
  }
  set drawerPosition(value: ISliderDrawer['drawerPosition']) {
    this._position = value;
    this.drawerLayoutParams.gravity = value === SliderDrawerAndroid.Position.RIGHT ? 5 /*Gravity.RIGHT*/ : 3; /* Gravity.LEFT*/
    this.layout.nativeObject.setLayoutParams(this.drawerLayoutParams);
  }
  get enabled(): ISliderDrawer['enabled'] {
    return this._enabled;
  }
  set enabled(value: ISliderDrawer['enabled']) {
    this._enabled = value;
    if (!this.__isAttached) return;

    Application.__mDrawerLayout.setDrawerLockMode(~~value); // DrawerLayout.LOCK_MODE_UNLOCKED = 0 DrawerLayout.LOCK_MODE_LOCKED_CLOSED = 1
    !value && this.state === SliderDrawerAndroid.State.OPEN && this.__hideSliderDrawer();
  }
  get layout(): ISliderDrawer['layout'] {
    return this._layout;
  }
  get onShow(): ISliderDrawer['onShow'] {
    return this._onShow;
  }
  set onShow(value: ISliderDrawer['onShow']) {
    this._onShow = value;
  }
  get onLoad(): ISliderDrawer['onLoad'] {
    return this._onLoad;
  }
  set onLoad(value: ISliderDrawer['onLoad']) {
    this._onLoad = value;
  }
  get onHide(): ISliderDrawer['onHide'] {
    return this._onHide;
  }
  set onHide(value: ISliderDrawer['onHide']) {
    this._onHide = value;
  }
  get height(): ISliderDrawer['height'] {
    // Added due to using DrawerLayout as a parent
    return UnitConverter.pixelToDp(this.drawerLayoutParams.height);
  }
  set height(value: ISliderDrawer['height']) {
    // Added due to using DrawerLayout as a parent
    this.drawerLayoutParams.height = UnitConverter.dpToPixel(value);
  }
  get width(): ISliderDrawer['width'] {
    // Added due to using DrawerLayout as a parent
    return UnitConverter.pixelToDp(this.drawerLayoutParams.width);
  }
  set width(value: ISliderDrawer['width']) {
    // Added due to using DrawerLayout as a parent
    this.drawerLayoutParams.width = UnitConverter.dpToPixel(value);
  }
  private __hideSliderDrawer() {
    Application.__mDrawerLayout.closeDrawer(this.drawerPosition === SliderDrawerAndroid.Position.RIGHT ? 5 : 3);
  }
  private __showSliderDrawer() {
    Application.__mDrawerLayout.openDrawer(this.drawerPosition === SliderDrawerAndroid.Position.RIGHT ? 5 : 3);
  }

  static State = SliderDrawerState;
  static Position = SliderDrawerPosition;
}
