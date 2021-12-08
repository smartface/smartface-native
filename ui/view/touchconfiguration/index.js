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