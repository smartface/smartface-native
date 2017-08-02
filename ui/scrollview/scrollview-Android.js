const ViewGroup = require('../viewgroup');
const UnitConverter = require("sf-core/util/Android/unitconverter.js");
const extend = require('js-base/core/extend');
 
const ScrollView = extend(ViewGroup)(
    function (_super, params) {
        var activity = Android.getActivity();

        var _align = params.align ? params.align : ScrollView.Align.VERTICAL;
        if (!this.nativeObject) {
            if (params && params.align && params.align === ScrollView.Align.HORIZONTAL) {
                const NativeHorizontalScroll = requireClass('android.widget.HorizontalScrollView');
                this.nativeObject = NativeHorizontalScroll.extend("SFHorizontalScroll", {
                    onScrollChanged: function(x, y, oldx, oldy) {
                        x = (x > 0)? x : 0; // negative values are provided as well
                        _contentOffset.x = UnitConverter.pixelToDp(x);
                        _callbackOnScroll && _callbackOnScroll();
                    }
                }, [activity]);
            } else {
                const NativeVerticalScroll = requireClass('android.widget.ScrollView');
                this.nativeObject = NativeVerticalScroll.extend("SFVerticalScroll", {
                    onScrollChanged: function(x, y, oldx, oldy) {
                        y = (y > 0)? y : 0; // negative values are provided as well
                        _contentOffset.y = UnitConverter.pixelToDp(y);
                        _callbackOnScroll && _callbackOnScroll();
                    }
                }, [activity]);
            }
        }
        
        _super(this);
        const FlexLayout = require("sf-core/ui/flexlayout");
        var _layout = new FlexLayout();
        this.nativeObject.addView(_layout.nativeObject);
        _layout.parent = this;
        var _callbackOnScroll = null;
        var _contentOffset = {x: 0, y: 0};
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
                    return this.nativeObject.isHorizontalScrollBarEnabled()
                        || this.nativeObject.isVerticalScrollBarEnabled();
                },
                set: function(enabled) {
                    this.nativeObject.setVerticalScrollBarEnabled(enabled);
                    this.nativeObject.setHorizontalScrollBarEnabled(enabled);
                }
            },
            'scrollToCoordinate': {
                value: function(coordinate) {
                    if (coordinate) {
                        const UnitConverter = require('sf-core/util/Android/unitconverter');
                        coordinate = UnitConverter.dpToPixel(coordinate);

                        (ScrollView.Align.HORIZONTAL === _align) && this.nativeObject.smoothScrollTo(coordinate, 0);
                        (ScrollView.Align.VERTICAL   === _align) && this.nativeObject.smoothScrollTo(0, coordinate);
                    }
                }
            },
            'scrollToEdge': {
                value: function(edge) {
                    if (edge) {
                        const NativeView = requireClass('android.view.View');

                        (ScrollView.Edge.TOP    === edge) && this.nativeObject.fullScroll(NativeView.FOCUS_UP);
                        (ScrollView.Edge.BOTTOM === edge) && this.nativeObject.fullScroll(NativeView.FOCUS_DOWN);
                        (ScrollView.Edge.LEFT   === edge) && this.nativeObject.fullScroll(NativeView.FOCUS_LEFT);
                        (ScrollView.Edge.RIGHT  === edge) && this.nativeObject.fullScroll(NativeView.FOCUS_RIGHT);
                    }
                }
            },
            // // Overrided from ViewGroup due to difference between FlexLayout.
            'addChild': {
                value: function(view){
                    this.nativeObject.removeView(_layout.nativeObject);
                    view.parent = this;
                    this.childViews[view.id] = view;
                    this.nativeObject.addView(view.nativeObject);
                },
                enumerable: true,
                configurable: true
            },
            'toString': {
                value: function(){
                    return 'ScrollView';
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
    }
);

Object.defineProperties(ScrollView, {
    'Align': {
        value: require('./scrollview-align'),
        enumarable: true
    },
    'Edge': {
        value: require('./scrollview-edge'),
        enumarable: true
    }
});

module.exports = ScrollView;