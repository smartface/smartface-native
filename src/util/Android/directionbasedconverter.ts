import Application from '../../application';
import View from '../../ui/view';
import FragmentTransition from './transition/fragmenttransition';

function getDirection() {
  return Application.android.getLayoutDirection;
}

namespace DirectionBasedConverter {
  export function convertArray(array: any[]) {
    return getDirection() === Application.LayoutDirection.RIGHTTOLEFT ? array.reverse() : array;
  }

  export function convertIndex(array: any[], index: number) {
    return getDirection() === Application.LayoutDirection.RIGHTTOLEFT ? array.length - 1 - index : index;
  }

  export function getAnimationType(animationType: FragmentTransition.AnimationType) {
    if (getDirection() === Application.LayoutDirection.LEFTTORIGHT) {
      return animationType;
    }
    if (animationType === FragmentTransition.AnimationType.LEFTTORIGHT) {
      return FragmentTransition.AnimationType.RIGHTTOLEFT;
    } else if (animationType === FragmentTransition.AnimationType.RIGHTTOLEFT) {
      return FragmentTransition.AnimationType.LEFTTORIGHT;
    } else {
      return -1;
    }
  }

  export function setLayoutDirection(nativeLayout: any) {
    if (getDirection() === Application.LayoutDirection.RIGHTTOLEFT) {
      nativeLayout.setLayoutDirection(Application.LayoutDirection.RIGHTTOLEFT);
    }
  }

  export function flipHorizontally(view: View) {
    return getDirection() === Application.LayoutDirection.RIGHTTOLEFT ? view.flipHorizontally() : view;
  }

  export function convertMargin(layoutParams: any, left: number, top: number, right: number, bottom: number) {
    if (getDirection() === Application.LayoutDirection.RIGHTTOLEFT) {
      layoutParams.setMarginStart(left);
      layoutParams.setMarginEnd(right);
    }
    layoutParams.setMargins(left, top, right, bottom);
    return layoutParams;
  }
}

export default DirectionBasedConverter;
