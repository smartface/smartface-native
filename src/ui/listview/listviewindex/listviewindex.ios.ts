import ColorIOS from '../../color/color.ios';
import ViewIOS from '../../view/view.ios';
import { IListViewIndex } from './listviewindex';

export default class ListViewIndexIOS extends ViewIOS implements IListViewIndex {
  private _backgroundView?: IListViewIndex['backgroundView'];
  private _items: IListViewIndex['items'];
  constructor(args?: Partial<IListViewIndex>) {
    super(args);
    this.nativeObject.indexItemsForTableViewIndex = () => {
      let returnValue: any[] = [];
      returnValue = this.items.map((value) => {
        if (typeof value !== 'string') {
          return value.nativeObject;
        }
        return value;
      });
      return returnValue;
    };
    this.nativeObject.tableViewIndexDidSelect = (e: { index: number }) => {
      return this.indexDidSelect ? this.indexDidSelect(e.index) : false; //haptic
    };
  }
  protected createNativeObject() {
    return new __SF_SMFTableViewIndex();
  }
  indexDidSelect: (index: number) => void = () => {};

  get items() {
    return this._items;
  }
  set items(value) {
    this._items = value.slice();
  }

  get backgroundView() {
    if (this._backgroundView === undefined) {
      this._backgroundView = new ViewIOS();
      this._backgroundView.nativeObject = this.nativeObject.backgroundView;
    }
    return this._backgroundView;
  }
  get tintColor() {
    return new ColorIOS({ color: this.nativeObject.tintColor });
  }

  set tintColor(value: ColorIOS) {
    this.nativeObject.tintColor = value.nativeObject;
  }
  get itemSpacing() {
    return this.nativeObject.itemSpacing;
  }

  set itemSpacing(value) {
    this.nativeObject.itemSpacing = value;
  }

  get font() {
    return this.nativeObject.font;
  }

  set font(value) {
    this.nativeObject.font = value;
  }

  get indexInset(): IListViewIndex['indexInset'] {
    return this.nativeObject.indexInsetDictionary;
  }

  set indexInset(value: IListViewIndex['indexInset']) {
    this.nativeObject.indexInsetDictionary = value;
  }

  get indexOffset(): IListViewIndex['indexOffset'] {
    return this.nativeObject.indexOffsetDictionary;
  }

  set indexOffset(value: IListViewIndex['indexOffset']) {
    this.nativeObject.indexOffsetDictionary = value;
  }

  get listViewIndexMinimumWidth(): number {
    return this.nativeObject.minWidth;
  }

  set listViewIndexMinimumWidth(value: number) {
    this.nativeObject.minWidth = value;
  }
  reloadData() {
    this.nativeObject.reloadData();
  }
  resetFont() {
    this.nativeObject.resetFont();
  }
  resetItemSpacing() {
    this.nativeObject.resetItemSpacing();
  }
  resetIndexInset() {
    this.nativeObject.resetIndexInset();
  }
  resetIndexOffset() {
    this.nativeObject.resetIndexOffset();
  }
  resetAppearance() {
    this.nativeObject.resetAppearance();
  }
}
