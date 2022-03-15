/*globals array, requireClass, toJSArray */
import { Point2D } from '../../primitive/point2d';
import { Rectangle } from '../../primitive/rectangle';
import Color from '../color';
import { ViewEvents } from './view-event';
import { EventEmitterWrapper } from '../../core/eventemitter';
import View, { IView, IViewProps, ViewBase } from '.';
import OverScrollMode from '../shared/android/overscrollmode';
import ScrollView, { ScrollViewAlign } from '../scrollview';
import { getRippleMask } from '../../helper/getrippleeffect';
import AndroidConfig from '../../util/Android/androidconfig';
import AndroidUnitConverter from '../../util/Android/unitconverter';
import TypeUtil from '../../util/type';

const NativeR = requireClass('android.R');
const NativeView = requireClass('android.view.View');
const NativeYogaNodeFactory = requireClass('com.facebook.yoga.YogaNodeFactory');
const NativeYogaEdge = requireClass('com.facebook.yoga.YogaEdge');
const SFViewUtil = requireClass('io.smartface.android.sfcore.ui.view.SFViewUtil');
const SFOnTouchViewManager = requireClass('io.smartface.android.sfcore.ui.touch.SFOnTouchViewManager');

const LOLLIPOP_AND_LATER = AndroidConfig.sdkVersion >= AndroidConfig.SDK.SDK_LOLLIPOP;

const EventFunctions = {
  [ViewEvents.Touch]: function () {
    this._onTouch = EventEmitterWrapper(this, ViewEvents.Touch, null);
  },
  [ViewEvents.TouchCancelled]: function () {
    this._onTouchCancelled = EventEmitterWrapper(this, ViewEvents.TouchCancelled, null);
  },
  [ViewEvents.TouchEnded]: function () {
    this._onTouchEnded = EventEmitterWrapper(this, ViewEvents.TouchEnded, null);
  },
  [ViewEvents.TouchMoved]: function () {
    this._onTouchMoved = EventEmitterWrapper(this, ViewEvents.TouchMoved, null);
  }
};

function PixelToDp(px) {
  return AndroidUnitConverter.pixelToDp(px);
}

function DpToPixel(dp) {
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

const activity = AndroidConfig.activity;

export class ViewAndroid<TEvent extends string = ViewEvents, TNative extends { [key: string]: any } = { [key: string]: any }, TProps extends IViewProps = IViewProps>
  extends ViewBase<TEvent, TNative, TProps>
  implements IView
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
  protected _maskedBorders = [];
  protected _masksToBounds: boolean = true;
  private _parent?: View;
  private _rotation: number = 0;
  private _rotationX: number = 0;
  private _rotationY: number = 0;
  private _scale: Point2D = {
    x: 1.0,
    y: 1.0
  };
  protected _borderColor: Color;
  protected _borderWidth: number;
  protected _borderRadius: number;
  protected _backgroundColor: IView['backgroundColor'] = Color.TRANSPARENT;
  protected _overScrollMode: OverScrollMode = OverScrollMode.ALWAYS;
  private didSetTouchHandler = false;
  private _sfOnTouchViewManager: any;
  private _touchEnabled: boolean = false;
  private _rippleEnabled = false;
  private _rippleColor?: Color;
  private _useForeground = false;
  protected yogaNode: any;
  // as { updateRippleEffectIfNeeded: () => void; rippleColor: Color | null; [key: string]: any } & TNative;

  constructor(params?: Partial<TProps>) {
    super(params);
    // params = params || {};
    if (!this._nativeObject) {
      this._nativeObject = new NativeView(activity);
      this.yogaNode = NativeYogaNodeFactory.create();
    } else {
      if (this._nativeObject.toString().indexOf('YogaLayout') !== -1) {
        this.yogaNode = this._nativeObject.getYogaNode();
      } else {
        this.yogaNode = NativeYogaNodeFactory.create();
      }
    }

    this._nativeObject.setId(NativeView.generateViewId());

    // // Assign parameters given in constructor
    // if (params) {
    //   for (var param in params) {
    //     this[param] = params[param];
    //   }
    // }
    this._sfOnTouchViewManager = new SFOnTouchViewManager();
    this.setTouchHandlers();

    const self = this;

    this.addAndroidProps({
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
        this._rippleEnabled && this._rippleColor && (this.android.rippleColor = this._rippleColor);
      },
      get rippleColor() {
        return self.rippleColor;
      },
      set rippleColor(value: Color | undefined) {
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
    });
  }

  get parent() {
    return this._parent;
  }
  set parent(view: View | undefined) {
    this._parent = view;
  }

  private setTouchHandlers() {
    if (this.didSetTouchHandler) return;
    const touchableView = this.nativeInner || this.nativeObject;
    this._sfOnTouchViewManager.setTouchCallbacks(this._touchCallbacks);
    touchableView.setOnTouchListener(this._sfOnTouchViewManager);
    this.didSetTouchHandler = true;
  }

  //TODO: Didn't delete these func to not broke backward. Setting border to all edges won't work as expected. Be aware for future Yoga upgrade.
  protected _setBorderToAllEdges() {
    let borderWidthPx = DpToPixel(this.borderWidth);
    if (!borderWidthPx) borderWidthPx = 0; // NaN, undefined etc.
    this.yogaNode.setBorder(YogaEdge.LEFT, borderWidthPx);
    this.yogaNode.setBorder(YogaEdge.RIGHT, borderWidthPx);
    this.yogaNode.setBorder(YogaEdge.TOP, borderWidthPx);
    this.yogaNode.setBorder(YogaEdge.BOTTOM, borderWidthPx);
  }

  private _setMaskedBorders(bitwiseBorders) {
    const borderRadiusInDp = DpToPixel(this.borderRadius);
    const borderRadiuses = Array(8).fill(0);
    for (let i = 0; i < 4; i++) {
      const borderEnum = 1 << i;
      if (bitwiseBorders & borderEnum) {
        bitwiseBorders &= ~borderEnum;
        switch (borderEnum) {
          case ViewAndroid.Border.TOP_LEFT:
            borderRadiuses.fill(borderRadiusInDp, 0, 3);
            break;
          case ViewAndroid.Border.TOP_RIGHT:
            borderRadiuses.fill(borderRadiusInDp, 2, 4);
            break;
          case ViewAndroid.Border.BOTTOM_RIGHT:
            borderRadiuses.fill(borderRadiusInDp, 4, 6);
            break;
          case ViewAndroid.Border.BOTTOM_LEFT:
            borderRadiuses.fill(borderRadiusInDp, 6, 8);
            break;
          default:
            break;
        }
      }
    }
    return borderRadiuses;
  }
  private _resetBackground = function () {
    const color = this.backgroundColor;
    const bitwiseBorders = this.maskedBorders.reduce((acc, cValue) => acc | cValue, 0);
    //Provide backward support in case of diff behavior of border radius.
    const borderRadiuses = bitwiseBorders !== ViewAndroid.Border.ALL ? this._setMaskedBorders(bitwiseBorders) : [DpToPixel(this.borderRadius)];
    const borderWidth = this.borderWidth ? DpToPixel(this.borderWidth) : 0;
    const borderColor = this.borderColor.nativeObject;
    const backgroundColor = this.backgroundColor.nativeObject;

    if (color.isGradient) {
      const colors = array(color.colors, 'int');
      SFViewUtil.setBackground(this.nativeObject, colors, color.direction, borderColor, borderWidth, array(borderRadiuses, 'float'));
    } else {
      SFViewUtil.setBackground(this.nativeObject, backgroundColor, borderColor, borderWidth, array(borderRadiuses, 'float'));
    }
  };

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
      return activity.getResources().getResourceEntryName(this._nativeObject.getId());
    } else {
      return '';
    }
  }
  set testId(value) {
    const id = activity.getResourceId(value);
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
  set borderColor(value: Color) {
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
  }

  get borderRadius() {
    return this._borderRadius;
  }

  set borderRadius(value) {
    this._borderRadius = value;
    this._resetBackground();
    this.android.updateRippleEffectIfNeeded && this.android.updateRippleEffectIfNeeded();
  }

  get maskedBorders() {
    return this._maskedBorders;
  }
  set maskedBorders(value) {
    this._maskedBorders = value;
    this._resetBackground();
    this.android.updateRippleEffectIfNeeded && this.android.updateRippleEffectIfNeeded();
  }

  get masksToBounds() {
    return this._masksToBounds;
  }
  set masksToBounds(value) {
    this._masksToBounds = value;
    this._nativeObject.setClipToOutline(this._masksToBounds);
  }

  private _touchCallbacks = {
    onTouchEnded: (isInside: boolean, x: number, y: number) => {
      let result,
        mEvent = {
          x,
          y,
          isInside
        };
      this._onTouchEnded && (result = this._onTouchEnded(isInside, mEvent));
      return result === true;
    },
    onTouch: (x: number, y: number) => {
      let result,
        mEvent = {
          x,
          y
        };
      this._onTouch && (result = this._onTouch(mEvent));
      return !(result === false);
    },
    onTouchMoved: (isInside: boolean, x: number, y: number) => {
      let result,
        mEvent = {
          x,
          y,
          isInside
        };
      // this._onTouchMoved && (result = this._onTouchMoved(isInside, mEvent));
      return this._onTouchMoved ? !!this._onTouchMoved(isInside, mEvent) : false;
    },
    onTouchCancelled: (x: number, y: number) => {
      let result,
        mEvent = {
          x,
          y
        };
      this._onTouchCancelled && (result = this._onTouchCancelled(mEvent));
      return result === true;
    }
  };

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
  get onTouch() {
    return this._onTouch;
  }
  set onTouch(onTouch) {
    this._onTouch = onTouch;
  }
  get onTouchEnded() {
    return this._onTouchEnded;
  }
  set onTouchEnded(onTouchEnded) {
    this._onTouchEnded = onTouchEnded;
  }
  get onTouchMoved() {
    return this._onTouchMoved;
  }
  set onTouchMoved(onTouchMoved) {
    this._onTouchMoved = onTouchMoved;
  }
  get onTouchCancelled() {
    return this._onTouchCancelled;
  }
  set onTouchCancelled(onTouchCancelled) {
    this._onTouchCancelled = onTouchCancelled.bind(this);
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
    this._nativeObject.setScaleX(-1);
  }
  flipVertically() {
    this._nativeObject.setScaleY(-1);
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
  }
  get top() {
    return PixelToDp(this._nativeObject.getTop());
  }
  set top(top) {
    this.yogaNode.setPosition(YogaEdge.TOP, DpToPixel(top));
  }
  get right() {
    return PixelToDp(this.yogaNode.getPosition(YogaEdge.RIGHT).value);
  }
  set right(right) {
    this.yogaNode.setPosition(YogaEdge.RIGHT, DpToPixel(right));
  }
  get bottom() {
    return PixelToDp(this.yogaNode.getPosition(YogaEdge.BOTTOM).value);
  }
  set bottom(bottom) {
    this.yogaNode.setPosition(YogaEdge.BOTTOM, DpToPixel(bottom));
  }
  get start() {
    return PixelToDp(this.yogaNode.getPosition(YogaEdge.START).value);
  }
  set start(start) {
    this.yogaNode.setPosition(YogaEdge.START, DpToPixel(start));
  }
  get end() {
    return PixelToDp(this.yogaNode.getPosition(YogaEdge.END).value);
  }
  set end(end) {
    this.yogaNode.setPosition(YogaEdge.END, DpToPixel(end));
  }
  get height() {
    return PixelToDp(this._nativeObject.getHeight());
  }
  set height(height) {
    this.yogaNode.setHeight(DpToPixel(height));
    // To sove AND-2693. We should give -2 to the bound for not stretching when user set height.
    // TODO: Find another way to do this
    if (this._parent instanceof ScrollView && this._parent.align === ScrollViewAlign.HORIZONTAL) {
      const layoutParams = this._nativeObject.getLayoutParams();
      layoutParams && (layoutParams.height = -2);
    }
  }
  get width() {
    return PixelToDp(this._nativeObject.getWidth());
  }
  set width(width) {
    this.yogaNode.setWidth(DpToPixel(width));
    // To sove AND-2693. We should give -2 to the bound for not stretching when user set height.
    // TODO: Find another way to do this
    if (this._parent instanceof ScrollView && this._parent.align === ScrollViewAlign.VERTICAL) {
      const layoutParams = this._nativeObject.getLayoutParams();
      layoutParams && (layoutParams.width = -2);
    }
  }
  get minWidth() {
    return PixelToDp(this.yogaNode.getMinWidth().value);
  }
  set minWidth(minWidth) {
    this.yogaNode.setMinWidth(DpToPixel(minWidth));
  }
  get minHeight() {
    return PixelToDp(this.yogaNode.getMinHeight().value);
  }
  set minHeight(minHeight) {
    this.yogaNode.setMinHeight(DpToPixel(minHeight));
  }
  get maxWidth() {
    return PixelToDp(this.yogaNode.getMaxWidth().value);
  }
  set maxWidth(maxWidth) {
    this.yogaNode.setMaxWidth(DpToPixel(maxWidth));
  }
  get maxHeight() {
    return PixelToDp(this.yogaNode.getMaxHeight().value);
  }
  set maxHeight(maxHeight) {
    this.yogaNode.setMaxHeight(DpToPixel(maxHeight));
  }
  get paddingTop() {
    return PixelToDp(this.yogaNode.getPadding(YogaEdge.TOP).value);
  }
  set paddingTop(paddingTop) {
    this.yogaNode.setPadding(YogaEdge.TOP, DpToPixel(paddingTop));
  }
  get paddingBottom() {
    return PixelToDp(this.yogaNode.getPadding(YogaEdge.BOTTOM).value);
  }
  set paddingBottom(paddingBottom) {
    this.yogaNode.setPadding(YogaEdge.BOTTOM, DpToPixel(paddingBottom));
  }
  get paddingStart() {
    return PixelToDp(this.yogaNode.getPadding(YogaEdge.START).value);
  }
  set paddingStart(paddingStart) {
    this.yogaNode.setPadding(YogaEdge.START, DpToPixel(paddingStart));
  }
  get paddingEnd() {
    return PixelToDp(this.yogaNode.getPadding(YogaEdge.END).value);
  }
  set paddingEnd(paddingEnd) {
    this.yogaNode.setPadding(YogaEdge.END, DpToPixel(paddingEnd));
  }
  get paddingLeft() {
    return PixelToDp(this.yogaNode.getPadding(YogaEdge.LEFT).value);
  }
  set paddingLeft(paddingLeft) {
    this.yogaNode.setPadding(YogaEdge.LEFT, DpToPixel(paddingLeft));
  }
  get paddingRight() {
    return PixelToDp(this.yogaNode.getPadding(YogaEdge.RIGHT).value);
  }
  set paddingRight(paddingRight) {
    this.yogaNode.setPadding(YogaEdge.RIGHT, DpToPixel(paddingRight));
  }
  get paddingHorizontal() {
    return PixelToDp(this.yogaNode.getPadding(YogaEdge.HORIZONTAL).value);
  }
  set paddingHorizontal(paddingHorizontal) {
    this.yogaNode.setPadding(YogaEdge.HORIZONTAL, DpToPixel(paddingHorizontal));
  }
  get paddingVertical() {
    return PixelToDp(this.yogaNode.getPadding(YogaEdge.VERTICAL).value);
  }
  set paddingVertical(paddingVertical) {
    this.yogaNode.setPadding(YogaEdge.VERTICAL, DpToPixel(paddingVertical));
  }
  get padding() {
    // YogaEdge.ALL not working on YogaCore. We are getting what we set.
    return PixelToDp(this.yogaNode.getPadding(YogaEdge.TOP).value);
  }
  set padding(padding) {
    // YogaEdge.ALL not working on YogaCore. We are setting border to all.
    const db_padding = DpToPixel(padding);
    this.yogaNode.setPadding(YogaEdge.TOP, db_padding);
    this.yogaNode.setPadding(YogaEdge.BOTTOM, db_padding);
    this.yogaNode.setPadding(YogaEdge.LEFT, db_padding);
    this.yogaNode.setPadding(YogaEdge.RIGHT, db_padding);
  }
  get marginTop() {
    return PixelToDp(this.yogaNode.getMargin(YogaEdge.TOP).value);
  }
  set marginTop(marginTop) {
    this.yogaNode.setMargin(YogaEdge.TOP, DpToPixel(marginTop));
  }
  get marginBottom() {
    return PixelToDp(this.yogaNode.getMargin(YogaEdge.BOTTOM).value);
  }
  set marginBottom(marginBottom) {
    this.yogaNode.setMargin(YogaEdge.BOTTOM, DpToPixel(marginBottom));
  }
  get marginStart() {
    return PixelToDp(this.yogaNode.getMargin(YogaEdge.START).value);
  }
  set marginStart(marginStart) {
    this.yogaNode.setMargin(YogaEdge.START, DpToPixel(marginStart));
  }
  get marginEnd() {
    return PixelToDp(this.yogaNode.getMargin(YogaEdge.END).value);
  }
  set marginEnd(marginEnd) {
    this.yogaNode.setMargin(YogaEdge.END, DpToPixel(marginEnd));
  }
  get marginLeft() {
    return PixelToDp(this.yogaNode.getMargin(YogaEdge.LEFT).value);
  }
  set marginLeft(marginLeft) {
    this.yogaNode.setMargin(YogaEdge.LEFT, DpToPixel(marginLeft));
  }
  get marginRight() {
    return PixelToDp(this.yogaNode.getMargin(YogaEdge.RIGHT).value);
  }
  set marginRight(marginRight) {
    this.yogaNode.setMargin(YogaEdge.RIGHT, DpToPixel(marginRight));
  }
  get marginHorizontal() {
    return PixelToDp(this.yogaNode.getMargin(YogaEdge.HORIZONTAL).value);
  }
  set marginHorizontal(marginHorizontal) {
    this.yogaNode.setMargin(YogaEdge.HORIZONTAL, DpToPixel(marginHorizontal));
  }
  get marginVertical() {
    return PixelToDp(this.yogaNode.getMargin(YogaEdge.VERTICAL).value);
  }
  set marginVertical(marginVertical) {
    this.yogaNode.setMargin(YogaEdge.VERTICAL, DpToPixel(marginVertical));
  }
  get margin() {
    // YogaEdge.ALL not working on YogaCore. We are getting what we set.
    return PixelToDp(this.yogaNode.getMargin(YogaEdge.TOP).value);
  }
  set margin(margin) {
    // YogaEdge.ALL not working on YogaCore. We are setting border to all.
    const db_margin = DpToPixel(margin);
    this.yogaNode.setMargin(YogaEdge.TOP, db_margin);
    this.yogaNode.setMargin(YogaEdge.BOTTOM, db_margin);
    this.yogaNode.setMargin(YogaEdge.LEFT, db_margin);
    this.yogaNode.setMargin(YogaEdge.RIGHT, db_margin);
    this.yogaNode.setMargin(YogaEdge.START, db_margin);
    this.yogaNode.setMargin(YogaEdge.END, db_margin);
    this.yogaNode.setMargin(YogaEdge.HORIZONTAL, db_margin);
    this.yogaNode.setMargin(YogaEdge.VERTICAL, db_margin);
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
  }
  get flexShrink() {
    return this.yogaNode.getFlexShrink();
  }
  set flexShrink(flexShrink) {
    this.yogaNode.setFlexShrink(flexShrink);
  }
  get flexBasis() {
    return this.yogaNode.getFlexBasis().value;
  }
  set flexBasis(flexBasis) {
    this.yogaNode.setFlexBasis(flexBasis);
  }
  get alignSelf() {
    return this.yogaNode.getAlignSelf();
  }
  set alignSelf(alignSelf) {
    this.yogaNode.setAlignSelf(alignSelf);
  }
  get positionType() {
    return this.yogaNode.getPositionType();
  }
  set positionType(position) {
    this.yogaNode.setPositionType(position);
  }
  dirty() {
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
  set rippleColor(value: Color | undefined) {
    this._rippleColor = value;

    if (this._rippleColor && this.rippleEnabled && AndroidConfig.sdkVersion >= AndroidConfig.SDK.SDK_LOLLIPOP) {
      const states = array([array([], 'int')]);
      const colors = array([this._rippleColor.nativeObject], 'int');

      const NativeColorStateList = requireClass('android.content.res.ColorStateList');
      const NativeRippleDrawable = requireClass('android.graphics.drawable.RippleDrawable');
      const colorStateList = new NativeColorStateList(states, colors);

      const mask = getRippleMask(DpToPixel(this.borderRadius));

      if (this._useForeground === true && AndroidConfig.sdkVersion >= AndroidConfig.SDK.SDK_MARSHMALLOW) {
        /*
		Only supported for api level 23 and above
		*/
        const currentBackground = this.nativeObject.getForeground();
        const rippleDrawableForegorund = new NativeRippleDrawable(colorStateList, currentBackground, mask);
        this.nativeObject.setForeground(rippleDrawableForegorund);
      } else {
        const currentBackground = this.nativeObject.getBackground();
        const rippleDrawableBackgorund = new NativeRippleDrawable(colorStateList, currentBackground, mask);
        this.nativeObject.setBackground(rippleDrawableBackgorund);
      }
    }
  }
  // End of Ripple Effect
}
