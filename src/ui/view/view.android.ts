import { Point2D } from '../../primitive/point2d';
import { Rectangle } from '../../primitive/rectangle';
import { ViewEvents } from './view-events';
import { IView, IViewProps, ViewBase } from './view';
import OverScrollMode from '../shared/android/overscrollmode';
import { ScrollViewAlign } from '../scrollview/scrollview';
import { getRippleMask } from '../../helper/getrippleeffect';
import AndroidConfig from '../../util/Android/androidconfig';
import AndroidUnitConverter from '../../util/Android/unitconverter';
import TypeUtil from '../../util/type';
import ColorAndroid from '../color/color.android';
import type ViewGroupAndroid from '../viewgroup/viewgroup.android';
import type ScrollViewAndroid from '../scrollview/scrollview.android';
import { EventListenerCallback } from '../../core/eventemitter';
import { IColor } from '../color/color';

const NativeR = requireClass('android.R');
const NativeView = requireClass('android.view.View');
const NativeYogaNodeFactory = requireClass('com.facebook.yoga.YogaNodeFactory');
const NativeYogaEdge = requireClass('com.facebook.yoga.YogaEdge');
const SFViewUtil = requireClass('io.smartface.android.sfcore.ui.view.SFViewUtil');
const SFOnTouchViewManager = requireClass('io.smartface.android.sfcore.ui.touch.SFOnTouchViewManager');
const NativeColorStateList = requireClass('android.content.res.ColorStateList');
const NativeRippleDrawable = requireClass('android.graphics.drawable.RippleDrawable');
const NativeBuild = requireClass('android.os.Build');

function PixelToDp(px: number) {
  return AndroidUnitConverter.pixelToDp(px);
}

function DpToPixel(dp: number) {
  return AndroidUnitConverter.dpToPixel(dp);
}

// MotionEvent.ACTION_UP
const ACTION_UP = 1;
// MotionEvent.ACTION_DOWN
const ACTION_DOWN = 0;
// MotionEvent.ACTION_MOVE
const ACTION_MOVE = 2;
// MotionEvent.ACTION_CANCEL
const ACTION_CANCEL = 3;

const YogaEdge = {
  LEFT: NativeYogaEdge.LEFT,
  TOP: NativeYogaEdge.TOP,
  RIGHT: NativeYogaEdge.RIGHT,
  BOTTOM: NativeYogaEdge.BOTTOM,
  START: NativeYogaEdge.START,
  END: NativeYogaEdge.END,
  HORIZONTAL: NativeYogaEdge.HORIZONTAL,
  VERTICAL: NativeYogaEdge.VERTICAL,
  ALL: NativeYogaEdge.ALL
};

export default class ViewAndroid<TEvent extends string = ViewEvents, TNative extends { [key: string]: any } = { [key: string]: any }, TProps extends IViewProps = IViewProps>
  extends ViewBase<TEvent, TNative, TProps>
  implements IView<TEvent, TNative, TProps>
{
  static readonly Border = {
    TOP_LEFT: 1 << 0,
    TOP_RIGHT: 1 << 1,
    BOTTOM_RIGHT: 1 << 2,
    BOTTOM_LEFT: 1 << 3,
    ALL: (1 << 0) | (1 << 1) | (1 << 2) | (1 << 3)
  } as const;
  static readonly State = {
    STATE_NORMAL: array([NativeR.attr.state_enabled, -NativeR.attr.state_pressed, -NativeR.attr.state_selected], 'int'),
    STATE_DISABLED: array([-NativeR.attr.state_enabled], 'int'),
    STATE_SELECTED: array([NativeR.attr.state_enabled, NativeR.attr.state_selected], 'int'),
    STATE_PRESSED: array([NativeR.attr.state_pressed, NativeR.attr.state_enabled], 'int'),
    STATE_FOCUSED: array([NativeR.attr.state_focused, NativeR.attr.state_enabled], 'int')
  };
  nativeInner: any;
  uniqueId: string;
  protected _maskedBorders: number[];
  protected _masksToBounds: boolean;
  protected _onTouch: IView['onTouch'];
  protected _onTouchEnded: IView['onTouchEnded'];
  protected _onTouchCancelled: IView['onTouchCancelled'];
  protected _onTouchMoved: IView['onTouchMoved'];
  private _parent?: ViewGroupAndroid;
  private _rotation: number;
  private _rotationX: number;
  private _rotationY: number;
  private _scale: Point2D;
  protected _borderColor: IView['borderColor'];
  protected _borderWidth: number;
  protected _borderRadius: number;
  protected _borderTopLeftRadius: number;
  protected _borderTopRightRadius: number;
  protected _borderBottomRightRadius: number;
  protected _borderBottomLeftRadius: number;
  protected _borderTopStartRadius: number;
  protected _borderTopEndRadius: number;
  protected _borderBottomStartRadius: number;
  protected _borderBottomEndRadius: number;
  protected _backgroundColor: IView['backgroundColor'];
  protected _overScrollMode: OverScrollMode;
  protected didSetTouchHandler: boolean;
  protected _sfOnTouchViewManager: any;
  private _touchEnabled: boolean;
  private _rippleEnabled: boolean;
  private _rippleColor?: IColor;
  private _useForeground: boolean;
  private _bitwiseBorders: number = 0;  
  private _isRTL: boolean;
  yogaNode: any;
  // as { updateRippleEffectIfNeeded: () => void; rippleColor: Color | null; [key: string]: any } & TNative;
  protected createNativeObject() {
    return new NativeView(AndroidConfig.activity);
  }
  protected preConstruct(params?: Partial<TProps>): void {
    if (this.nativeObject?.toString().indexOf('YogaLayout') !== -1) {
      this.yogaNode = this.nativeObject.getYogaNode();
    } else {
      this.yogaNode = NativeYogaNodeFactory.create();
    }
    this._borderColor = ColorAndroid.BLACK;
    this._borderWidth = 0;
    this._borderRadius = 0;
    this._borderBottomLeftRadius = 0;
    this._borderBottomRightRadius = 0;
    this._borderTopLeftRadius = 0;
    this._borderTopRightRadius = 0;
    this._borderTopStartRadius = -1;
    this._borderTopEndRadius = -1;
    this._borderBottomStartRadius = -1;
    this._borderBottomEndRadius = -1;
    this._backgroundColor = ColorAndroid.TRANSPARENT;
    this.didSetTouchHandler = false;
    this._touchEnabled = true;
    this._rippleEnabled = false;
    this._useForeground = false;
    this._overScrollMode = OverScrollMode.ALWAYS;
    this._rotation = 0;
    this._rotationX = 0;
    this._rotationY = 0;
    this._scale = { x: 1.0, y: 1.0 };
    this._masksToBounds = true;
    this._maskedBorders = [ViewAndroid.Border.TOP_LEFT, ViewAndroid.Border.TOP_RIGHT, ViewAndroid.Border.BOTTOM_RIGHT, ViewAndroid.Border.BOTTOM_LEFT];
    this._isRTL = AndroidConfig.activity.getResources().getConfiguration().getLayoutDirection() == 1;
    super.preConstruct(params);

    this.addAndroidProps(this.getAndroidSpecificProps());
    this.nativeObject.setId(NativeView.generateViewId());
    this._sfOnTouchViewManager = new SFOnTouchViewManager();
  }
  constructor(params?: Partial<TProps>) {
    super(params);
  }

  protected getAndroidSpecificProps() {
    const self = this;
    return {
      get yogaNode() {
        return self.yogaNode;
      },
      get rippleEnabled() {
        return self.rippleEnabled;
      },
      set rippleEnabled(value: boolean) {
        self.rippleEnabled = value;
      },
      get useForeground() {
        return self.useForeground;
      },
      set useForeground(value: boolean) {
        self.useForeground = value;
      },
      updateRippleEffectIfNeeded: () => {
        if (self._rippleEnabled && self._rippleColor) {
          self.rippleColor = self._rippleColor;
        }
      },
      get rippleColor() {
        return self.rippleColor;
      },
      set rippleColor(value: IColor | undefined) {
        self.rippleColor = value;
      },
      get zIndex() {
        return self.zIndex;
      },
      set zIndex(index: number) {
        self.zIndex = index;
      },
      get elevation() {
        return self.elevation;
      },
      set elevation(value) {
        self.elevation = value;
      },
      get overScrollMode() {
        return self.overScrollMode;
      },
      set overScrollMode(mode) {
        self.overScrollMode = mode;
      }
    };
  }
  get onTouch() {
    return this._onTouch;
  }
  set onTouch(onTouch) {
    this.setTouchHandlers();
    this._onTouch = onTouch;
  }
  get onTouchEnded() {
    return this._onTouchEnded;
  }
  set onTouchEnded(onTouchEnded) {
    this.setTouchHandlers();
    this._onTouchEnded = onTouchEnded;
  }
  get onTouchMoved() {
    return this._onTouchMoved;
  }
  set onTouchMoved(onTouchMoved) {
    this.setTouchHandlers();
    this._onTouchMoved = onTouchMoved;
  }
  get onTouchCancelled() {
    return this._onTouchCancelled;
  }
  set onTouchCancelled(onTouchCancelled) {
    this.setTouchHandlers();
    this._onTouchCancelled = onTouchCancelled;
  }

  get parent() {
    return this._parent;
  }
  set parent(view: ViewGroupAndroid | undefined) {
    this._parent = view;
  }

  setTouchHandlers() {
    if (this.didSetTouchHandler) {
      return;
    }
    this._sfOnTouchViewManager.setTouchCallbacks(this._touchCallbacks);
    this.nativeObject.setOnTouchListener(this._sfOnTouchViewManager);
    this.didSetTouchHandler = true;
  }

  protected _setBorderToAllEdges() {
    this.yogaNode.setBorder(YogaEdge.ALL, DpToPixel(this.borderWidth) || 0);
  }

  private _setMaskedBorders(bitwiseBorders) {
    const borderRadiuses = Array(8).fill(0);
    for (let i = 0; i < 4; i++) {
      const borderEnum = 1 << i;
      if (bitwiseBorders & borderEnum) {
        bitwiseBorders &= ~borderEnum;
        switch (borderEnum) {
          case ViewAndroid.Border.TOP_LEFT:
            let topStartValue = !this._isRTL ?  this._borderTopStartRadius : this._borderTopEndRadius;
            let topLeftValue: number = (topStartValue != -1) ? topStartValue : this._borderTopLeftRadius;
            borderRadiuses.fill(DpToPixel(topLeftValue), 0, 3);
            break;
          case ViewAndroid.Border.TOP_RIGHT:
            let topEndValue = !this._isRTL ?  this._borderTopEndRadius : this._borderTopStartRadius ;
            let topRightValue: number = topEndValue != -1 ? topEndValue : this._borderTopRightRadius;
            borderRadiuses.fill(DpToPixel(topRightValue), 2, 4);
            break;
          case ViewAndroid.Border.BOTTOM_RIGHT:
            let bottomEndValue = !this._isRTL ?  this._borderBottomEndRadius : this._borderBottomStartRadius;
            let bottomRightValue: number = (bottomEndValue != -1) ? bottomEndValue : this._borderBottomRightRadius;
            borderRadiuses.fill(DpToPixel(bottomRightValue), 4, 6);
            break;
          case ViewAndroid.Border.BOTTOM_LEFT:
            let bottomStartValue = !this._isRTL ?  this._borderBottomStartRadius : this._borderBottomEndRadius;
            let bottomLeftValue: number = (bottomStartValue != -1) ? bottomStartValue  : this._borderBottomLeftRadius;
            borderRadiuses.fill(DpToPixel(bottomLeftValue), 6, 8);
            break;
          default:
            break;
        }
      }
    }
    return borderRadiuses;
  }

  private _resetBackground() {
    //Provide backward support in case of diff behavior of border radius.
    const borderRadiuses = this._setMaskedBorders(this._bitwiseBorders);
    const borderWidth = this.borderWidth ? DpToPixel(this.borderWidth) : 0;
    const borderColorNative = this.borderColor?.nativeObject || ColorAndroid.BLACK.nativeObject;

    const backgroundColor = this.backgroundColor;
    if (backgroundColor instanceof ColorAndroid && backgroundColor.isGradient) {
      const colors = array(backgroundColor.colors, 'int');
      SFViewUtil.setBackground(this.nativeObject, colors, backgroundColor.direction, borderColorNative, borderWidth, array(borderRadiuses, 'float'));
    } else if (backgroundColor instanceof ColorAndroid) {
      SFViewUtil.setBackground(this.nativeObject, backgroundColor.nativeObject, borderColorNative, borderWidth, array(borderRadiuses, 'float'));
    }
  }

  // android
  get zIndex() {
    return SFViewUtil.getZ(this._nativeObject);
  }
  set zIndex(index: number) {
    if (!TypeUtil.isNumeric(index)) throw new Error('zIndex value must be a number.');
    SFViewUtil.setZ(this._nativeObject, index);
  }

  // android
  get elevation() {
    return SFViewUtil.getElevation(this._nativeObject);
  }
  set elevation(value) {
    SFViewUtil.setElevation(this._nativeObject, value);
  }

  aspectRatio: number;
  // android
  get overScrollMode() {
    return this._overScrollMode;
  }
  set overScrollMode(mode) {
    this._nativeObject.setOverScrollMode(mode);
    this._overScrollMode = mode;
  }

  get backgroundColor(): IView['backgroundColor'] {
    return this._backgroundColor;
  }
  set backgroundColor(color: IView['backgroundColor']) {
    this._backgroundColor = color;
    this._resetBackground();
  }

  get testId() {
    if (!AndroidConfig.isEmulator) {
      return AndroidConfig.activity.getResources().getResourceEntryName(this._nativeObject.getId());
    } else {
      return '';
    }
  }
  set testId(value) {
    const id = AndroidConfig.activity.getResourceId(value);
    if (id > 0) {
      this._nativeObject.setId(id);
    }
  }

  get accessible() {
    return this._nativeObject.isImportantForAccessibility();
  }
  set accessible(value) {
    // IMPORTANT_FOR_ACCESSIBILITY_YES = 1,
    // IMPORTANT_FOR_ACCESSIBILITY_NO = 2,
    if (value) {
      this._nativeObject.setImportantForAccessibility(1);
    } else {
      this._nativeObject.setImportantForAccessibility(2);
    }
  }

  get accessibilityLabel() {
    return this._nativeObject.getContentDescription();
  }
  set accessibilityLabel(value) {
    this._nativeObject.setContentDescription(value);
  }
  get borderColor() {
    return this._borderColor;
  }
  set borderColor(value: IColor) {
    this._borderColor = value;
    this._resetBackground();
    this._setBorderToAllEdges();
  }

  get borderWidth() {
    return this._borderWidth;
  }
  set borderWidth(value) {
    this._borderWidth = value;
    this._resetBackground();
    this._setBorderToAllEdges();
    this.requestLayout();
  }

  get borderRadius() {
    return this._borderRadius;
  }

  set borderRadius(value) {
    this._borderRadius = value;
    //Re-set all the border radius properties to override. 
    this._borderBottomLeftRadius = value;
    this._borderBottomStartRadius = -1; 
    this._borderBottomRightRadius = value;
    this._borderBottomEndRadius = -1;
    this._borderTopLeftRadius = value;
    this._borderTopStartRadius = -1;
    this._borderTopRightRadius = value;
    this._borderTopEndRadius = -1;
    this._bitwiseBorders = ViewAndroid.Border.ALL;
    
    this._resetBackground();
    this.android.updateRippleEffectIfNeeded?.();
  }

  get borderBottomLeftRadius() {
   return this._borderBottomLeftRadius;
  }

  set borderBottomLeftRadius(value) {
    this._borderBottomLeftRadius = value;   
    this._bitwiseBorders |= ViewAndroid.Border.BOTTOM_LEFT;

    this._resetBackground();
    this.android.updateRippleEffectIfNeeded?.();
  }
  
  get borderBottomStartRadius() {
    return this._borderBottomStartRadius;
  }
 
  set borderBottomStartRadius(value) {
     this._borderBottomStartRadius = value;   
     this._bitwiseBorders |= !this._isRTL ? ViewAndroid.Border.BOTTOM_LEFT : ViewAndroid.Border.BOTTOM_RIGHT;
 
     this._resetBackground();
     this.android.updateRippleEffectIfNeeded?.();
  }

  get borderBottomRightRadius() {
    return this._borderBottomRightRadius;   
  }

  set borderBottomRightRadius(value) {
    this._borderBottomRightRadius = value;   
    this._bitwiseBorders |= ViewAndroid.Border.BOTTOM_RIGHT;

    this._resetBackground();
    this.android.updateRippleEffectIfNeeded?.();
  }

  get borderBottomEndRadius() {
    return this._borderBottomEndRadius;
  }
 
  set borderBottomEndRadius(value) {
     this._borderBottomEndRadius = value;   
     this._bitwiseBorders |= !this._isRTL ? ViewAndroid.Border.BOTTOM_RIGHT : ViewAndroid.Border.BOTTOM_LEFT;
 
     this._resetBackground();
     this.android.updateRippleEffectIfNeeded?.();
  }

  get borderTopLeftRadius() {
    return this._borderTopLeftRadius;
  }

  set borderTopLeftRadius(value) {
    this._borderTopLeftRadius = value; 
    this._bitwiseBorders |= ViewAndroid.Border.TOP_LEFT;
    
    this._resetBackground();
    this.android.updateRippleEffectIfNeeded?.();
  }

  get borderTopStartRadius() {
    return this._borderTopStartRadius;
  }

  set borderTopStartRadius(value) {
    this._borderTopStartRadius = value; 
    this._bitwiseBorders |= !this._isRTL ? ViewAndroid.Border.TOP_LEFT : ViewAndroid.Border.TOP_RIGHT;
    
    this._resetBackground();
    this.android.updateRippleEffectIfNeeded?.();
  }

  get borderTopRightRadius() {
    return this._borderTopRightRadius; 
  }

  set borderTopRightRadius(value) {
    this._borderTopRightRadius = value;
    this._bitwiseBorders |= ViewAndroid.Border.TOP_RIGHT;

    this._resetBackground();
    this.android.updateRippleEffectIfNeeded?.();
  }

  get borderTopEndRadius() {
    return this._borderTopEndRadius;
  }

  set borderTopEndRadius(value) {
    this._borderTopEndRadius = value; 
    this._bitwiseBorders |= !this._isRTL ?  ViewAndroid.Border.TOP_RIGHT : ViewAndroid.Border.TOP_LEFT;
    
    this._resetBackground();
    this.android.updateRippleEffectIfNeeded?.();
  }
  
  get maskedBorders() {
    return this._maskedBorders;
  }
  set maskedBorders(value) {
    this._maskedBorders = value;
    this._bitwiseBorders = value.reduce((acc, cValue) => acc | cValue, 0);

    this._resetBackground();
    this.android.updateRippleEffectIfNeeded?.();
  }

  get masksToBounds() {
    return this._masksToBounds;
  }
  set masksToBounds(value) {
    this._masksToBounds = value;
    this._nativeObject.setClipToOutline(this._masksToBounds);
  }

  protected get _touchCallbacks() {
    return {
      onTouch: (x: number, y: number) => {
        const mEvent = {
          x,
          y
        };
        this.emit('touch', mEvent);
        const result = this.onTouch?.(mEvent);
        return result !== false;
      },
      onTouchEnded: (isInside: boolean, x: number, y: number) => {
        const mEvent = {
          x,
          y,
          isInside
        };
        const result = this.onTouchEnded?.(isInside, mEvent);
        this.emit('touchEnded', mEvent);
        return !!result;
      },
      onTouchMoved: (isInside: boolean, x: number, y: number) => {
        const mEvent = {
          x,
          y,
          isInside
        };
        this.emit('touchMoved', mEvent);
        const result = this.onTouchMoved?.(isInside, mEvent);
        return !!result;
      },
      onTouchCancelled: (x: number, y: number) => {
        const mEvent = {
          x,
          y
        };
        this.emit('touchCancelled', mEvent);
        const result = this.onTouchCancelled?.(mEvent);
        return !!result;
      }
    };
  }

  get transitionId() {
    return SFViewUtil.getTransitionName(this.nativeObject);
  }
  set transitionId(id) {
    SFViewUtil.setTransitionName(this.nativeObject, id);
  }
  get alpha() {
    // Avoiding integer-float conflics of engine
    return this._nativeObject.getAlpha();
  }
  set alpha(alpha) {
    // Avoiding integer-float conflics of engine
    this._nativeObject.setAlpha(float(alpha));
  }
  get id() {
    return this._nativeObject.getId();
  }
  set id(id) {
    if (typeof id === 'number' && !isNaN(id)) {
      this._nativeObject.setId(id);
    }
  }
  get rotation() {
    return this._nativeObject.getRotation();
  }
  set rotation(value) {
    if (TypeUtil.isNumeric(value)) {
      this._nativeObject.setRotation(value);
    }
  }
  get rotationX() {
    return this._nativeObject.getRotationX();
  }
  set rotationX(value) {
    if (TypeUtil.isNumeric(value)) {
      this._nativeObject.setRotationX(value);
    }
  }
  get rotationY() {
    return this._nativeObject.getRotationY();
  }
  set rotationY(value) {
    if (TypeUtil.isNumeric(value)) {
      this._nativeObject.setRotationY(value);
    }
  }
  get scaleX() {
    return this._nativeObject.getScaleX();
  }
  set scaleX(value) {
    if (TypeUtil.isNumeric(value)) {
      this._nativeObject.setScaleX(value);
    }
  }
  get scale() {
    return {
      x: this._nativeObject.getScaleX(),
      y: this._nativeObject.getScaleY()
    };
  }
  set scale(value) {
    if (TypeUtil.isObject(value)) {
      value.x !== undefined && this._nativeObject.setScaleX(value.x);
      value.y !== undefined && this._nativeObject.setScaleY(value.y);
    }
  }
  get scaleY() {
    return this._nativeObject.getScaleY();
  }
  set scaleY(value) {
    if (TypeUtil.isNumeric(value)) {
      this._nativeObject.setScaleY(value);
    }
  }
  get enabled() {
    return this._nativeObject.isEnabled();
  }
  set enabled(enabled) {
    if (TypeUtil.isBoolean(enabled)) {
      this._nativeObject.setEnabled(enabled);
    }
  }
  get touchEnabled() {
    return this._touchEnabled;
  }
  set touchEnabled(value) {
    this._touchEnabled = value;
    this._sfOnTouchViewManager.setTouchEnabled(value);
  }
  get visible() {
    // View.VISIBLE is 0
    return this._nativeObject.getVisibility() === 0;
  }
  set visible(visible) {
    if (visible)
      // View.VISIBLE is 0
      this._nativeObject.setVisibility(0);
    // View.INVISIBLE is 4
    else this._nativeObject.setVisibility(4);
  }
  getScreenLocation() {
    const location = toJSArray(SFViewUtil.getLocationOnScreen(this.nativeObject));
    const position: Point2D = {};
    position.x = PixelToDp(location[0]);
    position.y = PixelToDp(location[1]);
    return position;
  }
  bringToFront() {
    this._nativeObject.bringToFront();
  }
  flipHorizontally() {
    const currentScale = this.scaleX;
    this._nativeObject.setScaleX(-currentScale);
  }
  flipVertically() {
    const currentScale = this.scaleY;
    this._nativeObject.setScaleY(-currentScale);
  }
  getParent() {
    return this._parent ? this._parent : null;
  }
  getPosition() {
    return {
      width: this.width,
      height: this.height,
      top: this.top,
      left: this.left
    };
  }
  setPosition(position: Rectangle) {
    position.top && (this.top = position.top);
    position.left && (this.left = position.left);
    position.width && (this.width = position.width);
    position.height && (this.height = position.height);
  }
  requestLayout(invalidate?: Boolean) {
    this.nativeObject.requestLayout();
    if(invalidate)
        this.nativeObject.invalidate();
  }
  applyLayout() {
    this._nativeObject.requestLayout();
    this._nativeObject.invalidate();
  }
  toString() {
    return 'View';
  }
  get left() {
    return PixelToDp(this._nativeObject.getLeft());
  }
  set left(left) {
    this.yogaNode.setPosition(YogaEdge.LEFT, DpToPixel(left));
    this.requestLayout();
  }
  get top() {
    return PixelToDp(this._nativeObject.getTop());
  }
  set top(top) {
    this.yogaNode.setPosition(YogaEdge.TOP, DpToPixel(top));
    this.requestLayout();
  }
  get right() {
    return PixelToDp(this.yogaNode.getPosition(YogaEdge.RIGHT).value);
  }
  set right(right) {
    this.yogaNode.setPosition(YogaEdge.RIGHT, DpToPixel(right));
    this.requestLayout();
  }
  get bottom() {
    return PixelToDp(this.yogaNode.getPosition(YogaEdge.BOTTOM).value);
  }
  set bottom(bottom) {
    this.yogaNode.setPosition(YogaEdge.BOTTOM, DpToPixel(bottom));
    this.requestLayout();
  }
  get positionStart() {
    return PixelToDp(this.yogaNode.getPosition(YogaEdge.START).value);
  }
  set positionStart(start) {
    this.yogaNode.setPosition(YogaEdge.START, DpToPixel(start));
    this.requestLayout();
  }
  get end() {
    return PixelToDp(this.yogaNode.getPosition(YogaEdge.END).value);
  }
  set end(end) {
    this.yogaNode.setPosition(YogaEdge.END, DpToPixel(end));
    this.requestLayout();
  }
  get height() {
    return PixelToDp(this.yogaNode.getHeight());
  }
  set height(height) {
    this.yogaNode.setHeight(DpToPixel(height));
    // To sove AND-2693. We should give -2 to the bound for not stretching when user set height.
    // TODO: Find another way to do this
    if (this._parent?.constructor.name === 'ScrollViewAndroid' && (this._parent as ScrollViewAndroid).align === ScrollViewAlign.VERTICAL) {
      const layoutParams = this._nativeObject.getLayoutParams();
      layoutParams && (layoutParams.height = -2);
    }
    this.requestLayout();
  }
  get width() {
    return PixelToDp(this.yogaNode.getWidth());
  }
  set width(width) {
    this.yogaNode.setWidth(DpToPixel(width));

    // To sove AND-2693. We should give -2 to the bound for not stretching when user set height.
    // TODO: Find another way to do this
    if (this._parent?.constructor.name === 'ScrollViewAndroid' && (this._parent as ScrollViewAndroid).align === ScrollViewAlign.VERTICAL) {
      const layoutParams = this._nativeObject.getLayoutParams();
      if (layoutParams) {
        layoutParams.width = -2;
      }
    }
    this.requestLayout();
  }
  get minWidth() {
    return PixelToDp(this.yogaNode.getMinWidth().value);
  }
  set minWidth(minWidth) {
    this.yogaNode.setMinWidth(DpToPixel(minWidth));
    this.requestLayout();
  }
  get minHeight() {
    return PixelToDp(this.yogaNode.getMinHeight().value);
  }
  set minHeight(minHeight) {
    this.yogaNode.setMinHeight(DpToPixel(minHeight));
    this.requestLayout();
  }
  get maxWidth() {
    return PixelToDp(this.yogaNode.getMaxWidth().value);
  }
  set maxWidth(maxWidth) {
    this.yogaNode.setMaxWidth(DpToPixel(maxWidth));
    this.requestLayout();
  }
  get maxHeight() {
    return PixelToDp(this.yogaNode.getMaxHeight().value);
  }
  set maxHeight(maxHeight) {
    this.yogaNode.setMaxHeight(DpToPixel(maxHeight));
    this.requestLayout();
  }
  get paddingTop() {
    return PixelToDp(this.yogaNode.getPadding(YogaEdge.TOP).value);
  }
  set paddingTop(paddingTop) {
    this.yogaNode.setPadding(YogaEdge.TOP, DpToPixel(paddingTop));
    this.requestLayout();
  }
  get paddingBottom() {
    return PixelToDp(this.yogaNode.getPadding(YogaEdge.BOTTOM).value);
  }
  set paddingBottom(paddingBottom) {
    this.yogaNode.setPadding(YogaEdge.BOTTOM, DpToPixel(paddingBottom));
    this.requestLayout();
  }
  get paddingStart() {
    return PixelToDp(this.yogaNode.getPadding(YogaEdge.START).value);
  }
  set paddingStart(paddingStart) {
    this.yogaNode.setPadding(YogaEdge.START, DpToPixel(paddingStart));
    this.requestLayout();
  }
  get paddingEnd() {
    return PixelToDp(this.yogaNode.getPadding(YogaEdge.END).value);
  }
  set paddingEnd(paddingEnd) {
    this.yogaNode.setPadding(YogaEdge.END, DpToPixel(paddingEnd));
    this.requestLayout();
  }
  get paddingLeft() {
    return PixelToDp(this.yogaNode.getPadding(YogaEdge.LEFT).value);
  }
  set paddingLeft(paddingLeft) {
    this.yogaNode.setPadding(YogaEdge.LEFT, DpToPixel(paddingLeft));
    this.requestLayout();
  }
  get paddingRight() {
    return PixelToDp(this.yogaNode.getPadding(YogaEdge.RIGHT).value);
  }
  set paddingRight(paddingRight) {
    this.yogaNode.setPadding(YogaEdge.RIGHT, DpToPixel(paddingRight));
    this.requestLayout();
  }
  get paddingHorizontal() {
    return PixelToDp(this.yogaNode.getPadding(YogaEdge.HORIZONTAL).value);
  }
  set paddingHorizontal(paddingHorizontal) {
    this.yogaNode.setPadding(YogaEdge.HORIZONTAL, DpToPixel(paddingHorizontal));
    this.requestLayout();
  }
  get paddingVertical() {
    return PixelToDp(this.yogaNode.getPadding(YogaEdge.VERTICAL).value);
  }
  set paddingVertical(paddingVertical) {
    this.yogaNode.setPadding(YogaEdge.VERTICAL, DpToPixel(paddingVertical));
    this.requestLayout();
  }
  get padding() {
    return PixelToDp(this.yogaNode.getPadding(YogaEdge.ALL).value);
  }
  set padding(padding) {
    this.yogaNode.setPadding(YogaEdge.ALL, DpToPixel(padding));
    this.requestLayout();
  }
  get marginTop() {
    return PixelToDp(this.yogaNode.getMargin(YogaEdge.TOP).value);
  }
  set marginTop(marginTop) {
    this.yogaNode.setMargin(YogaEdge.TOP, DpToPixel(marginTop));
    this.requestLayout();
  }
  get marginBottom() {
    return PixelToDp(this.yogaNode.getMargin(YogaEdge.BOTTOM).value);
  }
  set marginBottom(marginBottom) {
    this.yogaNode.setMargin(YogaEdge.BOTTOM, DpToPixel(marginBottom));
    this.requestLayout();
  }
  get marginStart() {
    return PixelToDp(this.yogaNode.getMargin(YogaEdge.START).value);
  }
  set marginStart(marginStart) {
    this.yogaNode.setMargin(YogaEdge.START, DpToPixel(marginStart));
    this.requestLayout();
  }
  get marginEnd() {
    return PixelToDp(this.yogaNode.getMargin(YogaEdge.END).value);
  }
  set marginEnd(marginEnd) {
    this.yogaNode.setMargin(YogaEdge.END, DpToPixel(marginEnd));
    this.requestLayout();
  }
  get marginLeft() {
    return PixelToDp(this.yogaNode.getMargin(YogaEdge.LEFT).value);
  }
  set marginLeft(marginLeft) {
    this.yogaNode.setMargin(YogaEdge.LEFT, DpToPixel(marginLeft));
    this.requestLayout();
  }
  get marginRight() {
    return PixelToDp(this.yogaNode.getMargin(YogaEdge.RIGHT).value);
  }
  set marginRight(marginRight) {
    this.yogaNode.setMargin(YogaEdge.RIGHT, DpToPixel(marginRight));
    this.requestLayout();
  }
  get marginHorizontal() {
    return PixelToDp(this.yogaNode.getMargin(YogaEdge.HORIZONTAL).value);
  }
  set marginHorizontal(marginHorizontal) {
    this.yogaNode.setMargin(YogaEdge.HORIZONTAL, DpToPixel(marginHorizontal));
    this.requestLayout();
  }
  get marginVertical() {
    return PixelToDp(this.yogaNode.getMargin(YogaEdge.VERTICAL).value);
  }
  set marginVertical(marginVertical) {
    this.yogaNode.setMargin(YogaEdge.VERTICAL, DpToPixel(marginVertical));
    this.requestLayout();
  }
  get margin() {
    return PixelToDp(this.yogaNode.getMargin(YogaEdge.ALL).value);
  }
  set margin(margin) {
    this.yogaNode.setMargin(YogaEdge.ALL,  DpToPixel(margin));
    this.requestLayout();
  }
  get borderTopWidth() {
    return PixelToDp(this.yogaNode.getBorder(YogaEdge.TOP).value);
  }
  set borderTopWidth(borderTopWidth) {
    this.yogaNode.setBorder(YogaEdge.TOP, DpToPixel(borderTopWidth));
  }
  get borderBottomWidth() {
    return PixelToDp(this.yogaNode.getBorder(YogaEdge.BOTTOM).value);
  }
  set borderBottomWidth(borderBottomWidth) {
    this.yogaNode.setBorder(YogaEdge.BOTTOM, DpToPixel(borderBottomWidth));
  }
  get borderStartWidth() {
    return PixelToDp(this.yogaNode.getBorder(YogaEdge.START).value);
  }
  set borderStartWidth(borderStartWidth) {
    this.yogaNode.setBorder(YogaEdge.START, DpToPixel(borderStartWidth));
  }
  get borderEndWidth() {
    return PixelToDp(this.yogaNode.getBorder(YogaEdge.END).value);
  }
  set borderEndWidth(borderEndWidth) {
    this.yogaNode.setBorder(YogaEdge.END, DpToPixel(borderEndWidth));
  }
  get borderLeftWidth() {
    return PixelToDp(this.yogaNode.getBorder(YogaEdge.LEFT).value);
  }
  set borderLeftWidth(borderLeftWidth) {
    this.yogaNode.setBorder(YogaEdge.LEFT, DpToPixel(borderLeftWidth));
  }
  get borderRightWidth() {
    return PixelToDp(this.yogaNode.getBorder(YogaEdge.RIGHT).value);
  }
  set borderRightWidth(borderRightWidth) {
    this.yogaNode.setBorder(YogaEdge.RIGHT, DpToPixel(borderRightWidth));
  }
  get flexGrow() {
    return this.yogaNode.getFlexGrow();
  }
  set flexGrow(flexGrow) {
    this.yogaNode.setFlexGrow(flexGrow);
    if (flexGrow > 0) {
      this.flexBasis = 1;
    } else {
      this.flexBasis = NaN;
    }
    this.requestLayout();
  }
  get flexShrink() {
    return this.yogaNode.getFlexShrink();
  }
  set flexShrink(flexShrink) {
    this.yogaNode.setFlexShrink(flexShrink);
    this.requestLayout();
  }
  get flexBasis() {
    return this.yogaNode.getFlexBasis().value;
  }
  set flexBasis(flexBasis) {
    this.yogaNode.setFlexBasis(flexBasis);
    this.requestLayout();
  }
  get alignSelf() {
    return this.yogaNode.getAlignSelf();
  }
  set alignSelf(alignSelf) {
    this.yogaNode.setAlignSelf(alignSelf);
    this.requestLayout();
  }
  get positionType() {
    return this.yogaNode.getPositionType();
  }
  set positionType(position) {
    this.yogaNode.setPositionType(position);
    this.requestLayout();
  }
  dirty() {
    if(this.yogaNode.isMeasureDefined())
        this.yogaNode.dirty();
  }
  // Ripple Effect
  get rippleEnabled() {
    return this._rippleEnabled;
  }
  set rippleEnabled(value) {
    this._rippleEnabled = value;
    if (this.rippleEnabled) {
      this.nativeObject.setClickable(true);
    }
  }
  get useForeground() {
    return this._useForeground;
  }
  set useForeground(value) {
    this._useForeground = value;
  }
  get rippleColor() {
    return this._rippleColor;
  }
  set rippleColor(value: IColor | undefined) {
    this._rippleColor = value;
    this.rippleEnabled = true; //If user sets rippleColor, always set rippleenabled to true. They can set to false if needed.
    if (this._rippleColor && this.rippleEnabled && AndroidConfig.sdkVersion >= AndroidConfig.SDK.SDK_LOLLIPOP) {
      const states = array([array([], 'int')]);
      const colors = array([this._rippleColor.nativeObject], 'int');
      const colorStateList = new NativeColorStateList(states, colors);

      const mask = getRippleMask(DpToPixel(this.borderRadius));
      /*
      Only supported for api level 23 and above
      */
      const currentBackground = this.nativeObject.getForeground();
      const rippleDrawableForegorund = new NativeRippleDrawable(colorStateList, currentBackground, mask);
      this.nativeObject.setForeground(rippleDrawableForegorund);
    }
  }
  // End of Ripple Effect
  get shadowColor() {
    if (NativeBuild.VERSION.SDK_INT >= 28) {
      return new ColorAndroid({ color: this.nativeObject.getOutlineSpotShadowColor() });
    }
    return ColorAndroid.BLACK;
  }
  set shadowColor(shadowColor: IColor) {
    if (NativeBuild.VERSION.SDK_INT >= 28) {
      this.nativeObject.setOutlineAmbientShadowColor(shadowColor.nativeObject)
      this.nativeObject.setOutlineSpotShadowColor(shadowColor.nativeObject)
    }
  }

  on(eventName: any, callback: EventListenerCallback) {
    if (Object.values(ViewEvents).includes(eventName)) {
      this.setTouchHandlers();
    }
    return super.on(eventName, callback);
  }
}
