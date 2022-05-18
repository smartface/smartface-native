import Page from '../page';
import { AbstractEmailComposer } from './emailcomposer';

declare class EmailComposerImpl extends AbstractEmailComposer {
  constructor(params?: Partial<AbstractEmailComposer>);
  setCC(cc: string[]): void;
  setBCC(bcc: string[]): void;
  setTO(to: string[]): void;
  setMessage(text: string, isHtmlText?: boolean): void;
  setSubject(subject: string): void;
  onClose: () => void;
  show(page: Page): void;
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
  static canSendMail(): boolean;
}

const EmailComposer: typeof EmailComposerImpl = require(`./emailcomposer.${Device.deviceOS.toLowerCase()}`).default;
type EmailComposer = EmailComposerImpl;

export default EmailComposer;
