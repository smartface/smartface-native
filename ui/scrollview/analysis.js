const ViewGroup = require('../viewgroup');
const extend = require('js-base/core/extend');
 
/**
 * @class UI.ScrollView
 * @extends UI.ViewGroup
 * @since 0.1
 * 
 * ScrollView enables user to view pages with large content exceeding screen size via scroll action.
 *
 *     @example
 *     const View = require('nf-core/ui/view');
 *     const Color = require('nf-core/ui/color');
 *     const ScrollView = require('nf-core/ui/scrollview');
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
const ScrollView = extend(ViewGroup)(
    function (_super, params) {
        _super(this);
    }
);

Object.defineProperties(ScrollView, {
    /**
     * Gets/sets the alignment of the scrollview. Must be set as constructor parameter. 
     * Cannot be set after the object is initialized.
     *
     * @property {UI.ScrollView.Align} [align = UI.ScrollView.Align.VERTICAL]
     * @since 0.1
     */
    'align': {
        get: function() {}, 
        set: function(value) {},
        configurable: false
    },
    /**
     * Gets/sets the visibility of the scrollbar.
     *
     * @property {Boolean} [scrollBarEnabled = true]
     * @since 0.1
     */
    'scrollBarEnabled': {
        get: function() {},
        set: function(value){},
        configurable: false
    },
    /**
     * Immediately scrolls to the edge set.
     *
     * @method scrollToEdge
     * @param {UI.ScrollView.Edge} edge
     * @since 0.1
     */
    'scrollToEdge': {
        value: function(edge) {},
        configurable: false
    },
    /**
     * Immediately scrolls to the coordinate set. X position of horizontal alignment. 
     * Y position of vertical alignment.
     *
     * @method scrollToCoordinate
     * @param {Number} coordinate
     * @since 0.1
     */
    'scrollToCoordinate': {
        value: function(coordinate) {},
        configurable: false
    }
});

module.exports = ScrollView;