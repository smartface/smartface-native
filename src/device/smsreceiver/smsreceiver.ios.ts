import { ISMSReceiver } from './smsreceiver';

class SMSReceiverIOSClass implements ISMSReceiver {
  callback: (e?: { senderNumber: string; smsBody: string } | undefined) => void;
  unRegisterReceiver(): void {
    return;
  }
  registerReceiver(): void {
    return;
  }
}

const SMSReceiver = new SMSReceiverIOSClass();
export default SMSReceiver;
