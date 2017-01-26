const ViewGroup = require('../viewgroup');
const extend = require('js-base/core/extend');

const NativeFlexboxLayout = requireClass("com.google.android.flexbox.FlexboxLayout");

const FlexLayout = extend(ViewGroup)(
    function (_super, params) {
        var self = this;
        self.nativeObject = new NativeFlexboxLayout(Android.getActivity());
        _super(this);

        // flexDirection values same as native
        Object.defineProperty(this, 'flexDirection', {
            get: function() {
                return self.nativeObject.getFlexDirection();
            },
            set: function(flexDirection) {
                self.nativeObject.setFlexDirection(flexDirection);
            },
            enumerable: true
        });
        
        // justifyContent values same as native
        Object.defineProperty(this, 'justifyContent', {
            get: function() {
                return self.nativeObject.getJustifyContent();
            },
            set: function(justifyContent) {
                self.nativeObject.setJustifyContent(justifyContent);
            },
            enumerable: true
        });
        
        // alignContent values same as native
        Object.defineProperty(this, 'alignContent', {
            get: function() {
                return self.nativeObject.getAlignContent();
            },
            set: function(alignContent) {
                self.nativeObject.setAlignContent(alignContent);
            },
            enumerable: true
        });
        
        // alignItems values same as native    
        Object.defineProperty(this, 'alignItems', {
            get: function() {
                return self.nativeObject.getAlignItems();
            },
            set: function(alignItems) {
                self.nativeObject.setAlignItems(alignItems);
            },
            enumerable: true
        });
        
        Object.defineProperty(this, 'flexWrap', {
            get: function() {
                return self.nativeObject.getFlexWrap();
            },
            set: function(flexWrap) {
                self.nativeObject.setFlexWrap(flexWrap);
            },
            enumerable: true
        });
        
        Object.defineProperty(this, 'overFlow', {
            get: function() {
                return self.nativeObject.getFlexWrap();
            },
            set: function(flexWrap) {
                self.nativeObject.setFlexWrap(flexWrap);
            },
            enumerable: true
        });
        
        // Do nothing for Android
        this.applyLayout = function(){};
        
        this.flexDirection = FlexLayout.FlexDirection.ROW;
        this.justifyContent = FlexLayout.JustifyContent.FLEX_START;
        this.alignContent = FlexLayout.AlignContent.STRETCH;
        this.alignItems = FlexLayout.AlignItems.STRETCH;
        this.flexWrap = FlexLayout.FlexWrap.NOWRAP;
        
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
    value: 0,
    writable: false
});
Object.defineProperty(FlexLayout.Direction, 'LTR', {
    value: 1,
    writable: false
});
Object.defineProperty(FlexLayout.Direction, 'RTL', {
    value: 2,
    writable: false
});

FlexLayout.FlexDirection = {};
Object.defineProperty(FlexLayout.FlexDirection, 'COLUMN', {
    value: 0,
    writable: false
});
Object.defineProperty(FlexLayout.FlexDirection, 'COLUMN_REVERSE', {
    value: 1,
    writable: false
});
Object.defineProperty(FlexLayout.FlexDirection, 'ROW', {
    value: 2,
    writable: false
});
Object.defineProperty(FlexLayout.FlexDirection, 'ROW_REVERSE', {
    value: 3,
    writable: false
});

FlexLayout.JustifyContent = {};
Object.defineProperty(FlexLayout.JustifyContent, 'FLEX_START', {
    value: 0,
    writable: false
});
Object.defineProperty(FlexLayout.JustifyContent, 'CENTER', {
    value: 1,
    writable: false
});
Object.defineProperty(FlexLayout.JustifyContent, 'FLEX_END', {
    value: 2,
    writable: false
});
Object.defineProperty(FlexLayout.JustifyContent, 'SPACE_BETWEEN', {
    value: 3,
    writable: false
});
Object.defineProperty(FlexLayout.JustifyContent, 'SPACE_AROUND', {
    value: 4,
    writable: false
});

FlexLayout.AlignContent = {};
Object.defineProperty(FlexLayout.AlignContent, 'AUTO', {
    value: 0,
    writable: false
});
Object.defineProperty(FlexLayout.AlignContent, 'FLEX_START', {
    value: 1,
    writable: false
});
Object.defineProperty(FlexLayout.AlignContent, 'CENTER', {
    value: 2,
    writable: false
});
Object.defineProperty(FlexLayout.AlignContent, 'FLEX_END', {
    value: 3,
    writable: false
});
Object.defineProperty(FlexLayout.AlignContent, 'STRETCH', {
    value: 4,
    writable: false
});

FlexLayout.FlexWrap = {};
Object.defineProperty(FlexLayout.FlexWrap, 'NOWRAP', {
    value : 0,
    writable: false
});
Object.defineProperty(FlexLayout.FlexWrap, 'WRAP', {
    value : 1,
    writable: false
});

FlexLayout.Overflow = {};
Object.defineProperty(FlexLayout.Overflow, 'VISIBLE', {
    value : 0,
    writable: false
});
Object.defineProperty(FlexLayout.Overflow, 'HIDDEN', {
    value : 1,
    writable: false
});
Object.defineProperty(FlexLayout.Overflow, 'SCROLL', {
    value : 2,
    writable: false
});

FlexLayout.AlignItems = {};
Object.defineProperty(FlexLayout.AlignItems, 'AUTO', {
    value: 0,
    writable: false
});
Object.defineProperty(FlexLayout.AlignItems, 'FLEX_START', {
    value: 1,
    writable: false
});
Object.defineProperty(FlexLayout.AlignItems, 'CENTER', {
    value: 2,
    writable: false
});
Object.defineProperty(FlexLayout.AlignItems, 'FLEX_END', {
    value: 3,
    writable: false
});
Object.defineProperty(FlexLayout.AlignContent, 'STRETCH', {
    value: 4,
    writable: false
});

FlexLayout.AlignSelf = {};
Object.defineProperty(FlexLayout.AlignSelf, 'AUTO', {
    value : 0,
    writable: false
});
Object.defineProperty(FlexLayout.AlignSelf, 'FLEX_START', {
    value : 1,
    writable: false
});
Object.defineProperty(FlexLayout.AlignSelf, 'CENTER', {
    value : 2,
    writable: false
});
Object.defineProperty(FlexLayout.AlignSelf, 'FLEX_END', {
    value : 3,
    writable: false
});
Object.defineProperty(FlexLayout.AlignSelf, 'STRETCH', {
    value : 4,
    writable: false
});

module.exports = FlexLayout;