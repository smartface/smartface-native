import { INativeComponent } from '../../core/inative-component';
import NativeComponent from '../../core/native-component';
import { INativeMobileComponent, MobileOSProps } from '../../core/native-mobile-component';

export enum PathFileType {
  FILE = 0,
  ASSET = 1,
  DRAWABLE = 2,
  EMULATOR_ASSETS = 3,
  EMULATOR_DRAWABLE = 4,
  RAU_ASSETS = 5,
  RAU_DRAWABLE = 6
}

export interface PathAndroidProps {
  /**
   * Determines which storage type the path uses. Please note that you should have appropiate permissions in order to access external storage.
   * @android
   */
  storages: {
    external: string | null;
    internal: string | null;
    usb: string | null;
    isResolved: boolean | null;
  };
}

export interface IPath extends INativeMobileComponent<any, MobileOSProps<{}, PathAndroidProps>> {
  get DataDirectory(): string;
  /**
   * Gets URI scheme for files under assets folder.
   * @android
   * @ios
   * @since 0.1
   */
  get AssetsUriScheme(): string;
  /**
   * Gets path separator for the running environment.
   * @android
   * @ios
   * @since 0.1
   */
  get Separator(): string;

  /**
   * Gets the path to the root of the application's images directory.
   * @example
   * import Path from '@smartface/native/io/path';
   * console.log(Path.ImagesURLScheme); => images://
   */
  get ImagesUriScheme(): string;
}
