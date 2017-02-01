const ViewGroup = require('../viewgroup');
const extend = require('js-base/core/extend');

const NativeYogaNoda            = requireClass("com.facebook.yoga.YogaNode");
const NativeYogaLayout          = requireClass('io.smartface.yoga.YogaLayout');
const NativeYogaDirection       = requireClass('com.facebook.yoga.YogaDirection');
const NativeYogaFlexDirection   = requireClass('com.facebook.yoga.YogaFlexDirection');
const NativeYogaJustify         = requireClass('com.facebook.yoga.YogaJustify');
const NativeYogaAlign           = requireClass('com.facebook.yoga.YogaAlign');
const NativeYogaWrap            = requireClass('com.facebook.yoga.YogaWrap');
const NativeYogaOverflow        = requireClass('com.facebook.yoga.YogaOverflow');
const NativeYogaPositionType    = requireClass('com.facebook.yoga.YogaPositionType');



const FlexLayout = extend(ViewGroup)(
    function (_super, params) {
        var self = this;
        self.nativeObject = new NativeYogaLayout(Android.getActivity(),null);
        _super(this);
        
        // direction values same as native
        Object.defineProperty(this, 'direction', {
            get: function() {
                return self.nativeObject.getNode().getStyleDirection();
            },
            set: function(direction) {
                self.nativeObject.getNode().setDirection(direction);
            },
            enumerable: true
        });
        
        // flexDirection values same as native
        Object.defineProperty(this, 'flexDirection', {
            get: function() {
                return self.nativeObject.getNode().getFlexDirection();
            },
            set: function(flexDirection) {
                self.nativeObject.getNode().setFlexDirection(flexDirection);
            },
            enumerable: true
        });
        
        // justifyContent values same as native
        Object.defineProperty(this, 'justifyContent', {
            get: function() {
                return self.nativeObject.getNode().getJustifyContent();
            },
            set: function(justifyContent) {
                self.nativeObject.getNode().setJustifyContent(justifyContent);
            },
            enumerable: true
        });
        
        // alignContent values same as native
        Object.defineProperty(this, 'alignContent', {
            get: function() {
                return self.nativeObject.getNode().getAlignContent();
            },
            set: function(alignContent) {
                self.nativeObject.getNode().setAlignContent(alignContent);
            },
            enumerable: true
        });
        
        // alignItems values same as native    
        Object.defineProperty(this, 'alignItems', {
            get: function() {
                return self.nativeObject.getNode().getAlignItems();
            },
            set: function(alignItems) {
                self.nativeObject.getNode().setAlignItems(alignItems);
            },
            enumerable: true
        });
        
        // flexWrap values same as native 
        var _flexWrap;
        Object.defineProperty(this, 'flexWrap', {
            get: function() {
                return _flexWrap;
            },
            set: function(flexWrap) {
                _flexWrap = flexWrap;
                self.nativeObject.getNode().setWrap(flexWrap);
            },
            enumerable: true
        });
        
        // overFlow values same as native 
        Object.defineProperty(this, 'overFlow', {
            get: function() {
                return self.nativeObject.getNode().getOverflow();
            },
            set: function(flexWrap) {
                self.nativeObject.getNode().setOverflow(flexWrap);
            },
            enumerable: true
        });
        
        
        self.position = FlexLayout.Position.RELATIVE;
        self.alignItems = FlexLayout.AlignItems.FLEX_START;
        //self.flexDirection = FlexLayout.FlexDirection.ROW;
        
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
    value : NativeYogaWrap.NOWRAP,
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

FlexLayout.Position = {};
Object.defineProperty(FlexLayout.Position, 'RELATIVE', {
    value : NativeYogaPositionType.RELATIVE,
    writable: false
});
Object.defineProperty(FlexLayout.Position, 'ABSOLUTE', {
    value : NativeYogaPositionType.ABSOLUTE,
    writable: false
});

module.exports = FlexLayout;