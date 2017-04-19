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
                    return convertFlexJavaEnumToJsEnum(this.yogaNode.getStyleDirection(), FlexLayout.Direction);
                },
                set: function(direction) {
                    this.yogaNode.setDirection(direction);
                },
                enumerable: true
            },
            // flexDirection values same as native
            'flexDirection': {
                get: function() {
                    return convertFlexJavaEnumToJsEnum(this.yogaNode.getFlexDirection(), FlexLayout.FlexDirection);
                },
                set: function(flexDirection) {
                    this.yogaNode.setFlexDirection(flexDirection);
                },
                enumerable: true
            },
            // justifyContent values same as native
            'justifyContent': {
                get: function() {
                    return convertFlexJavaEnumToJsEnum(this.yogaNode.getJustifyContent(), FlexLayout.JustifyContent);
                },
                set: function(justifyContent) {
                    this.yogaNode.setJustifyContent(justifyContent);
                },
                enumerable: true
            },
            // alignContent values same as native
            'alignContent': {
                get: function() {
                    return convertFlexJavaEnumToJsEnum(this.yogaNode.getAlignContent(), FlexLayout.AlignContent);
                },
                set: function(alignContent) {
                    this.yogaNode.setAlignContent(alignContent);
                },
                enumerable: true
            },
            // alignItems values same as native    
            'alignItems': {
                get: function() {
                    return convertFlexJavaEnumToJsEnum(this.yogaNode.getAlignItems(), FlexLayout.AlignItems);
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
                    return convertFlexJavaEnumToJsEnum(this.yogaNode.getOverflow(), FlexLayout.Overflow);
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

function convertFlexJavaEnumToJsEnum(javaEnum, jsEnums){
    var jsKeys = Object.keys(jsEnums);
    for(var i = 0; i< jsKeys.length ; i++){
        if(javaEnum.equals(jsEnums[jsKeys[i]])){
            return jsEnums[jsKeys[i]];
        }
    }
    return null;
}

FlexLayout.Direction = {};
Object.defineProperty(FlexLayout.Direction, 'INHERIT', {
    value: NativeYogaDirection.INHERIT,
    enumerable: true
});
Object.defineProperty(FlexLayout.Direction, 'LTR', {
    value: NativeYogaDirection.LTR,
    enumerable: true
});
Object.defineProperty(FlexLayout.Direction, 'RTL', {
    value: NativeYogaDirection.RTL,
    enumerable: true
});

FlexLayout.FlexDirection = {};
Object.defineProperty(FlexLayout.FlexDirection, 'COLUMN', {
    value: NativeYogaFlexDirection.COLUMN,
    enumerable: true
});
Object.defineProperty(FlexLayout.FlexDirection, 'COLUMN_REVERSE', {
    value: NativeYogaFlexDirection.COLUMN_REVERSE,
    enumerable: true
});
Object.defineProperty(FlexLayout.FlexDirection, 'ROW', {
    value: NativeYogaFlexDirection.ROW,
    enumerable: true
});
Object.defineProperty(FlexLayout.FlexDirection, 'ROW_REVERSE', {
    value: NativeYogaFlexDirection.ROW_REVERSE,
    enumerable: true
});

FlexLayout.JustifyContent = {};
Object.defineProperty(FlexLayout.JustifyContent, 'FLEX_START', {
    value: NativeYogaJustify.FLEX_START,
    enumerable: true
});
Object.defineProperty(FlexLayout.JustifyContent, 'CENTER', {
    value: NativeYogaJustify.CENTER,
    enumerable: true
});
Object.defineProperty(FlexLayout.JustifyContent, 'FLEX_END', {
    value: NativeYogaJustify.FLEX_END,
    enumerable: true
});
Object.defineProperty(FlexLayout.JustifyContent, 'SPACE_BETWEEN', {
    value: NativeYogaJustify.SPACE_BETWEEN,
    enumerable: true
});
Object.defineProperty(FlexLayout.JustifyContent, 'SPACE_AROUND', {
    value: NativeYogaJustify.SPACE_AROUND,
    enumerable: true
});

FlexLayout.AlignContent = {};
Object.defineProperty(FlexLayout.AlignContent, 'AUTO', {
    value: NativeYogaAlign.AUTO,
    enumerable: true
});
Object.defineProperty(FlexLayout.AlignContent, 'FLEX_START', {
    value: NativeYogaAlign.FLEX_START,
    enumerable: true
});
Object.defineProperty(FlexLayout.AlignContent, 'CENTER', {
    value: NativeYogaAlign.CENTER,
    enumerable: true
});
Object.defineProperty(FlexLayout.AlignContent, 'FLEX_END', {
    value: NativeYogaAlign.FLEX_END,
    enumerable: true
});
Object.defineProperty(FlexLayout.AlignContent, 'STRETCH', {
    value: NativeYogaAlign.STRETCH,
    enumerable: true
});

FlexLayout.FlexWrap = {};
Object.defineProperty(FlexLayout.FlexWrap, 'NOWRAP', {
    value : NativeYogaWrap.NO_WRAP,
    enumerable: true
});
Object.defineProperty(FlexLayout.FlexWrap, 'WRAP', {
    value : NativeYogaWrap.WRAP,
    enumerable: true
});

FlexLayout.Overflow = {};
Object.defineProperty(FlexLayout.Overflow, 'VISIBLE', {
    value : NativeYogaOverflow.VISIBLE,
    enumerable: true
});
Object.defineProperty(FlexLayout.Overflow, 'HIDDEN', {
    value : NativeYogaOverflow.HIDDEN,
    enumerable: true
});
Object.defineProperty(FlexLayout.Overflow, 'SCROLL', {
    value : NativeYogaOverflow.SCROLL,
    enumerable: true
});

FlexLayout.AlignItems = {};
Object.defineProperty(FlexLayout.AlignItems, 'AUTO', {
    value: NativeYogaAlign.AUTO,
    enumerable: true
});
Object.defineProperty(FlexLayout.AlignItems, 'FLEX_START', {
    value: NativeYogaAlign.FLEX_START,
    enumerable: true
});
Object.defineProperty(FlexLayout.AlignItems, 'CENTER', {
    value: NativeYogaAlign.CENTER,
    enumerable: true
});
Object.defineProperty(FlexLayout.AlignItems, 'FLEX_END', {
    value: NativeYogaAlign.FLEX_END,
    enumerable: true
});
Object.defineProperty(FlexLayout.AlignItems, 'STRETCH', {
    value: NativeYogaAlign.STRETCH,
    enumerable: true
});

FlexLayout.AlignSelf = {};
Object.defineProperty(FlexLayout.AlignSelf, 'AUTO', {
    value : NativeYogaAlign.AUTO,
    enumerable: true
});
Object.defineProperty(FlexLayout.AlignSelf, 'FLEX_START', {
    value : NativeYogaAlign.FLEX_START,
    enumerable: true
});
Object.defineProperty(FlexLayout.AlignSelf, 'CENTER', {
    value : NativeYogaAlign.CENTER,
    enumerable: true
});
Object.defineProperty(FlexLayout.AlignSelf, 'FLEX_END', {
    value : NativeYogaAlign.FLEX_END,
    enumerable: true
});
Object.defineProperty(FlexLayout.AlignSelf, 'STRETCH', {
    value : NativeYogaAlign.STRETCH,
    enumerable: true
});

FlexLayout.PositionType = {};
Object.defineProperty(FlexLayout.PositionType, 'RELATIVE', {
    value : NativeYogaPositionType.RELATIVE,
    enumerable: true
});
Object.defineProperty(FlexLayout.PositionType, 'ABSOLUTE', {
    value : NativeYogaPositionType.ABSOLUTE,
    enumerable: true
});

module.exports = FlexLayout;