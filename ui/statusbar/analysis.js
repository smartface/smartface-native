/**
 * @class UI.StatusBar
 * 
 * This class represents status bar object. Creating instance of
 * StatusBar is not valid since you can't use in anywhere. If you
 * want to access status bar object you can access via 
 * UI.Page.statusBar property of your page.
 *
 *     @example
 *     const StatusBarStyle = require('nf-core/ui/statusbarstyle');
 *     const Color = require('nf-core/ui/color');
 *     const Page = require('nf-core/ui/page');
 *     var myPage = new Page({
 *         onShow: function() {
 *             this.statusBar.visible = true;
 *             this.statusBar.android.color = Color.create("#FF757575");
 *             this.statusBar.ios.style = StatusBarStyle.DEFAULT;
 *          }
 *     });
 */
function StatusBar(parentPage) {
    /**
     * Gets the height of the status bar. Height value may change depending on
     * OS and screen density.
     *
     * @property {Number} height
     * @readonly
     * @since 0.1
     */
    this.height;

    /**
     * Gets/sets visibility of the status bar.
     *
     * @property {Boolean} visible
     * @since 0.1
     */
    this.visible = true;

    /**
     * Gets/sets color of the status bar. This property will work only for Android
     * version KitKat (API 19) or above.
     *
     *     @example
     *     const Page = require('nf-core/ui/page');
     *     const Color = require('nf-core/ui/color');
     *     var myPage = new Page({
     *         onShow: function() {
     *             this.statusBar.android.color = Color.RED;
     *         }
     *     });
     *
     * @property {UI.Color} color
     * @since 0.1
     */
    this.statusBar.android.color = Color.create("#FF757575");

    /**
     * Gets/sets status bar style. This property will work only for iOS
     *
     *     @example
     *     const Page = require('nf-core/ui/page');
     *     const StatusBarStyle = require('nf-core/ui/statusbarstyle');
     *     var myPage = new Page({
     *         onShow: function() {
     *             this.statusBar.ios.style = StatusBarStyle.DEFAULT;
     *         }
     *     });
     *
     * @property {UI.StatusBarStyle} style
     * @since 0.1
     */
    this.statusBar.ios.style = StatusBarStyle.DEFAULT;
}