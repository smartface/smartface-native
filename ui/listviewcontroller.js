
/**
 * @class UI.ListViewController
 * @since 0.1
 * //@todo write explanation.
 *
 *     @example
 *     // @todo write example
 * 
 */
function ListViewController(){
    
    /**
     * //@todo write explanation.
     * 
     *     @example
     *     // @todo write example
     * 
     * @event onRowCreate
     * @since 0.1
     */
    this.onRowCreate = function onRowCreate(){};
    
    /**
     * //@todo write explanation.
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
     * //@todo write explanation.
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