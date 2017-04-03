/**
 * @class UI.Dialog
 * @since 0.1
 * 
 * Dialog class provides showing user interfaces. Dialog has an embedded layout 
 * inside which you can use for adding views into Dialog.
 *
 *     // todo Add example
 *
 */
function Dialog(params) {

    /**
     * Gets/sets the layout of Dialog. You should add views to the layout of the dialog instance.
     *
     * @property {UI.FlexLayout} layout
     * @android
     * @ios
     * @since 0.1
     */
    this.layout;
    
    /**
     * Hides the dialog.
     * 
     * @method hide
     * @android
     * @ios
     * @since 0.1
    */
    this.hide = function (){};
    
    /**
     * Shows the dialog.
     *
     * @method show
     * @since 0.1
     * @android
     * @ios
     */
    this.show = function (){};
}

module.exports = Dialog;