import System from '../../device/system';
import Color from '../../ui/color';
import ImageIOS from '../../ui/image/image.ios';
import { default as IHeaderBar } from '../headerbar';
import Font from '../font';
import View from '../view';
import { IHeaderBarItem } from '../headerbaritem/headerbaritem';
import { NativeMobileComponent } from '../../core/native-mobile-component';
import NavigationControllerIOS from './navigationcontroller.ios';

export class HeaderBar extends NativeMobileComponent<__SF_UINavigationBar, IHeaderBar> implements IHeaderBar {
  appearance?: __SF_UINavigationBarAppearance;
  navigationController?: NavigationControllerIOS;
  private _transparent = false;
  private _transparentEmptyImage: __SF_UIImage;
  private _titleColor: Color;
  private _visible = true;
  private _prefersLargeTitles = false;
  private _backIndicatorImage: ImageIOS;
  private _backIndicatorTransitionMaskImage: ImageIOS;
  private _titleFont?: Font;
  private _borderVisibility: boolean;
  leftItemEnabled: boolean;
  titleLayout?: View;
  title: string;
  setItems(items: IHeaderBarItem[]): void {}
  setLeftItem(item: IHeaderBarItem): void {}
  constructor(params: Partial<IHeaderBar> & { navigationController?: NavigationControllerIOS }) {
    super(params);

    if (params.navigationController) {
      this.nativeObject = params.navigationController.view.nativeObject.navigationBar;
      // Xcode 13.1 background bug fixes [NTVE-398]
      if (Number(System.OSVersion) >= 15) {
        this.appearance = new __SF_UINavigationBarAppearance();
        this.appearance.configureWithOpaqueBackground();
        this.nativeObject.standardAppearance = this.appearance;
        this.nativeObject.scrollEdgeAppearance = this.appearance;
      }
      this.navigationController = params.navigationController;
    }
    this.addIOSProps(this.iosProperties());
  }
  removeViewFromHeaderBar(view: Parameters<IHeaderBar['removeViewFromHeaderBar']>['0']): void {
    throw new Error('Method not implemented.');
  }
  addViewToHeaderBar(view: Parameters<IHeaderBar['addViewToHeaderBar']>['0']): void {
    throw new Error('Method not implemented.');
  }
  protected createNativeObject() {
    return null;
  }
  get transparent(): IHeaderBar['transparent'] {
    return this._transparent;
  }
  set transparent(value: IHeaderBar['transparent']) {
    if (value) {
      if (!this.nativeObject.backgroundImage) {
        const _transparentEmptyImage = __SF_UIImage.getInstance();
        this.nativeObject.backgroundImage = _transparentEmptyImage;
      }
      this.nativeObject.shadowImage = __SF_UIImage.getInstance();
      this.nativeObject.translucent = true;
      this.nativeObject.backgroundColor = Color.TRANSPARENT.nativeObject;
      this._borderVisibility = false;
    } else {
      if (this.nativeObject.backgroundImage === this._transparentEmptyImage) {
        this.nativeObject.backgroundImage = undefined;
      }
      this.nativeObject.shadowImage = undefined;
      this.nativeObject.translucent = false;
      this._borderVisibility = true;
    }
    this._transparent = value;
  }
  get alpha(): IHeaderBar['alpha'] {
    return this.nativeObject.alpha;
  }
  set alpha(value: IHeaderBar['alpha']) {
    if (typeof value === 'number') {
      SF.dispatch_async(SF.dispatch_get_main_queue(), () => {
        this.nativeObject.alpha = value;
      });
    }
  }
  get titleColor(): IHeaderBar['titleColor'] {
    return this._titleColor;
  }
  set titleColor(value: IHeaderBar['titleColor']) {
    this._titleColor = value;
    this.__updateTitleTextAttributes();
  }
  get visible(): IHeaderBar['visible'] {
    return this._visible;
  }
  set visible(value: IHeaderBar['visible']) {
    this._visible = value;
    this.navigationController?.nativeObject.setNavigationBarHiddenAnimated(!value, true);
  }
  get itemColor(): IHeaderBar['itemColor'] {
    return new Color({
      color: this.nativeObject.tintColor
    });
  }
  set itemColor(value: IHeaderBar['itemColor']) {
    this.nativeObject.tintColor = value.nativeObject;
  }
  get backgroundColor(): IHeaderBar['backgroundColor'] {
    return new Color({
      color: this.nativeObject.barTintColor
    });
  }
  set backgroundColor(value: IHeaderBar['backgroundColor']) {
    if (value instanceof Color) {
      // Xcode 13.1 background bug fixes [NTVE-398]
      if (parseInt(System.OSVersion) >= 15) {
        if (this.appearance) {
          this.appearance.backgroundColor = value.nativeObject;
        }
        this.nativeObject.standardAppearance = this.appearance;
        this.nativeObject.scrollEdgeAppearance = this.appearance;
      } else {
        if (this.transparent) {
          this.nativeObject.backgroundColor = value.nativeObject;
        } else {
          this.nativeObject.barTintColor = value.nativeObject;
        }
      }
    }
  }
  get backgroundImage(): IHeaderBar['backgroundImage'] {
    return ImageIOS.createFromImage(this.nativeObject.backgroundImage);
  }
  set backgroundImage(value: IHeaderBar['backgroundImage']) {
    this.nativeObject.backgroundImage = value.nativeObject;
  }
  get height(): IHeaderBar['height'] {
    return this.nativeObject.frame.height;
  }
  get borderVisibility(): IHeaderBar['borderVisibility'] {
    return this._borderVisibility;
  }
  set borderVisibility(value: IHeaderBar['borderVisibility']) {
    this._borderVisibility = value;
    this.nativeObject.shadowImage = value ? undefined : __SF_UIImage.getInstance();
  }
  private __updateTitleTextAttributes() {
    // Xcode 13.1 background bug fixes [NTVE-398]
    if (parseInt(System.OSVersion) >= 15) {
      if (this.appearance) {
        this.appearance.titleTextAttributes = {
          NSColor: this._titleColor.nativeObject,
          NSFont: this._titleFont as __SF_UIFont
        };
      }

      this.nativeObject.standardAppearance = this.appearance;
      this.nativeObject.scrollEdgeAppearance = this.appearance;
    } else {
      this.nativeObject.titleTextAttributes = {
        NSColor: this._titleColor.nativeObject,
        NSFont: this._titleFont as any
      };
    }
  }
  private iosProperties() {
    const self = this;
    return {
      get translucent(): IHeaderBar['ios']['translucent'] {
        return self.nativeObject.translucent;
      },
      set translucent(value: IHeaderBar['ios']['translucent']) {
        self.nativeObject.translucent = value;
      },
      get titleFont(): IHeaderBar['ios']['titleFont'] {
        return self._titleFont;
      },
      set titleFont(value: IHeaderBar['ios']['titleFont']) {
        self._titleFont = value;
        self.__updateTitleTextAttributes();
      },
      get prefersLargeTitles(): IHeaderBar['ios']['prefersLargeTitles'] {
        return self._prefersLargeTitles;
      },
      set prefersLargeTitles(value: IHeaderBar['ios']['prefersLargeTitles']) {
        self._prefersLargeTitles = !!value;
        self.nativeObject.prefersLargeTitles = self._prefersLargeTitles;
      },
      get backIndicatorImage(): IHeaderBar['ios']['backIndicatorImage'] {
        return self._backIndicatorImage;
      },
      set backIndicatorImage(value: IHeaderBar['ios']['backIndicatorImage']) {
        if (value instanceof ImageIOS) {
          self._backIndicatorImage = value;
          self.nativeObject.backIndicatorImage = self._backIndicatorImage.nativeObject;

          // General use
          self.ios.backIndicatorTransitionMaskImage = value;
        }
      },
      get backIndicatorTransitionMaskImage(): IHeaderBar['ios']['backIndicatorTransitionMaskImage'] {
        return self._backIndicatorTransitionMaskImage;
      },
      set backIndicatorTransitionMaskImage(value: IHeaderBar['ios']['backIndicatorTransitionMaskImage']) {
        if (value instanceof ImageIOS) {
          self._backIndicatorTransitionMaskImage = value;
          self.nativeObject.backIndicatorTransitionMaskImage = self._backIndicatorTransitionMaskImage.nativeObject;
        }
      },
      setVisible(visible: boolean, animated?: boolean) {
        if (typeof visible === 'boolean') {
          self._visible = visible;
          const _animated = !!animated;
          self.navigationController?.nativeObject.setNavigationBarHiddenAnimated(!self._visible, _animated);
        }
      }
    };
  }
}
