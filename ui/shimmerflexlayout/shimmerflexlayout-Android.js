const extend = require('js-base/core/extend');
const View = require("sf-core/ui/view");
const AndroidConfig = require("sf-core/util/Android/androidconfig");
const FlexLayout = require('sf-core/ui/flexlayout');
const Color = require('sf-core/ui/color');
const TypeUtil = require("sf-core/util/type");

const NativeShimmerFrameLayout = requireClass("com.facebook.shimmer.ShimmerFrameLayout");
const NativeShimmer = requireClass("com.facebook.shimmer.Shimmer");

const activity = AndroidConfig.activity;
const ShimmerFlexLayout = extend(View)(
    function(_super, params) {
        _super(this);
        const self = this;

        this.nativeObject = new NativeShimmerFrameLayout(activity);

        var _layout = new FlexLayout();
        this.nativeObject.addView(_layout.nativeObject);

        var _baseAlpha, _direction, _repeatDelay, _contentLayout = null;
        Object.defineProperties(this, {
            'contentLayout': {
                get: function() {
                    return _contentLayout;
                },
                set: function(contentLayout) {
                    if (!contentLayout instanceof FlexLayout)
                        return;

                    if (_contentLayout !== null)
                        _layout.removeAll();

                    _contentLayout = contentLayout;
                    _layout.addChild(contentLayout);
                },
                enumerable: true
            },
            'startShimmering': {
                value: function() {
                    this.nativeObject.startShimmer();
                },
                enumerable: true
            },
            'isShimmering': {
                get: function() {
                    return this.nativeObject.isShimmerStarted();
                },
                enumerable: true
            },
            'stopShimmering': {
                value: function() {
                    this.nativeObject.stopShimmer();
                },
                enumerable: true
            },
            'baseAlpha': {
                get: function() {
                    return _baseAlpha;
                },
                set: function(baseAlpha) {
                    if (!TypeUtil.isNumeric(baseAlpha))
                        return;
                    _baseAlpha = baseAlpha;
                },
                enumerable: true
            },
            'pauseDuration': {
                get: function() {
                    return _repeatDelay;
                },
                set: function(repeatDelay) {
                    if (!TypeUtil.isNumeric(repeatDelay))
                        return;
                    _repeatDelay = repeatDelay;
                },
                enumerable: true
            },
            'shimmeringDirection': {
                get: function() {
                    return _direction;
                },
                set: function(direction) {
                    if (!typeof direction === 'enum')
                        return;
                    _direction = direction;
                },
                enumerable: true
            }
        });

        var _duration, _intensity, _repeatCount, _tilt, _highlightColor,
            _baseColor, _shimmerBuilder, _highlightAlpha;
        this.android = {};
        Object.defineProperties(this.android, {
            'build': {
                value: function(shimmerEnum) {
                    _shimmerBuilder = shimmerBuilder(shimmerEnum);

                    // //default
                    _shimmerBuilder.setAutoStart(false);

                    _duration && _shimmerBuilder.setDuration(_duration); //long
                    _intensity && _shimmerBuilder.setIntensity(_intensity); //float
                    _repeatCount && _shimmerBuilder.setRepeatCount(_repeatCount); //int
                    _repeatDelay && _shimmerBuilder.setRepeatDelay(_repeatDelay); //long
                    _direction && _shimmerBuilder.setDirection(_direction); //ENUM int
                    _tilt && _shimmerBuilder.setTilt(_tilt); //float
                    if (shimmerEnum === ShimmerFlexLayout.Android.Shimmer.ColorHighlight) {
                        _highlightColor && _shimmerBuilder.setHighlightColor(_highlightColor.nativeObject); //Color int
                        _baseColor && _shimmerBuilder.setBaseColor(_baseColor.nativeObject); //Color int
                    }
                    _highlightAlpha && _shimmerBuilder.setHighlightAlpha(_highlightAlpha); //float
                    _baseAlpha && _shimmerBuilder.setBaseAlpha(_baseAlpha); //float

                    self.nativeObject.setShimmer(_shimmerBuilder.build());
                },
                enumerable: true
            },
            'duration': {
                get: function() {
                    return _duration;
                },
                set: function(duration) {
                    if (!TypeUtil.isNumeric(duration))
                        return;
                    _duration = duration;
                },
                enumerable: true
            },
            'intensity': {
                get: function() {
                    return _intensity;
                },
                set: function(intensity) {
                    if (!TypeUtil.isNumeric(intensity))
                        return;
                    _intensity = intensity;
                },
                enumerable: true
            },
            'repeatCount': {
                get: function() {
                    return _repeatCount;
                },
                set: function(repeatCount) {
                    if (!TypeUtil.isNumeric(repeatCount))
                        return;
                    _repeatCount = repeatCount;
                },
                enumerable: true
            },
            'tilt': {
                get: function() {
                    return _tilt;
                },
                set: function(tilt) {
                    if (!TypeUtil.isNumeric(tilt))
                        return;
                    _tilt = tilt;
                },
                enumerable: true
            },
            'highlightColor': {
                get: function() {
                    return _highlightColor;
                },
                set: function(highlightColor) {
                    if (!highlightColor instanceof Color)
                        return;
                    _highlightColor = highlightColor;
                },
                enumerable: true
            },
            'baseColor': {
                get: function() {
                    return _baseColor;
                },
                set: function(baseColor) {
                    if (!baseColor instanceof Color)
                        return;
                    _baseColor = baseColor;
                },
                enumerable: true
            },
            'highlightAlpha': {
                get: function() {
                    return _highlightAlpha;
                },
                set: function(highlightAlpha) {
                    if (!TypeUtil.isNumeric(highlightAlpha))
                        return;
                    _highlightAlpha = highlightAlpha;
                },
                enumerable: true
            }
        });


        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }

        //Defaults;
        this.baseAlpha = 1;
        this.pauseDuration = 0.4 * 1000;

        function shimmerBuilder(shimmerEnum) {
            switch (shimmerEnum) {
                case ShimmerFlexLayout.Android.Shimmer.AlphaHighlight:
                    return new NativeShimmer.AlphaHighlightBuilder();

                case ShimmerFlexLayout.Android.Shimmer.ColorHighlight:
                    return new NativeShimmer.ColorHighlightBuilder();

                default:
                    return new NativeShimmer.AlphaHighlightBuilder();
            }
        };

        this.ios = {};
    });

ShimmerFlexLayout.Android = {};
ShimmerFlexLayout.Android.Shimmer = {
    AlphaHighlight: 0,
    ColorHighlight: 1
};
Object.freeze(ShimmerFlexLayout.Android.Shimmer);

ShimmerFlexLayout.ShimmeringDirection = {
    UP: 3,
    RIGHT: 0,
    DOWN: 2,
    BOTTOM: 1
};
Object.freeze(ShimmerFlexLayout.ShimmeringDirection);

module.exports = ShimmerFlexLayout;
