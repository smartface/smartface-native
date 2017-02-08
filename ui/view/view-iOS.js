const TypeUtil = require("nf-core/util/type");

function View(params) {
    
    var self = this;

    self.uniqueId = guid();
    
    if(!self.nativeObject){
        self.nativeObject = new SMFUIView();
    }

    // Defaults
    self.nativeObject.yoga.isEnabled = true;
     
    Object.defineProperty(self, 'borderColor', {
        get: function() {
            return  self.nativeObject.layer.borderUIColor;
        },
        set: function(value) {
            self.nativeObject.layer.borderUIColor = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'alpha', {
        get: function() {
            return self.nativeObject.alpha;
        },
        set: function(value) {
            self.nativeObject.alpha = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'borderRadius', {
        get: function() {
            return self.nativeObject.layer.cornerRadius;
        },
        set: function(value) {
            self.nativeObject.layer.cornerRadius = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'backgroundColor', {
        get: function() {
            return self.nativeObject.backgroundColor;
        },
        set: function(value) {
            if (value.constructor.name == "CAGradientLayer"){
                self.applyLayout();
                value.frame = self.nativeObject.frame;
                self.nativeObject.backgroundColor = value.layerToColor();
            }else{
                self.nativeObject.backgroundColor = value;
            }
        },
        enumerable: true,
        configurable: true
    });


    Object.defineProperty(self, 'id', {
        get: function() {
            return self.nativeObject.tag;
        },
        set: function(value) {
            self.nativeObject.tag = value;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'visible', {
        get: function() {
            return self.nativeObject.visible;
        },
        set: function(value) {
            self.nativeObject.visible = value;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'touchEnabled', {
        get: function() {
            return self.nativeObject.touchEnabled;
        },
        set: function(value) {
            self.nativeObject.touchEnabled = value;
        },
        enumerable: true
    });
    

    this.getPosition = function(){
        return {left : self.left , top : self.top , width : self.width, height : self.height};
    }

    this.setPosition = function(position){
        self.left = position.left;
        self.top = position.top;
        self.width = position.width;
        self.height = position.height;
    }
    
    this.bringToFront = function(){
        var parent = self.getParent();
        if (parent) {
            parent.nativeObject.bringSubviewToFront(self.nativeObject);
        }
    };
    
    this.getParent = function(){
        return self.parent ? self.parent : null;
    };

    Object.defineProperty(self, 'onTouch', {
        get: function() {
            return self.nativeObject.onTouch;
        },
        set: function(value) {
            self.nativeObject.onTouch = value;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'onTouchEnded', {
        get: function() {
            return self.nativeObject.onTouchEnded;
        },
        set: function(value) {
            self.nativeObject.onTouchEnded = value;
        },
        enumerable: true
    });
        
    function guid() {
          function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
          }
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };

    //////////////////////////////////////////////////////////////////////////
    // YOGA STUFF START
    //////////////////////////////////////////////////////////////////////////

    /*
     The property that decides if we should include this view when calculating layout. Defaults to YES.
     */
    Object.defineProperty(self, 'isIncludedInLayout', {
        get: function() {
            return self.nativeObject.yoga.isIncludedInLayout;
        },
        set: function(value) {
            self.nativeObject.yoga.isIncludedInLayout = value;
        },
        enumerable: true
    });
    
    /*
     The property that decides during layout/sizing whether or not styling properties should be applied. Defaults to NO.
     */
    Object.defineProperty(self, 'flexEnabled', {
        get: function() {
            return self.nativeObject.yoga.isEnabled;
        },
        set: function(value) {
            self.nativeObject.yoga.isEnabled = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'direction', {
        get: function() {
            return self.nativeObject.yoga.direction;
        },
        set: function(value) {
            self.nativeObject.yoga.direction = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'flexDirection', {
        get: function() {
            return self.nativeObject.yoga.flexDirection;
        },
        set: function(value) {
            self.nativeObject.yoga.flexDirection = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'justifyContent', {
        get: function() {
            return self.nativeObject.yoga.justifyContent;
        },
        set: function(value) {
            self.nativeObject.yoga.justifyContent = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'alignContent', {
        get: function() {
            return self.nativeObject.yoga.alignContent;
        },
        set: function(value) {
            self.nativeObject.yoga.alignContent = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'alignItems', {
        get: function() {
            return self.nativeObject.yoga.alignItems;
        },
        set: function(value) {
            self.nativeObject.yoga.alignItems = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'alignSelf', {
        get: function() {
            return self.nativeObject.yoga.alignSelf;
        },
        set: function(value) {
            self.nativeObject.yoga.alignSelf = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'position', {
        get: function() {
            return self.nativeObject.yoga.position;
        },
        set: function(value) {
            self.nativeObject.yoga.position = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'flexWrap', {
        get: function() {
            return self.nativeObject.yoga.flexWrap;
        },
        set: function(value) {
            self.nativeObject.yoga.flexWrap = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'overflow', {
        get: function() {
            return self.nativeObject.yoga.overflow;
        },
        set: function(value) {
            self.nativeObject.yoga.overflow = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'flexGrow', {
        get: function() {
            return self.nativeObject.yoga.flexGrow;
        },
        set: function(value) {
            self.nativeObject.yoga.flexGrow = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'flexShrink', {
        get: function() {
            return self.nativeObject.yoga.flexShrink;
        },
        set: function(value) {
            self.nativeObject.yoga.flexShrink = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'flexBasis', {
        get: function() {
            return self.nativeObject.yoga.flexBasis;
        },
        set: function(value) {
            self.nativeObject.yoga.flexBasis = value;
        },
        enumerable: true
    });
    
    /*
    // Left and Top can delete or added after tests
    */

    Object.defineProperty(self, 'left', {
        get: function() {
            return self.nativeObject.yoga.left;
        },
        set: function(value) {
            self.nativeObject.yoga.left = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'top', {
        get: function() {
            return self.nativeObject.yoga.top;
        },
        set: function(value) {
            self.nativeObject.yoga.top = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'right', {
        get: function() {
            return self.nativeObject.yoga.right;
        },
        set: function(value) {
            self.nativeObject.yoga.right = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'bottom', {
        get: function() {
            return self.nativeObject.yoga.bottom;
        },
        set: function(value) {
            self.nativeObject.yoga.bottom = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'start', {
        get: function() {
            return self.nativeObject.yoga.start;
        },
        set: function(value) {
            self.nativeObject.yoga.start = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'end', {
        get: function() {
            return self.nativeObject.yoga.end;
        },
        set: function(value) {
            self.nativeObject.yoga.end = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'marginLeft', {
        get: function() {
            return self.nativeObject.yoga.marginLeft;
        },
        set: function(value) {
            self.nativeObject.yoga.marginLeft = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'marginTop', {
        get: function() {
            return self.nativeObject.yoga.marginTop;
        },
        set: function(value) {
            self.nativeObject.yoga.marginTop = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'marginRight', {
        get: function() {
            return self.nativeObject.yoga.marginRight;
        },
        set: function(value) {
            self.nativeObject.yoga.marginRight = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'marginBottom', {
        get: function() {
            return self.nativeObject.yoga.marginBottom;
        },
        set: function(value) {
            self.nativeObject.yoga.marginBottom = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'marginStart', {
        get: function() {
            return self.nativeObject.yoga.marginStart;
        },
        set: function(value) {
            self.nativeObject.yoga.marginStart = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'marginEnd', {
        get: function() {
            return self.nativeObject.yoga.marginEnd;
        },
        set: function(value) {
            self.nativeObject.yoga.marginEnd = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'marginHorizontal', {
        get: function() {
            return self.nativeObject.yoga.marginHorizontal;
        },
        set: function(value) {
            self.nativeObject.yoga.marginHorizontal = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'marginVertical', {
        get: function() {
            return self.nativeObject.yoga.marginVertical;
        },
        set: function(value) {
            self.nativeObject.yoga.marginVertical = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'margin', {
        get: function() {
            return self.nativeObject.yoga.margin;
        },
        set: function(value) {
            self.nativeObject.yoga.margin = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'paddingLeft', {
        get: function() {
            return self.nativeObject.yoga.paddingLeft;
        },
        set: function(value) {
            self.nativeObject.yoga.paddingLeft = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'paddingTop', {
        get: function() {
            return self.nativeObject.yoga.paddingTop;
        },
        set: function(value) {
            self.nativeObject.yoga.paddingTop = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'paddingRight', {
        get: function() {
            return self.nativeObject.yoga.paddingRight;
        },
        set: function(value) {
            self.nativeObject.yoga.paddingRight = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'paddingBottom', {
        get: function() {
            return self.nativeObject.yoga.paddingBottom;
        },
        set: function(value) {
            self.nativeObject.yoga.paddingBottom = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'paddingStart', {
        get: function() {
            return self.nativeObject.yoga.paddingStart;
        },
        set: function(value) {
            self.nativeObject.yoga.paddingStart = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'paddingEnd', {
        get: function() {
            return self.nativeObject.yoga.paddingEnd;
        },
        set: function(value) {
            self.nativeObject.yoga.paddingEnd = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'paddingHorizontal', {
        get: function() {
            return self.nativeObject.yoga.paddingHorizontal;
        },
        set: function(value) {
            self.nativeObject.yoga.paddingHorizontal = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'paddingVertical', {
        get: function() {
            return self.nativeObject.yoga.paddingVertical;
        },
        set: function(value) {
            self.nativeObject.yoga.paddingVertical = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'padding', {
        get: function() {
            return self.nativeObject.yoga.padding;
        },
        set: function(value) {
            self.nativeObject.yoga.padding = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'borderLeftWidth', {
        get: function() {
            return self.nativeObject.yoga.borderLeftWidth;
        },
        set: function(value) {
            self.nativeObject.yoga.borderLeftWidth = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'borderTopWidth', {
        get: function() {
            return self.nativeObject.yoga.borderTopWidth;
        },
        set: function(value) {
            self.nativeObject.yoga.borderTopWidth = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'borderRightWidth', {
        get: function() {
            return self.nativeObject.yoga.borderRightWidth;
        },
        set: function(value) {
            self.nativeObject.yoga.borderRightWidth = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'borderBottomWidth', {
        get: function() {
            return self.nativeObject.yoga.borderBottomWidth;
        },
        set: function(value) {
            self.nativeObject.yoga.borderBottomWidth = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'borderStartWidth', {
        get: function() {
            return self.nativeObject.yoga.borderStartWidth;
        },
        set: function(value) {
            self.nativeObject.yoga.borderStartWidth = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'borderEndWidth', {
        get: function() {
            return self.nativeObject.yoga.borderEndWidth;
        },
        set: function(value) {
            self.nativeObject.yoga.borderEndWidth = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'borderWidth', {
        get: function() {
            return self.nativeObject.yoga.borderWidth;
        },
        set: function(value) {
            // Native object's layer must be updated!
            // Yoga's borderWidth property only effects positioning of its child view.
            self.nativeObject.layer.borderWidth = value;
            self.nativeObject.yoga.borderWidth = value;
        },
        enumerable: true
    });
    
    /*
    // Width and Height can delete or added after tests
    */

    Object.defineProperty(self, 'width', {
        get: function() {
            return self.nativeObject.yoga.width;
        },
        set: function(value) {
            self.nativeObject.yoga.width = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'height', {
        get: function() {
            return self.nativeObject.yoga.height;
        },
        set: function(value) {
            self.nativeObject.yoga.height = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'minWidth', {
        get: function() {
            return self.nativeObject.yoga.minWidth;
        },
        set: function(value) {
            self.nativeObject.yoga.minWidth = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'minHeight', {
        get: function() {
            return self.nativeObject.yoga.minHeight;
        },
        set: function(value) {
            self.nativeObject.yoga.minHeight = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'maxWidth', {
        get: function() {
            return self.nativeObject.yoga.maxWidth;
        },
        set: function(value) {
            self.nativeObject.yoga.maxWidth = value;
        },
        enumerable: true
    });
    
    Object.defineProperty(self, 'maxHeight', {
        get: function() {
            return self.nativeObject.yoga.maxHeight;
        },
        set: function(value) {
            self.nativeObject.yoga.maxHeight = value;
        },
        enumerable: true
    });
    
    // Yoga specific properties, not compatible with flexbox specification
    Object.defineProperty(self, 'aspectRatio', {
        get: function() {
            return self.nativeObject.yoga.aspectRatio;
        },
        set: function(value) {
            self.nativeObject.yoga.aspectRatio = value;
        },
        enumerable: true
    });
    
    /*
     Get the resolved direction of this node. This won't be YGDirectionInherit
     */
    Object.defineProperty(self, 'resolvedDirection', {
        get: function() {
            return self.nativeObject.yoga.resolvedDirection;
        },
        enumerable: true
    });
    
    /*
     Perform a layout calculation and update the frames of the views in the hierarchy with the results
     */
    this.applyLayout = function(){
        self.nativeObject.yoga.applyLayout();
    }
    
    /*
     Returns the size of the view if no constraints were given. This could equivalent to calling [self sizeThatFits:CGSizeMake(CGFLOAT_MAX, CGFLOAT_MAX)];
     */
    Object.defineProperty(self, 'intrinsicSize', {
        get: function() {
            return self.nativeObject.yoga.intrinsicSize;
        },
        enumerable: true
    });
    
    /*
     Returns the number of children that are using Flexbox.
     */
    Object.defineProperty(self, 'numberOfChildren', {
        get: function() {
            return self.nativeObject.yoga.numberOfChildren;
        },
        enumerable: true
    });
    
    /*
     Return a BOOL indiciating whether or not we this node contains any subviews that are included in Yoga's layout.
     */
    Object.defineProperty(self, 'isLeaf', {
        get: function() {
            return self.nativeObject.yoga.isLeaf;
        },
        enumerable: true
    });
    
    /*
     Mark that a view's layout needs to be recalculated. Only works for leaf views.
     */
    this.dirty = function(){
        self.nativeObject.yoga.markDirty();
    }
    
    //////////////////////////////////////////////////////////////////////////
    // YOGA STUFF END
    //////////////////////////////////////////////////////////////////////////
    
     if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
    
}

module.exports = View;