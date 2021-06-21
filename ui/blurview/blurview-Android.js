const RenderScriptBlur = requireClass("eightbitlab.com.blurview.RenderScriptBlur");
const NativeBlurView = requireClass("eightbitlab.com.blurview.BlurView");

const AndroidConfig = require("../../util/Android/androidconfig");
const View = require("../../ui/view");

BlurView.prototype = Object.create(View.prototype);
BlurView.iOS = {};
BlurView.iOS.EffectStyle = {};

function BlurView(params) {
    var self = this;
    if (!this.nativeObject) {
        this.nativeObject = new NativeBlurView(AndroidConfig.activity);
    }

    View.call(this);

    let blurRender = new RenderScriptBlur(AndroidConfig.activity);

    // BlurController.DEFAULT_BLUR_RADIUS
    let _overlayColor, _rootView, 
        _blurRadius = 16;
    Object.defineProperties(self.android, {
        'overlayColor': {
            get: function() {
                return _overlayColor;
            },
            set: function(color) {
                _overlayColor = color;
                self.__refreshBlurView();
            },
            enumerable: true
        },
        'rootView': {
            get: function() {
                return _rootView;
            },
            set: function(view) {
                _rootView = view;
                self.__refreshBlurView();
            },
            enumerable: true
        },
        'blurRadius': {
            get: function() {
                return _blurRadius;
            },
            set: function(radius) {
                // maximum radius value is 25.
                // If you give a larger number than 25, the app will crash.
                if(radius < 0 || radius > 25) {
                    return;
                }

                _blurRadius = radius;
                self.__refreshBlurView();
            },
            enumerable: true
        }
    });

    this.__refreshBlurView = () => {
        if(!_rootView) {
            return;
        }
        let blurViewFacade = self.nativeObject.setupWith(_rootView.nativeObject).setBlurAlgorithm(blurRender);
        blurViewFacade.setBlurRadius(_blurRadius);

        if(_overlayColor) {
            blurViewFacade.setOverlayColor(_overlayColor.nativeObject);
        }
    };

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = BlurView;