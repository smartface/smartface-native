const StatusBarStyle = require('sf-core/ui/statusbarstyle');
const Color = require("sf-core/ui/color");

/**
 * @class UI.QuickLook
 * @since 0.1
 *
 * Quick Look lets people preview Keynote, Numbers, Pages, and PDF documents,
 * as well as images and other types of files, even if your app doesn't support those file formats.
 * For further information: https://developer.apple.com/ios/human-interface-guidelines/features/quick-look/
 * This class works only for IOS.
 *
 *     @example
 *     const QuickLook = require('sf-core/ui/quicklook');
 *     var quickLook = new QuickLook();
 *     var testPDF = "assets://test.pdf";
 *     var testImage = "images://test.png";
 *     quickLook.document = [testPDF,testImage];
 *     quickLook.barColor = Color.create("#9D1B55");
 *     quickLook.itemColor = Color.WHITE;
 *     quickLook.show(myPage);
 *
 */
function QuickLook(params) {}

/**
 * Gets/sets array of documents(paths) that will be shown on QuickLook.
 *
 *     @example
 *     const QuickLook = require('sf-core/ui/quicklook');
 *     var quicklook = new QuickLook();
 *     quicklook.document = ["images://.png","assests://.pdf"];
 *
 * @property {String[]} document
 * @ios
 * @since 0.1
 */
QuickLook.prototype.document = [];

/**
 * Gets/sets headerBar color of QuickLook View.
 *
 *     @example
 *     const QuickLook = require('sf-core/ui/quicklook');
 *     var quicklook = new QuickLook();
 *     quicklook.barColor = UI.Color.BLACK;
 *
 * @property {UI.Color} barColor
 * @ios
 * @since 0.1
 */
QuickLook.prototype.barColor = false;

/**
 * Gets/sets color of items on header & footer of QuickLook view.
 *
 *     @example
 *     const QuickLook = require('sf-core/ui/quicklook');
 *     var quicklook = new QuickLook();
 *     quicklook.itemColor = UI.Color.BLACK;
 *
 * @property {UI.Color} itemColor
 * @ios
 * @since 0.1
 */
QuickLook.prototype.itemColor = UI.Color.BLACK;

/**
 * Gets/sets visibility of status bar on QuickLook view.
 *
 *     @example
 *     const QuickLook = require('sf-core/ui/quicklook');
 *     var quicklook = new QuickLook();
 *     quicklook.statusBar.visible = false;
 *
 * @property {Boolean} statusBar.visible
 * @since 0.1
 */
QuickLook.prototype.statusBar.visible = false;

/**
 * Gets/sets statusBar style of QuickLook View.
 *
 *     @example
 *     const QuickLook = require('sf-core/ui/quicklook');
 *     var quicklook = new QuickLook();
 *     quicklook.statusBar.style = false;
 *
 * @property {UI.StatusBarStyle} statusBar.style
 * @ios
 * @since 0.1
 */
QuickLook.prototype.statusBar.style = UI.StatusBarStyle.DEFAULT;

/**
 * This function shows QuickLook on the given UI.Page.
 *
 * @param {UI.Page} page This is the page that QuickLook will be shown.
 * @ios
 * @method show
 * @since 0.1
 */
QuickLook.prototype.show = function(Page) {};

module.exports = QuickLook;
