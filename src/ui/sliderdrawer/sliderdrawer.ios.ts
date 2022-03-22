import { ISliderDrawer, SliderDrawerPosition, SliderDrawerState } from '.';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import Color from '../color';
import FlexLayoutIOS from '../flexlayout/flexlayout.ios';
import { SliderDrawerEvents } from './sliderdrawer-events';

enum SLIDER_DRAWER_STATE {
  CLOSE,
  DRAGGING,
  OPEN
}

export default class SliderDrawerIOS<TEvent extends string = SliderDrawerEvents> extends NativeEventEmitterComponent<TEvent | SliderDrawerEvents, __SF_SliderDrawer> implements ISliderDrawer {
  protected createNativeObject() {
    const nativeObject = __SF_SliderDrawer.new();
    nativeObject.position = this._position;
    nativeObject.state = 0;
    nativeObject.enabled = this._enabled;
    return nativeObject;
  }
  private _position = 0;
  private _enabled = true;
  private _drawerWidth = 100;
  constructor(params?: Partial<ISliderDrawer>) {
    super(params);

    this.pageView = new FlexLayoutIOS({
      backgroundColor: Color.WHITE
    });

    this.pageView.nativeObject.frame = __SF_UIScreen.mainScreen().bounds;
    this.nativeObject.onViewLoad = () => this.pageView.nativeObject;
    this.nativeObject.onViewLayoutSubviews = () => {
      const screenWidth = __SF_UIScreen.mainScreen().bounds.width;
      this.pageView.nativeObject.frame = {
        x: this.drawerPosition && screenWidth ? screenWidth - this.pageView.nativeObject.frame.width : 0,
        y: 0,
        height: __SF_UIScreen.mainScreen().bounds.height,
        width: this.width
      };

      this.pageView.left = this.pageView.nativeObject.frame.x;
      this.pageView.top = this.pageView.nativeObject.frame.y;
      this.pageView.width = this.pageView.nativeObject.frame.width;
      this.pageView.height = this.pageView.nativeObject.frame.height;

      this.nativeObject.onShow = () => {
        __SF_UIView.animation(0, 0, () => {
          this.layout.nativeObject.endEditing(true);
        });
        this.onShow?.();
        this.emit('show');
      };
      this.nativeObject.onHide = () => {
        __SF_UIView.animation(0, 0, () => {
          this.layout.nativeObject?.endEditing(true);
        });
        this.onHide?.();
        this.emit('hide');
      };
      this.nativeObject.onLoad = () => {
        this.onLoad?.();
        this.emit('load');
      };

      this.pageView.applyLayout();
    };
  }
  pageView: FlexLayoutIOS;
  height: number;
  layout: FlexLayoutIOS;
  get state(): SliderDrawerState {
    const state = this.nativeObject.state;
    switch (state) {
      case SLIDER_DRAWER_STATE.OPEN:
        return SliderDrawerState.OPEN;
      case SLIDER_DRAWER_STATE.CLOSE:
        return SliderDrawerState.CLOSED;
      case SLIDER_DRAWER_STATE.DRAGGING:
        return SliderDrawerState.DRAGGED;
      default:
        return -1;
    }
  }
  get backgroundColor(): ISliderDrawer['backgroundColor'] {
    return this.pageView.backgroundColor as Color;
  }
  set backgroundColor(value: ISliderDrawer['backgroundColor']) {
    this.pageView.backgroundColor = value;
  }
  get drawerPosition(): ISliderDrawer['drawerPosition'] {
    return this._position;
  }
  set drawerPosition(value: ISliderDrawer['drawerPosition']) {
    this._position = value;
    this.nativeObject.position = value;
  }
  get enabled(): ISliderDrawer['enabled'] {
    return this._enabled;
  }
  set enabled(value: ISliderDrawer['enabled']) {
    this._enabled = value;
    this.nativeObject.enabled = value;
  }
  get width(): ISliderDrawer['width'] {
    return this._drawerWidth;
  }
  set width(value: ISliderDrawer['width']) {
    this._drawerWidth = value;
    this.pageView.nativeObject.frame = {
      x: this.pageView.nativeObject.frame.x,
      y: this.pageView.nativeObject.frame.y,
      height: this.pageView.nativeObject.frame.height,
      width: this._drawerWidth
    };
    this.pageView.width = value;
  }

  get onDrag(): () => void {
    return this.nativeObject.onDrag;
  }
  set onDrag(value: () => void) {
    this.nativeObject.onDrag = value;
  }

  onShow: () => void;
  onHide: () => void;
  onLoad: () => void;
  show(): void {
    this.nativeObject.show();
  }
  hide(): void {
    this.nativeObject.hide();
  }
  static Position = SliderDrawerPosition;
  static State = SliderDrawerState;
}
