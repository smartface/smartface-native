import Page from '../../ui/page';
import File from '../../io/file';
import { IContact } from '../../device/contacts/contact/contact';
import { IImage } from '../../ui/image/image';

/**
 * @class Share
 * @static
 * @since 0.1
 *
 * Share allows sending a text, an image or a file over
 * other apps on the device. Blacklist works for iOS only.
 *
 */
export declare class ShareBase {
  /**
   * Shares a text.
   *
   *     @example
   *     import Share from '@smartface/native/share';
   *     Share.shareText("Hello from '@smartface/native'", myPage, [Share.ios.Twitter, Share.ios.Facebook]);
   *
   * @method shareText
   * @param {String} text
   * @param {UI.Page} page
   * @param {Array} [blacklist]
   * @ios
   * @android
   * @since 0.1
   */
  static shareText(text: string, page: Page, blacklist: string[]): void;
  /**
   * Shares an image.
   *
   *     @example
   *     import Share from '@smartface/native/share';
   *     import Image from '@smartface/native/ui/image';
   *
   *     var image = Image.createFromFile('path to the image');
   *     Share.shareImage(image, myPage, []);
   *
   * @method shareImage
   * @param {UI.Image} image
   * @param {UI.Page} page
   * @param {Array} [blacklist]
   * @android
   * @ios
   * @since 0.1
   */
  static shareImage(image: IImage, page: Page, blacklist: string[]): void;
  /**
   * Shares a file.
   *
   *     @example
   *     import Share from '@smartface/native/share';
   *     import File from '@smartface/native/io/file';
   *
   *     var file = new File({path: 'path to the file'});
   *     Share.shareFile(file, myPage, []);
   *
   * @method shareFile
   * @param {IO.File} file
   * @param {UI.Page} page
   * @param {Array} [blacklist]
   * @ios
   * @android
   * @since 0.1
   */
  static shareFile(file: File, page: Page, blacklist: string[]): void;
  /**
   * Shares contact.
   *
   * @method shareContacts
   * @param {Object} params
   * @param {Contacts.Contact[]} params.items
   * @param {String} params.fileName Specifies vCard file name. Defaults to Contacts
   * @param {UI.Page} params.page
   * @param {Array} [params.blacklist]
   * @ios
   * @android
   * @see https://developer.smartface.io/docs/native-share-in-ios-and-android#contacts-sharing
   * @since 4.2.1
   */
  static shareContacts(params: { items: IContact[]; fileName?: string; page: Page; blacklist: string[] }): void;

  /**
   * Shares file, image & text.
   *
   *     @example
   *     import Share from '@smartface/native/share';
   *     import File from '@smartface/native/io/file';
   *
   *     var myPage = this; // in page scope
   *     var file = new File({
   *         path: 'assets://yourFile.pdf'
   *     });
   *     var image = Image.createFromFile("images://smartface.png");
   *     var text = "Hello from Smartface";
   *     Share.share({ items: [text, file, image] , page: myPage, blacklist: [Share.ios.Twitter, Share.ios.Facebook]});
   *
   * @method share
   * @param {Object} params
   * @param {Array} params.items
   * @param {UI.Page} params.page
   * @param {Array} [params.blacklist]
   * @ios
   * @android
   * @see https://developer.smartface.io/docs/native-share-in-ios-and-android#multiple-sharing
   * @since 4.0.2
   */
  static share(params: { items: any[]; page: Page; blacklist: string[] }): void;
  static ios: Partial<{
    /**
     * @property {String} AirDrop
     * @static
     * @readonly
     * @ios
     * @since 0.1
     */
    readonly AirDrop: string;
    /**
     * @property {String} Facebook
     * @static
     * @readonly
     * @ios
     * @since 0.1
     */
    readonly Facebook: string;
    /**
     * @property {String} Twitter
     * @static
     * @readonly
     * @ios
     * @since 0.1
     */
    readonly Twitter: string;
    /**
     * @property {String} Message
     * @static
     * @readonly
     * @ios
     * @since 0.1
     */
    readonly Message: string;
    /**
     * @property {String} Mail
     * @static
     * @readonly
     * @ios
     * @since 0.1
     */
    readonly Mail: string;
    /**
     * @property {String} Vimeo
     * @static
     * @readonly
     * @ios
     * @since 0.1
     */
    readonly Vimeo: string;
  }>;
}
