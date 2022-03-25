import { ISliderDrawer, SliderDrawerPosition, SliderDrawerState } from './sliderdrawer';
import { SliderDrawerEvents } from './sliderdrawer-events';
import ApplicationAndroid from '../../application/application.android';
import UnitConverter from '../../util/Android/unitconverter';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import ColorAndroid from '../color/color.android';
import FlexLayoutAndroid from '../flexlayout/flexlayout.android';

const NativeDrawerLayout = requireClass('androidx.drawerlayout.widget.DrawerLayout');

export default class SliderDrawerAndroid<TEvent extends string = SliderDrawerEvents, TProps extends ISliderDrawer = ISliderDrawer>
  extends NativeEventEmitterComponent<TEvent | SliderDrawerEvents, any, ISliderDrawer>
  implements ISliderDrawer
{
  private _layout: FlexLayoutAndroid;
  private _position: ISliderDrawer['drawerPosition'];
  private _enabled: boolean;
  private _state: SliderDrawerState;
  private drawerLayoutParams: any;
  drawerListener: any;
  isSliderDrawerAttached = false;
  onShow: () => void | null;
  onHide: () => void | null;
  onLoad: () => void | null;
  constructor(params?: TProps) {
    super(params);
  }
  backgroundColor: ColorAndroid;
  protected init(): void {
    this.drawerLayoutParams = new NativeDrawerLayout.LayoutParams(-1, -1);
    this.drawerLayoutParams.gravity = 3; // Gravity.LEFT

    this.drawerListener = NativeDrawerLayout.DrawerListener.implement({
      onDrawerClosed: (drawerView: any) => {
        this.onHide?.();
        this.emit('hide');
        this._state = SliderDrawerAndroid.State.CLOSED;
      },
      onDrawerOpened: (drawerView: any) => {
        this.onShow?.();
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
    this._layout = new FlexLayoutAndroid();
    this._layout.width = 200;
    this._layout.nativeObject.setLayoutParams(this.drawerLayoutParams);
    this._layout.nativeObject.setFitsSystemWindows(true);
    this._enabled = false;
    this.backgroundColor = new ColorAndroid();
    this._state = SliderDrawerAndroid.State.CLOSED;
  }
  protected createNativeObject() {
    return null;
  }
  show(): void {
    this.isSliderDrawerAttached && this.showSliderDrawer();
  }
  hide(): void {
    this.isSliderDrawerAttached && this.showSliderDrawer();
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
    if (!this.isSliderDrawerAttached) {
      return;
    }

    ApplicationAndroid.drawerLayout.setDrawerLockMode(~~value); // DrawerLayout.LOCK_MODE_UNLOCKED = 0 DrawerLayout.LOCK_MODE_LOCKED_CLOSED = 1
    if (!value && this.state === SliderDrawerAndroid.State.OPEN) {
      this.hideSliderDrawer();
    }
  }
  get layout(): ISliderDrawer['layout'] {
    return this._layout;
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
  private hideSliderDrawer() {
    ApplicationAndroid.drawerLayout.closeDrawer(this.drawerPosition === SliderDrawerAndroid.Position.RIGHT ? 5 : 3);
  }
  private showSliderDrawer() {
    ApplicationAndroid.drawerLayout.openDrawer(this.drawerPosition === SliderDrawerAndroid.Position.RIGHT ? 5 : 3);
  }

  static State = SliderDrawerState;
  static Position = SliderDrawerPosition;
}
