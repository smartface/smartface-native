import File from '../../io/file';
import { IPath, PathBase } from './path';

export default class PathIOS extends PathBase {
  constructor(params?: Partial<IPath>) {
    super(params);
  }

  static get ImagesUriScheme(): string {
    return 'images://';
  }

  static get AssetsUriScheme(): string {
    return 'assets://';
  }

  static get Separator(): string {
    return '/';
  }

  static get DataDirectory(): string {
    return File.getDocumentsDirectory();
  }

  get android(): any {
    return {};
  }
}
