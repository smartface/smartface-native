/**
 * @class UI.Animator
 * @since 0.1
 * 
 * Animator is used to change the appearance of the UI objects with animation.
 *
 *     @example
 *     const Color = require('nf-core/ui/color');
 *     const Flex = require('nf-core/ui/flexlayout');
 *     const Animator = require('nf-core/ui/animator');
 * 
 *     var myButton = new Button({
 *         text: 'animate',
 *         left: 10, top: 10, width: 150, height: 65,
 *         positionType: Flex.PositionType.ABSOLUTE,
 *         backgroundColor: Color.GREEN,
 *         onPress: function() {
 *             Animator.animate(myPage.layout, 5000, function() {
 *                 myButton.width = Number.NaN;
 *                 myButton.height = Number.NaN;
 *                 myButton.right = 10
 *                 myButton.bottom = 10;
 *             }).then(2500, function() {
 *                 myButton.top = Number.NaN;
 *                 myButton.left = Number.NaN;
 *                 myButton.width = 150;
 *                 myButton.height = 65;
 *             }).complete(function() {
 *                 alert("Animation complete.");
 *             });
 *         }
 *     });
 * 
 *     myPage.layout.addChild(myButton);
 *
 */
function Animator() {
    Object.defineProperties(this, {
       /**
        * Performs the changes declared in animFunction with animation.
        * Duration indicates how long the animation will take in milliseconds.
        *
        * @method then
        * @param {Number} duration
        * @param {Function} animFunction
        * @return {UI.Animator}
        * @android
        * @ios
        * @since 0.1
        */
        'then': {
            value: function(duration, animFunction) {
                // do stuff
                return new Animator();
            }
        },
       /** 
        * Runs the function provided after all animations are completed.
        * Note that: It does not perform any animations.
        * 
        * @method complete
        * @param {Function} completeFunction
        * @android
        * @ios
        * @since 0.1
        */
        'complete': {
            value: function(completeFunction) {
                // do stuff
            }
        }
    });
};

/** 
* Performs the changes declared in animFunction with animation inside the layout provided.
* Duration indicates how long the animation will take in milliseconds.
*
* @method animate
* @param {UI.ViewGroup} rootLayout
* @param {Number} duration
* @param {Function} animFunction
* @return {UI.Animator}
* @static
* @android
* @ios
* @since 0.1
*/
Object.defineProperty(Animator, 'animate', {
   value: function(rootLayout, duration, animFunction) {
        // do stuff
        return new Animator();
   }
});

module.exports = Animator;