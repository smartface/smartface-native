import { IEventEmitter } from '../../core/eventemitter';
import NativeComponent from '../../core/native-component';
import { CallDetectionEvents } from './calldetection-events';

export enum State {
  /**
   *
   * @property {String} DISCONNECTED
   * @static
   * @ios
   * @android
   * @readonly
   * @since 4.1.3
   */
  DISCONNECTED = 'Disconnected',

  /**
   * Android-only
   *
   * @property {String} MISSED
   * @static
   * @android
   * @readonly
   * @since 4.1.3
   */
  MISSED = 'Missed',

  /**
   * Android-only
   *
   * @property {String} OFFHOOK
   * @static
   * @android
   * @readonly
   * @since 3.1.3
   */
  OFFHOOK = 'Offhook',

  /**
   *
   * @property {String} INCOMING
   * @static
   * @ios
   * @android
   * @readonly
   * @since 4.1.3
   */
  INCOMING = 'Incoming',

  /**
   * iOS-only state
   *
   * @property {String} INCOMING
   * @static
   * @ios
   * @readonly
   * @since 4.1.3
   */
  DIALING = 'Dialing',

  /**
   * iOS-only state
   *
   * @property {String} CONNECTED
   * @static
   * @ios
   * @readonly
   * @since 4.1.3
   */
  CONNECTED = 'Connected'
}

/**
 * @class Device.CallDetection
 * @since 4.3.1
 *
 * Helps to detect call states.
 * Required {@link Application.Android.Permissions-static-property-READ_PHONE_STATE READ_PHONE_STATE} permission for Android.
 *
 *     @example
 *     const CallDetection = require("@smartface/native/device/calldetection");
 *
 *     const callDetection = new CallDetection();
 *     callDetection.onCallStateChanged = (params) => {
 *         console.log(params);
 *     };
 *
 */

export class CallDetectionBase extends NativeComponent implements IEventEmitter<CallDetectionEvents> {
  on(eventName: CallDetectionEvents, callback: (...args: any) => void): () => void {
    throw new Error('Method not implemented.');
  }
  once(eventName: CallDetectionEvents, callback: (...args: any) => void): () => void {
    throw new Error('Method not implemented.');
  }
  off(eventName: CallDetectionEvents, callback?: (...args: any) => void): void {
    throw new Error('Method not implemented.');
  }
  emit(event: CallDetectionEvents, detail?: any[]): void {
    throw new Error('Method not implemented.');
  }
  /**
   * Triggers when device call state changes.
   *
   * @since 4.3.1
   * @event onCallStateChanged
   * @param {Object} params
   * @param {Device.CallDetection.State} state
   * @param {String} incomingNumber Android only parameter
   * @android
   * @ios
   * @deprecated
   * @example
   * ````
   * import CallDetection from '@smartface/native/device/calldetection';
   *
   * const callDetection1 = new CallDetection();
   * callDetection1.on(CallDetection.Events.CallStateChanged, (params) => {
   *  console.info('onCallStateChanged', params);
   * });
   * ````
   */
  set onCallStateChanged(callback: ({ state, incomingNumber }: { state: State; incomingNumber?: string; observer?: any }) => void) {
    throw new Error('Method not implemented.');
  }
  get onCallStateChanged() {
    throw new Error('Method not implemented.');
  }
  static Events = CallDetectionEvents;
  /**
   * Call state
   * @enum {String} State
   * @since 4.3.1
   * @android
   * @ios
   *
   */
  static State = State;
}
