import { INativeComponent } from '../../core/inative-component';

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

export interface IPath extends INativeComponent {
  /**
   * Gets data directory path of the application.
   * @android
   * @ios
   * @since 0.1
   */
  DataDirectory: string;

  /**
   * Gets URI scheme for files under assets folder.
   * @android
   * @ios
   * @since 0.1
   */
  AssetsUriScheme: string;

  /**
   * Gets path separator for the running environment.
   * @android
   * @ios
   * @since 0.1
   */
  Separator: string;

  ImagesUriScheme: string;

  android: AndroidProps;
}

export class PathBase implements IPath {
  constructor(params?: Partial<IPath>) {}

  static FILE_TYPE = PATH_FILE_TYPE;

  get DataDirectory(): string {
    throw new Error('Method not implemented.');
  }

  get AssetsUriScheme(): string {
    throw new Error('Method not implemented.');
  }

  get Separator(): string {
    throw new Error('Method not implemented.');
  }

  get ImagesUriScheme(): string {
    throw new Error('Method not implemented.');
  }

  get android(): AndroidProps {
    throw new Error('Method not implemented.');
  }

  nativeObject: any;
}
