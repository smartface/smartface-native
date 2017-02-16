const ViewGroup = require('../viewgroup');
const extend = require('js-base/core/extend');
 
const ScrollView = extend(ViewGroup)(
    function (_super, params) {
        var activity = Android.getActivity();

        var self = this;
        
        var _align = ScrollView.Align.VERTICAL;
        if (!self.nativeObject) {
            if (params && params.align && params.align === ScrollView.Align.HORIZONTAL) {
                _align = ScrollView.Align.HORIZONTAL;
                
                const NativeHorizontalScroll = requireClass('android.widget.HorizontalScrollView');
                self.nativeObject = new NativeHorizontalScroll(activity);
            } else {
                const NativeVerticalScroll = requireClass('android.widget.ScrollView');
                self.nativeObject = new NativeVerticalScroll(activity);
            }
        }
        _super(this);
        
        Object.defineProperties(self, {
            'scrollBarEnabled': {
                get: function() {
                    return self.nativeObject.isHorizontalScrollBarEnabled()
                        || self.nativeObject.isVerticalScrollBarEnabled();
                },
                set: function(enabled) {
                    self.nativeObject.setVerticalScrollBarEnabled(enabled);
                    self.nativeObject.setHorizontalScrollBarEnabled(enabled);
                }
            },
            'scrollToCoordinate': {
                value: function(coordinate) {
                    if (coordinate) {
                        const UnitConverter = require('nf-core/util/Android/unitconverter');
                        coordinate = UnitConverter.dpToPixel(coordinate);

                        (ScrollView.Align.HORIZONTAL === _align) && self.nativeObject.smoothScrollTo(coordinate, 0);
                        (ScrollView.Align.VERTICAL   === _align) && self.nativeObject.smoothScrollTo(0, coordinate);
                    }
                }
            },
            'scrollToEdge': {
                value: function(edge) {
                    if (edge) {
                        const NativeView = requireClass('android.view.View');

                        (ScrollView.Edge.TOP    === edge) && self.nativeObject.fullScroll(NativeView.FOCUS_UP);
                        (ScrollView.Edge.BOTTOM === edge) && self.nativeObject.fullScroll(NativeView.FOCUS_DOWN);
                        (ScrollView.Edge.LEFT   === edge) && self.nativeObject.fullScroll(NativeView.FOCUS_LEFT);
                        (ScrollView.Edge.RIGHT  === edge) && self.nativeObject.fullScroll(NativeView.FOCUS_RIGHT);
                    }
                }
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