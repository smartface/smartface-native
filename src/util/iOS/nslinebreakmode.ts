import EllipsizeMode from '../../ui/shared/ellipsizemode';

namespace NSLineBreakMode {
  export const byWordWrapping = 0;
  export const byCharWrapping = 1;
  export const byClipping = 2;
  export const byTruncatingHead = 3;
  export const byTruncatingTail = 4;
  export const byTruncatingMiddle = 5;
  export function ellipsizeModeToNSLineBreakMode(mode: EllipsizeMode) {
    switch (mode) {
      case EllipsizeMode.START:
        return NSLineBreakMode.byTruncatingHead;
      case EllipsizeMode.MIDDLE:
        return NSLineBreakMode.byTruncatingMiddle;
      case EllipsizeMode.END:
        return NSLineBreakMode.byTruncatingTail;
      case EllipsizeMode.NONE:
        return NSLineBreakMode.byClipping;
      case EllipsizeMode.WORDWRAPPING:
        return NSLineBreakMode.byWordWrapping;
      case EllipsizeMode.CHARWRAPPING:
        return NSLineBreakMode.byCharWrapping;
      default:
        return NSLineBreakMode.byTruncatingHead;
    }
  }
  export function nsLineBreakModeToEllipsizeMode(mode: number): EllipsizeMode {
    switch (mode) {
      case NSLineBreakMode.byTruncatingHead:
        return EllipsizeMode.START;
      case NSLineBreakMode.byTruncatingMiddle:
        return EllipsizeMode.MIDDLE;
      case NSLineBreakMode.byTruncatingTail:
        return EllipsizeMode.END;
      case NSLineBreakMode.byClipping:
        return EllipsizeMode.NONE;
      case NSLineBreakMode.byWordWrapping:
        return EllipsizeMode.WORDWRAPPING;
      case NSLineBreakMode.byCharWrapping:
        return EllipsizeMode.CHARWRAPPING;
      default:
        return EllipsizeMode.NONE;
    }
  }
}

export default NSLineBreakMode;
