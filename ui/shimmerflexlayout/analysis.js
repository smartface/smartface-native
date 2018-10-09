/**
 * @class UI.ShimmerFlexLayout
 * @since 3.1.3
 * 
 *     @example
 *     const Color = require('sf-core/ui/color');
 *     const FlexLayout = require('sf-core/ui/flexlayout');
 *    
 *     var flex = new FlexLayout();
 *     flex.flexGrow = 1;
 *     flex.flexDirection = FlexLayout.FlexDirection.ROW;
 *     var flexImage = new FlexLayout();
 *     flexImage.flexGrow = 0.5;
 *     flexImage.margin = 20;
 *     flexImage.marginRight = 10;
 *     flexImage.borderRadius = 10;
 *     flexImage.backgroundColor = Color.LIGHTGRAY;
 *    
 *     flex.addChild(flexImage);
 *    
 *     var flexLabels = new FlexLayout();
 *     flexLabels.flexGrow = 1;
 *    
 *     var labelTop = new FlexLayout();
 *     labelTop.height = 20;
 *     labelTop.margin = 20;
 *     labelTop.marginBottom = 10;
 *     labelTop.borderRadius = 10;
 *     labelTop.backgroundColor = Color.LIGHTGRAY;
 *     flexLabels.addChild(labelTop);
 *    
 *     var labelCenter = new FlexLayout();
 *     labelCenter.height = 20;
 *     labelCenter.margin = 20;
 *     labelCenter.marginTop = 0;
 *     labelCenter.borderRadius = 10;
 *     labelCenter.marginRight = 100;
 *     labelCenter.backgroundColor = Color.LIGHTGRAY;
 *     flexLabels.addChild(labelCenter);
 *    
 *     var labelBottom = new FlexLayout();
 *     labelBottom.positionType = FlexLayout.PositionType.ABSOLUTE;
 *     labelBottom.bottom = 20;
 *     labelBottom.left = 20;
 *     labelBottom.height = 20;
 *     labelBottom.right = 40;
 *     labelBottom.borderRadius = 10;
 *     labelBottom.backgroundColor = Color.LIGHTGRAY;
 *    
 *     flexLabels.addChild(labelBottom);
 *    
 *     flex.addChild(flexLabels);
 *    
 *     var shimmer = new ShimmerFlexLayout();
 *     shimmer.height = 200;
 *       
 *     shimmer.ios.animationAlpha = 0.2;
 *     shimmer.baseAlpha = 0.5;
 *     shimmer.pauseDuration = 500;
 *     shimmer.android.highlightAlpha = 1;
 *    
 *     shimmer.android.build(ShimmerFlexLayout.Android.Shimmer.AlphaHighlight);
 *    
 *     shimmer.contentLayout = flex
 *    
 *     myPage.layout.addChild(shimmer);
 *    
 *     shimmer.startShimmering();
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
ShimmerFlexLayout.startShimmering;

/**
 * Stops the shimmer animation
 * 
 * @method  stopShimmer
 * @android
 * @ios
 * @since 3.1.3
 */
ShimmerFlexLayout.stopShimmering;

/**
 * Assign the content flexlayout for shimmering. 
 * 
 * @property {UI.FlexLayout} contentLayout
 * @ios
 * @android
 * @since 3.1.3
 */
ShimmerFlexLayout.contentLayout;

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
 * Builds the shimmer based on your assigned properties by given UI.ShimmerFlexLayout.Android.Shimmer. This method must be used after all other 
 * propertis of ShimmerFlexLayout is assigned.
 * 
 * @method build
 * @param {UI.ShimmerFlexLayout.Android.Shimmer} shimmerType
 * @android
 * @since 3.1.3
 */
ShimmerFlexLayout.build = function(shimmerType) {};


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
 * @property {Number} [baseAlpha = 1]
 * @android
 * @ios
 * @since 3.1.3
 */
ShimmerFlexLayout.baseAlpha;


/**
 * Controls the brightness of the highlight at the center.
 * 
 * @property {Number} [intensity = 0]
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
 * The highlight length of shimmering. Range of [0,1], defaults to 1.0.
 * 
 * @property {Number} [highlightLength = 1.0]
 * @ios
 * @since 3.1.3
 */
ShimmerFlexLayout.highlightLength;

/**
 * The alpha of the content while it is shimmering. Defaults to 0.5.
 * 
 * @property {Number} [animationAlpha = 0.5]
 * @ios
 * @since 3.1.3
 */
ShimmerFlexLayout.animationAlpha;

/**
 * The speed of shimmering, in points per second. Defaults to 230.
 * 
 * @property {Number} [speed = 230]
 * @ios
 * @since 3.1.3
 */
ShimmerFlexLayout.speed;

/**
 * The duration of the fade used when shimmer begins. Defaults to 0.1.
 * 
 * @property {Number} [beginFadeDuration = 0.1]
 * @ios
 * @since 3.1.3
 */
ShimmerFlexLayout.beginFadeDuration;

/**
 * The duration of the fade used when shimmer ends. Defaults to 0.3.
 * 
 * @property {Number} [endFadeDuration = 0.3]
 * @ios
 * @since 3.1.3
 */
ShimmerFlexLayout.endFadeDuration;

/**
 * Set animation repeat delay.
 * 
 * @property {Number} [pauseDuration = 0.4]
 * @android
 * @ios
 * @since 3.1.3
 */
ShimmerFlexLayout.pauseDuration;


/**
 * The travel direction of the shimmer: left to right, top to bottom, right to left or bottom to top.
 * 
 * @property {UI.ShimmerFlexLayout.ShimmeringDirection} shimmeringDirection
 * @ios
 * @android
 * @since 3.1.3
 */
ShimmerFlexLayout.ShimmeringDirection;


/**
 * Angle at which the highlight is tilted, measured in degrees.
 * 
 * @property {Number} [tilt = 20]
 * @android
 * @since 3.1.3
 */
ShimmerFlexLayout.tilt;


/**
 * Set the shimmer's highlight color. This property must be used if given shimmer type is UI.ShimmerFlexLayout.Android.Shimmer.ColorHighlight
 * 
 * @property {UI.Color} highlightColor
 * @android
 * @since 3.1.3
 */
ShimmerFlexLayout.highlightColor;

/**
 * Set base  color of content. This property must be used if given shimmer type is UI.ShimmerFlexLayout.Android.Shimmer.ColorHighlight
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
ShimmerFlexLayout.Android = {}

/** 
 * @enum UI.ShimmerFlexLayout.ShimmeringDirection
 * @ios
 * @android
 * @since 3.1.3
 * 
 * This enums are used to identify the direction of shimmer sweep.
 */
ShimmerFlexLayout.ShimmeringDirection = {};


/**
 * Highlight sweeps from  bottom to top.
 *
 * @property UP
 * @static
 * @android
 * @ios
 * @readonly
 * @since 3.1.3
 */
ShimmerFlexLayout.ShimmeringDirection.UP;

/**
 * Highlight sweeps from right to left.
 *
 * @property LEFT
 * @static
 * @android
 * @ios
 * @readonly
 * @since 3.1.3
 */
ShimmerFlexLayout.ShimmeringDirection.LEFT;


/**
 * Highlight sweeps from top to bottom.
 *
 * @property DOWN
 * @static
 * @android
 * @ios
 * @readonly
 * @since 3.1.3
 */
ShimmerFlexLayout.ShimmeringDirection.DOWN;


/**
 * Highlight sweeps from left to right.
 *
 * @property RIGHT
 * @static
 * @android
 * @ios
 * @readonly
 * @since 3.1.3
 */
ShimmerFlexLayout.ShimmeringDirection.RIGHT;


/** 
 * @enum UI.ShimmerFlexLayout.Android.Shimmer
 * @since 3.1.3
 * 
 * This enums are used to identify shimmer type that can be either color or alpha .
 */
ShimmerFlexLayout.Android.Shimmer = {};


/**
 * The shimmer will be specified alpha.
 *
 * @property AlphaHighlight
 * @static
 * @android
 * @readonly
 * @since 3.1.3
 */
ShimmerFlexLayout.Android.Shimmer.AlphaHighlight;


/**
 * The shimmer will be specified color.
 *
 * @property ColorHighlight
 * @static
 * @android
 * @readonly
 * @since 3.1.3
 */
ShimmerFlexLayout.Android.Shimmer.ColorHighlight;
