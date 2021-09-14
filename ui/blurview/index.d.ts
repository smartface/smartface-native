import Color from "../../ui/color";
import View from "../../ui/view";
import IBlurViewEvents from "./events";
/**
 * @class UI.BlurView
 * @extends UI.View
 * @since 4.3.1
 *
 * BlurView that blurs its underlying content.
 *
 *     @example
 *     const BlurView = require('@smartface/native/ui/blurview');
 *     const FlexLayout = require('@smartface/native/ui/flexlayout');
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
declare class BlurView extends View {
    constructor(params?: any);

    android: View['android'] & {
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
    }

    ios: View['ios'] & {
        /**
         * Gets/sets blur style.
         * @property {UI.BlurView.iOS.EffectStyle} effectStyle
         * @ios
         * @since 4.3.1
         */
        effectStyle: BlurView.iOS.EffectStyle
    }

    static Events: IBlurViewEvents;
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
        export enum SemanticContentAttribute {
            /**
             * Layout direction will be the same as the device direction. You can use {@link Application#userInterfaceLayoutDirection userInterfaceLayoutDirection} property to check device direction.
             *
             * @property {Number} AUTO
             * @static
             * @ios
             * @readonly
             * @since 3.1.3
             */
            AUTO = 0,
            /**
             * Layout direction is always left to right.
             *
             * @property {Number} FORCELEFTTORIGHT
             * @static
             * @ios
             * @readonly
             * @since 3.1.3
             */
            FORCELEFTTORIGHT = 3,
            /**
             * Layout direction is always right to left.
             *
             * @property {Number} FORCERIGHTTOLEFT
             * @static
             * @ios
             * @readonly
             * @since 3.1.3
             */
            FORCERIGHTTOLEFT = 4
        }
    }
}

export = BlurView;
