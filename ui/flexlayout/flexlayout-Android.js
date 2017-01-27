const ViewGroup = require('../viewgroup');
const extend = require('js-base/core/extend');

const NativeYogaNoda = requireClass("com.facebook.yoga.YogaNode");

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
        
        // direction values same as native
        Object.defineProperty(this, 'position', {
            get: function() {
                return self.nativeObject.getNode().getPositionType();
            },
            set: function(position) {
                self.nativeObject.getNode().setPositionType(position);
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
        
        this.applyLayout = function(){
            if(self.childViews){
                for(var childViewKey in self.childViews){
                    // passing calculated height and width to child view
                    self.childViews[childViewKey].generateLayoutParams();
                }
            }
            self.nativeObject.getNode().calculateLayout();
        };
        
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

/**
 * @enum {Number} UI.FlexLayout.Position
 * @static
 * @readonly
 * @since 0.1
 *
 * // @todo add description.
 *
 *     @example
 *     // @todo add example
 *
 */
FlexLayout.Position = {};
/**
 * @property {Number} RELATIVE
 * // @todo add description.
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.Position, 'RELATIVE', {
    value : 0,
    writable: false
});
/**
 * @property {Number} ABSOLUTE
 * // @todo add description.
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(FlexLayout.Position, 'ABSOLUTE', {
    value : 1,
    writable: false
});

module.exports = FlexLayout;