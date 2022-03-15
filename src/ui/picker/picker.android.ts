import { IPicker } from '.';
import AndroidConfig from '../../util/Android/androidconfig';
import LayoutParams from '../../util/Android/layoutparams';
import TypeValue from '../../util/Android/typevalue';
import Color from '../color';
import { ViewAndroid } from '../view/view.android';
import { PickerEvents } from './picker-events';

const NativeColorDrawable = requireClass('android.graphics.drawable.ColorDrawable');
const NativeNumberPicker = requireClass('android.widget.NumberPicker');
const NativeFrameLayout = requireClass('android.widget.FrameLayout');
const NativeAlertDialog = requireClass('android.app.AlertDialog');
const NativeDialogInterface = requireClass('android.content.DialogInterface');
const NativeTextView = requireClass('android.widget.TextView');
const NativeRString = requireClass('android.R').string;

const CENTER = 17;

export default class PickerAndroid<TEvent extends PickerEvents> extends ViewAndroid<TEvent | PickerEvents> implements IPicker<TEvent | PickerEvents> {
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
  protected _title: IPicker['title'];
  private buttonCustomize = false;
  protected dialogInstance: any;

  constructor(params: Partial<IPicker> = {}) {
    super(params);
    this.setOnSelectedEvent();
    this.androidProperties();
  }
  get items(): IPicker['items'] {
    return this._items; //TODO: Returns self.nativeObject.getDisplayValues() after string problem is solved.
  }
  set items(value: IPicker['items']) {
    this._items = value;
    this.setNumberPicker(value);
  }
  get currentIndex(): IPicker['currentIndex'] {
    return this.nativeObject.getValue();
  }
  set currentIndex(value: IPicker['currentIndex']) {
    this.nativeObject.setValue(value);
  }
  get onSelected(): IPicker['onSelected'] {
    return this._onSelected;
  }
  set onSelected(value: IPicker['onSelected']) {
    this._onSelected = value;
  }
  get okColor(): IPicker['okColor'] {
    return this._okColor;
  }
  set okColor(value: IPicker['okColor']) {
    this.buttonCustomize = true;
    this._okColor = value;
  }
  get textColor(): IPicker['textColor'] {
    return this._textColor;
  }
  set textColor(value: IPicker['textColor']) {
    this.nativeObject.setTextColor(value?.nativeObject);
  }
  get dialogBackgroundColor(): IPicker['dialogBackgroundColor'] {
    return this._backgroundColor;
  }
  set dialogBackgroundColor(value: IPicker['dialogBackgroundColor']) {
    this._backgroundColor = value;
    if (this._backgroundColor instanceof Color) this.dialogInstance?.getWindow().setBackgroundDrawable(new NativeColorDrawable(this._backgroundColor.nativeObject));
  }
  get cancelColor(): IPicker['cancelColor'] {
    return this._cancelColor;
  }
  set cancelColor(value: IPicker['cancelColor']) {
    this.buttonCustomize = true;
    this._cancelColor = value;
  }
  get cancelText(): IPicker['cancelText'] {
    return this._cancelText;
  }
  set cancelText(value: IPicker['cancelText']) {
    this.buttonCustomize = true;
    this._cancelText = value;
  }
  get okText(): IPicker['okText'] {
    return this._cancelText;
  }
  set okText(value: IPicker['okText']) {
    this.buttonCustomize = true;
    this._okText = value;
  }
  get okFont(): IPicker['okFont'] {
    return this._okFont;
  }
  set okFont(value: IPicker['okFont']) {
    this.buttonCustomize = true;
    this._okFont = value;
  }
  get cancelFont(): IPicker['cancelFont'] {
    return this._okFont;
  }
  set cancelFont(value: IPicker['cancelFont']) {
    this.buttonCustomize = true;
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

  show(ok?: (param?: { index: number }) => void, cancel?: () => void): void {
    const layout = this.addViewToLayout();

    const cancelListener = NativeDialogInterface.OnClickListener.implement({
      onClick: function (dialogInterface: any, i: number) {
        cancel?.();
      }
    });

    const doneListener = NativeDialogInterface.OnClickListener.implement({
      onClick: (dialogInterface: any, i: number) => {
        ok?.({
          index: this.currentIndex
        });
      }
    });

    const builder = new NativeAlertDialog.Builder(AndroidConfig.activity);
    builder.setView(layout);
    builder.setNegativeButton(NativeRString.cancel, cancelListener);
    builder.setPositiveButton(NativeRString.ok, doneListener);

    builder.setCustomTitle(this.__createTitleView());

    const alertDialog = builder.show(); //return native alertdailog
    this.dialogInstance = alertDialog;
    // re-set background color
    this._backgroundColor = this._backgroundColor;

    if (this.buttonCustomize) {
      const negativeButton = alertDialog.getButton(NativeDialogInterface.BUTTON_NEGATIVE);
      const positiveButton = alertDialog.getButton(NativeDialogInterface.BUTTON_POSITIVE);
      this.cancelText && negativeButton.setText(this.cancelText);
      this.okText && positiveButton.setText(this.okText);
      this.cancelColor && negativeButton.setTextColor(this.cancelColor.nativeObject);
      this.okColor && positiveButton.setTextColor(this.okColor.nativeObject);
      this.okFont && positiveButton.setTypeface(this.okFont.nativeObject);
      this.cancelFont && negativeButton.setTypeface(this.cancelFont.nativeObject);
    }
  }

  toString() {
    return 'Picker';
  }

  private androidProperties() {
    const self = this;
    this.addAndroidProps({
      get enabled(): IPicker['android']['enabled'] {
        return self.nativeObject.isEnabled();
      },
      set enabled(value: IPicker['android']['enabled']) {
        self.nativeObject.setEnabled(value);
      }
    });
  }

  private __createTitleView() {
    const titleTextView = new NativeTextView(AndroidConfig.activity);
    titleTextView.setText(this.title);
    titleTextView.setBackgroundColor(Color.TRANSPARENT.nativeObject);
    titleTextView.setPaddingRelative(10, 20, 10, 10);
    titleTextView.setGravity(CENTER);

    this.titleColor && titleTextView.setTextColor(this.titleColor.nativeObject);
    this.titleFont && titleTextView.setTypeface(this.titleFont.nativeObject);
    this.titleFont && titleTextView.setTextSize(TypeValue.COMPLEX_UNIT_DIP, this.titleFont.size);

    return titleTextView;
  }

  private setOnSelectedEvent() {
    const onScrollListener = NativeNumberPicker.OnScrollListener.implement({
      onScrollStateChange: (picker, scrollState) => {
        if (scrollState === NativeNumberPicker.OnScrollListener.SCROLL_STATE_IDLE) {
          this.emit('selected', this.currentIndex);
          this._onSelected?.(this.currentIndex);
        }
      }
    });
    this.nativeObject.setOnScrollListener(onScrollListener);
  }

  private setNumberPicker(items: IPicker['items']) {
    if (!items.length) {
      return;
    }
    this.nativeObject.setDisplayedValues(null);
    this.nativeObject.setMaxValue(items.length - 1);
    this.nativeObject.setMinValue(0);
    this.nativeObject.setDescendantFocusability(NativeNumberPicker.FOCUS_BLOCK_DESCENDANTS);
    this.nativeObject.setDisplayedValues(array(items.slice(), 'java.lang.String'));
    this.nativeObject.setWrapSelectorWheel(false);
  }

  private addViewToLayout() {
    const layout = new NativeFrameLayout(AndroidConfig.activity);
    const parent = this.nativeObject.getParent();
    parent?.removeView(this.nativeObject);

    layout.addView(
      this.nativeObject,
      new NativeFrameLayout.LayoutParams(
        LayoutParams.MATCH_PARENT, // FrameLayout.LayoutParams.MATCH_PARENT
        LayoutParams.WRAP_CONTENT, // FrameLayout.LayoutParams.WRAP_CONTENT
        17 // Gravity.CENTER
      )
    );
    return layout;
  }
}
