import Color from '../color';
import ViewAndroid from '../view/view.android';
import { IButton } from './button';
import { ButtonEvents } from './button-events';
import AndroidConfig from '../../util/Android/androidconfig';
import LabelAndroid from '../label/label.android';
import ImageAndroid from '../image/image.android';
import TextAlignment from '../shared/textalignment';
import AndroidUnitConverter from '../../util/Android/unitconverter';
import isViewState from '../../util/isViewState';

const NativeButton = requireClass('android.widget.Button');
const NativeView = requireClass('android.view.View');
const NativeLayerDrawable = requireClass('android.graphics.drawable.LayerDrawable');
const NativeStateListDrawable = requireClass('android.graphics.drawable.StateListDrawable');
const NativeGradientDrawable = requireClass('android.graphics.drawable.GradientDrawable');
const NativeRoundedBitmapFactory = requireClass('androidx.core.graphics.drawable.RoundedBitmapDrawableFactory');

const SFViewUtil = requireClass('io.smartface.android.sfcore.ui.view.SFViewUtil');

const TextAlignmentDic = {
  [TextAlignment.TOPLEFT]: 48 | 3, // Gravity.TOP | Gravity.LEFT
  [TextAlignment.TOPCENTER]: 48 | 1, //Gravity.TOP | Gravity.CENTER_HORIZONTAL
  [TextAlignment.TOPRIGHT]: 48 | 5, //Gravity.TOP | Gravity.RIGHT
  [TextAlignment.MIDLEFT]: 16 | 3, // Gravity.CENTER_VERTICAL | Gravity.LEFT
  [TextAlignment.MIDCENTER]: 17, //Gravity.CENTER
  [TextAlignment.MIDRIGHT]: 16 | 5, // Gravity.CENTER_VERTICAL | Gravity.RIGHT
  [TextAlignment.BOTTOMLEFT]: 80 | 3, // Gravity.BOTTOM | Gravity.LEFT
  [TextAlignment.BOTTOMCENTER]: 80 | 1, // Gravity.BOTTOM | Gravity.CENTER_HORIZONTAL
  [TextAlignment.BOTTOMRIGHT]: 80 | 5 // Gravity.BOTTOM | Gravity.RIGHT
};

export default class ButtonAndroid<TEvent extends string = ButtonEvents, TNative = any, TProps extends IButton = IButton>
  extends LabelAndroid<ButtonEvents, TNative, TProps>
  implements IButton<TEvent>
{
  protected _backgroundColor: IButton['backgroundColor'];
  private __backgroundImages: IButton['backgroundImage'];
  private borderShapeDrawable: any;
  private layerDrawable: any;
  private backgroundDrawable = new NativeGradientDrawable();
  constructor(params: Partial<TProps> = {}) {
    super(params);
    this.setOnClickListener();
    this.setOnLongClickListener();

    this.viewNativeDefaultTextAlignment = TextAlignmentDic[TextAlignment.MIDCENTER];
    this._borderColor = Color.BLACK;
    this.textAlignment = TextAlignment.MIDCENTER;
    this._borderWidth = 0;
  }
  protected preConstruct(params?: Partial<TProps>): void {
    if (this._backgroundColor instanceof Color) {
      this.backgroundDrawable.setColor(this._backgroundColor.nativeObject);
    }
    this._borderRadius = 0;
    this.borderShapeDrawable = SFViewUtil.getShapeDrawable(0, 0, this._borderRadius);

    this.nativeObject.setBackground(this.layerDrawable);
    this.nativeObject.setAllCaps(false); // enable lowercase texts
    this.layerDrawable = this.createNewLayerDrawable([this.backgroundDrawable, this.borderShapeDrawable]);
    super.preConstruct(params);
  }

  protected createNativeObject() {
    return new NativeButton(AndroidConfig.activity);
  }
  static Events = { ...ViewAndroid.Events, ...ButtonEvents };
  get backgroundColor(): IButton['backgroundColor'] {
    return this._backgroundColor;
  }
  set backgroundColor(value: IButton['backgroundColor']) {
    this._backgroundColor = value;
    this.setBackgroundColor();
  }
  get backgroundImage(): IButton['backgroundImage'] {
    return this.__backgroundImages;
  }
  set backgroundImage(value: IButton['backgroundImage']) {
    this.__backgroundImages = value;
    this.setBackgroundImage();
  }
  get borderWidth(): IButton['borderWidth'] {
    return this._borderWidth;
  }
  set borderWidth(value: IButton['borderWidth']) {
    this._borderWidth = value;
    this.setBackgroundImage();
    this._setBorderToAllEdges();
    this.setBorder();
  }
  get borderRadius(): IButton['borderRadius'] {
    return AndroidUnitConverter.pixelToDp(this._borderRadius);
  }
  set borderRadius(value: IButton['borderRadius']) {
    const radius = isNaN(value) ? 0 : value;
    this._borderRadius = AndroidUnitConverter.dpToPixel(radius);
    this.setBorder();
    if (this.__backgroundImages) {
      this.setBackgroundImage();
    } else {
      this.setBackgroundColor();
    }
  }
  get borderColor(): IButton['borderColor'] {
    return this._borderColor;
  }
  set borderColor(value: IButton['borderColor']) {
    this._borderColor = value;
    this.setBorder();
  }
  get textAlignment(): IButton['textAlignment'] {
    return this._textAlignment;
  }
  set textAlignment(value: IButton['textAlignment']) {
    this._textAlignment = value in TextAlignmentDic ? value : this.viewNativeDefaultTextAlignment;
    this.nativeObject.setGravity(TextAlignmentDic[this._textAlignment]);
  }
  onPress: IButton['onPress'];
  onLongPress: IButton['onLongPress'];

  private setBackgroundColor() {
    const backgroundColors: any = this._backgroundColor;
    if (backgroundColors instanceof Color && backgroundColors.isGradient) {
      this.backgroundDrawable = backgroundColors.nativeObject;
      this.backgroundDrawable.setCornerRadius(this._borderRadius);
    } else if (backgroundColors instanceof Color && !backgroundColors.isGradient) {
      release(this.backgroundDrawable);
      this.backgroundDrawable = new NativeGradientDrawable();
      this.backgroundDrawable.setColor(backgroundColors.nativeObject);
      this.backgroundDrawable.setCornerRadius(this._borderRadius);
    } else if (isViewState<Color>(backgroundColors)) {
      release(this.backgroundDrawable);
      this.backgroundDrawable = new NativeStateListDrawable();
      let stateDrawable: any;
      // state can be transparent. so we should check state exists.
      if (backgroundColors.normal) {
        if (backgroundColors.normal.isGradient) {
          stateDrawable = backgroundColors.normal.nativeObject;
        } else if (backgroundColors.normal instanceof Color) {
          stateDrawable = new NativeGradientDrawable();
          stateDrawable.setColor(backgroundColors.normal.nativeObject);
        }
        stateDrawable.setCornerRadius(this._borderRadius);
        this.backgroundDrawable.addState(ViewAndroid.State.STATE_NORMAL, stateDrawable);
      }
      if (backgroundColors.disabled) {
        if (backgroundColors.disabled.isGradient) {
          stateDrawable = backgroundColors.disabled.nativeObject;
        } else if (backgroundColors.disabled instanceof Color) {
          stateDrawable = new NativeGradientDrawable();
          stateDrawable.setColor(backgroundColors.disabled.nativeObject);
        }
        stateDrawable.setCornerRadius(this._borderRadius);
        this.backgroundDrawable.addState(ViewAndroid.State.STATE_DISABLED, stateDrawable);
      }
      if (backgroundColors.selected) {
        if (backgroundColors.selected.isGradient) {
          stateDrawable = backgroundColors.selected.nativeObject;
        } else if (backgroundColors.selected instanceof Color) {
          stateDrawable = new NativeGradientDrawable();
          stateDrawable.setColor(backgroundColors.selected.nativeObject);
        }
        stateDrawable.setCornerRadius(this._borderRadius);
        this.backgroundDrawable.addState(ViewAndroid.State.STATE_SELECTED, stateDrawable);
      }
      if (backgroundColors.pressed) {
        if (backgroundColors.pressed.isGradient) {
          stateDrawable = backgroundColors.pressed.nativeObject;
        } else if (backgroundColors.pressed instanceof Color) {
          stateDrawable = new NativeGradientDrawable();
          stateDrawable.setColor(backgroundColors.pressed.nativeObject);
        }
        stateDrawable.setCornerRadius(this._borderRadius);
        this.backgroundDrawable.addState(ViewAndroid.State.STATE_PRESSED, stateDrawable);
      }
      if (backgroundColors.focused) {
        if (backgroundColors.focused.isGradient) {
          stateDrawable = backgroundColors.focused.nativeObject;
        } else if (backgroundColors.focused instanceof Color) {
          stateDrawable = new NativeGradientDrawable();
          stateDrawable.setColor(backgroundColors.focused.nativeObject);
        }
        stateDrawable.setCornerRadius(this._borderRadius);
        this.backgroundDrawable.addState(ViewAndroid.State.STATE_FOCUSED, stateDrawable);
      }
    }
    this.setBackground(0);
  }

  private setBackgroundImage() {
    const resources = AndroidConfig.activityResources;
    let bitmap: any;
    const backgroundImages: any = this.__backgroundImages;
    if (backgroundImages instanceof ImageAndroid) {
      bitmap = backgroundImages.nativeObject.getBitmap();
      this.backgroundDrawable = NativeRoundedBitmapFactory.create(resources, bitmap);
      this.backgroundDrawable.setCornerRadius(this._borderRadius);
      this.setBackground(0);
    } else if (isViewState<ImageAndroid>(backgroundImages)) {
      let stateDrawable: any;
      let image: ImageAndroid;
      release(this.backgroundDrawable);
      this.backgroundDrawable = new NativeStateListDrawable();
      if (backgroundImages.normal) {
        image = backgroundImages.normal;
        bitmap = image.nativeObject.getBitmap();
        stateDrawable = NativeRoundedBitmapFactory.create(resources, bitmap);
        stateDrawable.setCornerRadius(this._borderRadius);
        this.backgroundDrawable.addState(ViewAndroid.State.STATE_NORMAL, stateDrawable);
      }
      if (backgroundImages.disabled) {
        image = backgroundImages.disabled;
        bitmap = image.nativeObject.getBitmap();
        stateDrawable = NativeRoundedBitmapFactory.create(resources, bitmap);
        stateDrawable.setCornerRadius(this._borderRadius);
        this.backgroundDrawable.addState(ViewAndroid.State.STATE_DISABLED, stateDrawable);
      }
      if (backgroundImages.selected) {
        image = backgroundImages.selected;
        bitmap = image.nativeObject.getBitmap();
        stateDrawable = NativeRoundedBitmapFactory.create(resources, bitmap);
        stateDrawable.setCornerRadius(this._borderRadius);
        this.backgroundDrawable.addState(ViewAndroid.State.STATE_SELECTED, stateDrawable);
      }
      if (backgroundImages.pressed) {
        image = backgroundImages.pressed;
        bitmap = image.nativeObject.getBitmap();
        stateDrawable = NativeRoundedBitmapFactory.create(resources, bitmap);
        stateDrawable.setCornerRadius(this._borderRadius);
        this.backgroundDrawable.addState(ViewAndroid.State.STATE_PRESSED, stateDrawable);
      }
      if (backgroundImages.focused) {
        image = backgroundImages.focused;
        bitmap = image.nativeObject.getBitmap();
        stateDrawable = NativeRoundedBitmapFactory.create(resources, bitmap);
        stateDrawable.setCornerRadius(this._borderRadius);
        this.backgroundDrawable.addState(ViewAndroid.State.STATE_FOCUSED, stateDrawable);
      }
      this.setBackground(0);
    }
  }

  private setBorder() {
    const borderWidth_px = AndroidUnitConverter.dpToPixel(this.borderWidth);
    // we should set border with greater equals to zero for resetting but this will cause recreating drawable again and again
    // so we should use created drawables.
    if (borderWidth_px >= 0) {
      this.borderShapeDrawable = SFViewUtil.getShapeDrawable(this.borderColor.nativeObject, borderWidth_px, this._borderRadius);
      this.setBackground(1);
    }
  }

  private setBackground(layerIndex: number) {
    const background = this.nativeObject.getBackground();
    const constantStateForCopy = background?.getConstantState() || null;
    const layerDrawableNative = constantStateForCopy?.newDrawable() || this.createNewLayerDrawable([this.backgroundDrawable, this.borderShapeDrawable]);
    switch (layerIndex) {
      case 0:
        layerDrawableNative.setDrawableByLayerId(0, this.backgroundDrawable);
        layerDrawableNative.invalidateDrawable(this.backgroundDrawable);
        break;
      case 1:
        layerDrawableNative.setDrawableByLayerId(1, this.borderShapeDrawable);
        layerDrawableNative.invalidateDrawable(this.borderShapeDrawable);
        break;
      default:
        break;
    }

    this.nativeObject.setBackground(layerDrawableNative);
  }

  private createNewLayerDrawable(drawables: any[]) {
    const drawablesForObjectCreate: any[] = [];

    drawables.forEach(() => drawablesForObjectCreate.push(drawables[0]));
    const layerDrawable = new NativeLayerDrawable(array(drawablesForObjectCreate));
    drawables.forEach((drawable: any, index: number) => {
      layerDrawable?.setId(index, index);
      layerDrawable?.setDrawableByLayerId(index, drawable);
    });
    return layerDrawable;
  }

  private setOnClickListener() {
    this.nativeObject.setOnClickListener(
      NativeView.OnClickListener.implement({
        onClick: () => {
          this.emit('press');
          this.onPress?.();
        }
      })
    );
  }

  private setOnLongClickListener() {
    this.nativeObject.setOnLongClickListener(
      NativeView.OnLongClickListener.implement({
        onLongClick: () => {
          this.emit('longPress');
          this.onLongPress?.();
          return true; // Returns always true to solve AND-2713 bug.
        }
      })
    );
  }
}
