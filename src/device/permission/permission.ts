import { INativeMobileComponent, MobileOSProps } from '../../core/native-mobile-component';

export enum PermissionIOSAuthorizationStatus {
  NOT_DETERMINED,
  RESTRICTED,
  DENIED,
  AUTHORIZED_ALWAYS,
  AUTHORIZED_WHEN_IN_USE
}

export enum PermissionResult {
  GRANTED,
  DENIED,
  NEVER_ASK_AGAIN
}
/**
 * Holds values of available permissions. This is a union of Android and iOS permissions.
 *
 * For iOS only Permission requests
 * @example
 * Permission.ios.requestAuthorization(Permissions.IOS.CAMERA);
 *
 * For Android only Permission requests
 * @example
 * Permission.android.requestPermissions(Permissions.ANDROID.READ_CALENDAR);
 *
 * For Mutual permission requests
 * @example
 * Permission.requestPermission(Permissions.CAMERA);
 */
export namespace Permissions {
  export enum IOS {
    LOCATION = 'CLLocationManager',
    CAMERA = 'PHPhotoLibrary'
  }
  export enum ANDROID {
    /**
     * Allows to read the calendar data.
     *
     * @property READ_CALENDAR
     * @readonly
     * @since 1.1.16
     */
    READ_CALENDAR = 'android.permission.READ_CALENDAR',
    /**
     * Allows an application to write the user's calendar data.
     *
     * @property WRITE_CALENDAR
     * @readonly
     * @since 1.1.16
     */
    WRITE_CALENDAR = 'android.permission.WRITE_CALENDAR',

    /**
     * Required to be able to access the camera device.
     *
     * @property CAMERA
     * @readonly
     * @since 1.1.16
     */
    CAMERA = 'android.permission.CAMERA',
    /**
     * Allows an application to read the user's contacts data.
     *
     * @property READ_CONTACTS
     * @readonly
     * @since 1.1.16
     */
    READ_CONTACTS = 'android.permission.READ_CONTACTS',
    /**
     * Allows an application to write the user's contacts data.
     *
     * @property WRITE_CONTACTS
     * @readonly
     * @since 1.1.16
     */
    WRITE_CONTACTS = 'android.permission.WRITE_CONTACTS',
    /**
     * Allows access to the list of accounts in the Accounts Service.
     *
     * @property GET_ACCOUNTS
     * @readonly
     * @since 1.1.16
     */
    GET_ACCOUNTS = 'android.permission.GET_ACCOUNTS',
    /**
     * Allows an app to access precise location.
     *
     * @property ACCESS_FINE_LOCATION
     * @readonly
     * @since 1.1.16
     */
    ACCESS_FINE_LOCATION = 'android.permission.ACCESS_FINE_LOCATION',
    /**
     * Allows an app to access approximate location.
     *
     * @property ACCESS_COARSE_LOCATION
     * @readonly
     * @since 1.1.16
     */
    ACCESS_COARSE_LOCATION = 'android.permission.ACCESS_COARSE_LOCATION',
    /**
     * Allows an application to record audio.
     *
     * @property RECORD_AUDIO
     * @readonly
     * @since 1.1.16
     */
    RECORD_AUDIO = 'android.permission.RECORD_AUDIO',
    /**
     * Allows read only access to phone state, including the phone number of the device,
     * current cellular network information, the status of any ongoing calls, and a list
     * of any PhoneAccounts registered on the device.
     *
     * @property READ_PHONE_STATE
     * @readonly
     * @since 1.1.16
     */
    READ_PHONE_STATE = 'android.permission.READ_PHONE_STATE',
    /**
     * Allows an application to initiate a phone call without going through the
     * Dialer user interface for the user to confirm the call.
     *
     * @property CALL_PHONE
     * @readonly
     * @since 1.1.16
     */
    CALL_PHONE = 'android.permission.CALL_PHONE',
    /**
     * Allows an application to read the user's call log.
     *
     * @property READ_CALL_LOG
     * @readonly
     * @since 1.1.16
     */
    READ_CALL_LOG = 'android.permission.READ_CALL_LOG',
    /**
     * Allows an application to write (but not read) the user's call log data.
     *
     * @property WRITE_CALL_LOG
     * @readonly
     * @since 1.1.16
     */
    WRITE_CALL_LOG = 'android.permission.WRITE_CALL_LOG',
    /**
     * Allows an application to add voicemails into the system.
     *
     * @property ADD_VOICEMAIL
     * @readonly
     * @since 1.1.16
     */
    ADD_VOICEMAIL = 'com.android.voicemail.permission.ADD_VOICEMAIL',
    /**
     * Allows an application to use SIP service.
     *
     * @property USE_SIP
     * @readonly
     * @since 1.1.16
     */
    USE_SIP = 'android.permission.USE_SIP',
    /**
     * Allows an application to see the number being dialed during an
     * outgoing call with the option to redirect the call to a different
     * number or abort the call altogether.
     *
     * @property PROCESS_OUTGOING_CALLS
     * @readonly
     * @since 1.1.16
     */
    PROCESS_OUTGOING_CALLS = 'android.permission.PROCESS_OUTGOING_CALLS',
    /**
     * Allows an application to access data from sensors
     * that the user uses to measure what is happening inside
     * his/her body, such as heart rate.
     *
     * @property BODY_SENSORS
     * @readonly
     * @since 1.1.16
     */
    BODY_SENSORS = 'android.permission.BODY_SENSORS',
    /**
     * Allows an application to send SMS messages.
     *
     * @property SEND_SMS
     * @readonly
     * @since 1.1.16
     */
    SEND_SMS = 'android.permission.SEND_SMS',
    /**
     * Allows an application to receive SMS messages.
     *
     * @property RECEIVE_SMS
     * @readonly
     * @since 1.1.16
     */
    RECEIVE_SMS = 'android.permission.RECEIVE_SMS',
    /**
     * Allows an application to read SMS messages.
     *
     * @property READ_SMS
     * @readonly
     * @since 1.1.16
     */
    READ_SMS = 'android.permission.READ_SMS',
    /**
     * Allows an application to receive WAP push messages.
     *
     * @property RECEIVE_WAP_PUSH
     * @readonly
     * @since 1.1.16
     */
    RECEIVE_WAP_PUSH = 'android.permission.RECEIVE_WAP_PUSH',
    /**
     * Allows an application to monitor incoming MMS messages.
     *
     * @property RECEIVE_MMS
     * @readonly
     * @since 1.1.16
     */
    RECEIVE_MMS = 'android.permission.RECEIVE_MMS',
    /**
     * Allows to read from external storage.
     * If you granted {@link Application.Android.Permissions#WRITE_EXTERNAL_STORAGE WRITE_EXTERNAL_STORAGE} permission,
     * you don't need this to granted this permission.
     *
     * @property READ_EXTERNAL_STORAGE
     * @readonly
     * @since 1.1.16
     */
    READ_EXTERNAL_STORAGE = 'android.permission.READ_EXTERNAL_STORAGE',
    /**
     * Allows to write to external storage.
     *
     * @property WRITE_EXTERNAL_STORAGE
     * @readonly
     * @since 1.1.16
     */
    WRITE_EXTERNAL_STORAGE = 'android.permission.WRITE_EXTERNAL_STORAGE',
    /**
     * Allows applications to write the apn settings and read sensitive fields of an existing apn settings like user and password.
     * You should include relevant permission setting to your AndroidManifest.xml file.
     *
     * @property WRITE_APN_SETTINGS
     * @readonly
     * @since 4.3.2
     */
    WRITE_APN_SETTINGS = 'android.permission.WRITE_APN_SETTINGS',
    /**
     * Allows an app to use fingerprint hardware. This permission have been deprecated on API 26 or higher. Use `USE_BIOMETRICS` instead.
     * @property USE_FINGERPINT
     * @readonly
     * @deprecated
     */
    USE_FINGERPRINT = 'android.permission.USE_FINGERPRINT',
    /**
     * Allows an app to use device supported biometric modalities.
     * @property USE_BIOMETRIC
     * @readonly
     */
    USE_BIOMETRIC = 'android.permission.USE_BIOMETRIC'
  }
  export const LOCATION = 'LOCATION';
  export const CAMERA = 'CAMERA';
}

export interface PermissionIOSProps {
  /**
   * Invokes iOS permission type in order to check the status of the permission
   * @param permission iOS Native permission type. E.g. 'PHPPhotoLibrary'. See IOSPermission value for all available permissions.
   */
  getAuthorizationStatus(permission: Permissions.IOS): PermissionIOSAuthorizationStatus;
  /**
   * Requests given permission.
   * @returns Promise that resolves when the permission is granted. If you want to get the status of the permission after the promise, please use getAuthorizationStatus again.
   */
  requestAuthorization(permission: Permissions.IOS): Promise<void>;
}

export interface PermissionAndroidProps {
  /**
   * This method checks for a permission is shown before to user
   * and the program is about to request the same permission again.
   *
   * @method shouldShowRequestPermissionRationale
   * @param {String} permission
   * @return {Boolean}
   * @android
   * @since 1.2
   */
  shouldShowRequestPermissionRationale(permission: Permissions.ANDROID): boolean;
  /**
   * This event is called after Application.requestPermissions function. This event is fired in asynchronous way.
   *
   * @since 1.2
   * @android
   * @since 1.2
   */
  onRequestPermissionsResult: (params: { requestCode: number; result: boolean[] }) => void;
  /**
   * This function checks if one of the dangerous permissions is granted at beginning or not.
   * For permissions in same category with one of the permissions is approved earlier, checking
   * will return as it is not required to request for the same category permission.
   *
   * @method checkPermission
   * @param {String} permission
   * @return {Boolean}
   * @android
   * @since 1.2
   */
  checkPermission(permission: Permissions.ANDROID): boolean;
  /**
   * With requestPermissions, the System Dialog will appear to ask for permission grant by user for dangerous(privacy) permissions.
   * {@link Application.android#onRequestPermissionsResult onRequestPermissionsResult} will be fired after user interact with permission dialog.
   *
   *     @example
   *     import Application from '@smartface/native/application';
   *     const PERMISSION_CODE = 1002;
   *     Application.android.requestPermissions(PERMISSION_CODE, Application.Android.Permissions.WRITE_EXTERNAL_STORAGE)
   *     Application.android.onRequestPermissionsResult = (e) => {
   *         console.log(JSON.stringify(e));
   *     }
   *
   * @method requestPermissions
   * @param {Number} requestIdentifier This number will be returned in {@link Permission.android.onRequestPermissionsResult onRequestPermissionsResult} when the user give permission or not.
   * @android
   * @since 1.2
   */
  requestPermissions(requestIdentifier: number, permissions: Permissions.ANDROID[] | Permissions.ANDROID): void;
}

export interface IPermission extends INativeMobileComponent<any, MobileOSProps<PermissionIOSProps, PermissionAndroidProps>> {
  /**
   * Requests permissions for both OS. If you want to get a permission which is specific to certain OS, please use their respective method instead.
   * For Android, this will override onRequestPermissionsResult method, therefore if you want to handle another android specific permissions,
   * please override the method again.
   */
  requestPermission(permission: Exclude<Extract<keyof typeof Permissions, string>, 'IOS' | 'ANDROID'>): Promise<PermissionResult>;
}
