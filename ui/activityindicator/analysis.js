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
 *     myActivityIndicator.ios.activityIndicatorViewStyle = ActivityIndicator.iOS.ActivityIndicatorViewStyle.LARGE;  
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
 * Gets/sets style of the activity indicator.
 *
 * @property {UI.ActivityIndicator.iOS.ActivityIndicatorViewStyle} [activityIndicatorViewStyle = UI.ActivityIndicator.iOS.ActivityIndicatorViewStyle.NORMAL]
 * @ios
 * @since 3.2.1
 */
ActivityIndicator.prototype.ios.activityIndicatorViewStyle = ActivityIndicator.iOS.ActivityIndicatorViewStyle.NORMAL;

module.exports = ActivityIndicator;