namespace UIScrollViewInheritance {
  export function addPropertiesAndMethods(customNativeObject: __SF_UIScrollView) {
    const nativeObject = customNativeObject ? customNativeObject : (this.nativeObject as __SF_UIScrollView);

    nativeObject.setValueForKey(2, 'contentInsetAdjustmentBehavior');

    Object.defineProperty(this.ios, 'contentInsetAdjustmentBehavior', {
      get: function () {
        return nativeObject.valueForKey('contentInsetAdjustmentBehavior');
      },
      set: function (value) {
        nativeObject.setValueForKey(value, 'contentInsetAdjustmentBehavior');
      },
      enumerable: true
    });

    Object.defineProperty(this, 'paginationEnabled', {
      get: function () {
        return nativeObject.valueForKey('pagingEnabled');
      },
      set: function (value) {
        nativeObject.setValueForKey(value, 'pagingEnabled');
      },
      enumerable: true
    });

    Object.defineProperty(this, 'contentOffset', {
      get: function () {
        const contentOffset = {
          x: nativeObject.contentOffset.x + nativeObject.contentInsetDictionary.left,
          y: nativeObject.contentOffset.y + nativeObject.contentInsetDictionary.top
        };
        return contentOffset;
      },
      enumerable: true
    });

    Object.defineProperty(this.ios, 'decelerationRate', {
      get: function () {
        return nativeObject.decelerationRate;
      },
      set: function (value) {
        nativeObject.decelerationRate = value;
      },
      enumerable: true
    });

    Object.defineProperty(this.ios, 'bounces', {
      get: function () {
        return nativeObject.valueForKey('bounces');
      },
      set: function (value) {
        nativeObject.setValueForKey(value, 'bounces');
      },
      enumerable: true
    });

    Object.defineProperty(this.ios, 'onScrollBeginDragging', {
      set: function (value) {
        const onScrollBeginDraggingHandler = function (scrollView) {
          const contentOffset = {
            x: scrollView.contentOffset.x + scrollView.contentInsetDictionary.left,
            y: scrollView.contentOffset.y + scrollView.contentInsetDictionary.top
          };
          value(contentOffset);
        };
        nativeObject.onScrollViewWillBeginDragging = onScrollBeginDraggingHandler;
      },
      enumerable: true
    });

    Object.defineProperty(this.ios, 'onScrollBeginDecelerating', {
      set: function (value) {
        const onScrollBeginDeceleratingHandler = function (scrollView) {
          const contentOffset = {
            x: scrollView.contentOffset.x + scrollView.contentInsetDictionary.left,
            y: scrollView.contentOffset.y + scrollView.contentInsetDictionary.top
          };
          value(contentOffset);
        };
        nativeObject.onScrollBeginDecelerating = onScrollBeginDeceleratingHandler;
      },
      enumerable: true
    });

    Object.defineProperty(this.ios, 'onScrollEndDecelerating', {
      set: function (value) {
        const onScrollEndDeceleratingHandler = function (scrollView) {
          const contentOffset = {
            x: scrollView.contentOffset.x + scrollView.contentInsetDictionary.left,
            y: scrollView.contentOffset.y + scrollView.contentInsetDictionary.top
          };
          value(contentOffset);
        };
        nativeObject.onScrollEndDecelerating = onScrollEndDeceleratingHandler;
      },
      enumerable: true
    });

    Object.defineProperty(this.ios, 'onScrollEndDraggingWillDecelerate', {
      set: function (value) {
        const onScrollEndDraggingWillDecelerateHandler = function (scrollView, decelerate) {
          const contentOffset = {
            x: scrollView.contentOffset.x + scrollView.contentInsetDictionary.left,
            y: scrollView.contentOffset.y + scrollView.contentInsetDictionary.top
          };
          value(contentOffset, decelerate);
        };
        nativeObject.onScrollViewDidEndDraggingWillDecelerate = onScrollEndDraggingWillDecelerateHandler;
      },
      enumerable: true
    });

    Object.defineProperty(this.ios, 'onScrollEndDraggingWithVelocityTargetContentOffset', {
      set: function (value) {
        const onScrollEndDraggingWithVelocityTargetContentOffsetHandler = function (scrollView, velocity, targetContentOffset) {
          const contentOffset = {
            x: scrollView.contentOffset.x + scrollView.contentInsetDictionary.left,
            y: scrollView.contentOffset.y + scrollView.contentInsetDictionary.top
          };
          targetContentOffset.x += +scrollView.contentInsetDictionary.left;
          targetContentOffset.y += +scrollView.contentInsetDictionary.top;
          value(contentOffset, velocity, targetContentOffset);
        };
        nativeObject.onScrollViewWillEndDraggingWithVelocityTargetContentOffset = onScrollEndDraggingWithVelocityTargetContentOffsetHandler;
      },
      enumerable: true
    });
  }
}

class UIScrollViewBase {
  nativeObject: __SF_UIScrollView;
  private _ios: any; /**TODO: Check out with Cenk */
  constructor(customNativeObject: __SF_UIScrollView) {
    this.nativeObject ||= customNativeObject;
    this.nativeObject.setValueForKey(2, 'contentInsetAdjustmentBehavior');

    const self = this;
    const ios = {
      get decelerationRate(): number {
        return self.nativeObject.decelerationRate;
      },
      set decelerationRate(value: number) {
        self.nativeObject.decelerationRate = value;
      },
      get bounces(): boolean {
        return self.nativeObject.valueForKey('bounces');
      },
      set bounces(value: boolean) {
        self.nativeObject.setValueForKey(value, 'bounces');
      },
      set onScrollBeginDragging(value: (contentOffset: __SF_NSRect) => void) {
        self.nativeObject.onScrollViewWillBeginDragging = (scrollView: __SF_UIScrollView) => {
          const contentOffset = {
            x: scrollView.contentOffset.x + scrollView.contentInsetDictionary.left,
            y: scrollView.contentOffset.y + scrollView.contentInsetDictionary.top
          };
          value(contentOffset);
        };
      },
      set onScrollBeginDecelerating(value: (contentOffset: __SF_NSRect) => void) {
        self.nativeObject.onScrollBeginDecelerating = (scrollView: __SF_UIScrollView) => {
          const contentOffset = {
            x: scrollView.contentOffset.x + scrollView.contentInsetDictionary.left,
            y: scrollView.contentOffset.y + scrollView.contentInsetDictionary.top
          };
          value(contentOffset);
        };
      },
      set onScrollEndDecelerating(value: (contentOffset: __SF_NSRect) => void) {
        self.nativeObject.onScrollEndDecelerating = (scrollView: __SF_UIScrollView) => {
          const contentOffset = {
            x: scrollView.contentOffset.x + scrollView.contentInsetDictionary.left,
            y: scrollView.contentOffset.y + scrollView.contentInsetDictionary.top
          };
          value(contentOffset);
        };
      },
      set onScrollEndDraggingWillDecelerate(value: (contentOffset: __SF_NSRect, decelerate: any) => void) {
        self.nativeObject.onScrollViewDidEndDraggingWillDecelerate = (scrollView: __SF_UIScrollView, decelerate: any) => {
          const contentOffset = {
            x: scrollView.contentOffset.x + scrollView.contentInsetDictionary.left,
            y: scrollView.contentOffset.y + scrollView.contentInsetDictionary.top
          };
          value(contentOffset, decelerate);
        };
      },
      set onScrollEndDraggingWithVelocityTargetContentOffset(value: (contentOffset: __SF_NSRect, velocity: number, targetContentOffset: __SF_NSRect) => void) {
        self.nativeObject.onScrollViewWillEndDraggingWithVelocityTargetContentOffset = (scrollView: __SF_UIScrollView, velocity: number, targetContentOffset: __SF_NSRect) => {
          const contentOffset = {
            x: scrollView.contentOffset.x + scrollView.contentInsetDictionary.left,
            y: scrollView.contentOffset.y + scrollView.contentInsetDictionary.top
          };
          targetContentOffset.x += +scrollView.contentInsetDictionary.left;
          targetContentOffset.y += +scrollView.contentInsetDictionary.top;
          value(contentOffset, velocity, targetContentOffset);
        };
      }
    };

    Object.assign(this._ios, ios);
  }
  get paginationEnabled(): boolean {
    return this.nativeObject.valueForKey('pagingEnabled');
  }

  set paginationEnabled(value: boolean) {
    this.nativeObject.setValueForKey(value, 'pagingEnabled');
  }

  get contentOffset(): __SF_NSRect {
    return {
      x: this.nativeObject.contentOffset.x + this.nativeObject.contentInsetDictionary.left,
      y: this.nativeObject.contentOffset.y + this.nativeObject.contentInsetDictionary.top
    };
  }

  get ios() {
    return this._ios;
  }
}

export default UIScrollViewInheritance;
