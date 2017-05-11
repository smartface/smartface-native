/**
 * @class UI.Animator
 * @since 0.1
 * 
 * Animator is used to change the appearance of the UI objects with animation.
 *
 *     @example
 *     const Color      = require('sf-core/ui/color');
 *     const View       = require('sf-core/ui/view');
 *     const Button     = require('sf-core/ui/button');
 *     const Animator   = require('sf-core/ui/animator');
 *     const FlexLayout = require('sf-core/ui/flexlayout');
 * 
 *     var myView = new View({
 *         left: 10, top: 10, right: 10, height: 100,
 *         positionType: FlexLayout.PositionType.ABSOLUTE,
 *         backgroundColor: Color.GREEN
 *     });
 *     var myButton = new Button({
 *         text: 'Animate',
 *         left: 10, top: 150, right: 10, height: 65,
 *         positionType: FlexLayout.PositionType.ABSOLUTE,
 *         backgroundColor: Color.GRAY,
 *         onPress: function() {
 *             myView.backgroundColor = Color.RED;
 *             Animator.animate(myPage.layout, 5000, function() {
 *                 myView.left = 150;
 *                 myView.right = 150;
 *             }).then(2500, function() {
 *                 myView.left = 10;
 *                 myView.right = 10;
 *             }).complete(function() {
 *                 myView.backgroundColor = Color.GREEN;
 *             });
 *         }
 *     });
 *     myPage.layout.addChild(myView);		        
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
* While animating Textbox, you may see the hint of the Textbox disappear on Android. 
* This is related with Android internal issue. For getting over from this problem you should 
* set empty text to the Textbox onComplete callback of animation.
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