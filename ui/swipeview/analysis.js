const View = require('../view');
const extend = require('js-base/core/extend');
/**
 * @class UI.SwipeView
 * @since 1.1.10
 * @extends UI.View
 * SwipeView holds page classes provided inside an array. These pages can be traversed horizontally via gesture
 * actions. 
 *
 *     @example
 *     const SwipeView = require('sf-core/ui/swipeview');
 *     var swipeView = new SwipeView({
 *       page: currentPage,
 *       width:300, height:300,
 *       pages: [require("../ui/ui_swipePage1"), require("../ui/ui_swipePage2"), require("../ui/ui_swipePage3")],
 *       onPageSelected: function(index,page) {
 *         console.log("Selected Page Index : " + index);
 *         console.log("Selected Page Instance : " + page);
 *       },
 *       onStateChanged: function(state) {
 *         if (SwipeView.State.DRAGGING === state) {
 *           console.log("Dragging");
 *         } else {
 *           console.log("Idle");
 *         }
 *       }
 *     });
 * 
 * @constructor
 * @param {Object} object
 * @param {UI.Page} object.page
 * It is required to pass the current page to swipeview.
 * 
 */
function SwipeView() {
    /**
     * Gets/Sets the array of the page classes will be displayed inside SwipeView. 
     *
     * @property {Array} pages
     * @android
     * @ios
     * @since 1.1.10
     */
    this.pages = [];
    /**
     * Gets/Sets the callback trigged when a page is selected after a swipe action.
     *
     * @event onPageSelected
     * @param index
     * @param page Selected page instance
     * @android
     * @ios
     * @since 1.1.10
     */
    this.onPageSelected = function(index,page){};
    /**
     * Gets/Sets the callback trigged during swipe actions.
     *
     * @event onStateChanged
     * @param {UI.SwipeView.State} state
     * @android
     * @ios
     * @since 1.1.10
     */
    this.onStateChanged = function(state){};
    /**
     * Gets the currently displayed page's index inside the page array.
     *
     * @property {Number} currentIndex
     * @android
     * @ios
     * @readonly
     * @since 1.1.10
     */
    this.currentIndex = -1;
    /**
     * Swipes to the page inside the index of the array.
     *
     * @method swipeToIndex
     * @param {Number} index
     * @param {Boolean} [animated=false]
     * @android
     * @ios
     * @since 1.1.10
     */
    this.swipeToIndex = function(index, animated){};
};

/**
 * This event is called when a touch screen motion event starts. Does not work on iOS.
 *
 * @event onTouch
 * @android
 * @deprecated 2.0.4
 * @member UI.SwipeView
 * @since 1.1.10
 */
SwipeView.prototype.onTouch = function onTouch(){ }

/**
 * This event is called when a touch screen motion event ends. Does not work on iOS.
 *
 * @event onTouchEnded
 * @android
 * @deprecated 2.0.4
 * @member UI.SwipeView
 * @since 1.1.10
 */
SwipeView.prototype.onTouchEnded = function onTouchEnded(){ }

/**
 * @enum UI.SwipeView.State
 * @static
 * @readonly
 * @since 1.1.10
 *
 */
SwipeView.State = {};

/**
 * @property {Number} [IDLE = 0]
 * @android
 * @ios
 * @static
 * @readonly
 * @since 1.1.10
 */
SwipeView.State.IDLE = 0;

/**
 * @property {Number} [DRAGGING = 1]
 * @android
 * @ios
 * @static
 * @readonly
 * @since 1.1.10
 */
SwipeView.State.DRAGGING = 1;