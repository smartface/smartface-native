import NativeEventEmitterComponent from '../../core/native-event-emitter-component';
import AndroidConfig from '../../util/Android/androidconfig';
import { Permissions, IPermission, PermissionIOSAuthorizationStatus, PermissionResult } from './permission';
import { PermissionEvents } from './permission-events';

let lastRequestPermissionCode = 2000;

const PermissionAndroidMapping = {
  [Permissions.CAMERA]: Permissions.ANDROID.CAMERA,
  [Permissions.LOCATION]: Permissions.ANDROID.ACCESS_COARSE_LOCATION
};

class PermissionAndroidClass extends NativeEventEmitterComponent<PermissionEvents, any, IPermission> implements IPermission {
  protected createNativeObject() {
    return null;
  }
  constructor() {
    super();
    this.addAndroidProps(this.getAndroidProps());
    this.addIOSProps(this.getIOSProps());
  }
  requestPermission(permission: Parameters<IPermission['requestPermission']>['0']): Promise<PermissionResult> {
    return new Promise((resolve, reject) => {
      const requestPermissionCode = lastRequestPermissionCode++;
      const currentPermission = PermissionAndroidMapping[permission];
      // const requestTexts = options?.requestTexts || {};
      const prevPermissionRationale = this.android.shouldShowRequestPermissionRationale?.(currentPermission);
      if (this.android.checkPermission?.(currentPermission)) {
        resolve(PermissionResult.GRANTED); // Already granted, no need to request again
      } else {
        this.once('requestPermissionsResult', (e) => {
          const currentPermissionRationale = this.android.shouldShowRequestPermissionRationale?.(currentPermission);
          // This is just one permission, therefore always use the first result.
          const currentPermissionResult = e.result[0];
          if (e.requestCode === requestPermissionCode && currentPermissionResult) {
            resolve(PermissionResult.GRANTED);
          } else if (!currentPermissionResult && !currentPermissionRationale && !prevPermissionRationale) {
            reject(PermissionResult.DENIED);
          } else {
            reject(PermissionResult.NEVER_ASK_AGAIN);
          }
        });
        this.android.requestPermissions?.(currentPermission, requestPermissionCode);
      }
    });
  }
  private getAndroidProps(): IPermission['android'] {
    const self = this;
    return {
      shouldShowRequestPermissionRationale(permission: Permissions.ANDROID) {
        if (typeof permission !== 'string') {
          throw new Error('Permission must be string type');
        }
        return AndroidConfig.activity.shouldShowRequestPermissionRationale(permission);
      },
      checkPermission(permission: Permissions.ANDROID): boolean {
        const packageManager = AndroidConfig.activity.getPackageManager();
        const packageName = AndroidConfig.activity.getPackageName(); //Did it this way to prevent potential circular dependency issue.
        return packageManager.checkPermission(permission, packageName) === 0; // PackageManager.PERMISSION_GRANTED
      },
      requestPermissions(permissions: Permissions.ANDROID[] | Permissions.ANDROID, requestCode?: number): Promise<PermissionResult[]> {
        const currentRequestCode = requestCode || ++lastRequestPermissionCode;
        return new Promise((resolve, reject) => {
          if (typeof currentRequestCode !== 'number') {
            reject('requestCode must be number');
          } else if (typeof permissions !== 'string' && !Array.isArray(permissions)) {
            reject('permissions must be AndroidPermissions or array of AndroidPermissions');
          }
          const currentPermissions = Array.isArray(permissions) ? permissions : [permissions];
          self.once('requestPermissionsResult', (e) => {
            const results = e.result.map((result) => result === 0);
            resolve(results);
          });
          AndroidConfig.activity.requestPermissions(array(currentPermissions, 'java.lang.String'), currentRequestCode);
        });
      }
    };
  }
  private getIOSProps(): IPermission['ios'] {
    return {
      getAuthorizationStatus() {
        return PermissionIOSAuthorizationStatus.NOT_DETERMINED;
      },
      requestAuthorization() {
        return Promise.resolve();
      }
    };
  }
}

const PermissionAndroid = new PermissionAndroidClass();
export default PermissionAndroid;
