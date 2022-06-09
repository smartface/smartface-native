import { IColor } from '../../color/color';
import { IFont } from '../../font/font';
import { IImage } from '../../image/image';
import { IView } from '../../view/view';

export interface ListViewIndexInsetType {
  top: number;
  left: number;
  bottom: number;
  right: number;
}

export interface ListViewIndexOffsetType {
  vertical: number;
  horizontal: number;
}

export interface IListViewIndex extends IView {
  /**
   * Gets/sets items to display in the list index. The library support string images items.
   * @property {Array<string|UI.Image>} items
   * @since 1.0
   * @default
   */
  items: (string | IImage)[];
  /**
   * Gets/sets the callback function when clicked on an item.
   * @param {Number} index
   * @method
   * @since 1.0
   * @default
   */
  indexDidSelect: (index: number) => void;
  /**
   * Background view is displayed below the index items.
   * @property {UI.View} backgroundView
   * @since 1.0
   * @readonly
   * @default
   * @return {UI.View}
   */
  readonly backgroundView: IView;
  /**
   * Gets/sets the tintColor of the ListviewIndex. This property changes index items color.
   * @property {UI.Color} tintColor
   * @since 1.0
   * @default
   * @return {UI.Color}
   */
  tintColor: IColor;
  /**
   * Vertical spacing between the items. Equals to 1 point by default to match system appearance.
   * @property {number} itemSpacing
   * @since 1.0
   * @default
   * @return {number}
   */
  itemSpacing: number;

  /**
   * Font for the index view items. If not set, uses a default font which is chosen to match system appearance.
   * @property {UI.Font} font
   * @since 1.0
   * @default
   * @return {UI.Font}
   */
  font: IFont;

  /**
   * The distance that index items are inset from the enclosing background view. The property doesn't change the position of index items. Instead, it changes the size of the background view to match the inset. In other words, the background view "wraps" the content. Affects intrinsic content size.
   * @property {IndexInsetType} indexInset
   * @since 1.0
   * @default
   * @return {IndexInsetType}
   */
  indexInset: ListViewIndexInsetType;
  /**
   * The distance from the left (or right in case of right-to-left languages) border of the background view for which index items are shifted inside it. The property only affects the position of the index items and doesn't change the size of the background view.
   * @property {IndexOffsetType} indexOffset
   * @since 1.0
   * @default
   * @return {IndexOffsetType}
   */
  indexOffset: ListViewIndexOffsetType;
  /**
   * Minimum width of the view. Equals to 44 points by default to enable easy tapping.
   * @property {number} listviewIndexMinimumWidth
   * @since 1.0
   * @default
   * @return {number}
   */
  listViewIndexMinimumWidth: number;
  /**
   * Forces list index to reload its items. This causes list index to discard its current items and refill itself.
   * @method
   * @since 1.0
   * @default
   */
  reloadData(): void;
  /**
   * Resets font to default value to match the system index appearance.
   * @method
   * @since 1.0
   * @default
   */
  resetFont(): void;
  resetItemSpacing(): void;
  /**
   * Resets indexInset to default value to match the system index appearance.
   * @method
   * @since 1.0
   * @default
   */
  resetIndexInset(): void;

  /**
   * Resets indexOffset to default value to match the system index appearance.
   * @method
   * @since 1.0
   * @default
   */
  resetIndexOffset(): void;
  /**
   * Convenience method to reset basic styling to match the system index appearance. This includes background, font, itemSpacing, indexInset and indexOffset.
   * @method
   * @since 1.0
   * @default
   */
  resetAppearance(): void;
}
