import Page from '../page';
import { MobileOSProps, NativeMobileComponent } from '../../core/native-mobile-component';
import IBlob from '../../global/blob/blob';
import { IFile } from '../../io/file/file';

interface EmailComposerAndroidProps {
  /**
   * Attach the given file to email composer.
   *
   * @param {IO.File} file
   * @android
   * @method addAttachmentForAndroid
   * @since 3.0.3
   */
  addAttachmentForAndroid(file: IFile): void;
}
interface EmailComposerIOSProps {
  /**
   * Attach the given file to email composer.
   * For Images; if you have multiple sizes of image resource (e.g smartface@2x.png, smartface@3x.png); you should give exact path of an image file.
   *
   * @param {Blob} blob
   * @param {String} mimeType mimeType's "image/jpeg","image/png","image/gif","image/tiff","image/tiff","application/pdf","application/vnd","text/plain",
   * @param {String} fileName
   * @ios
   * @method addAttachmentForiOS
   * @since 3.0.3
   */
  addAttachmentForiOS(blob: IBlob, mimeType?: string, fileName?: string): void;
}

/**
 * @class UI.EmailComposer
 * @since 3.0.3
 * A standard interface for managing, editing, and sending an email message. When email composer is dismiss, page's onShow will be triggered.
 *     
 *     @example
 *     import File from '@smartface/native/io/file';
 *     import FileStream from '@smartface/native/io/filestream';
 *     import EmailComposer from '@smartface/native/ui/emailcomposer';
 *     import System from '@smartface/native/device/system';
 *              
 *     if (EmailComposer.canSendMail()) {
 *         var emailcomposer = new EmailComposer();
 *         emailcomposer.setBCC(["bcc@smartface.io","bcc2@smartface.io"]);
 *         emailcomposer.setCC(["cc@smartface.io","cc2@smartface.io"]);
 *         emailcomposer.setTO(["to@smartface.io","to2@smartface.io"]);
 *         emailcomposer.setMessage("message");
 *         emailcomposer.setSubject("subject");
 *         emailcomposer.onClose = function(){
 *             console.log("onClose");
 *         };

 *         var imageFile = new File({
 *             path: 'assets://smartface.png'
 *         });
 *         
 *         emailcomposer.android.addAttachmentForAndroid(imageFile);
 *         
 *         if (System.OS == "iOS") {
 *             var imageFileStream = imageFile.openStream(FileStream.StreamType.READ, FileStream.ContentMode.BINARY);
 *             var fileBlob = imageFileStream.readToEnd();
 *             imageFileStream.close();
 *             emailcomposer.ios.addAttachmentForiOS(fileBlob,"image/png","smartface.png");
 *         }
 *         
 *         emailcomposer.show(page);
 *     }
 *     
 */
export abstract class AbstractEmailComposer extends NativeMobileComponent<any, MobileOSProps<EmailComposerIOSProps, EmailComposerAndroidProps>> {
  /**
   * Sets the initial recipients to include in the email’s “CC” field.
   *
   * @param {String[]} cc
   * @android
   * @ios
   * @method setCC
   * @since 3.0.3
   */
  abstract setCC(cc: string[]): void;
  /**
   * Sets the initial recipients to include in the email’s “BCC” field.
   *
   * @param {String[]} bcc
   * @android
   * @ios
   * @method setBCC
   * @since 3.0.3
   */
  abstract setBCC(bcc: string[]): void;
  /**
   * Sets the initial recipients to include in the email’s “TO” field.
   *
   * @param {String[]} to
   * @android
   * @ios
   * @method setTO
   * @since 3.0.3
   */
  abstract setTO(to: string[]): void;
  /**
   * Sets the initial body text to include in the email composer.
   *
   * @param {String} text
   * @param {Boolean} [isHtmlText = false]
   * @android
   * @ios
   * @method setMessage
   * @since 3.0.3
   */
  abstract setMessage(text: string, isHtmlText?: boolean): void;
  /**
   * Sets the initial text for the subject line of the email composer.
   *
   * @param {String} subject
   * @android
   * @ios
   * @method setSubject
   * @since 3.0.3
   */
  abstract setSubject(subject: string): void;
  /**
   * This function will be triggered when email composer is closed.
   *
   * @android
   * @ios
   * @method onClose
   * @since 3.0.3
   */
  abstract onClose: () => void;

  /**
   * This function shows email composer on the given UI.Page.
   *
   * @param {UI.Page} page This is the page that email will be shown.
   * @android
   * @ios
   * @method show
   * @since 3.0.3
   */
  abstract show(page: Page): void;
  protected createNativeObject() {
    throw new Error('Method not implemented');
  }
}
