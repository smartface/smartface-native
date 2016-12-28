/** 
 * @enum 
 * @since 0.1
 * 
 * ActivityIndicatorStyle is a enum. It includes types of activity indicator.
 * 
 *     @example
 *     const ActivityIndicatorStyle = require('sf-core/ui/activityIndicator').ActivityIndicatorStyle;
 *     var activityIndicatorStyle= ActivityIndicatorStyle.LARGE;
 */
var ActivityIndicatorStyle = {
    NORMAL: 0,
    LARGE: 1
};

/**
 * @class ActivityIndicator
 * @since 0.1
 * 
 * ActivityIndicator class shows a progress of some background task.
 *
 *     @example
 *     const ActivityIndicator = require('sf-core/ui/activityIndicator').ActivityIndicator;
 *     const ActivityIndicatorStyle = require('sf-core/ui/activityIndicator').ActivityIndicatorStyle;
 *     var myActivityIndicator = new ActivityIndicator();
 *     myActivityIndicator.style = ActivityIndicatorStyle.LARGE;
 */
function ActivityIndicator(params) {
    /**
     * Gets/sets color of the activity indicator.
     * 
     * @property {Color} color Color of the activity indicator
     */
    this.color = COLOR.GRAY;

    /**
     * Gets/sets style of the activity indicator.
     * 
     * @property {Number} style Style of the activity indicator
     */
    this.style =  ActivityIndicatorStyle.NORMAL;
}

module.exports = {ActivityIndicator: ActivityIndicator, ActivityIndicatorStyle: ActivityIndicatorStyle};