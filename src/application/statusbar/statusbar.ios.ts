import Color from '../../ui/color';

export enum StatusBarStyle {
  DEFAULT,
  LIGHTCONTENT
}

class StatusBarIOS {
  readonly Styles = StatusBarStyle;
  get ios() {
    return {};
  }
  get android() {
    return {};
  }
  get height(): number | undefined {
    return __SF_UIApplication.sharedApplication().statusBarFrame.height;
  }
  get backgroundColor(): Color | undefined {
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
  set backgroundColor(value: Color | undefined) {
    const statusBarWindow = __SF_UIApplication.sharedApplication().valueForKey('statusBarWindow');
    if (statusBarWindow && value) {
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
  get visible(): boolean {
    return !__SF_UIApplication.sharedApplication().sf_statusBarHidden;
  }
  set visible(value: boolean) {
    __SF_UIApplication.sharedApplication().sf_statusBarHidden = !value;
  }
  get style(): StatusBarStyle {
    return __SF_UIApplication.sharedApplication().sf_statusBarStyle;
  }
  set style(value: StatusBarStyle) {
    __SF_UIApplication.sharedApplication().sf_statusBarStyle = value;
  }
}

const StatusBar = new StatusBarIOS();
export default StatusBar;
