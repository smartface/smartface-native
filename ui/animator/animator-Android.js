const NativeTransitionManager = requireClass('android.support.transition.TransitionManager');
const NativeTransition        = requireClass('android.support.transition.Transition');
const NativeTransitionSet     = requireClass('android.support.transition.TransitionSet');
const NativeAutoTransition    = requireClass('android.support.transition.AutoTransition');
const NativeAlphaTransition   = requireClass('io.smartface.android.anims.AlphaTransition');

function Animator(params) {
    var _layout       = params.layout;
    var _duration     = params.duration;
    var _animFunction = params.animFunction;

    var _completeFunction = null;
    var _nextAnimator = null;
    var _onComplete = function() {
        if (_nextAnimator) {
            _nextAnimator.perform();
        } else if (_completeFunction) {
            _completeFunction();
            _layout.applyLayout();
        }
    }

    Object.defineProperties(this, {
        'perform': {
            value: function() {
                var autoTransition = new NativeAutoTransition();
                var alphaTransition = new NativeAlphaTransition();
                var transitionSet = new NativeTransitionSet();
                transitionSet.addTransition(autoTransition);
                transitionSet.addTransition(alphaTransition);
                transitionSet.setDuration(_duration);
                transitionSet.addListener(NativeTransition.TransitionListener.implement({
                    onTransitionStart:  function(transition) {},
                    onTransitionCancel: function(transition) {},
                    onTransitionPause:  function(transition) {},
                    onTransitionResume: function(transition) {},
                    onTransitionEnd:    function(transition) {
                        _onComplete();
                    }
                }));
                NativeTransitionManager.beginDelayedTransition(_layout.nativeObject, transitionSet);
                _animFunction();
                _layout.applyLayout();
            }
        },
        'then': {
            value: function(duration, animFunction) {
                var animator = new Animator({
                    layout      : _layout,
                    duration    : duration,
                    animFunction: animFunction
                });
                _nextAnimator = animator;
                return _nextAnimator;
            }
        },
        'complete': {
            value: function(completeFunction) {
                _completeFunction = completeFunction;
            }
        },
        'toString': {
            value: function(){
                return 'Animator';
            },
            enumerable: true, 
            configurable: true
        }
    });
};

Object.defineProperty(Animator, 'animate', {
   value: function(rootLayout, duration, animFunction) {
       var animator = new Animator({
           layout      : rootLayout,
           duration    : duration,
           animFunction: animFunction
       });
       animator.perform();
       return animator;
   }
});

module.exports = Animator;