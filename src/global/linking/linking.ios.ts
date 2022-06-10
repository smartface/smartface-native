import { ILinking } from './linking';

class LinkingIOSClass implements ILinking {
  openSettings(): Promise<void> {
    return new Promise((resolve, reject) => {
      const options = {
        uriScheme: 'app-settings:',
        onSuccess: () => resolve(),
        onFailure: () => reject(),
        action: ''
      };
      this.openURL(options);
    });
  }
  canOpenURL(url: string): boolean {
    if (!url) {
      new Error("url parameter can't be empty.");
    } else if (typeof url !== 'string') {
      new Error('url parameter must be string.');
    }
    return SMFApplication.canOpenUrl(url);
  }
  openURL(options: Parameters<ILinking['openURL']>['0']): void {
    const { uriScheme, data = {}, onSuccess, onFailure } = options;
    if (!uriScheme) {
      new Error("urlscheme parameter can't be empty.");
    } else if (typeof uriScheme !== 'string') {
      new Error('url parameter must be string.');
    }
    SMFApplication.call(uriScheme, data, onSuccess, onFailure);
  }
}

const LinkingIOS = new LinkingIOSClass();
export default LinkingIOS;
