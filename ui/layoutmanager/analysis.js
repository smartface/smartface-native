/**
 * @class UI.LayoutManager
 * @since 3.0.2
 * Layout calculation class for GridView. It behaves iOS’s UICollectionViewFlowLayout and Android’s StaggeredGridLayout.
 *
 * spanCount and scrollDirection are 2 important parameters of this class.
 * 
 * If user sets scrollDirection to “vertical”, spanCount represents count of colons. 
 * For example; scrollDirection: vertical, spanCount: 2 means user can scroll vertically, object has 2 colons and width property of items are fixed numbers depends on colon count.
 * If user sets scrollDirection to “horizontal”, spanCount represents count of rows.
 * For example; scrollDirection: horizontal, spanCount : 2 means user can scroll horizontally, object has 2 rows and height property of items are fixed numbers depends on row count
 *
 *      @example
 *      var layoutManager = new LayoutManager({
 *           spanCount: 2,
 *           scrollDirection: LayoutManager.ScrollDirection.VERTICAL
 *      });
 * 
 *
 */
 
function LayoutManager(params) {}

/**
 * User must return a length value for scrollDirection that user lays out the objects.
 * If vertical, length value will be height of item. If horizontal, length value will be width of item.
 *
 * @param {Number} itemLength
 * @event onItemLength
 * @android
 * @ios
 * @return {Number} itemLength
 * @since 3.0.2
 */
LayoutManager.prototype.onItemLength = function(itemLength){};

/**
 * If you want the scrolling behavior to snap to specific boundaries, you can override this method and use it to change the point at which to stop. 
 * For example, you might use this method to always stop scrolling on a boundary between items, as opposed to stopping in the middle of an item.
 *
 *      @example
 *      //For Left Span 
 *      layoutManager.ios.targetContentOffset = function(proposedContentOffset, velocity){
 *          var positionX = gridView.contentOffset.x / ITEM_LENGHT;
 *          var decimalPositionX = parseInt(positionX);
 *          var precisionPositionX = positionX % 1;
 *
 *          if (Math.abs(velocity.x) <= 0.5 && precisionPositionX >= 0.5) {
 *              decimalPositionX++;
 *          }
 *          else if (velocity.x > 0) {
 *              decimalPositionX++;
 *          }
 *          
 *          return { x: decimalPositionX * ITEM_LENGHT, y: 0 };
 *      };
 * 
 * 
 * @param {Object} proposedContentOffset This is the value at which scrolling would naturally stop if no adjustments were made.
 * @param {Number} proposedContentOffset.x
 * @param {Number} proposedContentOffset.y
 * @param {Object} velocity The current scrolling velocity along both the horizontal and vertical axes. This value is measured in points per second.
 * @param {Number} velocity.x
 * @param {Number} velocity.y
 * @event targetContentOffset
 * @ios
 * @return {Object} The content offset that you want to use instead. The default implementation of this method returns the value in the proposedContentOffset parameter.
 * @return {Number} return.x
 * @return {Number} return.y
 * @since 3.2.0
 */
LayoutManager.prototype.targetContentOffset = function(proposedContentOffset,velocity){};

/**
 * Gets/sets colon or row count depends on scrolling direction of layout.
 * If vertical it represents colon, if horizontal it represent row count.
 *
 * @property {Number} [spanCount = 1]
 * @android
 * @ios
 * @since 3.0.2
 */
LayoutManager.prototype.spanCount = 1;

/**
 * Gets/sets the custom distance that the content view is inset from the scroll view edges.
 *
 * @property {Number} [contentInset = {top:0, left:0, bottom:0, right:0}]
 * @android
 * @ios
 * @since 3.0.2
 */
LayoutManager.prototype.contentInset = {top:0, left:0, bottom:0, right:0};


/**
 * The scroll direction of GridView.
 *
 * @property {LayoutManager.ScrollDirection} [scrollDirection = 0]
 * @android
 * @ios
 * @since 3.0.2
 */
LayoutManager.prototype.scrollDirection = LayoutManager.ScrollDirection.VERTICAL;


/**
 * Constants indicating the direction of scrolling for the layout.
 * @class UI.LayoutManager.ScrollDirection
 * @readonly
 * @ios
 * @since 3.0.2
 */
LayoutManager.ScrollDirection = {};

/**
 * @property {Number} VERTICAL
 * @ios
 * @static
 * @readonly
 * @since 3.0.2
 */
LayoutManager.ScrollDirection.VERTICAL = 0;

/**
 * @property {Number} HORIZONTAL
 * @ios
 * @static
 * @readonly
 * @since 3.0.2
 */
LayoutManager.ScrollDirection.HORIZONTAL = 1;

module.exports = LayoutManager;
