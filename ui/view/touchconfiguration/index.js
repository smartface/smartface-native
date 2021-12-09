/* globals __SF_CALayer, __SF_CABasicAnimation, __SF_CATransaction, __SF_SMFCAAnimationDelegate */

const System = require("../../../device/system");
const Color = require("../../color");

const DEFAULT_GREY = "#d8d8d8";

const DEFAULTS = Object.freeze({
    darkenAmount: 22.74,
    androidAnimationDuration: 100,
    fps: 60,
    elevationChange: 14,
    androidTouchDelay: 0,
    fadeDuration: 200,
    fadeMaxOpacity: 0.3,
    rippleColor: Color.create(DEFAULT_GREY),
    fadeColor: Color.create(DEFAULT_GREY),
});

const DEFAULT_TOUCH_EFFECT = Object.freeze({
    startTouchEffect: () => { },
    endTouchEffect: () => { },
    consumeTouch: false,
    disableRippleEffect: false,
    touchDelay: 0,
    rippleUseBackground: false,
    rippleColor: DEFAULTS.rippleColor,
    fadeColor: DEFAULTS.fadeColor,
    fadeDuration: DEFAULTS.fadeDuration,
    fadeMaxOpacity: DEFAULTS.fadeMaxOpacity,
});
const CurrentDefault = Object.assign({}, DEFAULTS);

function addPressEvent(
    target,
    event,
    options
) {
    const defaultTouchEffectCopy = Object.assign({}, DEFAULT_TOUCH_EFFECT);
    const currentOptions = Object.assign(
        {},
        defaultTouchEffectCopy,
        options || {}
    );

    currentOptions.startTouchEffect = defaultAddPressEffect.bind(target);
    currentOptions.endTouchEffect = defaultClearPressEffect.bind(target);
    if (!currentOptions.disableRippleEffect) {
        applyRippleEffect.call(
            target,
            !currentOptions.rippleUseBackground,
            currentOptions.rippleColor
        );
    }
    target.__fadeDuration__ = (currentOptions.fadeDuration || 0) / 1000;
    target.__fadeMaxOpacity = currentOptions.fadeMaxOpacity;
    target.__fadeEffectColor__ = currentOptions.fadeColor;

    let touchStarted = false;

    if (System.OS === System.OSType.IOS) {
        target.nativeObject.setValueForKey(true, "exclusiveTouch");
    }

    function startTouch() {
        currentOptions.startTouchEffect();
        touchStarted = true;
    }

    function endTouch(triggerPress = false) {
        currentOptions.endTouchEffect();
        triggerPress && touchStarted && event.call(target);
        touchStarted = false;
    }
    const handleTouch = () => !currentOptions.consumeTouch;

    target.onTouch = () => {
        startTouch();
        return handleTouch();
    };

    target.onTouchCancelled = () => {
        endTouch(false);
        return handleTouch();
    };

    target.onTouchMoved = (isInside) => {
        !isInside && endTouch(false);
        return handleTouch();
    };

    let timeOut;
    target.onTouchEnded = (isInside) => {
        if (System.OS === System.OSType.ANDROID && currentOptions.touchDelay > 0) {
            clearTimeout(timeOut);
            timeOut = setTimeout(() => {
                endTouch(isInside);
            }, currentOptions.touchDelay);
        } else {
            endTouch(isInside);
        }
        return handleTouch();
    };
}

function defaultAddPressEffect() {
    const TICKS = 1000 / CurrentDefault.fps;
    const ELEVATION_CHANGE_PER_FRAME =
        CurrentDefault.elevationChange / (CurrentDefault.androidAnimationDuration / TICKS);
    if (System.OS === System.OSType.ANDROID) {
        this.__pressEffectAnimating__ = "addPress";
        if (
            !this.__pressEffectOriginalZIndex__ &&
            this.__pressEffectOriginalZIndex__ !== 0
        )
            this.__pressEffectOriginalZIndex__ = this.android.zIndex;
        let maxZIndex =
            this.__pressEffectOriginalZIndex__ + CurrentDefault.elevationChange;
        if (CurrentDefault.elevationChange !== 0) {
            let animationInterval = setInterval(() => {
                if (this.__pressEffectAnimating__ !== "addPress") {
                    clearInterval(animationInterval);
                }
                let newZIndex = Math.min(
                    this.android.zIndex + ELEVATION_CHANGE_PER_FRAME,
                    maxZIndex
                );
                if (newZIndex === maxZIndex) {
                    clearInterval(animationInterval);
                    this.__pressEffectAnimating__ = null;
                }
                this.android.zIndex = newZIndex;
            }, TICKS);
        }
    } else if (this.backgroundColor || this.__fadeEffectColor__) {
        if (!this.__pressEffectGeneratedColor__) {
            if (this.__fadeEffectColor__) {
                this.__pressEffectGeneratedColor__ = this.__fadeEffectColor__;
            } else {
                throw new Error('__pressEffectGeneratedColor__ couldnt generated')
            }

            var layer = new __SF_CALayer();
            layer.frame = this.nativeObject.bounds;
            layer.backgroundCGColor =
                this.__pressEffectGeneratedColor__.nativeObject;
            this.__pressEffectLayer__ = layer;
        }

        if (!this.__isPressEffetLayerActive__) {
            this.__isPressEffetLayerActive__ = true;
            this.nativeObject.layer.addSublayer(this.__pressEffectLayer__);
        }

        var animation = __SF_CABasicAnimation.animationWithKeyPath("opacity");
        var currentOpacity = 0;
        if (this.__pressEffectLayer__.getPresentationLayer()) {
            currentOpacity = this.__pressEffectLayer__.getPresentationLayer().opacity;
        }
        animation.fromValue = currentOpacity;
        animation.toValue = this.__fadeMaxOpacity;
        animation.duration =
            ((this.__fadeMaxOpacity - currentOpacity) * this.__fadeDuration__) /
            this.__fadeMaxOpacity;
        __SF_CATransaction.begin();
        __SF_CATransaction.setDisableActions(true);
        this.__pressEffectLayer__.opacity = this.__fadeMaxOpacity;
        __SF_CATransaction.commit();
        this.__pressEffectLayer__.addAnimationForKey(animation, "opacity");
    }
}

function defaultClearPressEffect() {
    const TICKS = 1000 / CurrentDefault.fps;
    const ELEVATION_CHANGE_PER_FRAME =
        CurrentDefault.elevationChange / (CurrentDefault.androidAnimationDuration / TICKS);
    if (
        System.OS === System.OSType.ANDROID &&
        (this.__pressEffectOriginalZIndex__ ||
            this.__pressEffectOriginalZIndex__ === 0)
    ) {
        this.__pressEffectAnimating__ = "removePress";
        if (CurrentDefault.elevationChange !== 0) {
            let animationInterval = setInterval(() => {
                if (this.__pressEffectAnimating__ !== "removePress") {
                    clearInterval(animationInterval);
                }
                let newZIndex = Math.max(
                    this.android.zIndex - ELEVATION_CHANGE_PER_FRAME,
                    this.__pressEffectOriginalZIndex__
                );
                if (newZIndex === this.__pressEffectOriginalZIndex__) {
                    clearInterval(animationInterval);
                    this.__pressEffectAnimating__ = null;
                }
                this.android.zIndex = newZIndex;
            }, TICKS);
        }
    } else if (this.__pressEffectLayer__) {
        if (!this.__pressEffectLayer__.getPresentationLayer()) {
            this.__pressEffectLayer__.removeFromSuperlayer();
            this.__isPressEffetLayerActive__ = false;
            return;
        }
        var animation = __SF_CABasicAnimation.animationWithKeyPath("opacity");
        var currentOpacity = this.__pressEffectLayer__.getPresentationLayer()
            .opacity;
        animation.fromValue = currentOpacity;
        animation.toValue = 0;
        animation.duration =
            (currentOpacity * this.__fadeDuration__) / this.__fadeMaxOpacity;
        __SF_CATransaction.begin();
        __SF_CATransaction.setDisableActions(true);
        this.__pressEffectLayer__.opacity = 0;
        __SF_CATransaction.commit();
        var animationDelegate = new __SF_SMFCAAnimationDelegate();
        animationDelegate.animationDidStop = (result) => {
            if (result.flag) {
                this.__pressEffectLayer__.removeFromSuperlayer();
                this.__isPressEffetLayerActive__ = false;
            }
        };
        animation.delegate = animationDelegate;
        this.__pressEffectLayer__.addAnimationForKey(animation, "opacity");
    }
}

function applyRippleEffect(
    useForeground,
    rippleColor
) {
    if (this.android.rippleEnabled) return;
    this.android.rippleEnabled = true;
    this.android.useForeground = useForeground;
    this.android.rippleColor = rippleColor;
}

module.exports = {
    addPressEvent
}