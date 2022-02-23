import ContentInsetAdjustmentIOS from './contentinsetadjustment.ios';

/**
 * Constants indicating how safe area insets are added to the adjusted content inset.
 * @ios
 * @since 4.0.0
 */
const ContentInsetAdjustment: typeof ContentInsetAdjustmentIOS = Device.deviceOS.toLowerCase() === 'ios' ? require(`./image.${Device.deviceOS.toLowerCase()}`).default : ({} as const);
type ContentInsetAdjustment = ContentInsetAdjustmentIOS;

export default ContentInsetAdjustment;
