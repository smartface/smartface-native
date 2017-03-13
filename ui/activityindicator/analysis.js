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
 *     const ActivityIndicator = require('nf-core/ui/activityindicator');
 *
 *     var myActivityIndicator = new ActivityIndicator({
 *         top: 100,
 *         left: 50,
 *         ios:{
 *            type : ActivityIndicator.iOS.Type.WHITE
 *         }
 *     });
 *
 *     myPage.layout.addChild(myActivityIndicator);
 */
const ActivityIndicator = extend(View)(
    function (_super, params) {
        _super(this);
        /**
         * Gets/sets color of the activity indicator.
         *
         * @property {UI.Color} color
         * @android
         * @ios
         * @since 0.1
         */
        this.color = Color.GRAY;
        
        /**
         * Gets/sets type of the activity indicator.
         *
         * @property {ActivityIndicator.iOS.Type} type
         * @ios
         * @since 0.1
         */
        this.ios.type = ActivityIndicator.iOS.Type.WHITE;
    }
);

ActivityIndicator.iOS = {};
/**
 * @property {Number} WHITELARGE
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(ActivityIndicator.iOS.Type, 'WHITELARGE', {
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
Object.defineProperty(ActivityIndicator.iOS.Type, 'WHITE', {
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
Object.defineProperty(ActivityIndicator.iOS.Type, 'GRAY', {
    value: 2,
    writable: false
});

module.exports = ActivityIndicator;
