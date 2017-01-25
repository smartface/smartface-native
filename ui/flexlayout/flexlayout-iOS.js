const ViewGroup = require('../viewgroup');
const extend = require('js-base/core/extend');

const FlexLayout = extend(ViewGroup)(
    function (_super, params) {
        _super(this);

        var self = this;
        self.flexEnabled = true;
        
		var superAddChild = this.addChild.bind(this);
        this.addChild = function(view){
        	if (!view.flexEnabled) {
        		// getPosition() from nativeObject.frame if flexEnabled is false
        		var frame = view.getPosition();
        		// When you change flexEnabled property;
        		// left,top,width and height property setters will react on it.
        		// Check object definitions in "view-iOS.js"
        		view.flexEnabled = true;
        		// flexEnabled is changed.
        		// setPosition() will set nativeObject.yoga.left|.top|.width|.height
        		view.setPosition(frame);
        	}
            superAddChild();
        }

        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

// YG Enums are inherited from UIView
////////////////////////////////////////////////////////////////////////
const FlexLayout.FlexDirection = {};

Object.defineProperty(FlexLayout.FlexDirection, 'ROW', {
    get: function() {
		return YGFlexDirection.Row;
    },
    writable: false
});
Object.defineProperty(FlexLayout.FlexDirection, 'ROW_REVERSE', {
    get: function() {
		return YGFlexDirection.RowReverse;
    },
    writable: false
});
Object.defineProperty(FlexLayout.FlexDirection, 'COLUMN', {
    get: function() {
		return YGFlexDirection.Column;
    },
    writable: false
});
Object.defineProperty(FlexLayout.FlexDirection, 'COLUMN_REVERSE', {
    get: function() {
		return YGFlexDirection.ColumnReverse;
    },
    writable: false
});
////////////////////////////////////////////////////////////////////////
const FlexLayout.JustifyContent = {};

Object.defineProperty(FlexLayout.JustifyContent, 'FLEX_START', {
    get: function() {
		return YGJustify.FlexStart;
    },
    writable: false
});
Object.defineProperty(FlexLayout.JustifyContent, 'FLEX_END', {
    get: function() {
		return YGJustify.FlexEnd;
    },
    writable: false
});
Object.defineProperty(FlexLayout.JustifyContent, 'CENTER', {
    get: function() {
		return YGJustify.Center;
    },
    writable: false
});
Object.defineProperty(FlexLayout.JustifyContent, 'SPACE_BETWEEN', {
    get: function() {
		return YGJustify.SpaceBetween;
    },
    writable: false
});
Object.defineProperty(FlexLayout.JustifyContent, 'SPACE_AROUND', {
    get: function() {
		return YGJustify.SpaceAround;
    },
    writable: false
});
////////////////////////////////////////////////////////////////////////
const FlexLayout.AlignContent = {};

Object.defineProperty(FlexLayout.AlignContent, 'FLEX_START', {
    get: function() {
		return YGAlign.FlexStart;
    },
    writable: false
});
Object.defineProperty(FlexLayout.AlignContent, 'FLEX_END', {
    get: function() {
		return YGAlign.FlexEnd;
    },
    writable: false
});
Object.defineProperty(FlexLayout.AlignContent, 'CENTER', {
    get: function() {
		return YGAlign.Center;
    },
    writable: false
});
Object.defineProperty(FlexLayout.AlignContent, 'STRETCH', {
    get: function() {
		return YGAlign.Stretch;
    },
    writable: false
});
////////////////////////////////////////////////////////////////////////
const FlexLayout.AlignItems = {};

Object.defineProperty(FlexLayout.AlignItems, 'FLEX_START', {
    get: function() {
		return YGAlign.FlexStart;
    },
    writable: false
});
Object.defineProperty(FlexLayout.AlignItems, 'FLEX_END', {
    get: function() {
		return YGAlign.FlexEnd;
    },
    writable: false
});
Object.defineProperty(FlexLayout.AlignItems, 'CENTER', {
    get: function() {
		return YGAlign.Center;
    },
    writable: false
});
Object.defineProperty(FlexLayout.AlignItems, 'BASELINE', {
    get: function() {
		return YGAlign.Baseline;
    },
    writable: false
});
Object.defineProperty(FlexLayout.AlignItems, 'STRETCH', {
    get: function() {
		return YGAlign.Stretch;
    },
    writable: false
});
////////////////////////////////////////////////////////////////////////
const FlexLayout.FlexWrap = {};

Object.defineProperty(FlexLayout.FlexWrap, 'NOWRAP', {
    get: function() {
		return YGWrap.NoWrap;
    },
    writable: false
});
Object.defineProperty(FlexLayout.FlexWrap, 'WRAP', {
    get: function() {
		return YGWrap.Wrap;
    },
    writable: false
});
////////////////////////////////////////////////////////////////////////
const FlexLayout.AlignSelf = {};

Object.defineProperty(FlexLayout.AlignSelf, 'AUTO', {
    get: function() {
		return YGAlign.Auto;
    },
    writable: false
});
Object.defineProperty(FlexLayout.AlignSelf, 'FLEX_START', {
    get: function() {
		return YGAlign.FlexStart;
    },
    writable: false
});
Object.defineProperty(FlexLayout.AlignSelf, 'FLEX_END', {
    get: function() {
		return YGAlign.FlexEnd;
    },
    writable: false
});
Object.defineProperty(FlexLayout.AlignSelf, 'CENTER', {
    get: function() {
		return YGAlign.Center;
    },
    writable: false
});
Object.defineProperty(FlexLayout.AlignSelf, 'BASELINE', {
    get: function() {
		return YGAlign.Baseline;
    },
    writable: false
});
Object.defineProperty(FlexLayout.AlignSelf, 'STRETCH', {
    get: function() {
		return YGAlign.Stretch;
    },
    writable: false
});
////////////////////////////////////////////////////////////////////////

module.exports = FlexLayout;
