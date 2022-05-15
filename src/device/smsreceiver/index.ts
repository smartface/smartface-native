import { ISMSReceiver } from './smsreceiver';

const SMSReceiver: ISMSReceiver = require(`./smsreceiver.${Device.deviceOS.toLowerCase()}`).default;
/**
 * This module can be used to receive SMS messages on Android.
 * For iOS, you should use Texbox.textContentType on the place you except to receive your OTP. Apple handles OTP receiving automatically.
 *
 *
 * @class SmsReceiver
 *
 *      @example
 *      import SmsReceiver from '@smartface/extension-smsreceiver';
 *      import Application from '@smartface/native/application';
 *
 *      Application.android.requestPermissions(1002, Application.Android.Permissions.RECEIVE_SMS);
 *
 *      SmsReceiver.registerReceiver();
 *      SmsReceiver.callback = (e) => {
 *          console.log(e.senderNumber + " : " + e.smsBody);
 *      });
 *
 *      // SmsReceiver.unRegisterReceiever();
 *
 */
export default SMSReceiver;
