/**
 * @class UI.HeaderBarItem
 * @since 0.1
 *
 * HeaderBarItem is a button object that can be shown in header bar of a page.
 * Items set to header bar will be shown on the right side of header bar. You
 * can enable/disable items and listen press event. 
 *
 *     @example
 *     const UI = require('sf-core/ui');
 *     var myPage = new UI.Page();
 *     var myItem = new UI.HeaderBarItem({
 *         title: "Smartface",
 *         onPress: function() {
 *             console.log("Smartface item pressed!");
 *         }
 *     });
 *     myPage.headerBar.setItems([myItem]);
 */
function HeaderBarItem(params) {}

/**
 * Gets/sets title of header bar item. If image is not set, title will be
 * shown in the header bar.
 *
 * Title won't show if item is set as left item to header bar.
 *
 * @property {String} title
 * @android
 * @ios
 * @since 0.1
 */
HeaderBarItem.prototype.title = "";

/**
 * Gets/sets attributed title of header bar item. If image is not set, attributed title will be
 * shown in the header bar.
 *
 * Attributed title won't show if item is set as left item to header bar.
 *
 * @property {UI.AttributedString} attributedTitle
 * @android
 * @since 4.0.0
 */
HeaderBarItem.prototype.attributedTitle;

/**
 * Gets systemItem of header bar item. SystemItem only set in constructor of headerBarItem.
 *
 *     @example
 *     var myItem = new HeaderBarItem({
 *         ios:{
 *             systemItem : HeaderBarItem.iOS.SystemItem.TRASH
 *         },
 *         onPress: function() {
 *             console.log("You pressed TRASH item!");
 *         }
 *     });
 *     this.headerBar.setItems([myItem]);
 * 
 * @property {UI.HeaderBarItem.iOS.SystemItem} systemItem
 * @readonly
 * @ios
 * @since 3.2.1
 */
HeaderBarItem.prototype.systemItem = undefined;

/**
 * Gets/sets Image Object or Image Path of header bar item. Image is set to null as default.
 *
 * If image is already set on HeaderBarItem, title should not be set for some native behaviours.
 * 
 * @property {UI.Image | String} image
 * @android
 * @ios
 * @since 0.1
 */
HeaderBarItem.prototype.image = null;

/**
 * Gets/sets enabled status of header bar item. Enabled is set to true as
 * default.
 *
 * @property {Boolean} enabled
 * @android
 * @ios
 * @since 0.1
 */
HeaderBarItem.prototype.enabled = true;

/**
 * Gets/sets font of header bar item.
 *
 * @property {UI.Font} font
 * @ios
 * @since 4.0.0
 */
HeaderBarItem.prototype.font = undefined;

/**
 * This method returns an object that defines view location on screen.
 *
 * @method getScreenLocation
 * @return {Object} location
 * @return {Number} location.x
 * @return {Number} location.y
 * @android
 * @ios
 * @since 3.2.0
 */
HeaderBarItem.prototype.getScreenLocation = function() {};

/**
 * Gets/sets callback for press event. If enabled property is set to false
 * press callback won't be called.
 *
 * @property {Function} onPress
 * @android
 * @ios
 * @since 0.1
 */
HeaderBarItem.prototype.onPress = null;

/**
 * Gets/sets color of the item's text/image.
 *
 * @property {UI.Color} color
 * @android
 * @ios
 * @since 0.1
 */
HeaderBarItem.prototype.color = null;

/**
 * Gets badge of header bar item. Badge that is displayed in the upper-right corner of the item with a surrounding red oval.
 *
 *     @example
 *     var headerBarItem = new HeaderBarItem();
 *     headerBarItem.title = "Item";
 *     headerBarItem.badge.text = "5";
 *     headerBarItem.badge.visible = true;
 *     page.headerBar.setItems([headerBarItem]);
 * 
 * @property {UI.HeaderBarItem.Badge} badge
 * @android
 * @ios
 * @readonly
 * @since 3.0.0
 */
HeaderBarItem.prototype.badge = {};

/**
 * iOS Specific Properties.
 * @class UI.HeaderBarItem.iOS
 * @since 3.2.1
 */
HeaderBarItem.iOS = {};

/** 
 * Defines system-supplied images for bar button items. [Apple Documentation](https://developer.apple.com/documentation/uikit/uibarbuttonsystemitem?language=objc)
 * 
 * @enum {Number} UI.HeaderBarItem.iOS.SystemItem
 * @since 3.2.1
 * @ios
 */
HeaderBarItem.iOS.SystemItem = {};

/**
 * The system Done button. Localized.
 * 
 * @property {Number} DONE
 * @static
 * @ios
 * @readonly
 * @since 3.2.1
 */
HeaderBarItem.iOS.SystemItem.DONE;

/**
 * The system Cancel button. Localized.
 * 
 * @property {Number} CANCEL
 * @static
 * @ios
 * @readonly
 * @since 3.2.1
 */
HeaderBarItem.iOS.SystemItem.CANCEL;

/**
 * The system Edit button. Localized.
 * 
 * @property {Number} EDIT
 * @static
 * @ios
 * @readonly
 * @since 3.2.1
 */
HeaderBarItem.iOS.SystemItem.EDIT;

/**
 * The system Save button. Localized.
 * 
 * @property {Number} SAVE
 * @static
 * @ios
 * @readonly
 * @since 3.2.1
 */
HeaderBarItem.iOS.SystemItem.SAVE;

/**
 * The system plus button containing an icon of a plus sign.
 * 
 * @property {Number} ADD
 * @static
 * @ios
 * @readonly
 * @since 3.2.1
 */
HeaderBarItem.iOS.SystemItem.ADD;

/**
 * Blank space to add between other items. The space is distributed equally between the other items. Other item properties are ignored when this value is set.
 * 
 * @property {Number} FLEXIBLESPACE
 * @static
 * @ios
 * @readonly
 * @since 3.2.1
 */
HeaderBarItem.iOS.SystemItem.FLEXIBLESPACE;

/**
 * Blank space to add between other items. Only the width property is used when this value is set.
 * 
 * @property {Number} FIXEDSPACE
 * @static
 * @ios
 * @readonly
 * @since 3.2.1
 */
HeaderBarItem.iOS.SystemItem.FIXEDSPACE;

/**
 * The system compose button.
 * 
 * @property {Number} COMPOSE
 * @static
 * @ios
 * @readonly
 * @since 3.2.1
 */
HeaderBarItem.iOS.SystemItem.COMPOSE;

/**
 * The system reply button.
 * 
 * @property {Number} REPLY
 * @static
 * @ios
 * @readonly
 * @since 3.2.1
 */
HeaderBarItem.iOS.SystemItem.REPLY;

/**
 * The system action button.
 * 
 * @property {Number} ACTION
 * @static
 * @ios
 * @readonly
 * @since 3.2.1
 */
HeaderBarItem.iOS.SystemItem.ACTION;

/**
 * The system organize button.
 * 
 * @property {Number} ORGANIZE
 * @static
 * @ios
 * @readonly
 * @since 3.2.1
 */
HeaderBarItem.iOS.SystemItem.ORGANIZE;

/**
 * The system bookmarks button.
 * 
 * @property {Number} BOOKMARKS
 * @static
 * @ios
 * @readonly
 * @since 3.2.1
 */
HeaderBarItem.iOS.SystemItem.BOOKMARKS;

/**
 * The system search button.
 * 
 * @property {Number} SEARCH
 * @static
 * @ios
 * @readonly
 * @since 3.2.1
 */
HeaderBarItem.iOS.SystemItem.SEARCH;

/**
 * The system refresh button.
 * 
 * @property {Number} REFRESH
 * @static
 * @ios
 * @readonly
 * @since 3.2.1
 */
HeaderBarItem.iOS.SystemItem.REFRESH;

/**
 * The system stop button.
 * 
 * @property {Number} STOP
 * @static
 * @ios
 * @readonly
 * @since 3.2.1
 */
HeaderBarItem.iOS.SystemItem.STOP;

/**
 * The system camera button.
 * 
 * @property {Number} CAMERA
 * @static
 * @ios
 * @readonly
 * @since 3.2.1
 */
HeaderBarItem.iOS.SystemItem.CAMERA;

/**
 * The system trash button.
 * 
 * @property {Number} TRASH
 * @static
 * @ios
 * @readonly
 * @since 3.2.1
 */
HeaderBarItem.iOS.SystemItem.TRASH;

/**
 * The system play button.
 * 
 * @property {Number} PLAY
 * @static
 * @ios
 * @readonly
 * @since 3.2.1
 */
HeaderBarItem.iOS.SystemItem.PLAY;

/**
 * The system pause button.
 * 
 * @property {Number} PAUSE
 * @static
 * @ios
 * @readonly
 * @since 3.2.1
 */
HeaderBarItem.iOS.SystemItem.PAUSE;

/**
 * The system rewind button.
 * 
 * @property {Number} REWIND
 * @static
 * @ios
 * @readonly
 * @since 3.2.1
 */
HeaderBarItem.iOS.SystemItem.REWIND;

/**
 * The system fast forward button.
 * 
 * @property {Number} FASTFORWARD
 * @static
 * @ios
 * @readonly
 * @since 3.2.1
 */
HeaderBarItem.iOS.SystemItem.FASTFORWARD;

/**
 * The system undo button.
 * 
 * @property {Number} UNDO
 * @static
 * @ios
 * @readonly
 * @since 3.2.1
 */
HeaderBarItem.iOS.SystemItem.UNDO;

/**
 * The system redo button.
 * 
 * @property {Number} REDO
 * @static
 * @ios
 * @readonly
 * @since 3.2.1
 */
HeaderBarItem.iOS.SystemItem.REDO;

module.exports = HeaderBarItem;