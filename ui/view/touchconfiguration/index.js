const DEFAULT_GREY = "#d8d8d8";
const Color = require('../../../ui/color');

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

function defaultAddPressEffect(view) {
    const TICKS = 1000 / CurrentDefault.fps;
    const ELEVATION_CHANGE_PER_FRAME =
        CurrentDefault.elevationChange / (CurrentDefault.androidAnimationDuration / TICKS);
    if (System.OS === System.OSType.ANDROID) {
        view.__pressEffectAnimating__ = "addPress";
        if (
            !view.__pressEffectOriginalZIndex__ &&
            view.__pressEffectOriginalZIndex__ !== 0
        )
            view.__pressEffectOriginalZIndex__ = view.android.zIndex;
        let maxZIndex =
            view.__pressEffectOriginalZIndex__ + CurrentDefault.elevationChange;
        if (CurrentDefault.elevationChange !== 0) {
            let animationInterval = setInterval(() => {
                if (view.__pressEffectAnimating__ !== "addPress") {
                    clearInterval(animationInterval);
                }
                let newZIndex = Math.min(
                    view.android.zIndex + ELEVATION_CHANGE_PER_FRAME,
                    maxZIndex
                );
                if (newZIndex === maxZIndex) {
                    clearInterval(animationInterval);
                    view.__pressEffectAnimating__ = null;
                }
                view.android.zIndex = newZIndex;
            }, TICKS);
        }
    } else if (view.backgroundColor || view.__fadeEffectColor__) {
        if (!view.__pressEffectGeneratedColor__) {
            if (view.__fadeEffectColor__) {
                view.__pressEffectGeneratedColor__ = view.__fadeEffectColor__;
            }

            var layer = new __SF_CALayer();
            layer.frame = view.nativeObject.bounds;
            layer.backgroundCGColor =
                view.__pressEffectGeneratedColor__.nativeObject;
            view.__pressEffectLayer__ = layer;
        }

        if (!view.__isPressEffetLayerActive__) {
            view.__isPressEffetLayerActive__ = true;
            view.nativeObject.layer.addSublayer(view.__pressEffectLayer__);
        }

        var animation = __SF_CABasicAnimation.animationWithKeyPath("opacity");
        var currentOpacity = 0;
        if (view.__pressEffectLayer__.getPresentationLayer()) {
            currentOpacity = view.__pressEffectLayer__.getPresentationLayer().opacity;
        }
        animation.fromValue = currentOpacity;
        animation.toValue = view.__fadeMaxOpacity;
        animation.duration =
            ((view.__fadeMaxOpacity - currentOpacity) * view.__fadeDuration__) /
            view.__fadeMaxOpacity;
        __SF_CATransaction.begin();
        __SF_CATransaction.setDisableActions(true);
        view.__pressEffectLayer__.opacity = view.__fadeMaxOpacity;
        __SF_CATransaction.commit();
        view.__pressEffectLayer__.addAnimationForKey(animation, "opacity");
    }
}

function defaultClearPressEffect(view) {
    const TICKS = 1000 / CurrentDefault.fps;
    const ELEVATION_CHANGE_PER_FRAME =
        CurrentDefault.elevationChange / (CurrentDefault.androidAnimationDuration / TICKS);
    if (
        System.OS === System.OSType.ANDROID &&
        (view.__pressEffectOriginalZIndex__ ||
            view.__pressEffectOriginalZIndex__ === 0)
    ) {
        view.__pressEffectAnimating__ = "removePress";
        if (CurrentDefault.elevationChange !== 0) {
            let animationInterval = setInterval(() => {
                if (view.__pressEffectAnimating__ !== "removePress") {
                    clearInterval(animationInterval);
                }
                let newZIndex = Math.max(
                    view.android.zIndex - ELEVATION_CHANGE_PER_FRAME,
                    view.__pressEffectOriginalZIndex__
                );
                if (newZIndex === view.__pressEffectOriginalZIndex__) {
                    clearInterval(animationInterval);
                    view.__pressEffectAnimating__ = null;
                }
                view.android.zIndex = newZIndex;
            }, TICKS);
        }
    } else if (view.__pressEffectLayer__) {
        if (!view.__pressEffectLayer__.getPresentationLayer()) {
            view.__pressEffectLayer__.removeFromSuperlayer();
            view.__isPressEffetLayerActive__ = false;
            return;
        }
        var animation = __SF_CABasicAnimation.animationWithKeyPath("opacity");
        var currentOpacity = view.__pressEffectLayer__.getPresentationLayer()
            .opacity;
        animation.fromValue = currentOpacity;
        animation.toValue = 0;
        animation.duration =
            (currentOpacity * view.__fadeDuration__) / view.__fadeMaxOpacity;
        __SF_CATransaction.begin();
        __SF_CATransaction.setDisableActions(true);
        view.__pressEffectLayer__.opacity = 0;
        __SF_CATransaction.commit();
        var animationDelegate = new __SF_SMFCAAnimationDelegate();
        animationDelegate.animationDidStop = (result) => {
            if (result.flag) {
                view.__pressEffectLayer__.removeFromSuperlayer();
                view.__isPressEffetLayerActive__ = false;
            }
        };
        animation.delegate = animationDelegate;
        view.__pressEffectLayer__.addAnimationForKey(animation, "opacity");
    }
}


function addPressEvent(target, event, options) {
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
    }
}

module.exports = {
    addPressEvent
}