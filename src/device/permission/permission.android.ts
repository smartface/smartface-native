import { NativeMobileComponent } from '../../core/native-mobile-component';
import AndroidConfig from '../../util/Android/androidconfig';
import { Permissions, IPermission, PermissionIOSAuthorizationStatus, PermissionResult } from './permission';

let lastRequestPermissionCode = 2000;

const PermissionAndroidMapping = {
  [Permissions.CAMERA]: Permissions.ANDROID.CAMERA,
  [Permissions.LOCATION]: Permissions.ANDROID.ACCESS_COARSE_LOCATION
};

class PermissionAndroidClass extends NativeMobileComponent<any, IPermission> implements IPermission {
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
        this.android.onRequestPermissionsResult = (e) => {
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
        };
        this.android.requestPermissions?.(requestPermissionCode, currentPermission);
      }
    });
  }
  private getAndroidProps(): IPermission['android'] {
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
      requestPermissions(requestCode: number, permissions: Permissions.ANDROID[] | Permissions.ANDROID): void {
        if (typeof requestCode !== 'number') {
          throw new Error('requestCode must be number');
        } else if (typeof permissions !== 'string' && !Array.isArray(permissions)) {
          throw new Error('permissions must be AndroidPermissions or array of AndroidPermissions');
        }
        const currentPermissions = Array.isArray(permissions) ? permissions : [permissions];
        AndroidConfig.activity.requestPermissions(array(currentPermissions, 'java.lang.String'), requestCode);
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
