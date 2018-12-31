const System = require('sf-core/device/system');

function UIScrollViewInheritance() {};

UIScrollViewInheritance.addPropertiesAndMethods = function(customNativeObject) {
    var self = this;

    var nativeObject = customNativeObject ? customNativeObject : self.nativeObject;
    
    if (System.OSVersion.split(".")[0] >= 11) {
        nativeObject.setValueForKey(2, "contentInsetAdjustmentBehavior");
    }

    Object.defineProperty(self.ios, 'contentInsetAdjustmentBehavior', {
        get: function() {
            return nativeObject.valueForKey("contentInsetAdjustmentBehavior");
        },
        set: function(value) {
            nativeObject.setValueForKey(value, "contentInsetAdjustmentBehavior");
        },
        enumerable: true
    });
    
    Object.defineProperty(self.ios, 'bounces', {
        get: function() {
            return nativeObject.valueForKey("bounces");
        },
        set: function(value) {
            nativeObject.setValueForKey(value, "bounces");
        },
        enumerable: true
    });

    Object.defineProperty(self, 'contentOffset', {
        get: function() {
            var contentOffset = {
                x: nativeObject.contentOffset.x + nativeObject.contentInsetDictionary.left,
                y: nativeObject.contentOffset.y + nativeObject.contentInsetDictionary.top
            };
            return contentOffset;
        },
        enumerable: true
    });

    Object.defineProperty(self.ios, 'onScrollBeginDragging', {
        set: function(value) {
            var onScrollBeginDraggingHandler = function(scrollView) {
                var contentOffset = {
                    x: scrollView.contentOffset.x + scrollView.contentInsetDictionary.left,
                    y: scrollView.contentOffset.y + scrollView.contentInsetDictionary.top
                };
                value(contentOffset);
            };
            nativeObject.onScrollViewWillBeginDragging = onScrollBeginDraggingHandler;
        },
        enumerable: true
    });

    Object.defineProperty(self.ios, 'onScrollBeginDecelerating', {
        set: function(value) {
            var onScrollBeginDeceleratingHandler = function(scrollView) {
                var contentOffset = {
                    x: scrollView.contentOffset.x + scrollView.contentInsetDictionary.left,
                    y: scrollView.contentOffset.y + scrollView.contentInsetDictionary.top
                };
                value(contentOffset);
            };
            nativeObject.onScrollBeginDecelerating = onScrollBeginDeceleratingHandler;
        },
        enumerable: true
    });

    Object.defineProperty(self.ios, 'onScrollEndDecelerating', {
        set: function(value) {
            var onScrollEndDeceleratingHandler = function(scrollView) {
                var contentOffset = {
                    x: scrollView.contentOffset.x + scrollView.contentInsetDictionary.left,
                    y: scrollView.contentOffset.y + scrollView.contentInsetDictionary.top
                };
                value(contentOffset);
            };
            nativeObject.onScrollEndDecelerating = onScrollEndDeceleratingHandler;
        },
        enumerable: true
    });

    Object.defineProperty(self.ios, 'onScrollEndDraggingWillDecelerate', {
        set: function(value) {
            var onScrollEndDraggingWillDecelerateHandler = function(scrollView, decelerate) {
                var contentOffset = {
                    x: scrollView.contentOffset.x + scrollView.contentInsetDictionary.left,
                    y: scrollView.contentOffset.y + scrollView.contentInsetDictionary.top
                };
                value(contentOffset, decelerate);
            };
            nativeObject.onScrollViewDidEndDraggingWillDecelerate = onScrollEndDraggingWillDecelerateHandler;
        },
        enumerable: true
    });

    Object.defineProperty(self.ios, 'onScrollEndDraggingWithVelocityTargetContentOffset', {
        set: function(value) {
            var onScrollEndDraggingWithVelocityTargetContentOffsetHandler = function(scrollView, velocity, targetContentOffset) {
                var contentOffset = {
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
};

module.exports = UIScrollViewInheritance;