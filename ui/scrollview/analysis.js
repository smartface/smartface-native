/**
 * @class UI.ScrollView
 * @extends UI.ViewGroup
 * @since 0.1
 *
 * ScrollView enables user to view pages with large content exceeding screen size via scroll action.
 * ScrollView can have only one child layout. The layout should be added if there are child views more 
 * than one.
 *    
 *     @example
 *     const FlexLayout = require('sf-core/ui/flexlayout');
 *     const ScrollView = require('sf-core/ui/scrollview');
 *     const Button = require('sf-core/ui/button');
 *     const Color = require('sf-core/ui/color');
 *
 *     var scrollView = new ScrollView({
 *         height: 300,
 *         width: 200,
 *         backgroundColor: Color.GREEN,
 *         alignSelf: FlexLayout.AlignSelf.CENTER
 *     });
 *     
 *     var scrollLayout = new FlexLayout({
 *         height: 1500,
 *         width: 200,
 *         backgroundColor: Color.RED
 *     });
 *     
 *     var buttonTop = new Button({
 *         height: 100,
 *         width: 100,
 *         top: 50,
 *         marginLeft: 50,
 *         text: "Scroll to 1000",
 *         backgroundColor: Color.BLUE,
 *         onPress: function(){
 *             scrollView.scrollToCoordinate(1000);
 *         }
 *     });
 *     var buttonBottom = new Button({
 *         height: 100,
 *         width: 100,
 *         top: 1000,
 *         marginLeft: 50,
 *         text: "Scroll to 50",
 *         backgroundColor: Color.BLUE,
 *         onPress: function(){
 *             scrollView.scrollToCoordinate(50);
 *         }
 *     });
 *     scrollLayout.addChild(buttonTop)
 *     scrollLayout.addChild(buttonBottom)
 *     scrollView.addChild(scrollLayout);
 *
 */
function ScrollView(){}

/**
 * Gets/sets the alignment of the scrollview. It must be set as constructor parameter.
 * This property cannot be set after the object is initialized.
 *
 * @property {UI.ScrollView.Align} [align = UI.ScrollView.Align.VERTICAL]
 * @android
 * @ios
 * @since 0.1
 */
ScrollView.prototype.align = UI.ScrollView.Align.VERTICAL; 

/**
 * Gets/sets the visibility of the scrollbar.
 *
 * @property {Boolean} [scrollBarEnabled = true]
 * @android
 * @ios
 * @since 0.1
 */
ScrollView.prototype.scrollBarEnabled = true;

/**
 * Gets layout of the ScrollView. Use this property to add a child to the ScrollView instead of {@link ScrollView#addChild}
 *
 * @property {UI.FlexLayout} [layout = UI.FlexLayout]
 * @android
 * @ios
 * @readonly
 * @since 1.1.10
 */
ScrollView.prototype.layout = UI.FlexLayout;

/**
 * Immediately scrolls to the edge set.
 *
 * @method scrollToEdge
 * @android
 * @ios
 * @param {UI.ScrollView.Edge} edge
 * @since 0.1
 */
ScrollView.prototype.scrollToEdge = function(){};

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
ScrollView.prototype.scrollToCoordinate = function(coordinate) {};

module.exports = ScrollView;