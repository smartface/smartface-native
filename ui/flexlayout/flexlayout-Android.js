const ViewGroup = require('../viewgroup');
const extend = require('js-base/core/extend');

const NativeFlexboxLayout = requireClass("com.google.android.flexbox.FlexboxLayout");

// AlignContent.FLEX_START : 0
// AlignContent.ROW_REVERSE : 1
// AlignContent.CENTER : 2
// AlignContent.STRETCH : 5
const AlignContentDictionary = [0, 1, 2, 5];

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
                var _alignContent = self.nativeObject.getAlignContent();
                return _alignContent == 5 ? 3 : _alignContent;
            },
            set: function(alignContent) {
                self.nativeObject.setAlignContent(AlignContentDictionary[alignContent]);
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
        
        // Do nothing for Android
        this.applyLayout = function(){};
        
        this.flexDirection = FlexLayout.FlexDirection.ROW;
        this.justifyContent = FlexLayout.JustifyContent.FLEX_START;
        this.alignContent = FlexLayout.AlignContent.STRETCH;
        this.alignItems = FlexLayout.AlignItems.STRETCH;
        this.flexWrap = FlexLayout.FlexWrap.NO_WRAP;
        
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

FlexLayout.FlexDirection = {};
Object.defineProperty(FlexLayout.FlexDirection, 'ROW', {
    value: 0,
    writable: false
});
Object.defineProperty(FlexLayout.FlexDirection, 'ROW_REVERSE', {
    value: 1,
    writable: false
});
Object.defineProperty(FlexLayout.FlexDirection, 'COLUMN', {
    value: 2,
    writable: false
});
Object.defineProperty(FlexLayout.FlexDirection, 'COLUMN_REVERSE', {
    value: 3,
    writable: false
});

FlexLayout.JustifyContent = {};
Object.defineProperty(FlexLayout.JustifyContent, 'FLEX_START', {
    value: 0,
    writable: false
});
Object.defineProperty(FlexLayout.JustifyContent, 'FLEX_END', {
    value: 1,
    writable: false
});
Object.defineProperty(FlexLayout.JustifyContent, 'CENTER', {
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
Object.defineProperty(FlexLayout.AlignContent, 'FLEX_START', {
    value: 0,
    writable: false
});
Object.defineProperty(FlexLayout.AlignContent, 'FLEX_END', {
    value: 1,
    writable: false
});
Object.defineProperty(FlexLayout.AlignContent, 'CENTER', {
    value: 2,
    writable: false
});
Object.defineProperty(FlexLayout.AlignContent, 'STRETCH', {
    value: 3,
    writable: false
});

FlexLayout.AlignItems = {};
Object.defineProperty(FlexLayout.AlignItems, 'FLEX_START', {
    value: 0,
    writable: false
});
Object.defineProperty(FlexLayout.AlignItems, 'FLEX_END', {
    value: 1,
    writable: false
});
Object.defineProperty(FlexLayout.AlignItems, 'CENTER', {
    value: 2,
    writable: false
});
Object.defineProperty(FlexLayout.AlignItems, 'BASELINE', {
    value: 3,
    writable: false
});
Object.defineProperty(FlexLayout.AlignItems, 'STRETCH', {
    value: 4,
    writable: false
});

FlexLayout.FlexWrap = {};
Object.defineProperty(FlexLayout.FlexWrap, 'NOWRAP', {
    value: 0,
    writable: false
});
Object.defineProperty(FlexLayout.FlexWrap, 'WRAP', {
    value: 1,
    writable: false
});

FlexLayout.AlignSelf = {};
Object.defineProperty(FlexLayout.AlignSelf, 'AUTO', {
    value: 0,
    writable: false
});
Object.defineProperty(FlexLayout.AlignSelf, 'FLEX_START', {
    value: 1,
    writable: false
});
Object.defineProperty(FlexLayout.AlignSelf, 'FLEX_END', {
    value: 2,
    writable: false
});
Object.defineProperty(FlexLayout.AlignSelf, 'CENTER', {
    value: 3,
    writable: false
});
Object.defineProperty(FlexLayout.AlignSelf, 'BASELINE', {
    value: 4,
    writable: false
});
Object.defineProperty(FlexLayout.AlignSelf, 'STRETCH', {
    value: 5,
    writable: false
});

module.exports = FlexLayout;