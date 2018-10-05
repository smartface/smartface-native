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
Dialog.prototype.hide = function() {};

/**
 * Shows the dialog.
 *
 * @method show
 * @since 0.1
 * @android
 * @ios
 */
Dialog.prototype.show = function() {};

Dialog.prototype.android = {};

/**
 * Sets the theme style of dialog.
 *
 * @property {UI.Dialog.Android.Style} themeStyle
 * @android
 * @since 3.0.2
 */
Dialog.prototype.android.themeStyle = Dialog.Android.Style;


/**
 * This function hides keyboard.
 *
 * @method hideKeyboard
 * @android
 * @static
 * @since 3.0.1
 */
Dialog.prototype.android.hideKeyboard = function() {};


/** 
 * @enum UI.Dialog.Android.Style
 * @android
 * @since 3.0.2
 *
 * According to your requirements, you should choose of the theme enums.  
 *
 *     @example
 *     const Dialog = require("sf-core/ui/dialog");
 *     const Button = require("sf-core/ui/button");
 *     const Color = require("sf-core/ui/color");
 *
 *     var myDialog = new Dialog({
 *      android: {
 *          themeStyle: Dialog.Android.Style.ThemeNoHeaderBar
 *        }
 *     });
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
Dialog.prototype.Android.Style = {};


/**
 * This is default enum which will act as default when no themeStyle given.Default theme has no title bar and fills the entire screen.
 *
 * @property ThemeDefault
 * @static
 * @android
 * @readonly
 * @since 3.0.2
 */
Dialog.prototype.Android.Style.ThemeDefault;

/**
 * This theme with no header bar.  
 *
 * @property ThemeNoHeaderBar
 * @static
 * @android
 * @readonly
 * @since 3.0.2
 */
Dialog.prototype.Android.Style.ThemeNoHeaderBar;

/**
 * This theme has no title bar and fills the entire screen and extends into the display overscan region. 
 *
 * @property ThemeNoHeaderBarWithOverscan
 * @static
 * @android
 * @readonly
 * @since 3.0.2
 */
Dialog.prototype.Android.Style.ThemeNoHeaderBarWithOverscan;

/**
 * This theme  has no title bar and translucent system decor. 
 *
 * @property ThemeNoHeaderBarWithTranslucentDecor
 * @static
 * @android
 * @readonly
 * @since 3.0.2
 */
Dialog.prototype.Android.Style.ThemeNoHeaderBarWithTranslucentDecor;


module.exports = Dialog;
