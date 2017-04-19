const FlexLayout            = require('../flexlayout');
const extend                = require('js-base/core/extend');
const AndroidUnitConverter  = require('sf-core/util/Android/unitconverter.js');
const NativeDrawerLayout    = requireClass('android.support.v4.widget.DrawerLayout');

const SliderDrawer = extend(FlexLayout)(
    function (_super, params) {
        _super(this);
        
        var drawerLayoutParams = new NativeDrawerLayout.LayoutParams (-1, -1);
        // Gravity.LEFT
        drawerLayoutParams.gravity = 3;
        
        var _position;
        var _onShow;
        var _onHide;
        var _onLoad;
        this.attachedPages = null;
        var _enabled = true;
        
        Object.defineProperties(this,{
            'drawerPosition' : {
                get: function(){
                    return _position;
                },
                set: function(position){
                    _position = position;
                    if(position === SliderDrawer.Position.RIGHT){
                        // Gravity.RIGHT
                        drawerLayoutParams.gravity = 5;
                    }
                    else{
                        // Gravity.LEFT
                        drawerLayoutParams.gravity = 3;
                    }
                    this.nativeObject.setLayoutParams (drawerLayoutParams);
                },
                enumerable: true
            },
            'enabled': {
                get: function(){
                    return _enabled;
                },
                set: function(enabled){
                    _enabled = enabled;
                    if(this.attachedPages){
                        this.attachedPages.setDrawerLocked(!enabled);
                    }
                },
                enumerable: true
            },
            'layout': {
                value: this,
                writable: false
            },
            'show': {
                value: function(){
                    if(this.attachedPages){
                        this.attachedPages.showSliderDrawer();
                    }
                },
                writable: false
            },
            'hide':{
                value: function(){
                    if(this.attachedPages){
                        this.attachedPages.hideSliderDrawer();
                    }
                },
                writable: false
            },
            'onShow': {
                get: function(){
                    return _onShow;
                },
                set: function(onShow){
                    if(onShow instanceof Function){
                        _onShow = onShow;
                    }
                },
                enumerable: true
            },
            'onHide': {
                get: function(){
                    return _onHide;
                },
                set: function(onHide){
                    if(onHide instanceof Function){
                        _onHide = onHide;
                    }
                },
                enumerable: true
            },
            'onLoad': {
                get: function(){
                    return _onLoad;
                },
                set: function(onLoad){
                    if(onLoad instanceof Function){
                        _onLoad = onLoad;
                    }
                },
                enumerable: true
            },
            // Added due to using DrawerLayout as a parent
            'height': {
                get: function() {
                    return AndroidUnitConverter.pixelToDp(drawerLayoutParams.height);
                },
                set: function(height) {
                    drawerLayoutParams.height = AndroidUnitConverter.dpToPixel(height);
                },
                enumerable: true,
                configurable: true
            },
            // Added due to using DrawerLayout as a parent
            'width': {
                get: function() {
                    return AndroidUnitConverter.pixelToDp(drawerLayoutParams.width);
                },
                set: function(width) {
                    drawerLayoutParams.width = AndroidUnitConverter.dpToPixel(width);
                },
                enumerable: true,
                configurable: true
            },
            'toString': {
                value: function(){
                    return 'SliderDrawer';
                },
                enumerable: true, 
                configurable: true
            }
        });
        
        this.drawerListener = NativeDrawerLayout.DrawerListener.implement({
            onDrawerClosed: function(drawerView){
                _onHide && _onHide();
            },
            'onDrawerOpened': function(drawerView){
                _onShow && _onShow();
            },
            'onDrawerSlide': function(drawerView, slideOffset){
                
            },
            'onDrawerStateChanged': function(newState){
                
            }
        });
        
        if(!this.isNotSetDefaults){
            // setting default values
            this.width = 200;
            this.nativeObject.setLayoutParams (drawerLayoutParams);
            this.nativeObject.setFitsSystemWindows(true);
        }
        
        
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

SliderDrawer.Position = {};
Object.defineProperties(SliderDrawer.Position,{ 
    'LEFT': {
        value: 0,
        writable: false
    },
    'RIGHT': {
        value: 1,
        writable: false
    }
});

module.exports = SliderDrawer;