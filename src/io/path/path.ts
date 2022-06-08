import { INativeComponent } from '../../core/inative-component';
import NativeComponent from '../../core/native-component';

export enum PATH_FILE_TYPE {
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

export interface IPath extends INativeComponent {}

export abstract class PathBase extends NativeComponent implements IPath {
  protected createNativeObject() {
    return null;
  }
  constructor(params?: Partial<IPath>) {
    super(params);
  }

  /**
   * List of the file types that can be used on Path.
   */
  static FILE_TYPE = PATH_FILE_TYPE;
  /**
   * Gets data directory path of the application.
   * @android
   * @ios
   * @since 0.1
   */
  static get DataDirectory(): string {
    throw new Error('Method not implemented.');
  }
  /**
   * Gets URI scheme for files under assets folder.
   * @android
   * @ios
   * @since 0.1
   */
  static get AssetsUriScheme(): string {
    throw new Error('Method not implemented.');
  }
  /**
   * Gets path separator for the running environment.
   * @android
   * @ios
   * @since 0.1
   */
  static get Separator(): string {
    throw new Error('Method not implemented.');
  }

  /**
   * Gets the path to the root of the application's images directory.
   * @example
   * import Path from '@smartface/native/io/path';
   * console.log(Path.ImagesURLScheme); => images://
   */
  static get ImagesUriScheme(): string {
    throw new Error('Method not implemented.');
  }
  static get android(): PathAndroidProps {
    throw new Error('Method not implemented.');
  }
}
