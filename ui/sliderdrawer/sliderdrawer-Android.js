/*globals requireClass*/
const FlexLayout = require('../flexlayout');

const Application = require('../../application');
const AndroidUnitConverter = require('../../util/Android/unitconverter.js');
const NativeDrawerLayout = requireClass('androidx.drawerlayout.widget.DrawerLayout');

// const SliderDrawer = extend(FlexLayout)(
SliderDrawer.prototype = Object.create(FlexLayout.prototype);
function SliderDrawer(params) {
    FlexLayout.apply(this);

    var drawerLayoutParams = new NativeDrawerLayout.LayoutParams(-1, -1);
    // Gravity.LEFT
    drawerLayoutParams.gravity = 3;

    var _position;
    var _onShow;
    var _onHide;
    var _onLoad;
    this.__isAttached = false;
    var _enabled = true;
    var _state = SliderDrawer.State.CLOSED;

    Object.defineProperties(this, {
        'state': {
            get: function() {
                return _state;
            },
            enumerable: true
        },
        'drawerPosition': {
            get: function() {
                return _position;
            },
            set: function(position) {
                _position = position;
                if (position === SliderDrawer.Position.RIGHT) {
                    // Gravity.RIGHT
                    drawerLayoutParams.gravity = 5;
                } else {
                    // Gravity.LEFT
                    drawerLayoutParams.gravity = 3;
                }
                this.nativeObject.setLayoutParams(drawerLayoutParams);
            },
            enumerable: true
        },
        'enabled': {
            get: function() {
                return _enabled;
            },
            set: function(value) {
                _enabled = value;

                if (!this.__isAttached) return;

                if (_enabled) {
                    // DrawerLayout.LOCK_MODE_UNLOCKED
                    Application.__mDrawerLayout.setDrawerLockMode(0);
                } else {
                    // DrawerLayout.LOCK_MODE_LOCKED_CLOSED
                    Application.__mDrawerLayout.setDrawerLockMode(1);
                    (this.state === SliderDrawer.State.OPEN) && (this.__hideSliderDrawer());
                }
            },
            enumerable: true,
            configurable: true
        },
        'layout': {
            value: this,
            writable: false
        },
        'show': {
            value: function() {
                if (!this.__isAttached) return;
                this.__showSliderDrawer();
            },
            writable: false
        },
        'hide': {
            value: function() {
                if (!this.__isAttached) return;
                this.__hideSliderDrawer();
            },
            writable: false
        },
        'onShow': {
            get: function() {
                return _onShow;
            },
            set: function(onShow) {
                if (onShow instanceof Function) {
                    _onShow = onShow;
                }
            },
            enumerable: true
        },
        'onHide': {
            get: function() {
                return _onHide;
            },
            set: function(onHide) {
                if (onHide instanceof Function) {
                    _onHide = onHide;
                }
            },
            enumerable: true
        },
        'onLoad': {
            get: function() {
                return _onLoad;
            },
            set: function(onLoad) {
                if (onLoad instanceof Function) {
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
            value: function() {
                return 'SliderDrawer';
            },
            enumerable: true,
            configurable: true
        }
    });

    this.drawerListener = NativeDrawerLayout.DrawerListener.implement({
        onDrawerClosed: function(drawerView) {
            _onHide && _onHide();
            _state = SliderDrawer.State.CLOSED;
        },
        'onDrawerOpened': function(drawerView) {
            _onShow && _onShow();
            _state = SliderDrawer.State.OPEN;
        },
        'onDrawerSlide': function(drawerView, slideOffset) {

        },
        'onDrawerStateChanged': function(newState) {
            if (newState === 1) { // STATE_DRAGGING
                _state = SliderDrawer.State.DRAGGED;
            }
        }
    });

    // setting default values
    this.width = 200;
    this.nativeObject.setLayoutParams(drawerLayoutParams);
    this.nativeObject.setFitsSystemWindows(true);


    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}
SliderDrawer.prototype.__showSliderDrawer = function() {
    if (this.enabled) {
        if (this.drawerPosition === SliderDrawer.Position.RIGHT) {
            // Gravity.RIGHT 
            Application.__mDrawerLayout.openDrawer(5);
        } else {
            // Gravity.LEFT
            Application.__mDrawerLayout.openDrawer(3);
        }
    }
};

SliderDrawer.prototype.__hideSliderDrawer = function() {
    if (this.drawerPosition === SliderDrawer.Position.RIGHT) {
        // Gravity.RIGHT
        Application.__mDrawerLayout.closeDrawer(5);
    } else {
        // Gravity.LEFT
        Application.__mDrawerLayout.closeDrawer(3);
    }
};

SliderDrawer.Position = {};
Object.defineProperties(SliderDrawer.Position, {
    'LEFT': {
        value: 0,
        writable: false
    },
    'RIGHT': {
        value: 1,
        writable: false
    }
});

SliderDrawer.State = require("./sliderdrawer-state");

module.exports = SliderDrawer;