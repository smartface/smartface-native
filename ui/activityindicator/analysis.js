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
 *         top:"45%", left:"45%"
 *     });
 *     
 *     myPage.add(myActivityIndicator);
 */
const ActivityIndicator = extend(View)(
    function (_super, params) {
        _super(this);
        /**
         * Gets/sets color of the activity indicator.
         * 
         * @property {UI.Color} color
         * @since 0.1
         */
        this.color = Color.GRAY;
    }
);

module.exports = ActivityIndicator;