import { ViewBase } from '../../ui/view';
import Application from '../../application';
import FragmentTransaction from './transition/fragmenttransition';

const applicationDirection = Application.android.getLayoutDirection;
const LTR = applicationDirection === Application.LayoutDirection.LEFTTORIGHT;
const RTL = applicationDirection === Application.LayoutDirection.RIGHTTOLEFT;

namespace DirectionBasedConverter {
  export function convertArray(array: any[]) {
    return RTL ? array.reverse() : array;
  }

  export function convertIndex(array: any[], index: number) {
    return RTL ? array.length - 1 - index : index;
  }

  export function getAnimationType(animationType: keyof typeof FragmentTransaction.AnimationType) {
    if (LTR) {
      return animationType;
    }
    if (animationType === FragmentTransaction.AnimationType.LEFTTORIGHT) {
      return FragmentTransaction.AnimationType.RIGHTTOLEFT;
    } else if (animationType === FragmentTransaction.AnimationType.RIGHTTOLEFT) {
      return FragmentTransaction.AnimationType.LEFTTORIGHT;
    }
  }

  export function setLayoutDirection(nativeLayout: ViewBase) {
    if (RTL) {
      nativeLayout.setLayoutDirection(Application.LayoutDirection.RIGHTTOLEFT);
    }
  }

  export function flipHorizontally(view: ViewBase) {
    return RTL ? view.flipHorizontally() : view;
  }

  export function convertMargin(layoutParams: any, left: number, top: number, right: number, bottom: number) {
    if (RTL) {
      layoutParams.setMarginStart(left);
      layoutParams.setMarginEnd(right);
    }
    layoutParams.setMargins(left, top, right, bottom);
    return layoutParams;
  }
}

export default DirectionBasedConverter;
