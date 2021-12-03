const View = require("../../ui/view");

BlurView.Events = { ...View.Events };

BlurView.prototype = Object.create(View.prototype);
function BlurView(params) {
    var self = this;
    if (!this.nativeObject) {
        this.nativeObject = new __SF_SMFVisualEffectView(1);
        this.nativeObject.setBlurStyle(1);
    }

    View.call(this);

    let _effectStyle = 1;
    Object.defineProperty(self.ios, 'effectStyle', {
        get: function () {
            return _effectStyle;
        },
        set: function (value) {
            _effectStyle = value;
            self.nativeObject.setBlurStyle(_effectStyle);
        },
        enumerable: true
    });

    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

const iOS = {};
iOS.EffectStyle = {
    EXTRALIGHT: 0,
    LIGHT: 1,
    DARK: 2,
    REGULAR: 4,
    PROMINENT: 5,
    SYSTEMULTRATHINMATERIAL: 6,
    SYSTEMTHINMATERIAL: 7,
    SYSTEMMATERIAL: 8,
    SYSTEMTHICKMATERIAL: 9,
    SYSTEMCHROMEMATERIAL: 10,
    SYSTEMULTRATHINMATERIALLIGHT: 11,
    SYSTEMTHINMATERIALLIGHT: 12,
    SYSTEMMATERIALLIGHT: 13,
    SYSTEMTHICKMATERIALLIGHT: 14,
    SYSTEMCHROMEMATERIALLIGHT: 15,
    SYSTEMULTRATHINMATERIALDARK: 16,
    SYSTEMTHINMATERIALDARK: 17,
    SYSTEMMATERIALDARK: 18,
    SYSTEMTHICKMATERIALDARK: 19,
    SYSTEMCHROMEMATERIALDARK: 20
};

Object.defineProperty(BlurView, 'iOS', {
    value: iOS,
    writable: false,
    enumerable: true
});

module.exports = BlurView;