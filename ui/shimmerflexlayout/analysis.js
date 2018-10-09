/**
 * @class ShimmerFlexLayout
 * @since 3.1.3
 * 
 * This class provides an easy way to add a shimmer effect to any view in your app.
 * It is useful as an unobtrusive loading indicator.
 */
function ShimmerFlexLayout() {}

/**
 * Starts the shimmer animation
 * 
 * @method  startShimmer
 * @android
 * @since 3.1.3
 */
ShimmerFlexLayout.startShimmer;

/**
 * Stops the shimmer animation
 * 
 * @method  stopShimmer
 * @android
 * @since 3.1.3
 */
ShimmerFlexLayout.stopShimmer;

/**
 * Gives information about whether the shimmer animation started or not. 
 * 
 * @property {Boolean} isShimmering
 * @readonly
 * @android
 * @since 3.1.3
 */
ShimmerFlexLayout.isShimmering;


/**
 * Set/Get shimmer to the ShimmerFlexLayout. This property must be assigned after all other 
 * propertis of ShimmerFlexLayout is assigned. It builds the shimmer based on your given properties. 
 * 
 * @property {UI.ShimmerFlexLayout.Android.Shimmer} shimmer
 * @android
 * @since 3.1.3
 */
ShimmerFlexLayout.shimmer;


/**
 * Sets the animation duration.
 * 
 * @property {Number} duration
 * @android
 * @since 3.1.3
 */
ShimmerFlexLayout.duration;


/**
 * Set alpha for unhighlighted view over which the highlight is drawn.
 * 
 * @property {Number} baseAlpha
 * @android
 * @since 3.1.3
 */
ShimmerFlexLayout.baseAlpha;


/**
 * Controls the brightness of the highlight at the center.
 * 
 * @property {Number} intensity
 * @android
 * @since 3.1.3
 */
ShimmerFlexLayout.intensity;


/**
 * Set animation repeat count.
 * 
 * @property {Number} repeatCount
 * @android
 * @since 3.1.3
 */
ShimmerFlexLayout.repeatCount;


/**
 * Set animation repeat delay.
 * 
 * @property {Number} repeatDelay
 * @android
 * @since 3.1.3
 */
ShimmerFlexLayout.repeatDelay;


/**
 * The travel direction of the shimmer highlight: left to right, top to bottom, right to left or bottom to top.
 * 
 * @property {UI.ShimmerFlexLayout.Android.ShimmerDirection} direction
 * @android
 * @since 3.1.3
 */
ShimmerFlexLayout.direction;


/**
 * Angle at which the highlight is tilted, measured in degrees.
 * 
 * @property {Number} tilt
 * @android
 * @since 3.1.3
 */
ShimmerFlexLayout.tilt;


/**
 * Set the shimmer's highlight color.
 * 
 * @property {UI.Color} highlightColor
 * @android
 * @since 3.1.3
 */
ShimmerFlexLayout.highlightColor;

/**
 * Set base  color of content.
 * 
 * @property {UI.Color} baseColor
 * @android
 * @since 3.1.3
 */
ShimmerFlexLayout.baseColor;

/**
 * Set the alpha of the shimmer highlight.
 * 
 * @property {UI.Color} highlightAlpha
 * @android
 * @since 3.1.3
 */
ShimmerFlexLayout.highlightAlpha;
