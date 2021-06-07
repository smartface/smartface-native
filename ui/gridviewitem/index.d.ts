import GridView from ".";
import ViewGroup from "../viewgroup";

export = GridViewItem;
/**
 * @class UI.GridViewItem
 * @since 3.0.2
 * @extends UI.ViewGroup
 *
 * GridViewItem class can used for a item layout of the GridView.
 * 
 * For example usage you can look {@link UI.GridViewItem}.
 *
 */
declare class GridViewItem extends ViewGroup {
  constructor(params?:any);
  width: number;
  height: number;
}
