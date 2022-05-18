export interface ISMSReceiver {
  /**
   * Set or get this function to read the sms content and number.
   */
  callback: (e?: { senderNumber: string; smsBody: string }) => void;

  /**
   * Call this function when you no longer want to receiver SMS Messages
   */
  unRegisterReceiver(): void;
  /**
   * Register a Sms-BroadcastReceiver to be run in the main activity thread.
   * This needs RECEIVE_SMS permission.
   */
  registerReceiver(): void;
}
