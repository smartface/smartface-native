import { AbstractDialog, DEFAULT_TRANSLUCENCY } from './dialog';
import Color from '../color';
import FlexLayout from '../flexlayout';

export default class DialogIOS extends AbstractDialog {
  private dialogView: FlexLayout;
  private _android = {};
  constructor(params: Partial<DialogIOS> = {}) {
    super();

    this.dialogView = new FlexLayout();
    this.dialogView.nativeObject.frame = __SF_UIScreen.mainScreen().bounds;
    this.dialogView.backgroundColor = Color.create(DEFAULT_TRANSLUCENCY, 0, 0, 0);
    this.dialogView.id = String(DialogIOS.iOS.ID);

    this.dialogView.applyLayout = () => this.dialogView.nativeObject.yoga.applyLayoutPreservingOrigin(true);
    this.dialogView.nativeObject.addObserver(() => {
      __SF_UIView.animation(
        __SF_UIApplication.sharedApplication().statusBarOrientationAnimationDuration,
        0,
        () => this.calculatePosition(),
        () => {}
      );
    }, __SF_UIApplicationDidChangeStatusBarOrientationNotification);

    this.calculatePosition();

    for (const param in params) {
      this[param] = params[param];
    }
  }

  hide() {
    this.dialogView.nativeObject.removeFromSuperview();
  }

  show(): void {
    __SF_UIApplication.sharedApplication().keyWindow.addSubview(this.dialogView.nativeObject);
    this.dialogView.applyLayout();
  }

  calculatePosition() {
    this.dialogView.nativeObject.frame = __SF_UIScreen.mainScreen().bounds;
    this.dialogView.applyLayout();
  }

  get layout() {
    return this.dialogView;
  }

  get android() {
    return this._android;
  }

  static Android = {
    Style: {}
  };

  static iOS = {
    ID: 1453
  };
}
