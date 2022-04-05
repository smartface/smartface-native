import { IPicker, PickerIOSProperties } from './picker';
import Color from '../color';
import ViewIOS from '../view/view.ios';
import { PickerEvents } from './picker-events';

export default class PickerIOS<TEvent extends PickerEvents> extends ViewIOS<TEvent | PickerEvents, PickerIOSProperties> implements IPicker<TEvent | PickerEvents> {
  protected createNativeObject() {
    return new __SF_UIPickerView();
  }
  protected _items: IPicker['items'] = [];
  protected _onSelected: IPicker['onSelected'];
  protected _okColor: IPicker['okColor'];
  protected _cancelColor: IPicker['cancelColor'];
  protected _okFont: IPicker['okFont'];
  protected _cancelFont: IPicker['cancelFont'];
  protected _okText: IPicker['okText'];
  protected _cancelText: IPicker['cancelText'];
  protected _textColor: IPicker['textColor'];
  protected _titleFont: IPicker['titleFont'];
  protected _titleColor: IPicker['titleColor'] = Color.BLACK;
  protected _title: IPicker['title'] = '';
  protected _currentIndex: IPicker['currentIndex'];
  protected _onSelectedCallback: IPicker['onSelected'];
  private pickerDelegate: __SF_UIPickerViewDelegate;
  private pickerDataSource: __SF_UIPickerViewDataSource;
  private _cancelHighlightedColor?: Color;
  private _okHighlightedColor?: Color;

  constructor(params: Partial<IPicker> = {}) {
    super(params);

    //#region UIPickerViewDataSource
    this.pickerDataSource = new __SF_UIPickerViewDataSource();
    this.pickerDataSource.numberOfComponents = () => 1;
    this.pickerDataSource.numberOfRowsInComponent = () => this.items.length;
    this.nativeObject.dataSource = this.pickerDataSource;
    //#endregion

    //#region Picker Delegate
    this.pickerDelegate = new __SF_UIPickerViewDelegate();
    this.pickerDelegate.titleForRow = (e) => {
      return this.items[e.row];
    };
    this.pickerDelegate.didSelectRow = (e) => {
      this._currentIndex = e.row;
      this.emit('selected', e.row);
      this._onSelectedCallback?.(e.row);
    };
    this.nativeObject.delegate = this.pickerDelegate;
    //#endregion

    this.setIOSProperties();
  }
  show(ok?: (param?: { index: number }) => void, cancel?: () => void): void {
    const okFunc = function (e) {
      ok?.({
        index: e.index
      });
    };
    const cancelFunc = function (e) {
      cancel?.();
    };

    this.nativeObject.show(
      this.nativeObject,
      this.title,
      cancelFunc,
      okFunc,
      this.titleColor?.nativeObject,
      this.titleFont,
      this.cancelColor?.nativeObject,
      this.ios.cancelHighlightedColor?.nativeObject,
      this.cancelFont,
      this.okColor?.nativeObject,
      this.ios.okHighlightedColor?.nativeObject,
      this.okFont,
      this.okText,
      this.cancelText
    );
  }

  get items(): IPicker['items'] {
    return this.nativeObject.items;
  }
  set items(value: IPicker['items']) {
    this.nativeObject.items = value;
    this.nativeObject.reloadAllComponents();
  }
  get currentIndex(): IPicker['currentIndex'] {
    return this._currentIndex;
  }
  set currentIndex(value: IPicker['currentIndex']) {
    this._currentIndex = value;
    const defaultComponentIndex = 0; // native does not support multi components.
    this.nativeObject.selectRowInComponentAnimated(value, defaultComponentIndex, true);
  }
  get onSelected(): IPicker['onSelected'] {
    return this._onSelectedCallback;
  }
  set onSelected(value: IPicker['onSelected']) {
    this._onSelectedCallback = value;
  }
  get okColor(): IPicker['okColor'] {
    return this._okColor;
  }
  set okColor(value: IPicker['okColor']) {
    this._okColor = value;
  }
  get textColor(): IPicker['textColor'] {
    if (this.nativeObject.textColor === undefined) {
      return undefined;
    }
    return new Color({
      color: this.nativeObject.textColor
    });
  }
  set textColor(value: IPicker['textColor']) {
    this.nativeObject.textColor = value?.nativeObject || undefined;
    this.nativeObject.reloadAllComponents();
  }
  get dialogBackgroundColor(): IPicker['dialogBackgroundColor'] {
    return new Color({
      color: this.nativeObject.dialogBackgroundColor
    });
  }
  set dialogBackgroundColor(value: IPicker['dialogBackgroundColor']) {
    if (value instanceof Color) this.nativeObject.dialogBackgroundColor = value.nativeObject;
  }
  get cancelColor(): IPicker['cancelColor'] {
    return this._cancelColor;
  }
  set cancelColor(value: IPicker['cancelColor']) {
    this._cancelColor = value;
  }
  get cancelText(): IPicker['cancelText'] {
    return this._cancelText;
  }
  set cancelText(value: IPicker['cancelText']) {
    this._cancelText = value;
  }
  get okText(): IPicker['okText'] {
    return this._cancelText;
  }
  set okText(value: IPicker['okText']) {
    this._okText = value;
  }
  get okFont(): IPicker['okFont'] {
    return this._okFont;
  }
  set okFont(value: IPicker['okFont']) {
    this._okFont = value;
  }
  get cancelFont(): IPicker['cancelFont'] {
    return this._okFont;
  }
  set cancelFont(value: IPicker['cancelFont']) {
    this._cancelFont = value;
  }
  get titleFont(): IPicker['titleFont'] {
    return this._titleFont;
  }
  set titleFont(value: IPicker['titleFont']) {
    this._titleFont = value;
  }
  get title(): IPicker['title'] {
    return this._title;
  }
  set title(value: IPicker['title']) {
    this._title = value;
  }
  get titleColor(): IPicker['titleColor'] {
    return this._titleColor;
  }
  set titleColor(value: IPicker['titleColor']) {
    this._titleColor = value;
  }

  private setIOSProperties() {
    const self = this;

    this.addIOSProps({
      get dialogLineColor(): IPicker['ios']['dialogLineColor'] {
        return new Color({
          color: self.nativeObject.dialogLineColor
        });
      },
      set dialogLineColor(value: IPicker['ios']['dialogLineColor']) {
        self.nativeObject.dialogLineColor = value?.nativeObject;
      },
      get rowHeight(): IPicker['ios']['rowHeight'] {
        return self.nativeObject.delegate.rowHeight;
      },
      set rowHeight(value: IPicker['ios']['rowHeight']) {
        self.nativeObject.delegate.rowHeight = value || 0;
      },
      get cancelHighlightedColor(): IPicker['ios']['cancelHighlightedColor'] {
        return self._cancelHighlightedColor;
      },
      set cancelHighlightedColor(value: IPicker['ios']['cancelHighlightedColor']) {
        self._cancelHighlightedColor = value;
      },
      get okHighlightedColor(): IPicker['ios']['okHighlightedColor'] {
        return self._okHighlightedColor;
      },
      set okHighlightedColor(value: IPicker['ios']['okHighlightedColor']) {
        self._okHighlightedColor = value;
      }
    });
  }
}
