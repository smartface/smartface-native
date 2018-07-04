/**
 * @class UI.LayoutManager
 * @since 3.2
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
 *           scrollDirection: LayoutManager.ScrollDirection.VERTICAL,
 *           itemLength: 200
 *      });
 * 
 * 
 *
 */
 
function LayoutManager(params) {}

/**
 * User must return a length value for scrollDirection that user lays out the objects.
 * If vertical, length value will be height of item. If horizontal, length value will be width of item.
 *
 * @property {Number} [itemLength = 50]
 * @android
 * @ios
 * @since 3.2
 */
LayoutManager.prototype.itemLength = 50;

/**
 * Gets/sets colon or row count depends on scrolling direction of layout.
 * If vertical it represents colon, if horizontal it represent row count.
 *
 * @property {Number} [spanCount = 1]
 * @android
 * @ios
 * @since 3.2
 */
LayoutManager.prototype.spanCount = 1;

/**
 * Gets/sets the custom distance that the content view is inset from the scroll view edges.
 *
 * @property {Number} [contentInset = {top:0, left:0, bottom:0, right:0}]
 * @android
 * @ios
 * @since 3.2
 */
LayoutManager.prototype.contentInset = {top:0, left:0, bottom:0, right:0};


/**
 * The scroll direction of GridView.
 *
 * @property {LayoutManager.ScrollDirection} [scrollDirection = 0]
 * @android
 * @ios
 * @since 3.2
 */
LayoutManager.prototype.scrollDirection = LayoutManager.ScrollDirection.VERTICAL;


/**
 * Constants indicating the direction of scrolling for the layout.
 * @class UI.LayoutManager.ScrollDirection
 * @readonly
 * @ios
 * @since 3.2
 */
LayoutManager.ScrollDirection = {};

/**
 * @property {Number} VERTICAL
 * @ios
 * @static
 * @readonly
 * @since 3.2
 */
LayoutManager.ScrollDirection.VERTICAL = 0;

/**
 * @property {Number} HORIZONTAL
 * @ios
 * @static
 * @readonly
 * @since 3.2
 */
LayoutManager.ScrollDirection.HORIZONTAL = 1;

module.exports = LayoutManager;
