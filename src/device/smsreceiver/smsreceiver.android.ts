import AndroidConfig from '../../util/Android/androidconfig';
import { ISMSReceiver } from './smsreceiver';

const NativeIntentFilter = requireClass('android.content.IntentFilter');
const NativeBroadcastReceiver = requireClass('android.content.BroadcastReceiver');
const NativeBuild = requireClass('android.os.Build');
const NativeTelephony = requireClass('android.provider.Telephony');
const NativeSmsMessage = requireClass('android.telephony.SmsMessage');

class SMSReceiverAndroidClass implements ISMSReceiver {
  private _myReceiver: any;
  private _isRegistered = false;

  callback: (e?: { senderNumber: string; smsBody: string }) => void;

  registerReceiver() {
    const filter = new NativeIntentFilter('android.provider.Telephony.SMS_RECEIVED');
    filter.setPriority(9999);
    const broadcastReceiverOverrideMethods = {
      onReceive: (context: any, intent: any) => {
        let smsSender = '';
        let smsBody = '';
        if (NativeBuild.VERSION.SDK_INT >= NativeBuild.VERSION_CODES.KITKAT) {
          const arr = toJSArray(NativeTelephony.Sms.Intents.getMessagesFromIntent(intent));
          for (let i = 0; i < arr.length; i++) {
            const smsMessage = arr[i];
            smsSender = smsMessage.getDisplayOriginatingAddress();
            smsBody += smsMessage.getMessageBody();
          }
        } else {
          const smsBundle = intent.getExtras();
          // eslint-disable-next-line eqeqeq
          if (smsBundle != null) {
            const pdus = toJSArray(smsBundle.get('pdus'));
            // eslint-disable-next-line eqeqeq
            if (pdus == null) {
              return;
            }
            const messages: any = [];
            for (let i = 0; i < pdus.length; i++) {
              messages.push(NativeSmsMessage.createFromPdu(pdus[i]));
              smsBody += messages[i].getMessageBody();
            }
            smsSender = messages[0].getOriginatingAddress();
          }
        }
        this.callback?.({ senderNumber: smsSender, smsBody: smsBody });
      }
    };
    this._myReceiver = NativeBroadcastReceiver.extend('NativeBroadcastReceiver', broadcastReceiverOverrideMethods, null);
    AndroidConfig.activity.registerReceiver(this._myReceiver, filter);
    this._isRegistered = true;
  }

  unRegisterReceiver() {
    if (this._isRegistered) {
      AndroidConfig.activity.unregisterReceiver(this._myReceiver);
      this._isRegistered = false;
    }
  }
}

const SMSReceiver = new SMSReceiverAndroidClass();
export default SMSReceiver;
