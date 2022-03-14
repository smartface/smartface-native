import { AbstractEmailComposer } from '.';
import NativeComponent from '../../core/native-component';
import Blob from '../../global/blob';
import File from '../../io/file';
import { RequestCodes, TypeUtil } from '../../util';
import Page from '../page';

const NativeIntent = requireClass('android.content.Intent');
const NativeUri = requireClass('android.net.Uri');
const NativeHtml = requireClass('android.text.Html');

const EXTRA_CC = 'android.intent.extra.CC';
const EXTRA_BCC = 'android.intent.extra.BCC';
const EXTRA_EMAIL = 'android.intent.extra.EMAIL';
const EXTRA_TEXT = 'android.intent.extra.TITLE';
const EXTRA_SUBJECT = 'android.intent.extra.SUBJECT';
const EXTRA_STREAM = 'android.intent.extra.STREAM';
const ACTION_VIEW = 'android.intent.action.VIEW';

export default class EmailComposerAndroid extends AbstractEmailComposer {
  static EMAIL_REQUESTCODE = RequestCodes.EmailComposer.EMAIL_REQUESTCODE;
  private _closeCallback: () => void;
  constructor() {
    super();
    const self = this;
    this.nativeObject = new NativeIntent(ACTION_VIEW);
    this.nativeObject.setData(NativeUri.parse('mailto:'));

    this.addAndroidProps({
      addAttachmentForAndroid(attachment: File) {
        if (attachment instanceof File) {
          const absulotePath = attachment.nativeObject.getAbsolutePath();
          self.nativeObject.putExtra(EXTRA_STREAM, NativeUri.parse('file://' + absulotePath));
        }
      }
    });
    this.addIOSProps({
      addAttachmentForiOS(blob: Blob, mimeType?: string, fileName?: string) {}
    });
  }

  canSendMail(): boolean {
    throw false;
  }

  get onClose() {
    return this._closeCallback;
  }
  set onClose(callback: () => void) {
    if (!TypeUtil.isFunction(callback)) return;
    this._closeCallback = callback;
  }
  setCC(cc: string[]) {
    if (typeof cc === 'object') {
      this.nativeObject.putExtra(EXTRA_CC, array(cc, 'java.lang.String'));
    }
  }
  setBCC(bcc: string[]) {
    if (typeof bcc === 'object') {
      this.nativeObject.putExtra(EXTRA_BCC, array(bcc, 'java.lang.String'));
    }
  }
  setTO(to: string[]) {
    if (typeof to === 'object') {
      this.nativeObject.putExtra(EXTRA_EMAIL, array(to, 'java.lang.String'));
    }
  }
  setMessage(text: string, isHtmlText?: boolean) {
    if (!isHtmlText && typeof text === 'string') {
      this.nativeObject.putExtra(EXTRA_TEXT, text);
    } else {
      this.nativeObject.putExtra(EXTRA_TEXT, NativeHtml.fromHtml(text));
    }
  }
  setSubject(subject: string) {
    if (typeof subject === 'string') {
      this.nativeObject.putExtra(EXTRA_SUBJECT, subject);
    }
  }
  show(page: Page) {
    if (this.nativeObject && page) {
      page.nativeObject.startActivityForResult(this.nativeObject, EmailComposerAndroid.EMAIL_REQUESTCODE);
    }
  }
  static _closeCallback?: () => void;
  static canSendMail(): boolean {
    return true;
  }
  static onActivityResult(requestCode: number, resultCode: number, data: any) {
    EmailComposerAndroid._closeCallback?.();
  }
}
