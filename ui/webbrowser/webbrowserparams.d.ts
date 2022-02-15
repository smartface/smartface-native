import Color from '../color';
export declare type WebBrowserParams = {
  url: string;
  barColor: Color;
  ios: Partial<{
    itemColor: Color;
    statusBarVisible: boolean;
  }>;
};
