import { ConnectionType, NetworkBase, INetworkNotifier, NotifierAndroidProps } from './network';
import { MobileOSProps, NativeMobileComponent } from '../../core/native-mobile-component';

class Notifier extends NativeMobileComponent<any, MobileOSProps<{}, NotifierAndroidProps>> implements INetworkNotifier {
  private _connectionTypeChanged: ((type: ConnectionType) => void) | null;
  constructor(params?: { connectionTypeChanged: (type: ConnectionType) => void }) {
    super(params as any);
    this.addAndroidProps(this.getAndroidProps());
  }
  connectionTypeChanged: ((type: ConnectionType) => void) | null;
  protected createNativeObject(): any {
    const nativeObject = __SF_SMFReachability.reachabilityForInternetConnection();
    nativeObject.observeFromNotificationCenter();
    nativeObject.reachabilityChangedCallback = () => {
      let sfStatus = Network.ConnectionType.NONE;
      const status = this.nativeObject.currentReachabilityStatus();
      switch (status) {
        case 0:
          sfStatus = Network.ConnectionType.NONE;
          break;
        case 1:
          sfStatus = Network.ConnectionType.WIFI;
          break;
        case 2:
          sfStatus = Network.ConnectionType.MOBILE;
          break;
        default:
          break;
      }
      this.connectionTypeChanged?.(sfStatus);
    };
    return nativeObject;
  }
  private getAndroidProps() {
    return {
      isInitialStickyNotification() {
        return false;
      },
      initialCacheEnabled: false
    };
  }
  subscribe(callback: Notifier['_connectionTypeChanged']) {
    if (typeof callback === 'function') {
      this.connectionTypeChanged = callback;
      this.nativeObject.startNotifier();
    } else {
      this.unsubscribe();
    }
  }

  unsubscribe() {
    this.nativeObject.stopNotifier();
    this.nativeObject.removeObserver();
    this.connectionTypeChanged = null;
  }
}

class NetworkIOS implements NetworkBase {
  ConnectionType = ConnectionType;
  public readonly notifier: INetworkNotifier = new Notifier();
  public readonly Notifier = Notifier;
  roamingEnabled: boolean = false;
  get SMSEnabled(): boolean {
    return false;
  }
  get IMSI(): string {
    return '';
  }
  get bluetoothMacAddress(): string {
    return '';
  }
  get wirelessMacAddress(): string {
    return '';
  }
  get carrier() {
    const info = new __SF_CTTelephonyNetworkInfo();
    return info.subscriberCellularProvider.carrierName;
  }
  get connectionType() {
    return __SF_UIDevice.currentReachabilityStatus();
  }
  get connectionIP() {
    return __SF_UIDevice.getIFAddresses()[0];
  }
  cancelAll() {
    if (this.notifier) {
      this.notifier.unsubscribe();
    }
  }
}

const Network = new NetworkIOS();

export default Network;
