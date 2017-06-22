const extend = require('js-base/core/extend');
const View = require('../view');

/**
 * @class UI.ActivityIndicator
 * @extends UI.View
 * @since 0.1
 *
 * ActivityIndicator can be used to indicate a background task.
 *
 *     @example
 *     const ActivityIndicator = require('sf-core/ui/activityindicator');
 *
 *     var myActivityIndicator = new ActivityIndicator({
 *         top: 100,
 *         left: 50
 *     });
 *     myActivityIndicator.ios.type = ActivityIndicator.iOS.Type.WHITELARGE;    
 * 
 *     myPage.layout.addChild(myActivityIndicator);
 */
function ActivityIndicator(params){}

/**
 * Gets/sets color of the activity indicator.
 *
 * @property {UI.Color} color
 * @android
 * @ios
 * @since 0.1
 */
ActivityIndicator.prototype.color = Color.GRAY;

ActivityIndicator.prototype.ios = {};
/**
 * Gets/sets type of the activity indicator.
 *
 * @property {ActivityIndicator.iOS.Type} type
 * @ios
 * @since 0.1
 */
ActivityIndicator.prototype.ios.type = ActivityIndicator.iOS.Type.WHITE;

ActivityIndicator.iOS = {};
ActivityIndicator.iOS.Type = {};
/**
 * @property {Number} WHITELARGE
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
ActivityIndicator.iOS.Type.WHITELARGE = 0;

/**
 * @property {Number} WHITE
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
ActivityIndicator.iOS.Type.WHITE = 1;

/**
 * @property {Number} GRAY
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
ActivityIndicator.iOS.Type.GRAY = 2;

module.exports = ActivityIndicator;