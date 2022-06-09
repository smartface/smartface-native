import { IColor } from '../color/color';
import Font from '../font';
import { SelectablePickerEvents } from './selectablepicker-events';
import NativeEventEmitterComponent from '../../core/native-event-emitter-component';

export declare interface ISelectablePicker<TEvent extends string = SelectablePickerEvents> extends NativeEventEmitterComponent<TEvent> {
  /**
   * Gets/sets items of the SelectablePicker.
   *
   * @property {Array} items
   * @android
   * @since 4.0.5
   */
  items: string[];
  /**
   * This event is called when an item is selected/unselected on the SelectablePicker.
   * If multiSelectEnabled is false, selected will be always true.
   *
   * @param {Number} index
   * @param {Boolean} selected
   * @event onSelected
   * @deprecated
   * @android
   * @since 4.0.5
   * @example
   * ```
   * import SelectablePicker from '@smartface/native/ui/selectablepicker';
   *
   * const selectablePicker = new SelectablePicker();
   * selectablePicker.on(SelectablePicker.Events.Selected, (params) => {
   *  console.info('onSelected', params);
   * });
   * ```
   */
  onSelected: (index?: number, selected?: boolean) => void;
  /**
   * Gets/sets title of the SelectablePicker.
   * This property only works with show method. Must set before show method.
   *
   * @property {String} [title = Picker]
   * @android
   * @since 4.0.5
   */
  title: string;
  /**
   * Gets/sets titleColor of the SelectablePicker.
   * This property only works with show method. Must set before show method.
   *
   * @property {UI.Color} [titleColor = Color.BLACK]
   * @android
   * @since 4.0.5
   */
  titleColor: IColor;
  /**
   * Gets/sets titleFont of the SelectablePicker.
   * This property only works with show method. Must set before show method.
   *
   * @property {UI.Font} titleFont
   * @android
   * @since 4.0.5
   */
  titleFont: Font;
  /**
   * Gets/sets multiSelectEnabled of the SelectablePicker. You must set this property in constructor
   * and can not change this property on run-time. Otherwise SelectablePicker may not work properly.
   * This property only works with show method. Must set before show method.
   *
   * @property {Boolean} [multiSelectEnabled = false]
   * @android
   * @since 4.0.5
   */
  multiSelectEnabled: boolean;
  /**
   * Gets/sets cancelable of the SelectablePicker. If click outside of dialog, it will be canceled.
   * This property only works with show method. Must set before show method.
   *
   * @property {Boolean} [cancelable = true]
   * @android
   * @since 4.0.5
   */
  cancelable: boolean;
  /**
   * Gets/sets checkedItems of the SelectablePicker.
   * If multiSelectEnabled is false, checkedItems must be a spesific index of the items array or array of index.
   * This property only works with show method. Must set before show method.
   *
   * @property {Number|Array} [checkedItems = -1]
   * @android
   * @since 4.0.5
   */
  checkedItems: number | number[];
  /**
   * Gets/sets backgroundColor of the SelectablePicker.
   * This property only works with show method. Must set before show method.
   *
   * @property {UI.Color} [backgroundColor = Color.WHITE]
   * @android
   * @since 4.0.5
   */
  backgroundColor: IColor;
  /**
   * Gets/sets cancelButtonColor of the SelectablePicker.
   * This property only works with show method. Must set before show method.
   *
   * @property {UI.Color} cancelButtonColor
   * @android
   * @since 4.0.5
   */
  cancelButtonColor: IColor;

  /**
   * Gets/sets cancelButtonFont of the SelectablePicker.
   * This property only works with show method. Must set before show method.
   *
   * @property {UI.Font} cancelButtonFont
   * @android
   * @since 4.0.5
   */
  cancelButtonFont: Font;
  /**
   * Gets/sets cancelButtonText of the SelectablePicker.
   * This property only works with show method. Must set before show method.
   *
   * @property {String} [cancelButtonText = Cancel]
   * @android
   * @since 4.0.5
   */
  cancelButtonText: string;
  /**
   * Gets/sets doneButtonColor of the SelectablePicker.
   * This property only works with show method. Must set before show method.
   *
   * @property {UI.Color} doneButtonColor
   * @android
   * @since 4.0.5
   */
  doneButtonColor: IColor;
  /**
   * Gets/sets doneButtonText of the SelectablePicker.
   * This property only works with show method. Must set before show method.
   *
   * @property {String} [doneButtonText = Ok]
   * @android
   * @since 4.0.5
   */
  doneButtonText: string;
  /**
   * Gets/sets doneButtonFont of the SelectablePicker.
   * This property only works with show method. Must set before show method.
   *
   * @property {UI.Font} doneButtonFont
   * @android
   * @since 4.0.5
   */
  doneButtonFont: Font;
  /**
   * This function shows SelectablePicker in a dialog.
   *
   * @param {Function} done This event is called when user clicks done button.
   * @param {Object} done.param
   * @param {Number|Array} done.param.items If multiSelectEnabled is false, items will be index of selected item, otherwise array of selected items's indexs
   * @param {Function} cancel This event is called when user clicks cancel button.
   * @method show
   * @android
   * @since 4.0.5
   */
  show(done: (param: { items: number | number[] }) => void, cancel: () => void): void;
}
