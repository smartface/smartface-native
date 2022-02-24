import { ISelectablePicker } from '.';
import { EventListenerCallback } from '../../core/eventemitter';
import NativeComponent from '../../core/native-component';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import { TypeValue } from '../../util';
import Color from '../color';
import Font from '../font';
import { SelectablePickerEvents } from './selectablepicker-events';

const NativeAlertDialog = requireClass('android.app.AlertDialog');
const NativeDialogInterface = requireClass('android.content.DialogInterface');
const NativeTextView = requireClass('android.widget.TextView');
const NativeColorDrawable = requireClass('android.graphics.drawable.ColorDrawable');

interface Listeners {
  cancelButtonListener?: any;
  doneButtonListener?: any;
  singleSelectListener?: any;
  multiSelectListener?: any;
}

const CENTER = 17; //Gravity.CENTER

export default class SelectablePickerAndroid<TEvent extends SelectablePickerEvents>
  extends NativeEventEmitterComponent<TEvent | SelectablePickerEvents>
  implements ISelectablePicker<TEvent | SelectablePickerEvents>
{
  private _items: ISelectablePicker['items'] = [];
  private _multiSelectEnabled: ISelectablePicker['multiSelectEnabled'] = false;
  private _cancelable: ISelectablePicker['cancelable'] = true;
  private _checkedItem: number = -1;
  private _checkedItems: ISelectablePicker['checkedItems'] = [];
  private _backgroundColor: ISelectablePicker['backgroundColor'];
  private _selectedItems: number[] = [];
  private _onSelected: ISelectablePicker['onSelected'];
  private _listeners: Listeners = {};
  private _isShowed = false;
  private _doneButtonText: ISelectablePicker['doneButtonText'] = 'Ok';
  private _doneButtonFont: ISelectablePicker['doneButtonFont'];
  private _doneButtonColor: ISelectablePicker['doneButtonColor'];
  private _cancelButtonText: ISelectablePicker['cancelButtonText'] = 'Cancel';
  private _cancelButtonFont: ISelectablePicker['cancelButtonFont'];
  private _cancelButtonColor: ISelectablePicker['cancelButtonColor'];
  private _titleFont: ISelectablePicker['titleFont'];
  private _titleColor: ISelectablePicker['titleColor'] = Color.BLACK;
  private _title: ISelectablePicker['title'];
  constructor(params: Partial<ISelectablePicker> = {}) {
    super();

    for (const param in params) {
      this[param] = params[param];
    }
  }
  get items(): ISelectablePicker['items'] {
    return this._items;
  }
  set items(value: ISelectablePicker['items']) {
    this._items = value;
  }
  get multiSelectEnabled(): ISelectablePicker['multiSelectEnabled'] {
    return this._multiSelectEnabled;
  }
  set multiSelectEnabled(value: ISelectablePicker['multiSelectEnabled']) {
    if (!this._isShowed) {
      return;
    }
    this._multiSelectEnabled = value;
  }
  get cancelable(): ISelectablePicker['cancelable'] {
    return this._cancelable;
  }
  set cancelable(value: ISelectablePicker['cancelable']) {
    this._cancelable = value;
  }
  get checkedItems(): ISelectablePicker['checkedItems'] {
    return this._multiSelectEnabled ? this._checkedItems : this._checkedItem;
  }
  set checkedItems(value: ISelectablePicker['checkedItems']) {
    if (this._multiSelectEnabled && Array.isArray(value)) {
      this._checkedItems = value;
    } else if (typeof value === 'number' && value > -1) {
      this._checkedItem = value;
    }
  }
  get backgroundColor(): ISelectablePicker['backgroundColor'] {
    return this._backgroundColor;
  }
  set backgroundColor(value: ISelectablePicker['backgroundColor']) {
    this._backgroundColor = value;
  }
  get onSelected(): ISelectablePicker['onSelected'] {
    return this._onSelected;
  }
  set onSelected(value: ISelectablePicker['onSelected']) {
    this._onSelected = value;
  }

  get titleFont(): ISelectablePicker['titleFont'] {
    return this._titleFont;
  }
  set titleFont(value: ISelectablePicker['titleFont']) {
    this._titleFont = value;
  }
  get title(): ISelectablePicker['title'] {
    return this._title;
  }
  set title(value: ISelectablePicker['title']) {
    this._title = value;
  }
  get titleColor(): ISelectablePicker['titleColor'] {
    return this._titleColor;
  }
  set titleColor(value: ISelectablePicker['titleColor']) {
    this._titleColor = value;
  }
  get cancelButtonColor(): ISelectablePicker['cancelButtonColor'] {
    return this._cancelButtonColor;
  }
  set cancelButtonColor(value: ISelectablePicker['cancelButtonColor']) {
    this._cancelButtonColor = value;
  }
  get cancelButtonFont(): ISelectablePicker['cancelButtonFont'] {
    return this._cancelButtonFont;
  }
  set cancelButtonFont(value: ISelectablePicker['cancelButtonFont']) {
    this._cancelButtonFont = value;
  }
  get cancelButtonText(): ISelectablePicker['cancelButtonText'] {
    return this._cancelButtonText;
  }
  set cancelButtonText(value: ISelectablePicker['cancelButtonText']) {
    this._cancelButtonText = value;
  }
  get doneButtonColor(): ISelectablePicker['doneButtonColor'] {
    return this._doneButtonColor;
  }
  set doneButtonColor(value: ISelectablePicker['doneButtonColor']) {
    this._doneButtonColor = value;
  }
  get doneButtonText(): ISelectablePicker['doneButtonText'] {
    return this._doneButtonText;
  }
  set doneButtonText(value: ISelectablePicker['doneButtonText']) {
    this._doneButtonText = value;
  }
  get doneButtonFont(): ISelectablePicker['doneButtonFont'] {
    return this._doneButtonFont;
  }
  set doneButtonFont(value: ISelectablePicker['doneButtonFont']) {
    this._doneButtonFont = value;
  }
  show(done: (param: { items: number | number[] }) => void, cancel: () => void): void {
    const checkedItemsBoolean = Array(this._items.length).fill(false);
    const doneButtonListener = this.createDoneButtonListener(done);
    const cancelButtonListener = this.createCancelButtonListener(cancel);
    const choosingItemListener = this._multiSelectEnabled ? this.createMultiSelectListener() : this.createSingleSelectListener();

    this._selectedItems = [];
    this._isShowed = true;
    this.nativeObject.setPositiveButton(this.doneButtonText, doneButtonListener);
    this.nativeObject.setNegativeButton(this.cancelButtonText, cancelButtonListener);

    if (this._multiSelectEnabled && Array.isArray(this._checkedItems)) {
      this._checkedItems.forEach((checkedItem) => {
        if (checkedItem > -1) {
          checkedItemsBoolean[checkedItem] = true;
          this._selectedItems.push(checkedItem);
        }
      });

      this.nativeObject.setMultiChoiceItems(array(this._items, 'java.lang.String'), array(checkedItemsBoolean, 'boolean'), choosingItemListener);
    } else {
      if (this._checkedItem > -1) {
        this._selectedItems[0] = this._checkedItem;
      }
      this.nativeObject.setSingleChoiceItems(array(this._items, 'java.lang.String'), this._checkedItem, choosingItemListener);
    }

    if (this.title) {
      this.nativeObject.setCustomTitle(this.__createTitleView());
    }
    this.nativeObject.setCancelable(this._cancelable);

    const alertDialog = this.nativeObject.show();
    this.customizeDialog(alertDialog);
  }

  toString() {
    return 'SelectablePicker';
  }

  private customizeDialog(alertDialog: any) {
    if (this.backgroundColor) {
      alertDialog.getWindow().setBackgroundDrawable(new NativeColorDrawable(this._backgroundColor.nativeObject));
    }
    const negativeButton = alertDialog.getButton(NativeDialogInterface.BUTTON_NEGATIVE);
    const positiveButton = alertDialog.getButton(NativeDialogInterface.BUTTON_POSITIVE);

    this.__makeCustomizeButton(negativeButton, positiveButton);
  }

  private __makeCustomizeButton(negativeButton: any, positiveButton: any) {
    this.cancelButtonText && negativeButton.setText(this.cancelButtonText);
    this.doneButtonText && positiveButton.setText(this.doneButtonText);
    this.cancelButtonColor && negativeButton.setTextColor(this.cancelButtonColor.nativeObject);
    this.doneButtonColor && positiveButton.setTextColor(this.doneButtonColor.nativeObject);
    this.cancelButtonFont && negativeButton.setTypeface(this.cancelButtonFont.nativeObject);
    this.doneButtonFont && positiveButton.setTypeface(this.doneButtonFont.nativeObject);
  }

  private createSingleSelectListener() {
    if (!this._listeners.singleSelectListener) {
      this._listeners.singleSelectListener = NativeDialogInterface.OnClickListener.implement({
        onClick: (dialogInterface: any, i: number) => {
          this.emit('selected', i, true);
          this._onSelected?.(i, true);
          this._selectedItems[0] = i;
        }
      });
    }
    return this._listeners.singleSelectListener;
  }

  private createMultiSelectListener() {
    if (!this._listeners.multiSelectListener) {
      this._listeners.multiSelectListener = NativeDialogInterface.OnMultiChoiceClickListener.implement({
        onClick: (dialogInterface: any, i: number, selected: boolean) => {
          this.emit('selected', i, selected);
          this._onSelected?.(i, selected);
          if (selected) {
            this._selectedItems.push(i);
          } else {
            if (this._selectedItems.indexOf(i) > -1) {
              this._selectedItems.splice(this._selectedItems.indexOf(i), 1);
            }
          }
        }
      });
    }
    return this._listeners.multiSelectListener;
  }

  private createCancelButtonListener(cancelCallback: () => void) {
    if (!this._listeners.cancelButtonListener) {
      this._listeners.cancelButtonListener = NativeDialogInterface.OnClickListener.implement({
        onClick: (dialogInterface: any, i: number) => {
          cancelCallback?.();
        }
      });
    }
    return this._listeners.cancelButtonListener;
  }

  private createDoneButtonListener(doneCallback: (e?: { items: number | number[] }) => void) {
    if (!this._listeners.doneButtonListener) {
      this._listeners.doneButtonListener = NativeDialogInterface.OnClickListener.implement({
        onClick: (dialogInterface: any, i: number) => {
          const items = this._multiSelectEnabled ? this._selectedItems : this._selectedItems[0];
          doneCallback?.({
            items
          });
        }
      });
    }
    return this._listeners.doneButtonListener;
  }

  private __createTitleView() {
    const titleTextView = new NativeTextView(AndroidConfig.activity);
    titleTextView.setText(this.title);
    titleTextView.setBackgroundColor(Color.TRANSPARENT.nativeObject);
    titleTextView.setPaddingRelative(10, 20, 10, 10);
    titleTextView.setGravity(CENTER);

    if (this.titleColor) {
      titleTextView.setTextColor(this.titleColor.nativeObject);
    }
    if (this.titleFont) {
      titleTextView.setTypeface(this.titleFont.nativeObject);
      titleTextView.setTextSize(TypeValue.COMPLEX_UNIT_DIP, this.titleFont.size);
    }
    return titleTextView;
  }
}
