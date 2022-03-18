import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
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
 *     import CallDetection from '@smartface/native/device/calldetection';
 *
 *     const callDetection = new CallDetection();
 *     callDetection.onCallStateChanged = (params) => {
 *         console.log(params);
 *     };
 *
 */

export interface ICallDetection extends NativeEventEmitterComponent<CallDetectionEvents> {
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
  onCallStateChanged: (e: { state: State; incomingNumber?: string; observer?: any }) => void;
}

const CallDetection: ICallDetection = require(`./calldetection.${Device.deviceOS.toLowerCase()}`).default;
type CallDetection = ICallDetection;

export default CallDetection;
