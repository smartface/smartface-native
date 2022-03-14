import { ISearchView, SearchViewStyle } from '.';
import System from '../../device/system';
import Color from '../color';
import Font from '../font';
import Image from '../image';
import TextAlignment from '../shared/textalignment';
import ViewIOS from '../view/view.ios';
import { SearchViewEvents } from './searchview-events';
import { Invocation, KeyboardAnimationDelegate } from '../../util';
import Page from '../page';
import KeyboardAppearance from '../shared/keyboardappearance';

const UISearchBarStyle = {
  default: 0,
  prominent: 1,
  minimal: 2
};

const UISearchBarIcon = {
  search: 0,
  clear: 1,
  bookmark: 2,
  resultsList: 3
};

export default class SearchViewIOS<TEvent extends string = SearchViewEvents> extends ViewIOS<TEvent | SearchViewEvents, any, ISearchView> implements ISearchView {
  private _textAligment: number = 3;
  private _constant: number = 0;
  private _hint: string;
  private _hintTextColor: Color = Color.LIGHTGRAY;
  private _textColor: Color;
  private _backgroundColor: Color;
  private _backgroundImage: Image;
  private _iconImage: Image;
  private _searchIcon: Image;
  private _borderWidth: number = 0;
  private _searchContainerView: any;
  private _isAddedHeaderBar: boolean = false;
  private _showsCancelButton: boolean = false;
  private _onSearchBegin: () => void;
  private _onSearchEnd: () => void;
  private _onTextChanged: (searchText: string) => void;
  private _onSearchButtonClicked: () => void;
  private _onCancelButtonClicked: () => void;
  private _searchBarDelegate: __SF_UISearchBarDelegate;
  private _searchViewStyle: SearchViewStyle = UISearchBarStyle.default;
  private textfield: any;
  private keyboardanimationdelegate: any;
  constructor(params?: Partial<ISearchView>) {
    super(params);

    if (!this.nativeObject) {
      this._nativeObject = new __SF_SMFUISearchBar();
    }

    if (__SF_UIView.viewAppearanceSemanticContentAttribute() == 3) {
      this.nativeObject.setValueForKey(3, 'semanticContentAttribute');
    } else if (__SF_UIView.viewAppearanceSemanticContentAttribute() == 4) {
      this.nativeObject.setValueForKey(4, 'semanticContentAttribute');
    }

    if (parseInt(System.OSVersion) >= 11) {
      const heightAnchor = Invocation.invokeInstanceMethod(this.nativeObject, 'heightAnchor', [], 'NSObject');

      const argConstant = new Invocation.Argument({
        type: 'CGFloat',
        value: 44
      });
      // TODO Recheck after build
      const layoutConstraint = Invocation.invokeInstanceMethod(heightAnchor, 'constraintLessThanOrEqualToConstant:', [argConstant], 'NSObject');

      const argIsActive = new Invocation.Argument({
        type: 'BOOL',
        value: true
      });
      // TODO Recheck after build
      Invocation.invokeInstanceMethod(layoutConstraint, 'setActive:', [argIsActive]);
    }

    // TODO Recheck textfield and keyboardanimationdelegate fields. Doesn't exists in this;
    this.textfield = this.nativeObject.valueForKey('searchField');
    this.textfield.addKeyboardObserver();

    this.keyboardanimationdelegate = new KeyboardAnimationDelegate({
      nativeObject: this.nativeObject
    });

    this.textfield.onShowKeyboard = (e) => {
      if (this._isAddedHeaderBar) {
        return;
      }
      if (this.nativeObject.superview.className().indexOf('UINavigationBar') === -1) {
        this.keyboardanimationdelegate.keyboardShowAnimation(e.keyboardHeight, e);
      }
    };

    this.textfield.onHideKeyboard = (e) => {
      if (this._isAddedHeaderBar) {
        return;
      }
      if (this.nativeObject.superview.className().indexOf('UINavigationBar') === -1) {
        this.keyboardanimationdelegate.keyboardHideAnimation(e);
      }
    };

    this.textFieldBackgroundColor = Color.create(222, 222, 222);

    this._textColor = this.nativeObject.textColor;
    this._backgroundColor = this.nativeObject.barTintColor;

    this._searchBarDelegate = new __SF_UISearchBarDelegate();
    this._searchBarDelegate.cancelButtonClicked = (e) => {
      this._onCancelButtonClicked();
      this.emit('cancelButtonClicked');
    };
    this._searchBarDelegate.didBeginEditing = () => {
      if (this.ios.showsCancelButton) {
        this.nativeObject.setShowsCancelButtonAnimated(true, true);
      }

      this._onSearchBegin?.();
      this.emit('searchBegin');
    };
    this._searchBarDelegate.didEndEditing = () => {
      if (this.ios.showsCancelButton) {
        this.nativeObject.setShowsCancelButtonAnimated(false, true);
      }

      this._onSearchEnd();
      this.emit('searchEnd');
    };

    let _constant = 0;
    this._searchBarDelegate.textDidChange = (searchText: string) => {
      if (this.nativeObject.activityIndicatorTrailingConstraint) {
        let constant: any;
        searchText === '' ? (constant = 0) : (constant = -20);
        if (constant != _constant) {
          _constant = constant;
          const argConstant = new Invocation.Argument({
            type: 'CGFloat',
            value: _constant
          });
          Invocation.invokeInstanceMethod(this.nativeObject.activityIndicatorTrailingConstraint, 'setConstant:', [argConstant]);
        }
      }

      this._onTextChanged(searchText);
      this.emit('textChanged', searchText);
    };
    this._searchBarDelegate.searchButtonClicked = () => {
      this._onSearchButtonClicked();
      this.emit('searchButtonClicked');
    };
    this.nativeObject.delegate = this._searchBarDelegate;

    const self = this;
    this.addIOSProps({
      get keyboardAppearance(): KeyboardAppearance {
        return self.nativeObject.valueForKey('keyboardAppearance');
      },
      set keyboardAppearance(value: KeyboardAppearance) {
        self.nativeObject.setValueForKey(value, 'keyboardAppearance');
      },
      get loadingColor(): Color {
        return new Color({
          color: self.nativeObject.activityIndicator.color
        });
      },
      set loadingColor(value: Color) {
        self.nativeObject.activityIndicator.color = value.nativeObject;
      },
      get searchViewStyle(): SearchViewStyle {
        return self._searchViewStyle;
      },
      set searchViewStyle(value: SearchViewStyle) {
        self._searchViewStyle = value;
        self.nativeObject.searchBarStyle = value;
      },
      get cursorColor(): Color {
        return new Color({
          color: self.textfield.valueForKey('tintColor')
        });
      },
      set cursorColor(value: Color) {
        self.textfield.setValueForKey(value.nativeObject, 'tintColor');
      },
      get cancelButtonColor(): Color {
        return new Color({
          color: self.nativeObject.valueForKey('tintColor')
        });
      },
      set cancelButtonColor(value: Color) {
        self.nativeObject.setValueForKey(value.nativeObject, 'tintColor');
      },
      get cancelButtonText(): string {
        return self.nativeObject.valueForKey('cancelButtonText');
      },
      set cancelButtonText(value: string) {
        self.nativeObject.setValueForKey(value, 'cancelButtonText');
      },
      get showsCancelButton(): boolean {
        return self._showsCancelButton;
      },
      set showsCancelButton(value: boolean) {
        self._showsCancelButton = value;
      },
      get onCancelButtonClicked(): () => void {
        return self._onCancelButtonClicked;
      },
      set onCancelButtonClicked(value: () => void) {
        self._onCancelButtonClicked = value;
      },
      showLoading() {
        self.nativeObject.activityIndicator.startAnimating();
      },
      hideLoading() {
        self.nativeObject.activityIndicator.stopAnimating();
      }
    });
  }

  get text(): string {
    return this.nativeObject.text;
  }
  set text(value: string) {
    if (this.nativeObject.activityIndicatorTrailingConstraint) {
      const constant = value === '' ? 0 : -20;
      if (constant != this._constant) {
        this._constant = constant;
        const argConstant = new Invocation.Argument({
          type: 'CGFloat',
          value: this._constant
        });
        Invocation.invokeInstanceMethod(this.nativeObject.activityIndicatorTrailingConstraint, 'setConstant:', [argConstant]);
      }
    }
    this.nativeObject.text = value;
  }

  get hint(): string {
    return this._hint;
  }
  set hint(value: string) {
    this._hint = value;
    const allocNSAttributedString = Invocation.invokeClassMethod('NSAttributedString', 'alloc', [], 'id') as __SF_NSOBject;
    const argString = new Invocation.Argument({
      type: 'NSString',
      value
    });
    const argAttributes = new Invocation.Argument({
      type: 'id',
      value: {
        NSColor: this._hintTextColor.nativeObject
      }
    });
    const nativeAttributeString = Invocation.invokeInstanceMethod(allocNSAttributedString, 'initWithString:attributes:', [argString, argAttributes], 'NSObject');
    this.textfield.setValueForKey(nativeAttributeString, 'attributedPlaceholder');
  }

  get textColor(): Color {
    return new Color({
      color: this._textColor
    });
  }
  set textColor(value: Color) {
    this._textColor = value.nativeObject;
    this.nativeObject.textColor = this._textColor;
  }

  get backgroundColor(): Color {
    return new Color({
      color: this._backgroundColor
    });
  }
  set backgroundColor(value: Color) {
    this._backgroundColor = value.nativeObject;
    this.nativeObject.barTintColor = this._backgroundColor;
    if (this.borderWidth === 0) {
      this.borderColor = value;
    }
  }

  get backgroundImage(): Image {
    return this._backgroundImage;
  }
  set backgroundImage(value: Image) {
    this._backgroundImage = value;
    this.nativeObject.setSearchFieldBackgroundImage(this._backgroundImage.nativeObject, 0);
  }

  get iconImage(): Image {
    return this._iconImage;
  }
  set iconImage(value: Image) {
    this._iconImage = value;
    this.nativeObject.setIconImage(value.nativeObject, UISearchBarIcon.search, __SF_UIControlStateNormal);
  }

  get searchIcon(): Image {
    return this._searchIcon;
  }
  set searchIcon(value: Image) {
    this._searchIcon = value;
    this.nativeObject.setIconImage(this._searchIcon.nativeObject, UISearchBarIcon.search, __SF_UIControlStateNormal);
  }

  get borderWidth(): number {
    return this._borderWidth;
  }
  set borderWidth(value: number) {
    this._borderWidth = value;
    // Native object's layer must be updated!
    // Yoga's borderWidth property only effects positioning of its child view.
    if (this._borderWidth === 0) {
      this.nativeObject.layer.borderWidth = 1;
      this.nativeObject.yoga.borderWidth = 1;
      this.borderColor = this.backgroundColor;
    } else {
      this.nativeObject.layer.borderWidth = value;
      this.nativeObject.yoga.borderWidth = value;
    }
  }

  addToHeaderBar(page: Page): void {
    this.nativeObject.layer.borderWidth = 0;
    this.nativeObject.yoga.borderWidth = 0;
    this._isAddedHeaderBar = true;
    if (parseInt(System.OSVersion) >= 13) {
      // Workaround For iOS 13, increase height navbar issue
      if (this._searchContainerView == undefined) {
        this._searchContainerView = __SF_SearchBarContainerView.createWithSearchBar(this.nativeObject);
      }
      page.nativeObject.navigationItem.titleView = this._searchContainerView;
    } else {
      page.nativeObject.navigationItem.titleView = this.nativeObject;
    }
  }

  removeFromHeaderBar(page: Page): void {
    this._isAddedHeaderBar = false;
    this.removeFocus();
    if (parseInt(System.OSVersion) >= 13) {
      this._searchContainerView = undefined;
      this.nativeObject.removeFromSuperview();
    }
    page.nativeObject.navigationItem.titleView = undefined;
  }

  showKeyboard(): void {
    this.nativeObject.becomeFirstResponder();
  }

  hideKeyboard(): void {
    this.nativeObject.resignFirstResponder();
  }

  requestFocus(): void {
    this.nativeObject.becomeFirstResponder();
  }

  removeFocus(): void {
    this.nativeObject.resignFirstResponder();
  }

  get font(): Font {
    return this.textfield.valueForKey('font');
  }
  set font(value: Font) {
    this.textfield.setValueForKey(value, 'font');
  }

  get textAlignment(): TextAlignment {
    return this._textAligment;
  }
  set textAlignment(value: TextAlignment) {
    this._textAligment = value;
    const numVal = value as number;

    // TODO: CHeck why parseInt was used because param is also a number value.
    // const vertical = parseInt(numVal / 3) === 0 ? 1 : parseInt(value / 3) === 1 ? 0 : 2;
    const vertical = numVal / 3 === 0 ? 1 : value / 3 === 1 ? 0 : 2;
    const horizontal = value % 3 === 0 ? 0 : value % 3 === 1 ? 1 : 2;

    this.textfield.setValueForKey(vertical, 'contentVerticalAlignment');
    this.textfield.setValueForKey(horizontal, 'textAlignment');
  }

  get hintTextColor(): Color {
    return this._hintTextColor;
  }
  set hintTextColor(value: Color) {
    this._hintTextColor = value;
    this.hint = this._hint;
  }

  get textFieldBackgroundColor(): Color {
    return new Color({
      color: this.nativeObject.valueForKey('searchField').valueForKey('backgroundColor')
    });
  }
  set textFieldBackgroundColor(value: Color) {
    this.nativeObject.valueForKey('searchField').setValueForKey(value.nativeObject, 'backgroundColor');
  }

  get onSearchBegin(): () => void {
    return this._onSearchBegin;
  }
  set onSearchBegin(value: () => void) {
    this._onSearchBegin = value;
  }

  get onSearchEnd(): () => void {
    return this._onSearchEnd;
  }
  set onSearchEnd(value: () => void) {
    this._onSearchEnd = value;
  }

  get onTextChanged(): (searchText: string) => void {
    return this._onTextChanged;
  }
  set onTextChanged(value: (searchText: string) => void) {
    this._onTextChanged = value;
  }

  get onSearchButtonClicked(): () => void {
    return this._onSearchButtonClicked;
  }
  set onSearchButtonClicked(value: () => void) {
    this._onSearchButtonClicked = value;
  }
}
