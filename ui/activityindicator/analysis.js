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
 *         left: 50
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
         * @property {UI.ActivityIndicatorType} type
         * @ios
         * @since 0.1
         */
        this.ios.type = ActivityIndicatorType.WHITE;
    }
);

module.exports = ActivityIndicator;
