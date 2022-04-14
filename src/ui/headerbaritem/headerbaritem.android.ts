import { IHeaderBarItem } from './headerbaritem';
import { NativeMobileComponent } from '../../core/native-mobile-component';
import { Point2D } from '../../primitive/point2d';
import AndroidConfig from '../../util/Android/androidconfig';
import AndroidUnitConverter from '../../util/Android/unitconverter';
import HeaderBarItemPadding from '../../util/Android/headerbaritempadding';
import Badge from '../badge';
import Color from '../color';
import ImageAndroid from '../image/image.android';
import MenuItem from '../menuitem';
import SearchView from '../searchview';
import View from '../view';
import LayoutParams from '../../util/Android/layoutparams';

const SFView = requireClass('io.smartface.android.sfcore.ui.view.SFViewUtil');
const NativeTextButton = requireClass('android.widget.Button');
const NativePorterDuff = requireClass('android.graphics.PorterDuff');
const NativeImageButton = requireClass('android.widget.ImageButton');
const NativeView = requireClass('android.view.View');
const NativeRelativeLayout = requireClass('android.widget.RelativeLayout');

const activity = AndroidConfig.activity;

function PixelToDp(px) {
  return AndroidUnitConverter.pixelToDp(px);
}

export default class HeaderBarItemAndroid extends NativeMobileComponent<any, IHeaderBarItem> implements IHeaderBarItem {
  protected createNativeObject() {
    return null;
  }
  iOS = { SystemItem: {} };
  private _title: string = '';
  private _image: ImageAndroid | string | null = null;
  private _customView?: View = undefined;
  private _enabled: boolean = true;
  private _color: Color | null = null;
  private _badge?: Badge = undefined;
  private _accessibilityLabel: string;
  private isLeftItem: boolean = false;
  private isBadgeEnabled = false;
  private actionBar: any | null = null;
  private _imageButton = false;
  private _searchView: SearchView | null = null;
  private _menuItem: MenuItem | null = null;
  private nativeBadgeContainer: any;
  private _itemColor = Color.WHITE;

  constructor(params?: Partial<IHeaderBarItem>) {
    super(params);

    this.addAndroidProps(this.getAndroidProps());
  }
  onPress: (() => void) | null;
  private getAndroidProps() {
    const self = this;
    return {
      get systemIcon() {
        return self.android.systemIcon;
      },
      set systemIcon(systemIcon) {
        self.android.systemIcon = systemIcon;

        if (!self.nativeObject || (self.nativeObject && !self.imageButton)) {
          self.nativeObject = this.createNativeImageButton.call(self);
          self.updateAccessibilityLabel(self._accessibilityLabel);
        }

        if (typeof self.android.systemIcon === 'number') self.nativeObject && self.nativeObject.setImageResource(ImageAndroid.systemDrawableId(self.android.systemIcon));
      }
    };
  }
  get color() {
    return this._color;
  }
  set color(value: Color | null) {
    if (!value) {
      this._color = value;
      if (this.nativeObject && this.color) {
        if (this._image || this.android.systemIcon) {
          const imageCopy = this.nativeObject.getDrawable().mutate();
          imageCopy.setColorFilter(this.color.nativeObject, NativePorterDuff.Mode.SRC_IN);
          this.nativeObject.setImageDrawable(imageCopy);
        } else {
          this.nativeObject.setTextColor(this.color.nativeObject);
        }
      }
    }
  }
  get title() {
    return this._title;
  }
  set title(value: string) {
    if (value !== null && typeof value !== 'string') {
      throw new TypeError('title must be string or null.');
    }
    this._title = value;
    this.titleSetterHelper(this._title);
  }
  get imageButton() {
    return this._imageButton;
  }
  set imageButton(value) {
    this._imageButton = value;
  }
  get menuItem() {
    return this._menuItem;
  }
  set menuItem(value) {
    this._menuItem = value;
  }
  get image() {
    return this._image;
  }
  set image(value: ImageAndroid | string | null) {
    if (value) {
      value = ImageAndroid.createImageFromPath(value); //IDE requires this implementation.
    }
    if (value === null || value instanceof ImageAndroid) {
      this._image = value;
      if (!this.nativeObject || (this.nativeObject && !this.imageButton)) {
        this.nativeObject = this.createNativeImageButton();
        this.updateAccessibilityLabel(this._accessibilityLabel);
      }
      if (this.nativeObject && this.imageButton) {
        if (this._image) {
          const imageCopy = (this._image as ImageAndroid).nativeObject.mutate();
          this.nativeObject.setImageDrawable(imageCopy);
        } else {
          this.nativeObject.setImageDrawable(null);
          this.nativeObject = null;
          if (this.android.attributedTitle) {
            this.android.attributedTitle = this.android.attributedTitle;
          } else {
            this.title = this._title;
          }
        }
      }
    } else {
      throw new TypeError('image must be ImageAndroid instance or image path should be given properly.');
    }
  }
  get searchView() {
    return this._searchView;
  }
  set searchView(searchView) {
    if (searchView) {
      this._searchView = searchView;
      if (this.nativeObject) {
        this.nativeObject.setActionView(this._searchView?.nativeObject);
      }
    }
  }
  get enabled() {
    return this._enabled;
  }
  set enabled(value: boolean) {
    this._enabled = !!value;
    if (this.nativeObject) {
      this.nativeObject.setEnabled(this._enabled);
    }
  }
  get size() {
    return this.nativeObject
      ? {
          width: AndroidUnitConverter.pixelToDp(this.nativeObject.getWidth()),
          height: AndroidUnitConverter.pixelToDp(this.nativeObject.getHeight())
        }
      : undefined;
  }
  set size(value) {
    if (typeof value === 'object' && this.nativeObject) {
      this.nativeObject.setWidth(AndroidUnitConverter.dpToPixel(value.width));
      this.nativeObject.setHeight(AndroidUnitConverter.dpToPixel(value.height));
    }
  }
  get badge() {
    if (this._badge === undefined) {
      this._badge = new Badge();
      this.isBadgeEnabled = true;
      this.assignRules(this._badge);
      this.addToHeaderView(this._badge);
    }
    return this._badge;
  }
  get customView() {
    return this._customView;
  }
  set customView(view) {
    this._customView = view;
  }
  get accessibilityLabel() {
    return this._accessibilityLabel;
  }
  set accessibilityLabel(value: string) {
    this._accessibilityLabel = value;
    this.updateAccessibilityLabel(this._accessibilityLabel);
  }
  get itemColor() {
    return this._itemColor;
  }
  set itemColor(color: Color) {
    if (color instanceof Color) {
      this._itemColor = color;
    }
  }
  setValues() {
    this.enabled = this.enabled;

    if (!this._customView) {
      if (this.imageButton) {
        this.image && (this.image = this.image);
        this.android.systemIcon && (this.android.systemIcon = this.android.systemIcon);
      } else if (this.android.attributedTitle) {
        this.android.attributedTitle = this.android.attributedTitle;
      } else {
        this.title = this._title;
      }
      this.color = this.color;
    }

    this.nativeObject.setOnClickListener(
      NativeView.OnClickListener.implement({
        onClick: () => {
          this.onPress?.();
        }
      })
    );
  }
  toString() {
    return 'HeaderBarItem';
  }
  titleSetterHelper(title: string) {
    const itemTitle = title ? title : '';
    if (!this.nativeObject || this.imageButton) {
      this.nativeObject = new NativeTextButton(activity);
      this.updateAccessibilityLabel(this._accessibilityLabel);
      this.nativeObject.setText(itemTitle);
      this.nativeObject.setBackgroundColor(Color.TRANSPARENT.nativeObject);
      this.nativeObject.setPaddingRelative(HeaderBarItemPadding.vertical, HeaderBarItemPadding.horizontal, HeaderBarItemPadding.vertical, HeaderBarItemPadding.horizontal);
      this.imageButton = false;
      this.color = this._color;
      if (this.menuItem) {
        const itemView = this.menuItem.getActionView();
        itemView.getChildCount() && itemView.removeAllViews();
        itemView.addView(this.nativeObject);
      }
    } else if (!this.imageButton) {
      this.nativeObject.setText(itemTitle);
      this.color = this._color;
    }
  }
  updateAccessibilityLabel(accessibilityLabel: string) {
    if (this.isLeftItem && this.actionBar) {
      this.actionBar.setHomeActionContentDescription(accessibilityLabel);
    } else {
      this.nativeObject && this.nativeObject.setContentDescription(accessibilityLabel);
    }
  }
  assignRules(badge) {
    if (!this.nativeObject) return;
    const ALIGN_END = 19;

    const layoutParams = new NativeRelativeLayout.LayoutParams(LayoutParams.WRAP_CONTENT, LayoutParams.WRAP_CONTENT);
    this.nativeObject.setId(NativeView.generateViewId());
    layoutParams.addRule(ALIGN_END, this.nativeObject.getId());

    badge.nativeObject.setLayoutParams(layoutParams);
  }
  addToHeaderView(badge) {
    if (!this.nativeBadgeContainer || !badge) return;

    if (!badge.nativeObject.getParent()) {
      this.nativeBadgeContainer.addView(badge.nativeObject);
    } else {
      const parentOfNativeObject = badge.nativeObject.getParent();
      parentOfNativeObject.removeAllViews();
      this.nativeBadgeContainer.addView(badge.nativeObject);
    }
  }
  getScreenLocation(): Point2D {
    const location = toJSArray(SFView.getLocationOnScreen(this.nativeObject));
    const position: Partial<{ x: number; y: number }> = {};
    position.x = PixelToDp(location[0]);
    position.y = PixelToDp(location[1]);
    return position;
  }
  createNativeImageButton() {
    const headerBarItem = this;

    let nativeImageButton;
    if (!headerBarItem.nativeObject || !headerBarItem.imageButton) {
      nativeImageButton = new NativeImageButton(activity);
      nativeImageButton.setBackground(null);
      nativeImageButton.setPaddingRelative(HeaderBarItemPadding.vertical, HeaderBarItemPadding.horizontal, HeaderBarItemPadding.vertical, HeaderBarItemPadding.horizontal);
    } else nativeImageButton = headerBarItem.nativeObject;
    headerBarItem.imageButton = true;
    if (headerBarItem.menuItem) {
      /*
      We know that got action view is ViewGroup.
      */
      const itemView = headerBarItem.menuItem.getActionView();
      itemView.getChildCount() && itemView.removeAllViews();
      itemView.addView(nativeImageButton);
    }

    return nativeImageButton;
  }
}
