/**
 * @class UI.ListViewController
 * @since 0.1
 * ListViewController is provide a binding from data set to views that are 
 * displayed within a ListView.
 *
 *     @example
 *     // @todo write example
 * 
 */
function ListViewController(){
    
    /**
     * This event will be fired when the ListView created ListViewItem template. 
     * You should return ListViewItem inside this event.
     * 
     *     @example
     *     // @todo write example
     * 
     * @event onRowCreate
     * @return {UI.ListViewItem}
     * @since 0.1
     */
    this.onRowCreate = function onRowCreate(){};
    
    /**
     * This event will be fired when the ListView created row at specific index.
     * You can customize the list view item inside this callback.
     * 
     *     @example
     *     // @todo write example
     * 
     * @param {UI.ListViewItem} listViewItem
     * @param {Number} index
     * @event onRowBind
     * @since 0.1
     */
    this.onRowBind = function onRowBind(listViewItem, index){};
    
    /**
     * This event will be fired when user clicks the row at specific index.
     * 
     *     @example
     *     // @todo write example
     * 
     * @event onRowSelected
     * @since 0.1
     */
    this.onRowSelected = function onRowSelected(listViewItem, index){};
}


module.exports = ListViewController;