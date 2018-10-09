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
 * @ios
 * @since 3.1.3
 */
ShimmerFlexLayout.startShimmer;

/**
 * Stops the shimmer animation
 * 
 * @method  stopShimmer
 * @android
 * @ios
 * @since 3.1.3
 */
ShimmerFlexLayout.stopShimmer;

/**
 * Gives information about whether the shimmer animation started or not. 
 * 
 * @property {Boolean} isShimmering
 * @readonly
 * @ios
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
 * @ios
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
 * @property {Number} pauseDuration
 * @android
 * @ios
 * @since 3.1.3
 */
ShimmerFlexLayout.pauseDuration;


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
 * Set the shimmer's highlight color. This property must be used if given shimmer is {UI.ShimmerFlexLayout.Android.Shimmer.ColorHighlight}.
 * 
 * @property {UI.Color} highlightColor
 * @android
 * @since 3.1.3
 */
ShimmerFlexLayout.highlightColor;

/**
 * Set base  color of content. This property must be used if given shimmer is {UI.ShimmerFlexLayout.Android.Shimmer.ColorHighlight}.
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


/**
 * Android Specific Properties.
 * @class UI.ShimmerFlexLayout.Android
 * @since 3.1.3
 */
ShimmerFlexLayout.Android ={}

/** 
 * @enum UI.ShimmerFlexLayout.Android.ShimmerDirection
 * @since 3.1.3
 * 
 * This enums are used to identify the direction of shimmer sweep.
 */
ShimmerFlexLayout.Android.ShimmerDirection = {};


/**
 * Highlight sweeps from  bottom to top.
 *
 * @property BOTTOM_TO_TOP
 * @static
 * @readonly
 * @since 3.1.3
 */
ShimmerFlexLayout.Android.ShimmerDirection.BOTTOM_TO_TOP;

/**
 * Highlight sweeps from right to left.
 *
 * @property RIGHT_TO_LEFT
 * @static
 * @readonly
 * @since 3.1.3
 */
ShimmerFlexLayout.Android.ShimmerDirection.RIGHT_TO_LEFT;


/**
 * Highlight sweeps from top to bottom.
 *
 * @property TOP_TO_BOTTOM
 * @static
 * @readonly
 * @since 3.1.3
 */
ShimmerFlexLayout.Android.ShimmerDirection.TOP_TO_BOTTOM;


/**
 * Highlight sweeps from left to right.
 *
 * @property LEFT_TO_RIGHT
 * @static
 * @readonly
 * @since 3.1.3
 */
ShimmerFlexLayout.Android.ShimmerDirection.LEFT_TO_RIGHT;
