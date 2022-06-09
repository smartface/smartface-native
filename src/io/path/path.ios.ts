import { NativeMobileComponent } from '../../core/native-mobile-component';
import File from '../../io/file';
import { IPath } from './path';

class PathIOSClass extends NativeMobileComponent implements IPath {
  constructor(params?: Partial<IPath>) {
    super(params);
  }
  protected createNativeObject(params?: Partial<Record<string, any>>) {
    return null;
  }
  get ImagesUriScheme(): string {
    return 'images://';
  }

  get AssetsUriScheme(): string {
    return 'assets://';
  }

  get Separator(): string {
    return '/';
  }

  get DataDirectory(): string {
    return File.getDocumentsDirectory();
  }
}

const PathIOS = new PathIOSClass();

export default PathIOS;
