const ViewGroup = require('../viewgroup');
const extend = require('js-base/core/extend');
 
const ScrollView = extend(ViewGroup)(
    function (_super, params) {
        var activity = Android.getActivity();

        var _align = params.align ? params.align : ScrollView.Align.VERTICAL;
        if (!this.nativeObject) {
            if (params && params.align && params.align === ScrollView.Align.HORIZONTAL) {
                const NativeHorizontalScroll = requireClass('android.widget.HorizontalScrollView');
                this.nativeObject = new NativeHorizontalScroll(activity);
            } else {
                const NativeVerticalScroll = requireClass('android.widget.ScrollView');
                this.nativeObject = new NativeVerticalScroll(activity);
            }
        }
        
        _super(this);
        const FlexLayout = require("sf-core/ui/flexlayout");
        var _layout = new FlexLayout();
        this.nativeObject.addView(_layout.nativeObject);
        _layout.parent = this;

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