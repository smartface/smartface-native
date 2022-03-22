import { ISelectablePicker } from '.';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import Color from '../color';
import { AbstractFont } from '../font/font';
import { SelectablePickerEvents } from './selectablepicker-events';

/**
 * This class doesn't exist on iOS side, therefore the class is left empty to not throw undefined errors on runtime and such.
 * This doesn't need any implementation.
 */
export default class SelectablePickerIOS<TEvent extends string = SelectablePickerEvents> extends NativeEventEmitterComponent<TEvent | SelectablePickerEvents> implements ISelectablePicker {
  protected createNativeObject() {
    return null;
  }
  items: string[];
  onSelected: (index?: number, selected?: boolean) => void;
  title: string;
  titleColor: Color;
  titleFont: AbstractFont;
  multiSelectEnabled: boolean;
  cancelable: boolean;
  checkedItems: number | number[];
  backgroundColor: Color;
  cancelButtonColor: Color;
  cancelButtonFont: AbstractFont;
  cancelButtonText: string;
  doneButtonColor: Color;
  doneButtonText: string;
  doneButtonFont: AbstractFont;
  show(): void {
    throw new Error('SelectablePicker is not available on iOS. Make sure to wrap the creation with OS check before using SelectablePicker.');
  }
  toString() {
    return 'SelectablePicker';
  }
}
