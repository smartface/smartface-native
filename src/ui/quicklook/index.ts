import { QuickLookBase } from './quicklook';

/**
 *
 * Quick Look lets people preview Keynote, Numbers, Pages, and PDF documents,
 * as well as images and other types of files, even if your app doesn't support those file formats.
 * For further information: https://developer.apple.com/ios/human-interface-guidelines/features/quick-look/
 * This class works only for IOS.
 *
 *     @example
 *     import QuickLook from '@smartface/native/ui/quicklook';
 *     const quickLook = new QuickLook();
 *     const testPDF = "assets://test.pdf";
 *     const testImage = "images://test.png";
 *     quickLook.document = [testPDF,testImage];
 *     quickLook.itemColor = Color.WHITE;
 *     quickLook.show(myPage);
 *
 * @since 0.1
 */
const QuickLook: typeof QuickLookBase = require(`./quicklook.${Device.deviceOS.toLowerCase()}`).default;
type QuickLook = QuickLookBase;

export default QuickLook;
