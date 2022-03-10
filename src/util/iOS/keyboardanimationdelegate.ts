import Screen from '../../device/screen';
import Invocation from './invocation';

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
  private parentDialog: __SF_UIView; /** Might be wrong type */
  nativeObject: any;
  constructor(params: any) {
    this.nativeObject = params.nativeObject;
  }
  getParentViewController(): __SF_UIViewController {
    return this.parentView?.parentViewController() || undefined;
  }
  parent() {
    let navigationController = this.getParentViewController().navigationController;
    let parent = this.parentDialog;

    if (!parent) {
      parent = this.parentView;
      if (navigationController) {
        const subView = navigationController.view.subviews[0];
        parent ||= subView?.subviews[0];
      }
    }

    return parent;
  }

  defaultTopPosition() {
    let top = KeyboardAnimationDelegate.offsetFromTop(this);
    if (this.parent().constructor.name === 'UINavigationTransitionView') {
      top = 0;
    }
    return top;
  }

  keyboardShowAnimation(keyboardHeight: number, e: KeyboardInfoParams, isBeginEditing?: boolean) {
    KeyboardAnimationDelegate.isKeyboardVisible = true;
    KeyboardAnimationDelegate.ApplicationKeyboardHeight = keyboardHeight;
    let height = this.nativeObject.frame.height;
    let top = this.getViewTop(this.nativeObject);

    if (!this.getParentViewController() && !this.parentDialog) {
      return;
    }

    let controlValue = top + height;
    if (controlValue + KeyboardAnimationDelegate.offsetFromTop(this) > Screen.height - keyboardHeight) {
      this._isKeyboadAnimationCompleted = false;
      this._topDistance = controlValue + KeyboardAnimationDelegate.offsetFromTop(this) - (Screen.height - keyboardHeight);

      if (!this.parentDialog) {
        if (this.getParentViewController().tabBarController) {
          if (this._topDistance + this.getParentViewController().tabBarController.tabBar.frame.height > keyboardHeight) {
            this._topDistance = keyboardHeight - this.getParentViewController().tabBarController.tabBar.frame.height;
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
        var animatonDuration = e.userInfo.UIKeyboardAnimationDurationUserInfoKey;
        var animationCurve = e.userInfo.UIKeyboardAnimationCurveUserInfoKey;
        var animationOptions = animationCurve << 16;

        var invocationAnimation = __SF_NSInvocation.createClassInvocationWithSelectorInstance('animateWithDuration:delay:options:animations:completion:', 'UIView');
        if (invocationAnimation) {
          invocationAnimation.setClassTargetFromString('UIView');
          invocationAnimation.setSelectorWithString('animateWithDuration:delay:options:animations:completion:');
          invocationAnimation.retainArguments();
          invocationAnimation.setDoubleArgumentAtIndex(animatonDuration, 2);
          invocationAnimation.setDoubleArgumentAtIndex(0, 3);
          invocationAnimation.setNSUIntegerArgumentAtIndex(animationOptions, 4);
          invocationAnimation.setVoidBlockArgumentAtIndex(function () {
            var parent = this.parent();
            var frame = parent.frame;
            frame.y = -this._topDistance;
            parent.frame = frame;
          }, 5);
          invocationAnimation.setBoolBlockArgumentAtIndex(function (e) {}, 6);
          invocationAnimation.invoke();
          this._isKeyboadAnimationCompleted = true; // bug id : IOS-2763
        }
      } else {
        var parent = this.parent();
        var frame = parent.frame;
        frame.y = -this._topDistance;
        parent.frame = frame;
        this._isKeyboadAnimationCompleted = true;
      }
    } else {
      if (this.getParentViewController()) {
        if (this.getParentViewController().view.frame.y !== KeyboardAnimationDelegate.offsetFromTop(this) && this.getParentViewController().view.frame.y != 0) {
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
        if (this.parentDialog.frame.y !== KeyboardAnimationDelegate.offsetFromTop(this)) {
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
          var animatonDuration = e.userInfo.UIKeyboardAnimationDurationUserInfoKey;
          var animationCurve = e.userInfo.UIKeyboardAnimationCurveUserInfoKey;
          var animationOptions = animationCurve << 16;

          var invocationAnimation = __SF_NSInvocation.createClassInvocationWithSelectorInstance('animateWithDuration:delay:options:animations:completion:', 'UIView');
          if (invocationAnimation) {
            invocationAnimation.setClassTargetFromString('UIView');
            invocationAnimation.setSelectorWithString('animateWithDuration:delay:options:animations:completion:');
            invocationAnimation.retainArguments();
            invocationAnimation.setDoubleArgumentAtIndex(animatonDuration, 2);
            invocationAnimation.setDoubleArgumentAtIndex(0, 3);
            invocationAnimation.setNSUIntegerArgumentAtIndex(animationOptions, 4);
            invocationAnimation.setVoidBlockArgumentAtIndex(function () {
              var parent = this.parent();
              var frame = parent.frame;
              frame.y = this.defaultTopPosition();
              parent.frame = frame;
            }, 5);
            invocationAnimation.setBoolBlockArgumentAtIndex(function (e) {}, 6);
            invocationAnimation.invoke();
          }
        } else {
          var parent = this.parent();
          var frame = parent.frame;
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
          var newTop = this._top - view.superview.frame.height + this.nativeObject.frame.height;
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
          var cell = view;
          var tableView = view.superview;
          var indexPath = tableView.indexPathForCell(cell);
          var rect = tableView.rectForRowAtIndexPath(indexPath);

          this._top += rect.y;

          if (this._top + this.nativeObject.frame.height > tableView.contentOffset.y + tableView.frame.height) {
            var newTop = this._top - tableView.frame.height + this.nativeObject.frame.height;
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
        var isRootView = view.superview.superview.valueForKey('restorationIdentifier') == 'RouterView' ? true : false;
        if (view.superview.superview.constructor.name !== 'UIViewControllerWrapperView' && !isRootView) {
          return this.getViewTop(view.superview);
        } else {
          this.parentView = view.superview;
        }
      }
    }

    var statusBar = KeyboardAnimationDelegate.statusBarFrames(this);
    this._top += statusBar.viewRect.height > 20 ? 20 : 0;

    var temp = this._top;
    this._top = 0;
    return temp;
  }

  static ApplicationKeyboardHeight = 0;
  static isKeyboardVisible = false;
  static offsetFromTop(instance: KeyboardAnimationDelegate): number {
    if (!instance.getParentViewController()) {
      return 0;
    }

    const statusBar = KeyboardAnimationDelegate.statusBarFrames(instance);
    if (instance.getParentViewController().navigationController && instance.getParentViewController().navigationController.navigationBar.visible) {
      if (!instance.getParentViewController().statusBarHidden) {
        //44 point = iPhone X
        return (
          (statusBar.viewRect.height == 44 ? 44 : statusBar.viewRect.height > 20 ? 20 : statusBar.frame.height) + instance.getParentViewController().navigationController.navigationBar.frame.height
        );
      } else {
        return instance.getParentViewController().navigationController.navigationBar.frame.height;
      }
    } else {
      return 0;
    }
  }
  static statusBarFrames(self: KeyboardAnimationDelegate): { frame: __SF_NSRect; windowRect: __SF_NSRect; viewRect: __SF_NSRect } {
    if (!self.getParentViewController()) {
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
    const view = self.getParentViewController().view;
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
