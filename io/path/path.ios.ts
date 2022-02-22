import File from '../../io/file';
import { IPath, PathBase } from './path';

export default class PathIOS extends PathBase {
  constructor(params?: Partial<IPath>) {
    super(params);
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

  get android(): any {
    return {};
  }
}
