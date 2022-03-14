import { AbstractEmailComposer } from '.';
import NativeComponent from '../../core/native-component';
import Blob from '../../global/blob';
import { BlobBase } from '../../global/blob/blob';
import File from '../../io/file';
import { AbstractFile } from '../../io/file/file';
import Page from '../page';

export default class EmailComposerIOS extends AbstractEmailComposer {
  private _cc: string[];
  private _bcc: string[];
  private _to: string[];
  private _message: { message: string; isHtmlText: boolean };
  private _subject: string;
  private _attaches: any = [];
  private _closeCallback: () => void;

  private nativeObjectDelegate: __SF_SMFMFMailComposeViewControllerDelegate;
  constructor() {
    super();
    const self = this;
    this.addIOSProps({
      addAttachmentForiOS(blob: Blob, mimeType?: string, fileName?: string) {
        self._attaches.push({
          blob: blob,
          mimeType: mimeType,
          fileName: fileName
        });
      }
    });

    this.addAndroidProps({
      addAttachmentForAndroid(attachment: File) {}
    });
  }
  get onClose() {
    return this._closeCallback;
  }
  set onClose(callback: () => void) {
    this._closeCallback = callback;
  }
  setCC(cc: string[]) {
    this._cc = cc;
  }
  setBCC(bcc: string[]) {
    this._bcc = bcc;
  }
  setTO(to: string[]) {
    this._to = to;
  }
  setMessage(text: string, isHtmlText?: boolean) {
    this._message = {
      message: text,
      isHtmlText: isHtmlText
    };
  }
  setSubject(subject: string) {
    this._subject = subject;
  }
  show(page: Page) {
    const self = this;
    this.nativeObject = new __SF_MFMailComposeViewController();
    if (this._cc) this.nativeObject.setCcRecipients(this._cc);
    if (this._bcc) this.nativeObject.setBccRecipients(this._bcc);
    if (this._to) this.nativeObject.setToRecipients(this._to);
    if (this._message) this.nativeObject.setMessageBodyIsHTML(this._message.message, this._message.isHtmlText ? this._message.isHtmlText : false);
    if (this._subject) this.nativeObject.setSubject(this._subject);
    for (let i = 0; i < this._attaches.length; i++) {
      this.nativeObject.addAttachmentDataMimeTypeFileName(this._attaches[i].blob.nativeObject, this._attaches[i].mimeType, this._attaches[i].fileName);
    }
    this.nativeObjectDelegate = new __SF_SMFMFMailComposeViewControllerDelegate();
    this.nativeObjectDelegate.didFinishWithResult = function () {
      self.nativeObject.dismissViewController(function () {
        self.onClose();
      });
    };

    this.nativeObject.mailComposeDelegate = this.nativeObjectDelegate;
    page.nativeObject.presentViewController(this.nativeObject);
  }
  canSendMail() {
    return __SF_MFMailComposeViewController.canSendMail();
  }
}
