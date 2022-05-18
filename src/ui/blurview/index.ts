import { AbstractBlurView } from './blurview';

/**
 * BlurView that blurs its underlying content.
 *
 * @example
 * import BlurView '@smartface/native/ui/blurview';
 * import FlexLayout from '@smartface/native/ui/flexlayout';
 *
 * const myBlurView = new BlurView({
 *     top: 0,
 *     right: 0,
 *     left: 0,
 *     bottom: 0,
 *     positionType: FlexLayout.PositionType.ABSOLUTE
 * });
 *
 * myBlurView.android.rootView = page.layout;
 *
 * page.layout.addChild(myBlurView);
 *
 * @since 4.3.1
 */
const BlurView: typeof AbstractBlurView = require(`./blurview.${Device.deviceOS.toLowerCase()}`).default;
type BlurView = AbstractBlurView;

export default BlurView;
