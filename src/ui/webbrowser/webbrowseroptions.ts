import { AbstractWebBrowserOptions } from './webbrowser';
import Color from '../color';

export class WebBrowserOptions implements AbstractWebBrowserOptions {
  private _url: string = '';
  private _barColor: Color = Color.WHITE;
  private _itemColor: Color = Color.create('#00A1F1');
  private _statusBarVisible = true;
  constructor(params?: Partial<WebBrowserOptions>) {
    // Assign parameters given in constructor
    if (params) {
      for (const param in params) {
        this[param] = params[param];
      }
    }
  }
  get url() {
    return this._url;
  }
  set url(value: string) {
    this._url = value;
  }
  get barColor() {
    return this._barColor;
  }
  set barColor(value: Color) {
    this._barColor = value;
  }
  get itemColor() {
    return this._itemColor;
  }
  set itemColor(value: Color) {
    this._itemColor = value;
  }
  get statusBarVisible() {
    return this._statusBarVisible;
  }
  set statusBarVisible(value: boolean) {
    this._statusBarVisible = value;
  }
}
