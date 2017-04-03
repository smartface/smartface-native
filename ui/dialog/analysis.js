/**
 * @class UI.Dialog
 * @since 0.1
 * 
 * Dialog class provides showing user interfaces. Dialog has an embedded layout 
 * inside which you can use for adding views into Dialog.
 *
 *     @example
 *     const Dialog = require("nf-core/ui/dialog");
 *     const Button = require("nf-core/ui/button");
 *     const Color = require("nf-core/ui/color");
 *     var myDialog = new Dialog();
 *     
 *     var myButton = new Button({
 *         width: 100,
 *         height: 80,
 *         backgroundColor: Color.BLUE,
 *         text: "Hide Dialog",
 *         onPress: function() {
 *             myDialog.hide();
 *         }
 *     });
 * 
 *     myDialog.layout.addChild(myButton);
 *     myDialog.show();
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