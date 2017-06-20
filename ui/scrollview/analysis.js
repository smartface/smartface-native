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
 *        flexGrow: 1,
 *        backgroundColor: Color.GREEN,
 *        alignSelf: FlexLayout.AlignSelf.STRETCH
 *     });
 *     scrollView.layout.height = 2000;
 *     scrollView.layout.backgroundColor = Color.RED;
 *     scrollView.layout.alignItems = FlexLayout.AlignItems.CENTER;
 *     var buttonTop = new Button({
 *       height: 100,
 *       width: 100,
 *       top:10,
 *       text: "Scroll to 1100",
 *       backgroundColor: Color.BLUE,
 *       onPress: function(){
 *           scrollView.scrollToCoordinate(1100);
 *       }
 *     });
 *     var buttonBottom = new Button({
 *       height: 100,
 *       width: 100,
 *       top: 1000,
 *       text: "Scroll to 10",
 *       backgroundColor: Color.BLUE,
 *       onPress: function(){
 *           scrollView.scrollToCoordinate(10);
 *       }
 *     });
 *     scrollView.layout.addChild(buttonTop);
 *     scrollView.layout.addChild(buttonBottom);
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
 * Gets/sets the visibility of the scrollbar.
 *
 * @property {Boolean} [scrollBarEnabled = true]
 * @android
 * @ios
 * @since 0.1
 */
ScrollView.prototype.scrollBarEnabled = true;

/**
 * This function adds a child view to a viewgroup.
 *
 * @deprecated 1.1.10
 * Use {@link UI.ScrollView#layout} property instead
 * 
 * @param {UI.View} view The child view to add.
 * @android
 * @ios
 * @method addChild
 * @since 0.1
 */
ScrollView.prototype.addChild = function(view){};

/**
 * Finds a child view with specified id within the layout.
 * 
 * @deprecated 1.1.10
 * Use {@link UI.ScrollView#layout} property instead
 * 
 * @param {Number} id The specified id of the view.
 * @returns {UI.View} Founded view within the layout, or null if view does not exists within the layout.
 * @method findChildById
 * @android
 * @ios
 * @since 0.1
 */
ScrollView.prototype.findChildById = function(id){};

/**
 * Gets the count of children in a viewgroup.
 *
 * @deprecated 1.1.10
 * Use {@link UI.ScrollView#layout} property instead
 * 
 * @returns {Number} The number of children in the layout, or 0 if there is no child exists within the layout.
 * @method getChildCount
 * @android
 * @ios
 * @since 0.1
 */
ScrollView.prototype.getChildCount = function(){};

/**
 * Removes all child views from viewgroup.
 *
 * @deprecated 1.1.10
 * Use {@link UI.ScrollView#layout} property instead
 * 
 * @method removeAll
 * @android
 * @ios
 * @since 0.1
 */
ScrollView.prototype.removeAll = function(){};

/**
 * Remove a child view from viewgroup.
 *
 * @deprecated 1.1.10
 * Use {@link UI.ScrollView#layout} property instead
 * 
 * @param {UI.View} view The child view to remove.
 * @android
 * @ios
 * @method removeChild
 * @since 0.1
 */
ScrollView.prototype.removeChild = function(view){};

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

/**
 * This event is called when a view added to this view's hierarchy.
 *
 * @deprecated 1.1.10
 * Use {@link UI.ScrollView#layout} property instead
 * 
 * @event onViewAdded
 * @android
 * @ios
 * @since 1.1.8
 */
ScrollView.prototype.onViewAdded = function() {};

/**
 * This event is called when a view removed from this view's hierarchy.
 *
 * @deprecated 1.1.10
 * Use {@link UI.ScrollView#layout} property instead
 * 
 * @event onViewRemoved
 * @android
 * @ios
 * @since 1.1.8
 */
ScrollView.prototype.onViewRemoved = function() {};

module.exports = ScrollView;