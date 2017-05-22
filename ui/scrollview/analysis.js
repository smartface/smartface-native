/**
 * @class UI.ScrollView
 * @extends UI.ViewGroup
 * @since 0.1
 *
 * ScrollView enables user to view pages with large content exceeding screen size via scroll action.
 * ScrollView can have only one child view. The layout should be added if there are child views more 
 * than one.
 *
 *     @example
 *     const View = require('sf-core/ui/view');
 *     const Color = require('sf-core/ui/color');
 *     const ScrollView = require('sf-core/ui/scrollview');
 *
 *     var myScrollView = new ScrollView({
 *         width: 500, height: 750,
 *         align: ScrollView.Align.VERTICAL
 *     });
 *
 *     myScrollView.addChild(new View({
 *         width: 500, height:3000
 *         backgroundColor: Color.GREEN
 *     }));
 *
 *     myPage.layout.addChild(myScrollView);
 *
 */
function ScrollView(){
    /**
     * Gets/sets the alignment of the scrollview. It must be set as constructor parameter.
     * This property cannot be set after the object is initialized.
     *
     * @property {UI.ScrollView.Align} [align = UI.ScrollView.Align.VERTICAL]
     * @android
     * @ios
     * @since 0.1
     */
    this.align = UI.ScrollView.Align.VERTICAL;
    
    /**
     * Gets/sets the visibility of the scrollbar.
     *
     * @property {Boolean} [scrollBarEnabled = true]
     * @android
     * @ios
     * @since 0.1
     */
     this.scrollBarEnabled = true;
     
     /**
     * Immediately scrolls to the edge set.
     *
     * @method scrollToEdge
     * @android
     * @ios
     * @param {UI.ScrollView.Edge} edge
     * @since 0.1
     */
     this.scrollToEdge = function(){};
     
     /**
     * Immediately scrolls to the given coordinate. Coordinate is X position for horizontal alignment and
     * Y position for vertical alignment.
     *
     * @method scrollToCoordinate
     * @android
     * @ios
     * @param {Number} coordinate
     * @since 0.1
     */
     this.scrollToCoordinate = function(coordinate) {};
}
module.exports = ScrollView;