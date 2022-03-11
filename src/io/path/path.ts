import { INativeComponent } from '../../core/inative-component';
import NativeComponent from '../../core/native-component';

enum PATH_FILE_TYPE {
  FILE = 0,
  ASSET = 1,
  DRAWABLE = 2,
  EMULATOR_ASSETS = 3,
  EMULATOR_DRAWABLE = 4,
  RAU_ASSETS = 5,
  RAU_DRAWABLE = 6
}

export type AndroidProps = Partial<{
  storages: {
    external: string | null;
    internal: string | null;
    usb: string | null;
    isResolved: boolean | null;
  };
}>;

export interface IPath extends INativeComponent {}

export class PathBase extends NativeComponent implements IPath {
  constructor(params?: Partial<IPath>) {
    super(params);
  }

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

  static get ImagesUriScheme(): string {
    throw new Error('Method not implemented.');
  }

  get android(): AndroidProps {
    throw new Error('Method not implemented.');
  }
}
