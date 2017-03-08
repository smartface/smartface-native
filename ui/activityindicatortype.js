/**
 * @enum {Number} UI.ActivityIndicatorType
 * @since 0.1
 *
 * ActivityIndicatorType is an enum.
 *
 *     @example
 *     const ActivityIndicator = require('nf-core/ui/activityindicator');
 *     const ActivityIndicatorType = require('nf-core/ui/activityindicatortype');
 * 
 *     var myActivityIndicator = new ActivityIndicator({
 *               top: 100,
 *               left: 50,
 *               ios : {
 *                   type : ActivityIndicatorType.WHITELARGE
 *               }
 *         });
 *
 */
var ActivityIndicatorType = { };

/**
 * @property {Number} WHITELARGE
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(ActivityIndicatorType, 'WHITELARGE', {
    value: 0,
    writable: false
});

/**
 * @property {Number} WHITE
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(ActivityIndicatorType, 'WHITE', {
    value: 1,
    writable: false
});

/**
 * @property {Number} GRAY
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(ActivityIndicatorType, 'GRAY', {
    value: 2,
    writable: false
});

module.exports = ActivityIndicatorType;
