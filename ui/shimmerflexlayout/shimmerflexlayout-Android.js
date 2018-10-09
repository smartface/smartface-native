const extend = require('js-base/core/extend');
const View = require("sf-core/ui/view");
const AndroidConfig = require("sf-core/util/Android/androidconfig");
const FlexLayout = require('sf-core/ui/flexlayout');
const Color = require('sf-core/ui/color');
const TypeUtil = require("../util/type");

const NativeShimmerFrameLayout = requireClass("com.facebook.shimmer.ShimmerFrameLayout");
const NativeShimmer = requireClass("com.facebook.shimmer.Shimmer");

const activity = AndroidConfig.activity;
const ShimmerFlexLayout = extend(View)(
    function(_super, params) {
        _super(this);

        this.nativeObject = new NativeShimmerFrameLayout(activity);

        var _layout = null;
        var _duration, _baseAlpha, _intensity, _repeatCount,
            _repeatDelay, _direction, _tilt, _highlightColor,
            _baseColor, _shimmerEnum, _shimmerBuilder, _highlightAlpha;
        this.android = {};
        Object.defineProperties(this.android, {
            'contentLayout': {
                get: function() {
                    return _layout;
                },
                set: function(layout) {
                    if (!layout instanceof FlexLayout)
                        return;
                    if (_layout !== null)
                        this.nativeObject.removeAllViews();
                    this.nativeObject.addView(_layout.nativeObject);
                },
                enumerable: true
            },
            'startShimmer': {
                value: function() {
                    this.nativeObject.startShimmer()
                },
                enumerable: true
            },
            'isShimmering': {
                get: function() {
                    return this.nativeObject.isShimmerStarted();
                },
                enumerable: true
            },
            'stopShimmer': {
                value: function() {
                    this.nativeObject.stopShimmer()
                },
                enumerable: true
            },
            'shimmer': {
                get: function() {
                    return _shimmerEnum;
                },
                set: function(shimmerEnum) {
                    _shimmerEnum = shimmerEnum;
                    _shimmerBuilder = shimmerBuilder(shimmerEnum);

                    this.duration && _shimmerBuilder.setDuration(this.duration); //long
                    this.baseAlpha && _shimmerBuilder.setBaseAlpha(this.baseAlpha); //float
                    this.intensity && _shimmerBuilder.setIntensity(this.intensity); //float
                    this.repeatCount && _shimmerBuilder.setRepeatCount(this.repeatCount); //int
                    this.repeatDelay && _shimmerBuilder.setRepeatDelay(this.repeatDelay); //long
                    this.direction && _shimmerBuilder.setDirection(this.direction); //ENUM int
                    this.tilt && _shimmerBuilder.setTilt(this.tilt); //float
                    if (shimmerEnum === ShimmerFlexLayout.Android.Shimmer.ColorHighlight) {
                        this.highlightColor && _shimmerBuilder.setHighlightColor(this.highlightColor.nativeObject); //Color int
                        this.baseColor && _shimmerBuilder.setBaseColor(this.baseColor.nativeObject); //Color int
                        this.highlightAlpha && _shimmerBuilder.setHighlightAlpha(this.highlightAlpha); //float
                    }
                    this.nativeObject.setShimmer(_shimmerBuilder.build());
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
            'repeatDelay': {
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
            'direction': {
                get: function() {
                    return _direction;
                },
                set: function(direction) {
                    if (!typeof direction === 'enum')
                        return;
                    _direction = direction;
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
        
        /*
        Defaults;
        autoStart
        */

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
    });

ShimmerFlexLayout.Android = {};
ShimmerFlexLayout.Android.Shimmer = {
    AlphaHighlight: 0,
    ColorHighlight: 1
};
Object.freeze(ShimmerFlexLayout.Android.Shimmer);

ShimmerFlexLayout.Android.ShimmerDirection = {
    BOTTOM_TO_TOP: 3,
    LEFT_TO_RIGHT: 0,
    RIGHT_TO_LEFT: 2,
    TOP_TO_BOTTOM: 1
};
Object.freeze(ShimmerFlexLayout.Android.ShimmerDirection);

module.exports = ShimmerFlexLayout;
