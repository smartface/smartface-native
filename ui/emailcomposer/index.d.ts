import FileAndroid = require("sf-core/io/file/file-Android");
import Blob = require("sf-core/global/blob");
import Page = require("../page");

export = EmailComposer;
/**
 * @class UI.EmailComposer
 * @since 3.0.3
 * A standard interface for managing, editing, and sending an email message. When email composer is dismiss, page's onShow will be triggered.
 *     
 *     @example
 *     const File = require('sf-core/io/file');
 *     const FileStream = require('sf-core/io/filestream');
 *     const EmailComposer = require('sf-core/ui/emailcomposer');
 *     const System = require('sf-core/device/system');
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
declare class EmailComposer {
/**
 * Sets the initial recipients to include in the email’s “CC” field.
 *
 * @param {String[]} cc
 * @android
 * @ios
 * @method setCC
 * @since 3.0.3
 */
    setCC(cc: string[]): void;
/**
 * Sets the initial recipients to include in the email’s “BCC” field.
 *
 * @param {String[]} bcc
 * @android
 * @ios
 * @method setBCC
 * @since 3.0.3
 */
    setBCC(bcc: string[]): void;
/**
 * Sets the initial recipients to include in the email’s “TO” field.
 *
 * @param {String[]} to
 * @android
 * @ios
 * @method setTO
 * @since 3.0.3
 */
    setTO(to: string[]): void;
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
    setMessage(text: string, isHtmlText?: boolean): void;
/**
 * Sets the initial text for the subject line of the email composer.
 *
 * @param {String} subject
 * @android
 * @ios
 * @method setSubject
 * @since 3.0.3
 */
    setSubject(subject: string): void;
/**
 * Attach the given file to email composer.
 *
 * @param {IO.File} file
 * @android
 * @method addAttachmentForAndroid
 * @since 3.0.3
 */
    addAttachmentForAndroid(file: FileAndroid): void;
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
    addAttachmentForiOS(file: Blob): void;
/**
 * This function shows email composer on the given UI.Page.
 *
 * @param {UI.Page} page This is the page that email will be shown.
 * @android
 * @ios
 * @method show
 * @since 3.0.3
 */
    show(page: Page): void;
/**
 * This function will be triggered when email composer is closed.
 *
 * @android
 * @ios
 * @method onClose
 * @since 3.0.3
 */
    onClose: () => void;
/**
 * You should call this method before attempting to display the email composition interface. If it returns NO, you must not display the email composition interface.
 *
 * @return {Boolean} canSendMail
 * @ios
 * @android
 * @method canSendMail
 * @static
 * @since 3.0.3
 */
	canSendMail(): boolean;
}
