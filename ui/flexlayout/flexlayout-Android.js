const ViewGroup                 = require('../viewgroup');
const extend                    = require('js-base/core/extend');

const NativeYogaLayout          = requireClass('com.facebook.yoga.android.YogaLayout');
const NativeYogaDirection       = requireClass('com.facebook.yoga.YogaDirection');
const NativeYogaFlexDirection   = requireClass('com.facebook.yoga.YogaFlexDirection');
const NativeYogaJustify         = requireClass('com.facebook.yoga.YogaJustify');
const NativeYogaAlign           = requireClass('com.facebook.yoga.YogaAlign');
const NativeYogaWrap            = requireClass('com.facebook.yoga.YogaWrap');
const NativeYogaOverflow        = requireClass('com.facebook.yoga.YogaOverflow');
const NativeYogaPositionType    = requireClass('com.facebook.yoga.YogaPositionType');

const FlexLayout = extend(ViewGroup)(
    function (_super, params) {
        var activity = Android.getActivity();
        
        if(!this.nativeObject){
            this.nativeObject = new NativeYogaLayout(activity);
        }

        _super(this);
        
        var _flexWrap;
        Object.defineProperties(this, {
            // direction values same as native
            'direction': {
                get: function() {
                    return this.yogaNode.getStyleDirection();
                },
                set: function(direction) {
                    this.yogaNode.setDirection(direction);
                },
                enumerable: true
            },
            // flexDirection values same as native
            'flexDirection': {
                get: function() {
                    return this.yogaNode.getFlexDirection();
                },
                set: function(flexDirection) {
                    this.yogaNode.setFlexDirection(flexDirection);
                },
                enumerable: true
            },
            // justifyContent values same as native
            'justifyContent': {
                get: function() {
                    return this.yogaNode.getJustifyContent();
                },
                set: function(justifyContent) {
                    this.yogaNode.setJustifyContent(justifyContent);
                },
                enumerable: true
            },
            // alignContent values same as native
            'alignContent': {
                get: function() {
                    return this.yogaNode.getAlignContent();
                },
                set: function(alignContent) {
                    this.yogaNode.setAlignContent(alignContent);
                },
                enumerable: true
            },
            // alignItems values same as native    
            'alignItems': {
                get: function() {
                    return this.yogaNode.getAlignItems();
                },
                set: function(alignItems) {
                    this.yogaNode.setAlignItems(alignItems);
                },
                enumerable: true
            },
            // flexWrap values same as native 
            'flexWrap': {
                get: function() {
                    return _flexWrap;
                },
                set: function(flexWrap) {
                    _flexWrap = flexWrap;
                    this.yogaNode.setWrap(flexWrap);
                },
                enumerable: true
            },
            // overFlow values same as native 
            'overFlow': {
                get: function() {
                    return this.yogaNode.getOverflow();
                },
                set: function(overFlow) {
                    this.yogaNode.setOverflow(overFlow);
                },
                enumerable: true
            },
            'toString': {
                value: function(){
                    return 'FlexLayout';
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

FlexLayout.Direction = {};
Object.defineProperty(FlexLayout.Direction, 'INHERIT', {
    value: NativeYogaDirection.INHERIT,
    writable: false
});
Object.defineProperty(FlexLayout.Direction, 'LTR', {
    value: NativeYogaDirection.LTR,
    writable: false
});
Object.defineProperty(FlexLayout.Direction, 'RTL', {
    value: NativeYogaDirection.RTL,
    writable: false
});

FlexLayout.FlexDirection = {};
Object.defineProperty(FlexLayout.FlexDirection, 'COLUMN', {
    value: NativeYogaFlexDirection.COLUMN,
    writable: false
});
Object.defineProperty(FlexLayout.FlexDirection, 'COLUMN_REVERSE', {
    value: NativeYogaFlexDirection.COLUMN_REVERSE,
    writable: false
});
Object.defineProperty(FlexLayout.FlexDirection, 'ROW', {
    value: NativeYogaFlexDirection.ROW,
    writable: false
});
Object.defineProperty(FlexLayout.FlexDirection, 'ROW_REVERSE', {
    value: NativeYogaFlexDirection.ROW_REVERSE,
    writable: false
});

FlexLayout.JustifyContent = {};
Object.defineProperty(FlexLayout.JustifyContent, 'FLEX_START', {
    value: NativeYogaJustify.FLEX_START,
    writable: false
});
Object.defineProperty(FlexLayout.JustifyContent, 'CENTER', {
    value: NativeYogaJustify.CENTER,
    writable: false
});
Object.defineProperty(FlexLayout.JustifyContent, 'FLEX_END', {
    value: NativeYogaJustify.FLEX_END,
    writable: false
});
Object.defineProperty(FlexLayout.JustifyContent, 'SPACE_BETWEEN', {
    value: NativeYogaJustify.SPACE_BETWEEN,
    writable: false
});
Object.defineProperty(FlexLayout.JustifyContent, 'SPACE_AROUND', {
    value: NativeYogaJustify.SPACE_AROUND,
    writable: false
});

FlexLayout.AlignContent = {};
Object.defineProperty(FlexLayout.AlignContent, 'AUTO', {
    value: NativeYogaAlign.AUTO,
    writable: false
});
Object.defineProperty(FlexLayout.AlignContent, 'FLEX_START', {
    value: NativeYogaAlign.FLEX_START,
    writable: false
});
Object.defineProperty(FlexLayout.AlignContent, 'CENTER', {
    value: NativeYogaAlign.CENTER,
    writable: false
});
Object.defineProperty(FlexLayout.AlignContent, 'FLEX_END', {
    value: NativeYogaAlign.FLEX_END,
    writable: false
});
Object.defineProperty(FlexLayout.AlignContent, 'STRETCH', {
    value: NativeYogaAlign.STRETCH,
    writable: false
});

FlexLayout.FlexWrap = {};
Object.defineProperty(FlexLayout.FlexWrap, 'NOWRAP', {
    value : NativeYogaWrap.NO_WRAP,
    writable: false
});
Object.defineProperty(FlexLayout.FlexWrap, 'WRAP', {
    value : NativeYogaWrap.WRAP,
    writable: false
});

FlexLayout.Overflow = {};
Object.defineProperty(FlexLayout.Overflow, 'VISIBLE', {
    value : NativeYogaOverflow.VISIBLE,
    writable: false
});
Object.defineProperty(FlexLayout.Overflow, 'HIDDEN', {
    value : NativeYogaOverflow.HIDDEN,
    writable: false
});
Object.defineProperty(FlexLayout.Overflow, 'SCROLL', {
    value : NativeYogaOverflow.SCROLL,
    writable: false
});

FlexLayout.AlignItems = {};
Object.defineProperty(FlexLayout.AlignItems, 'AUTO', {
    value: NativeYogaAlign.AUTO,
    writable: false
});
Object.defineProperty(FlexLayout.AlignItems, 'FLEX_START', {
    value: NativeYogaAlign.FLEX_START,
    writable: false
});
Object.defineProperty(FlexLayout.AlignItems, 'CENTER', {
    value: NativeYogaAlign.CENTER,
    writable: false
});
Object.defineProperty(FlexLayout.AlignItems, 'FLEX_END', {
    value: NativeYogaAlign.FLEX_END,
    writable: false
});
Object.defineProperty(FlexLayout.AlignItems, 'STRETCH', {
    value: NativeYogaAlign.STRETCH,
    writable: false
});

FlexLayout.AlignSelf = {};
Object.defineProperty(FlexLayout.AlignSelf, 'AUTO', {
    value : NativeYogaAlign.AUTO,
    writable: false
});
Object.defineProperty(FlexLayout.AlignSelf, 'FLEX_START', {
    value : NativeYogaAlign.FLEX_START,
    writable: false
});
Object.defineProperty(FlexLayout.AlignSelf, 'CENTER', {
    value : NativeYogaAlign.CENTER,
    writable: false
});
Object.defineProperty(FlexLayout.AlignSelf, 'FLEX_END', {
    value : NativeYogaAlign.FLEX_END,
    writable: false
});
Object.defineProperty(FlexLayout.AlignSelf, 'STRETCH', {
    value : NativeYogaAlign.STRETCH,
    writable: false
});

FlexLayout.PositionType = {};
Object.defineProperty(FlexLayout.PositionType, 'RELATIVE', {
    value : NativeYogaPositionType.RELATIVE,
    writable: false
});
Object.defineProperty(FlexLayout.PositionType, 'ABSOLUTE', {
    value : NativeYogaPositionType.ABSOLUTE,
    writable: false
});

module.exports = FlexLayout;