const extend = require('js-base/core/extend');
const View = require('../view');

/**
 * @class UI.ActivityIndicator
 * @extends UI.View
 * @since 0.1
 * 
 * ActivityIndicator class shows a progress of some background task.
 *
 *     @example
 *     const ActivityIndicator = require('sf-core/ui/activityindicator');
 *     const Color = require('sf-core/ui/color');
 *     var myActivityIndicator = new ActivityIndicator();
 *     myActivityIndicator.color = Color.BLUE;
 */
const ActivityIndicator = extend(View)(
    function (_super, params) {
        _super(this);
        /**
         * Gets/sets color of the activity indicator.
         * 
         * @property {Color} color Color of the activity indicator
         * @since 0.1
         */
        this.color = Color.GRAY;
    }
);

module.exports = ActivityIndicator;