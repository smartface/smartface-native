import Color from '../../ui/color';

export enum StatusBarStyle {
  DEFAULT,
  LIGHTCONTENT
}

export default class StatusBarIOS {
  static readonly Styles = StatusBarStyle;
  static get ios() {
    return {};
  }
  static get android() {
    return {};
  }
  static get height(): number {
    return __SF_UIApplication.sharedApplication().statusBarFrame.height;
  }
  static get backgroundColor(): Color {
    const statusBarWindow = __SF_UIApplication.sharedApplication().valueForKey('statusBarWindow');
    if (statusBarWindow) {
      const statusBar = statusBarWindow.valueForKey('statusBar');
      if (statusBar) {
        const backgroundColor = statusBar.valueForKey('backgroundColor');
        if (backgroundColor) {
          // TODO: Color constructor doesnt take parameters
          return new Color({
            color: backgroundColor
          });
        }
      }
    }
    return undefined;
  }
  static set backgroundColor(value: Color) {
    const statusBarWindow = __SF_UIApplication.sharedApplication().valueForKey('statusBarWindow');
    if (statusBarWindow) {
      const statusBar = statusBarWindow.valueForKey('statusBar');
      if (statusBar) {
        value
          ? statusBar.setValueForKey(
              // TODO: color needs nativeObject
              value.nativeObject,
              'backgroundColor'
            )
          : statusBar.setValueForKey(undefined, 'backgroundColor');
      }
    }
  }
  static get visible(): boolean {
    return !__SF_UIApplication.sharedApplication().sf_statusBarHidden;
  }
  static set visible(value: boolean) {
    __SF_UIApplication.sharedApplication().sf_statusBarHidden = !value;
  }
  static get style(): StatusBarStyle {
    return __SF_UIApplication.sharedApplication().sf_statusBarStyle;
  }
  static set style(value: StatusBarStyle) {
    __SF_UIApplication.sharedApplication().sf_statusBarStyle = value;
  }
}
