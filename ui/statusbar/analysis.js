/**
 * @class UI.StatusBar
 *
 * This class represents status bar object. Creating instance of
 * StatusBar is not valid since you can't use in anywhere. If you
 * want to access status bar object you can access via
 * UI.Page.statusBar property of your page.
 * 
 * If the StatusBar visible, page starts under the StatusBar for Android but StatusBar 
 * will overlaps the page for iOS if the HeaderBar is invisible at this moment.
 *
 *     @example
 *     const StatusBarStyle = require('sf-core/ui/statusbarstyle');
 *     const Color = require('sf-core/ui/color');
 *     const Page = require('sf-core/ui/page');
 *     var myPage = new Page({
 *         onShow: function() {
 *             this.statusBar.visible = true;
 *             this.statusBar.android.color = Color.create("#FF757575");
 *             this.statusBar.ios.style = StatusBarStyle.DEFAULT;
 *          }
 *     });
 */
function StatusBar(parentPage) {}

/**
 * Gets the height of the status bar. Height value may change depending on
 * OS and screen density.
 *
 * @property {Number} height
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
StatusBar.prototype.height;

/**
 * Gets/sets visibility of the status bar.
 *
 * @property {Boolean} visible
 * @android
 * @ios
 * @since 0.1
 */
StatusBar.prototype.visible = true;

/**
 * Gets/sets color of the status bar. This property works only for Android version 
 * LOLLIPOP (API 21) or above. If you want to make SliderDrawer to overlay Android StatusBar, 
 * you should always use color with alpha channel.
 *
 *     @example
 *     const Page = require('sf-core/ui/page');
 *     const Color = require('sf-core/ui/color');
 *     var myPage = new Page({
 *         onShow: function() {
 *             this.statusBar.android.color = Color.RED;
 *         }
 *     });
 *
 * @property {UI.Color} color
 * @android
 * @since 0.1
 */
StatusBar.prototype.android = {};
StatusBar.prototype.android.color = Color.create("#FF757575");

/**
 * Gets/sets status bar style. This property works only for iOS
 *
 *     @example
 *     const Page = require('sf-core/ui/page');
 *     const StatusBarStyle = require('sf-core/ui/statusbarstyle');
 *     var myPage = new Page({
 *         onShow: function() {
 *             this.statusBar.ios.style = StatusBarStyle.DEFAULT;
 *         }
 *     });
 *
 * @property {UI.StatusBarStyle} style
 * @ios
 * @since 0.1
 * @deprecated 2.0.7 Use {@link UI.statusBar#style} instead.
 */
StatusBar.prototype.ios = {};
StatusBar.prototype.ios.style = StatusBarStyle.DEFAULT;

/**
 * Gets/sets status bar style.
 * Android support is api level 23 and later.
 * 
 *     @example
 *     const Page = require('sf-core/ui/page');
 *     const StatusBarStyle = require('sf-core/ui/statusbarstyle');
 *     var myPage = new Page({
 *         onShow: function() {
 *             this.statusBar.style = StatusBarStyle.DEFAULT;
 *         }
 *     });
 *
 * @property {UI.StatusBarStyle} style
 * @android
 * @ios
 * @since 2.0.7
 */
StatusBar.prototype.style = StatusBarStyle.DEFAULT;

module.exports = StatusBar;