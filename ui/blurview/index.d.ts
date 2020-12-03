export =  BlurView;

import Color = require("sf-core/ui/color");
import View = require("sf-core/ui/view");
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
declare class BlurView extends View  {
	constructor(params?: any);
    /**
     * Gets/sets the blur radius. The value range is between (0, 25].
     * @property {Number} [blurRadius=16]
     * @android
     * @since 4.3.1
     */
    blurRadius: number;
    /**
     * Gets/sets the root to start blur from.
     * @property {UI.FlexLayout} rootView
     * @android
     * @since 4.3.1
     */
    rootView: View;
    /**
     * Gets/sets the color overlay to be drawn on top of blurred content.
     * @property {UI.Color} overlayColor
     * @android
     * @since 4.3.1
     */
    overlayColor: Color;

    /**
     * Gets/sets blur style.
     * @property {UI.BlurView.iOS.EffectStyle} effectStyle
     * @ios
     * @since 4.3.1
     */
    effectStyle: BlurView.iOS.EffectStyle
}

declare namespace BlurView {
	namespace iOS {
        /**
         * Blur styles
         * @enum {Number} UI.BlurView.iOS.EffectStyle
         * @since 4.3.1
         * @ios
         */
        export enum EffectStyle {
            EXTRALIGHT = 0,
            LIGHT = 1,
            DARK = 2,
            REGULAR = 4,
            PROMINENT = 5,
            SYSTEMULTRATHINMATERIAL = 6,
            SYSTEMTHINMATERIAL = 7,
            SYSTEMMATERIAL = 8,
            SYSTEMTHICKMATERIAL = 9,
            SYSTEMCHROMEMATERIAL = 10,
            SYSTEMULTRATHINMATERIALLIGHT = 11,
            SYSTEMTHINMATERIALLIGHT = 12,
            SYSTEMMATERIALLIGHT = 13,
            SYSTEMTHICKMATERIALLIGHT = 14,
            SYSTEMCHROMEMATERIALLIGHT = 15,
            SYSTEMULTRATHINMATERIALDARK = 16,
            SYSTEMTHINMATERIALDARK = 17,
            SYSTEMMATERIALDARK = 18,
            SYSTEMTHICKMATERIALDARK = 19,
            SYSTEMCHROMEMATERIALDARK = 20
        }
	}
}
