/*globals requireClass*/
const ViewGroup = require('../viewgroup');
const UnitConverter = require("../../util/Android/unitconverter.js");
const extend = require('js-base/core/extend');
const AndroidConfig = require("../../util/Android/androidconfig");
const AndroidUnitConverter = require("../../util/Android/unitconverter.js");

const ScrollView = extend(ViewGroup)(
    function(_super, params) {
        const self = this;
        var activity = AndroidConfig.activity;

        var _align = (params && params.align) ? params.align : ScrollView.Align.VERTICAL;
        var prevY, prevOldY, prevX, prevOldX;
        var triggersTwice = false;
        var callback = null;
        if (!this.nativeObject) {
            if (_align === ScrollView.Align.HORIZONTAL) {
                const NativeHorizontalScroll = requireClass('io.smartface.android.SFHorizontalScrollView');
                callback = {
                    onScrollChanged: function(xObj, y, oldx, oldy) {
                        var x = xObj;
                        x = (x > 0) ? x : 0; // negative values are provided as well
                        oldx = (oldx > 0) ? oldx : 0;
                        x = UnitConverter.pixelToDp(x);
                        var oldX = UnitConverter.pixelToDp(oldx);

                        triggersTwice = (prevX === x && prevOldX === oldX ? true : false); //This is avoid unnecessary triggers
                        prevX = x;
                        prevOldX = oldX;

                        var translation = { x: (x - oldX), y: (y - oldy) };
                        _contentOffset.x = x;

                        !triggersTwice && _callbackOnScroll && _callbackOnScroll({ translation: translation, contentOffset: _contentOffset });
                    }
                };
                this.nativeObject = new NativeHorizontalScroll(activity, callback);
            }
            else {
                const NativeVerticalScroll = requireClass('io.smartface.android.SFScrollView');
                callback = {
                    onScrollChanged: function(xObj, yObj, oldx, oldy) {
                        var y = yObj;
                        y = (y > 0) ? y : 0; // negative values are provided as well
                        oldy = (oldy > 0) ? oldy : 0;
                        y = UnitConverter.pixelToDp(y);
                        var oldY = UnitConverter.pixelToDp(oldy);

                        triggersTwice = (prevY === y && prevOldY === oldY ? true : false); //This is avoid unnecessary triggers
                        prevY = y;
                        prevOldY = oldY;

                        var translation = { x: (xObj - oldx), y: (y - oldY) };
                        _contentOffset.y = y;

                        !triggersTwice && _callbackOnScroll && _callbackOnScroll({ translation: translation, contentOffset: _contentOffset });
                    }
                };
                this.nativeObject = new NativeVerticalScroll(activity, callback);
            }
        }

        _super(this);
        const FlexLayout = require("../flexlayout");
        var _layout = new FlexLayout();
        // TODO : Below settings doesn't work depending on https://github.com/facebook/yoga/issues/435.
        // So, the user have to set width and height for the layout of scrollview. 
        // If the issue is fixed, you can try below lines.

        // const NativeYogaLayout      = requireClass('com.facebook.yoga.android.YogaLayout');
        // var layoutParams = new NativeYogaLayout.LayoutParams(-1,-1);
        // this.nativeObject.addView(_layout.nativeObject, layoutParams);
        this.nativeObject.addView(_layout.nativeObject);

        _layout.parent = this;
        var _callbackOnScroll = null;
        var _contentOffset = { x: 0, y: 0 };
        var _autoSizeEnabled = false;
        Object.defineProperties(this, {
            'align': {
                get: function() {
                    return _align;
                }
            },
            'layout': {
                get: function() {
                    return _layout;
                }
            },
            'scrollBarEnabled': {
                get: function() {
                    return this.nativeObject.isHorizontalScrollBarEnabled() ||
                        this.nativeObject.isVerticalScrollBarEnabled();
                },
                set: function(enabled) {
                    this.nativeObject.setVerticalScrollBarEnabled(enabled);
                    this.nativeObject.setHorizontalScrollBarEnabled(enabled);
                }
            },
            'scrollToCoordinate': {
                value: function(coordinate, animate) {
                    if (coordinate) {
                        const UnitConverter = require('../../util/Android/unitconverter');
                        coordinate = UnitConverter.dpToPixel(coordinate);

                        var _animate = animate;
                        if (typeof(_animate) === "undefined") {
                            _animate = true;
                        }
                        (ScrollView.Align.HORIZONTAL === _align) && (_animate ? this.nativeObject.smoothScrollTo(coordinate, 0) : this.nativeObject.scrollTo(coordinate, 0));
                        (ScrollView.Align.VERTICAL === _align) && (_animate ? this.nativeObject.smoothScrollTo(0, coordinate) : this.nativeObject.scrollTo(0, coordinate));
                    }
                }
            },
            'scrollToEdge': {
                value: function(edge) {
                    if (edge) {
                        const NativeView = requireClass('android.view.View');

                        (ScrollView.Edge.TOP === edge) && this.nativeObject.fullScroll(NativeView.FOCUS_UP);
                        (ScrollView.Edge.BOTTOM === edge) && this.nativeObject.fullScroll(NativeView.FOCUS_DOWN);
                        (ScrollView.Edge.LEFT === edge) && this.nativeObject.fullScroll(NativeView.FOCUS_LEFT);
                        (ScrollView.Edge.RIGHT === edge) && this.nativeObject.fullScroll(NativeView.FOCUS_RIGHT);
                    }
                }
            },
            // // Overrided from ViewGroup due to difference between FlexLayout.
            'addChild': {
                value: function(view) {
                    this.nativeObject.removeView(_layout.nativeObject);
                    view.parent = this;
                    _layout.childViews[view.id] = view;
                    this.nativeObject.addView(view.nativeObject);
                },
                enumerable: true,
                configurable: true
            },
            'toString': {
                value: function() {
                    return 'ScrollView';
                },
                enumerable: true,
                configurable: true
            },
            'autoSizeEnabled': {
                get: function() {
                    return _autoSizeEnabled;
                },
                set: function(value) {
                    _autoSizeEnabled = value;
                },
                enumerable: true,
                configurable: true
            },
            'onScroll': {
                get: function() {
                    return _callbackOnScroll;
                },
                set: function(callback) {
                    _callbackOnScroll = callback;
                },
                enumerable: true,
                configurable: true
            },
            'contentOffset': {
                get: function() {
                    return _contentOffset;
                },
                enumerable: true,
                configurable: true
            }
        });

        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }

        self.layout.applyLayout = function() { // ToDo: This method will overwrite flexlayout's applyLayout. It is not sure that we should overwrite it.
            if (self.autoSizeEnabled) {
                const NativeViewTreeObserver = requireClass('android.view.ViewTreeObserver');
                var scrollView = self;
                var nativeGlobalLayoutListener = NativeViewTreeObserver.OnGlobalLayoutListener.implement({
                    onGlobalLayout: function() {
                        calculateScrollViewSize(scrollView);
                        scrollView.layout.nativeObject.requestLayout();
                        scrollView.layout.nativeObject.invalidate();
                        scrollView.layout.nativeObject.getViewTreeObserver().removeOnGlobalLayoutListener(nativeGlobalLayoutListener);
                    }
                });
                scrollView.layout.nativeObject.getViewTreeObserver().addOnGlobalLayoutListener(nativeGlobalLayoutListener);
                scrollView.layout.nativeObject.requestLayout();
            }
            else {
                scrollView.layout.nativeObject.requestLayout();
                scrollView.layout.nativeObject.invalidate();
            }
        };
    }
);

function calculateScrollViewSize(scrollView) {
    const ScrollView = require("sf-core/ui/scrollview");
    var childViews = scrollView.layout.childViews;
    var keys = Object.keys(childViews);
    var arrayLenght = keys.length;
    if (scrollView.align === ScrollView.Align.VERTICAL) {
        var layoutHeight = scrollView.height;
        for (var i = 0; i < arrayLenght; i++) {
            var viewY = AndroidUnitConverter.pixelToDp(childViews[keys[i]].nativeObject.getY());
            var viewHeight = AndroidUnitConverter.pixelToDp(childViews[keys[i]].nativeObject.getMeasuredHeight());
            var viewBottomMargin = childViews[keys[i]].marginBottom || 0;
            var layoutPaddingBottom = scrollView.layout.paddingBottom || 0;

            var measuredHeight = viewY + viewHeight + viewBottomMargin + layoutPaddingBottom;
            if (measuredHeight > layoutHeight)
                layoutHeight = measuredHeight;
        }
        scrollView.layout.height = layoutHeight;
    }
    else {
        var layoutWidth = scrollView.width;
        for (i = 0; i < arrayLenght; i++) {
            var viewX = AndroidUnitConverter.pixelToDp(childViews[keys[i]].nativeObject.getX());
            var viewWidth = AndroidUnitConverter.pixelToDp(childViews[keys[i]].nativeObject.getWidth());
            var viewRightMargin = childViews[keys[i]].marginRight || 0;
            var layoutPaddingRight = scrollView.layout.paddingRight || 0;
            var measuredWidth = viewX + viewWidth + viewRightMargin + layoutPaddingRight;
            if (measuredWidth > layoutWidth)
                layoutWidth = measuredWidth;
        }
        scrollView.layout.width = layoutWidth;
    }
}


Object.defineProperties(ScrollView, {
    'Align': {
        value: require('./scrollview-align'),
        enumerable: true
    },
    'Edge': {
        value: require('./scrollview-edge'),
        enumerable: true
    }
});

module.exports = ScrollView;
