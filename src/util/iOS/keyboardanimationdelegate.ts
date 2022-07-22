import Screen from '../../device/screen';
import Invocation from './invocation';

const IPHONE_SAFE_AREA_OFFSET = 44; //iPhone X and later with notch
const DEFAULT_STATUSBAR_HEIGHT = 20; //

interface KeyboardInfoParams {
  userInfo?: {
    UIKeyboardAnimationDurationUserInfoKey: number;
    UIKeyboardAnimationCurveUserInfoKey: number;
  };
  isBeginEditing?: boolean;
}

export default class KeyboardAnimationDelegate {
  private _top = 0;
  private _topDistance = 0;
  private _isKeyboadAnimationCompleted = false;
  private parentView: __SF_UIView;
  private parentDialog?: __SF_UIView; /** Might be wrong type */

  static ApplicationKeyboardHeight = 0;
  static isKeyboardVisible = false;
  nativeObject: any;
  constructor(params: any) {
    this.nativeObject = params.nativeObject;
  }
  getParentViewController(): __SF_UIViewController {
    return this.parentView?.parentViewController() || undefined;
  }
  parent() {
    const navigationController = this.getParentViewController().navigationController;
    let parent = this.parentDialog;

    if (!parent) {
      parent = this.parentView;
      if (navigationController) {
        const subView = navigationController.view.subviews[0];

        if (subView) {
          const wrapperView = subView.subviews[0];
          if (wrapperView) {
            parent = subView;
          }
        }
      }
    }

    return parent;
  }

  defaultTopPosition() {
    let top = this.offsetFromTop();
    if (this.parent().constructor.name === 'UINavigationTransitionView') {
      top = 0;
    }
    return top;
  }

  keyboardShowAnimation(keyboardHeight: number, e: KeyboardInfoParams, isBeginEditing?: boolean) {
    KeyboardAnimationDelegate.isKeyboardVisible = true;
    KeyboardAnimationDelegate.ApplicationKeyboardHeight = keyboardHeight;
    const height = this.nativeObject.frame.height;
    const top = this.getViewTop(this.nativeObject);

    if (!this.getParentViewController() && !this.parentDialog) {
      return;
    }

    const controlValue = top + height;
    if (controlValue + this.offsetFromTop() > Screen.height - keyboardHeight) {
      this._isKeyboadAnimationCompleted = false;
      this._topDistance = controlValue + this.offsetFromTop() - (Screen.height - keyboardHeight);

      if (!this.parentDialog) {
        if (this.getParentViewController().tabBarController) {
          if (this._topDistance + (this.getParentViewController().tabBarController.tabBar.frame.height || 0) > keyboardHeight) {
            this._topDistance = keyboardHeight - (this.getParentViewController().tabBarController.tabBar.frame.height || 0);
          }
        } else {
          if (this._topDistance > keyboardHeight) {
            this._topDistance = keyboardHeight;
          }
        }
      }

      if (this._topDistance < 0) {
        this._topDistance = 0;
      }

      if (e?.userInfo) {
        const animatonDuration = e.userInfo.UIKeyboardAnimationDurationUserInfoKey;
        const animationCurve = e.userInfo.UIKeyboardAnimationCurveUserInfoKey;
        const animationOptions = animationCurve << 16;

        const invocationAnimation = __SF_NSInvocation.createClassInvocationWithSelectorInstance('animateWithDuration:delay:options:animations:completion:', 'UIView');
        if (invocationAnimation) {
          invocationAnimation.setClassTargetFromString('UIView');
          invocationAnimation.setSelectorWithString('animateWithDuration:delay:options:animations:completion:');
          invocationAnimation.retainArguments();
          invocationAnimation.setDoubleArgumentAtIndex(animatonDuration, 2);
          invocationAnimation.setDoubleArgumentAtIndex(0, 3);
          invocationAnimation.setNSUIntegerArgumentAtIndex(animationOptions, 4);
          invocationAnimation.setVoidBlockArgumentAtIndex(() => {
            const parent = this.parent();
            const frame = parent.frame;
            frame.y = -this._topDistance;
            parent.frame = frame;
          }, 5);
          invocationAnimation.setBoolBlockArgumentAtIndex((e) => {}, 6);
          invocationAnimation.invoke();
          this._isKeyboadAnimationCompleted = true; // bug id : IOS-2763
        }
      } else {
        const parent = this.parent();
        const frame = parent.frame;
        frame.y = -this._topDistance;
        parent.frame = frame;
        this._isKeyboadAnimationCompleted = true;
      }
    } else {
      if (this.getParentViewController()) {
        if (this.getParentViewController().view.frame.y !== this.offsetFromTop() && this.getParentViewController().view.frame.y !== 0) {
          if (e?.userInfo) {
            this.keyboardHideAnimation({
              userInfo: e.userInfo,
              isBeginEditing: isBeginEditing
            });
          } else {
            this.keyboardHideAnimation({
              isBeginEditing: isBeginEditing
            });
          }
        }
      } else if (this.parentDialog) {
        if (this.parentDialog.frame.y !== this.offsetFromTop()) {
          if (e?.userInfo) {
            this.keyboardHideAnimation({
              userInfo: e.userInfo,
              isBeginEditing: isBeginEditing
            });
          } else {
            this.keyboardHideAnimation({
              isBeginEditing: isBeginEditing
            });
          }
        }
      }
    }
  }

  textFieldShouldBeginEditing() {
    if (KeyboardAnimationDelegate.ApplicationKeyboardHeight !== 0 && KeyboardAnimationDelegate.isKeyboardVisible) {
      this.keyboardShowAnimation(
        KeyboardAnimationDelegate.ApplicationKeyboardHeight,
        {
          userInfo: {
            UIKeyboardAnimationDurationUserInfoKey: 0.2,
            UIKeyboardAnimationCurveUserInfoKey: 2
          }
        },
        true
      );
    }
  }

  keyboardHideAnimation(e: KeyboardInfoParams) {
    if (!e?.isBeginEditing) {
      KeyboardAnimationDelegate.isKeyboardVisible = false;
    }
    if (this.getParentViewController() || this.parentDialog) {
      if (this._isKeyboadAnimationCompleted) {
        if (e?.userInfo) {
          const animatonDuration = e.userInfo.UIKeyboardAnimationDurationUserInfoKey;
          const animationCurve = e.userInfo.UIKeyboardAnimationCurveUserInfoKey;
          const animationOptions = animationCurve << 16;

          const invocationAnimation = __SF_NSInvocation.createClassInvocationWithSelectorInstance('animateWithDuration:delay:options:animations:completion:', 'UIView');
          if (invocationAnimation) {
            invocationAnimation.setClassTargetFromString('UIView');
            invocationAnimation.setSelectorWithString('animateWithDuration:delay:options:animations:completion:');
            invocationAnimation.retainArguments();
            invocationAnimation.setDoubleArgumentAtIndex(animatonDuration, 2);
            invocationAnimation.setDoubleArgumentAtIndex(0, 3);
            invocationAnimation.setNSUIntegerArgumentAtIndex(animationOptions, 4);
            invocationAnimation.setVoidBlockArgumentAtIndex(() => {
              const parent = this.parent();
              const frame = parent.frame;
              frame.y = this.defaultTopPosition();
              parent.frame = frame;
            }, 5);
            invocationAnimation.setBoolBlockArgumentAtIndex((e) => {}, 6);
            invocationAnimation.invoke();
          }
        } else {
          const parent = this.parent();
          const frame = parent.frame;
          frame.y = this.defaultTopPosition();
          parent.frame = frame;
        }
      }
    }
  }

  getViewTop(view: __SF_UIView) {
    if (view.superview) {
      if (view.superview.constructor.name === 'SMFUIView') {
        this._top += view.frame.y;
      } else if (view.superview.constructor.name === 'SMFUIScrollView') {
        this._top += view.frame.y;
        if (this._top + this.nativeObject.frame.height > view.superview.contentOffset.y + view.superview.frame.height) {
          const newTop = this._top - (view.superview.frame.height || 0) + this.nativeObject.frame.height;
          view.superview.setContentOffsetAnimated(
            {
              x: 0,
              y: newTop
            },
            true
          );
          this._top -= newTop;
        } else if (view.superview.contentOffset.y > this._top) {
          view.superview.setContentOffsetAnimated(
            {
              x: 0,
              y: this._top
            },
            true
          );
          this._top -= this._top;
        } else {
          this._top -= view.superview.contentOffset.y;
        }
      } else if (view.superview.constructor.name === 'SMFUITableView') {
        if (view.constructor.name === 'SMFUITableViewCell') {
          const cell = view;
          const tableView = view.superview;
          const indexPath = tableView.indexPathForCell(cell);
          const rect = tableView.rectForRowAtIndexPath(indexPath);

          this._top += rect.y;

          if (this._top + this.nativeObject.frame.height > tableView.contentOffset.y + tableView.frame.height) {
            const newTop = this._top - (tableView.frame.height || 0) + this.nativeObject.frame.height;
            tableView.setContentOffsetAnimated(
              {
                x: 0,
                y: newTop
              },
              true
            );
            this._top -= newTop;
          } else if (tableView.contentOffset.y > this._top) {
            tableView.setContentOffsetAnimated(
              {
                x: 0,
                y: this._top
              },
              true
            );
            this._top -= this._top;
          } else {
            this._top -= tableView.contentOffset.y;
          }
        }
      }

      if (view.superview.constructor.name === 'UIWindow') {
        // Check Dialog
        this.parentDialog = view;
      } else {
        this.parentDialog = undefined;
      }

      if (view.superview.superview) {
        const isRootView = view.superview.superview.valueForKey('restorationIdentifier') === 'RouterView' ? true : false;
        if (view.superview.superview.constructor.name !== 'UIViewControllerWrapperView' && !isRootView) {
          return this.getViewTop(view.superview);
        } else {
          this.parentView = view.superview;
        }
      }
    }

    const statusBar = this.statusBarFrames();
    this._top += statusBar.viewRect.height || 0 > DEFAULT_STATUSBAR_HEIGHT ? DEFAULT_STATUSBAR_HEIGHT : 0;

    const temp = this._top;
    this._top = 0;
    return temp;
  }

  offsetFromTop(): number {
    if (!this.getParentViewController()) {
      return 0;
    }

    const statusBar = this.statusBarFrames();
    if (this.getParentViewController().navigationController && this.getParentViewController().navigationController.navigationBar.visible) {
      const navigationFrameHeight = this.getParentViewController().navigationController.navigationBar.frame.height || 0;
      if (!this.getParentViewController().statusBarHidden) {
        const statusBarHeight = statusBar.viewRect.height || 0 > DEFAULT_STATUSBAR_HEIGHT ? DEFAULT_STATUSBAR_HEIGHT : statusBar.frame.height;
        const statusBarOffset = statusBar.viewRect.height === IPHONE_SAFE_AREA_OFFSET ? IPHONE_SAFE_AREA_OFFSET : statusBarHeight || 0;

        return statusBarOffset + navigationFrameHeight;
      } else {
        return navigationFrameHeight;
      }
    } else {
      return 0;
    }
  }
  statusBarFrames(): { frame: __SF_NSRect; windowRect: __SF_NSRect; viewRect: __SF_NSRect } {
    if (!this.getParentViewController()) {
      const frame: __SF_NSRect = {
        x: 0,
        y: 0,
        height: 0,
        width: 0
      };
      return {
        frame: frame,
        windowRect: frame,
        viewRect: frame
      };
    }
    const view = this.getParentViewController().view;
    const statusBarFrame = __SF_UIApplication.sharedApplication().statusBarFrame;
    const viewWindow = Invocation.invokeInstanceMethod(view, 'window', [], 'NSObject');
    const argRect = new Invocation.Argument({
      type: 'CGRect',
      value: statusBarFrame
    });
    const argWindow = new Invocation.Argument({
      type: 'NSObject',
      value: undefined
    });
    const statusBarWindowRect = Invocation.invokeInstanceMethod(viewWindow, 'convertRect:fromWindow:', [argRect, argWindow], 'CGRect');

    const argRect1 = new Invocation.Argument({
      type: 'CGRect',
      value: statusBarWindowRect
    });
    const argWindow1 = new Invocation.Argument({
      type: 'NSObject',
      value: undefined
    });
    const statusBarViewRect = Invocation.invokeInstanceMethod(view, 'convertRect:fromView:', [argRect1, argWindow1], 'CGRect');

    return {
      frame: statusBarFrame,
      windowRect: statusBarWindowRect,
      viewRect: statusBarViewRect
    };
  }
}
