const FlexLayout = require("../flexlayout");

/**
 * @class UI.Dialog
 * @since 0.1
 * 
 * Dialog class provides showing user interfaces. Dialog has an embedded layout 
 * inside which you can use for adding views into Dialog.
 *
 *     @example
 *     const Dialog = require("sf-core/ui/dialog");
 *     const Button = require("sf-core/ui/button");
 *     const Color = require("sf-core/ui/color");
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
 *     myDialog.layout.applyLayout();
 *     myDialog.show();
 *
 */
function Dialog(params) {}

/**
 * Gets the layout of Dialog. You should add views to the layout of the dialog instance.
 *
 * @property {UI.FlexLayout} layout
 * @readonly
 * @android
 * @ios
 * @since 0.1
 */
Dialog.prototype.layout = new FlexLayout();

/**
 * Hides the dialog.
 * 
 * @method hide
 * @android
 * @ios
 * @since 0.1
*/
Dialog.prototype.hide = function (){};

/**
 * Shows the dialog.
 *
 * @method show
 * @since 0.1
 * @android
 * @ios
 */
Dialog.prototype.show = function (){};

module.exports = Dialog;