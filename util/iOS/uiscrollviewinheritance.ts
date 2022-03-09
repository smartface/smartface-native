import NativeComponent from '../../core/native-component';

class UIScrollViewInheritance extends NativeComponent {
  private _ios: {
        decelerationRate: any;
        bounces: any;
        onScrollBeginDragging: any;
        onScrollBeginDecelerating: any;
        onScrollEndDecelerating: any;
        onScrollEndDraggingWillDecelerate: any;
        onScrollEndDraggingWithVelocityTargetContentOffset: any;
  };

  constructor(customNativeObject?: any) {
    super();

    var self = this;

    var nativeObject = customNativeObject ? customNativeObject : self.nativeObject;

    nativeObject.setValueForKey(2, 'contentInsetAdjustmentBehavior');

    this._ios = {
      get decelerationRate() {
        return nativeObject.decelerationRate;
      },
      set decelerationRate(value) {
        nativeObject.decelerationRate = value;
      },
      get bounces() {
        return nativeObject.valueForKey('bounces');
      },
      set bounces(value) {
        nativeObject.setValueForKey(value, 'bounces');
      },
      set onScrollBeginDragging(value) {
        var onScrollBeginDraggingHandler = function (scrollView) {
          var contentOffset = {
            x: scrollView.contentOffset.x + scrollView.contentInsetDictionary.left,
            y: scrollView.contentOffset.y + scrollView.contentInsetDictionary.top
          };
          value(contentOffset);
        };
        nativeObject.onScrollViewWillBeginDragging = onScrollBeginDraggingHandler;
      },
      set onScrollBeginDecelerating(value) {
        var onScrollBeginDeceleratingHandler = function (scrollView) {
          var contentOffset = {
            x: scrollView.contentOffset.x + scrollView.contentInsetDictionary.left,
            y: scrollView.contentOffset.y + scrollView.contentInsetDictionary.top
          };
          value(contentOffset);
        };
        nativeObject.onScrollBeginDecelerating = onScrollBeginDeceleratingHandler;
      },
      set onScrollEndDecelerating(value) {
        var onScrollEndDeceleratingHandler = function (scrollView) {
          var contentOffset = {
            x: scrollView.contentOffset.x + scrollView.contentInsetDictionary.left,
            y: scrollView.contentOffset.y + scrollView.contentInsetDictionary.top
          };
          value(contentOffset);
        };
        nativeObject.onScrollEndDecelerating = onScrollEndDeceleratingHandler;
      },
      set onScrollEndDraggingWillDecelerate(value) {
        var onScrollEndDraggingWillDecelerateHandler = function (scrollView, decelerate) {
          var contentOffset = {
            x: scrollView.contentOffset.x + scrollView.contentInsetDictionary.left,
            y: scrollView.contentOffset.y + scrollView.contentInsetDictionary.top
          };
          value(contentOffset, decelerate);
        };
        nativeObject.onScrollViewDidEndDraggingWillDecelerate = onScrollEndDraggingWillDecelerateHandler;
      },
      set onScrollEndDraggingWithVelocityTargetContentOffset(value) {
        var onScrollEndDraggingWithVelocityTargetContentOffsetHandler = function (scrollView, velocity, targetContentOffset) {
          var contentOffset = {
            x: scrollView.contentOffset.x + scrollView.contentInsetDictionary.left,
            y: scrollView.contentOffset.y + scrollView.contentInsetDictionary.top
          };
          targetContentOffset.x += +scrollView.contentInsetDictionary.left;
          targetContentOffset.y += +scrollView.contentInsetDictionary.top;
          value(contentOffset, velocity, targetContentOffset);
        };
        nativeObject.onScrollViewWillEndDraggingWithVelocityTargetContentOffset = onScrollEndDraggingWithVelocityTargetContentOffsetHandler;
      }
    };
  }

  get ios () {
      return this._ios;
  }

  get contentInsetAdjustmentBehavior() {
    return this.nativeObject.valueForKey('contentInsetAdjustmentBehavior');
  }
  set contentInsetAdjustmentBehavior(value) {
    this.nativeObject.setValueForKey(value, 'contentInsetAdjustmentBehavior');
  }
  get paginationEnabled() {
    return this.nativeObject.valueForKey('pagingEnabled');
  }
  set paginationEnabled(value) {
    this.nativeObject.setValueForKey(value, 'pagingEnabled');
  }
  get contentOffset() {
    var contentOffset = {
      x: this.nativeObject.contentOffset.x + this.nativeObject.contentInsetDictionary.left,
      y: this.nativeObject.contentOffset.y + this.nativeObject.contentInsetDictionary.top
    };

    return contentOffset;
  }
}

export default UIScrollViewInheritance;
