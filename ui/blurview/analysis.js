/**
 * @class UI.BlurView
 * @extends UI.View
 * @since 4.3.1
 *
 * BlurView that blurs its underlying content.
 *
 *     @example
 *     const BlurView = require('sf-core/ui/blurview');
 *     const FlexLayout = require('sf-core/ui/flexlayout');
 *
 *     var myBlurView = new BlurView({
 *         top: 0,
 *         right: 0,
 *         left: 0,
 *         bottom: 0,
 *         positionType: FlexLayout.PositionType.ABSOLUTE
 *     });
 * 
 *     myBlurView.android.rootView = page.layout;
 *
 *     page.layout.addChild(myBlurView);
 */
function BlurView() {}

BlurView.prototype.android = {};
BlurView.prototype.ios = {};
/**
 * Gets/sets blur style.
 * @property {UI.BlurView.iOS.EffectStyle} effectStyle
 * @ios
 * @since 4.3.1
 */
BlurView.prototype.ios.effectStyle;
/**
 * Gets/sets the color overlay to be drawn on top of blurred content.
 * @property {UI.Color} overlayColor
 * @android
 * @since 4.3.1
 */
BlurView.prototype.android.overlayColor;
/**
 * Gets/sets the blur radius. The value range is between (0, 25].
 * @property {Number} [blurRadius=16]
 * @android
 * @since 4.3.1
 */
BlurView.prototype.android.blurRadius;
/**
 * Gets/sets the root to start blur from.
 * @property {UI.FlexLayout} rootView
 * @android
 * @since 4.3.1
 */
BlurView.prototype.android.rootView;

BlurView.iOS = {};
/**
 * Blur styles
 * @enum {Number} UI.BlurView.iOS.EffectStyle
 * @since 4.3.1
 * @ios
 */
BlurView.iOS.EffectStyle = {}

/**
 * @property {Number} EXTRALIGHT
 * @ios
 * @static
 * @readonly
 * @since 4.3.1
 */
BlurView.iOS.EffectStyle.EXTRALIGHT = 0;

/**
 * @property {Number} LIGHT
 * @ios
 * @static
 * @readonly
 * @since 4.3.1
 */
BlurView.iOS.EffectStyle.LIGHT = 1;

/**
 * @property {Number} DARK
 * @ios
 * @static
 * @readonly
 * @since 4.3.1
 */
BlurView.iOS.EffectStyle.DARK = 2;

/**
 * @property {Number} REGULAR
 * @ios
 * @static
 * @readonly
 * @since 4.3.1
 */
BlurView.iOS.EffectStyle.REGULAR = 4;
/**
 * @property {Number} PROMINENT
 * @ios
 * @static
 * @readonly
 * @since 4.3.1
 */
BlurView.iOS.EffectStyle.PROMINENT = 5;
/**
 * Available on ios 13 and upper
 * @property {Number} SYSTEMULTRATHINMATERIAL
 * @ios
 * @static
 * @readonly
 * @since 4.3.1
 */
BlurView.iOS.EffectStyle.SYSTEMULTRATHINMATERIAL = 6;
/**
 * Available on ios 13 and upper
 * @property {Number} SYSTEMTHINMATERIAL
 * @ios
 * @static
 * @readonly
 * @since 4.3.1
 */
BlurView.iOS.EffectStyle.SYSTEMTHINMATERIAL = 7;
/**
 * Available on ios 13 and upper
 * @property {Number} SYSTEMMATERIAL
 * @ios
 * @static
 * @readonly
 * @since 4.3.1
 */
BlurView.iOS.EffectStyle.SYSTEMMATERIAL = 8;
/**
 * Available on ios 13 and upper
 * @property {Number} SYSTEMTHICKMATERIAL
 * @ios
 * @static
 * @readonly
 * @since 4.3.1
 */
BlurView.iOS.EffectStyle.SYSTEMTHICKMATERIAL = 9;
/**
 * Available on ios 13 and upper
 * @property {Number} SYSTEMCHROMEMATERIAL
 * @ios
 * @static
 * @readonly
 * @since 4.3.1
 */
BlurView.iOS.EffectStyle.SYSTEMCHROMEMATERIAL = 10;
/**
 * Available on ios 13 and upper
 * @property {Number} SYSTEMULTRATHINMATERIALLIGHT
 * @ios
 * @static
 * @readonly
 * @since 4.3.1
 */
BlurView.iOS.EffectStyle.SYSTEMULTRATHINMATERIALLIGHT = 11;
/**
 * Available on ios 13 and upper
 * @property {Number} SYSTEMTHINMATERIALLIGHT
 * @ios
 * @static
 * @readonly
 * @since 4.3.1
 */
BlurView.iOS.EffectStyle.SYSTEMTHINMATERIALLIGHT = 12;
/**
 * Available on ios 13 and upper
 * @property {Number} SYSTEMMATERIALLIGHT
 * @ios
 * @static
 * @readonly
 * @since 4.3.1
 */
BlurView.iOS.EffectStyle.SYSTEMMATERIALLIGHT = 13;
/**
 * Available on ios 13 and upper
 * @property {Number} SYSTEMTHICKMATERIALLIGHT
 * @ios
 * @static
 * @readonly
 * @since 4.3.1
 */
BlurView.iOS.EffectStyle.SYSTEMTHICKMATERIALLIGHT = 14;
/**
 * Available on ios 13 and upper
 * @property {Number} SYSTEMCHROMEMATERIALLIGHT
 * @ios
 * @static
 * @readonly
 * @since 4.3.1
 */
BlurView.iOS.EffectStyle.SYSTEMCHROMEMATERIALLIGHT = 15;
/**
 * Available on ios 13 and upper
 * @property {Number} SYSTEMULTRATHINMATERIALDARK
 * @ios
 * @static
 * @readonly
 * @since 4.3.1
 */
BlurView.iOS.EffectStyle.SYSTEMULTRATHINMATERIALDARK = 16;
/**
 * Available on ios 13 and upper
 * @property {Number} SYSTEMTHINMATERIALDARK
 * @ios
 * @static
 * @readonly
 * @since 4.3.1
 */
BlurView.iOS.EffectStyle.SYSTEMTHINMATERIALDARK = 17;
/**
 * Available on ios 13 and upper
 * @property {Number} SYSTEMMATERIALDARK
 * @ios
 * @static
 * @readonly
 * @since 4.3.1
 */
BlurView.iOS.EffectStyle.SYSTEMMATERIALDARK = 18;
/**
 * Available on ios 13 and upper
 * @property {Number} SYSTEMTHICKMATERIALDARK
 * @ios
 * @static
 * @readonly
 * @since 4.3.1
 */
BlurView.iOS.EffectStyle.SYSTEMTHICKMATERIALDARK = 19;
/**
 * Available on ios 13 and upper
 * @property {Number} SYSTEMCHROMEMATERIALDARK
 * @ios
 * @static
 * @readonly
 * @since 4.3.1
 */
BlurView.iOS.EffectStyle.SYSTEMCHROMEMATERIALDARK = 20;

module.exports = BlurView;