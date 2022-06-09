import { MobileOSProps } from '../../../core/native-mobile-component';
import { IColor } from '../../color/color';
import Font from '../../font';
import { IImage, ImageIOSProps, ImageAndroidProps } from '../../image/image';
import { IView, ViewIOSProps, ViewAndroidProps } from '../../view/view';
import ViewAndroid from '../../view/view.android';
import { IListViewIndex, ListViewIndexInsetType, ListViewIndexOffsetType } from './listviewindex';

export default class ListViewIndexAndroid extends ViewAndroid implements IListViewIndex {
  items: (string | IImage<any, MobileOSProps<ImageIOSProps, ImageAndroidProps>>)[];
  indexDidSelect: (index: number) => void;
  backgroundView: IView<'touch' | 'touchCancelled' | 'touchEnded' | 'touchMoved', { [key: string]: any }, MobileOSProps<ViewIOSProps, ViewAndroidProps>>;
  tintColor: IColor;
  itemSpacing: number;
  font: Font;
  indexInset: ListViewIndexInsetType;
  indexOffset: ListViewIndexOffsetType;
  listViewIndexMinimumWidth: number;
  reloadData(): void {}
  resetFont(): void {}
  resetItemSpacing(): void {}
  resetIndexInset(): void {}
  resetIndexOffset(): void {}
  resetAppearance(): void {}
}
