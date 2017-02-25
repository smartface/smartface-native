/**
 * @class UI.Animator
 * @since 0.1
 *
 *     @example
 *     const Animator = require('nf-core/ui/animator');
 *     const View = require('nf-core/ui/view');
 *     const Flex = require('nf-core/ui/flexlayout');
 * 
 *     var myView = new View({
 *         left:10, top:10, width:150, height:65,
 *         positionType: Flex.PositionType.ABSOLUTE
 *     });
 *     myPage.layout.addChild(myView);
 * 
 *     Animator.animate(myPage.layout, 2, function() {
 *         myView.right  = 10;
 *         myView.bottom = 10;
 *        
 *     }).then(2, function() {
 *         myView.width  = 150;
 *         myView.height = 65;
 *         myView.right  = 10;
 *         myView.bottom = 10;
 *     });
 *
 */
function Animator() {
    Object.defineProperties(this, {
        'then': {
            value: function(duration, animFunction) {
                // do stuff
                return new Animator();
            }
        },
        'complete': {
            value: function(completeFunction) {
                // do stuff
            }
        }
    });
};

Object.defineProperty(Animator, 'animate', {
   value: function(rootLayout, duration, animFunction) {
        // do stuff
        return new Animator();
   }
});

module.exports = Animator;