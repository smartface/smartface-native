
/**
* @class Animation
* @since 0.1
* Animate user interface components..
*
*     @example
*     const KeyEvent = require('sf-core/ui/animation');
*     var textAlignment = Animation.FADEIN;
*/
const Animation = { }

// Constants
/**
* Gets the animation to the left to right.
*
* @property {Number} LEFTTORIGHT Left to right animation.
* @since 0.1
* @static
*/
Animation.LEFTTORIGHT = 0;

// Constants
/**
* Gets the animation to the right to left.
*
* @property {Number} RIGHTTOLEFT Right to left animation.
* @since 0.1
* @static
*/
Animation.RIGHTTOLEFT = 1;

// Constants
/**
* Gets the animation to the up to down.
*
* @property {Number} UPTODOWN Up to down animation.
* @since 0.1
* @static
*/
Animation.UPTODOWN = 2;

// Constants
/**
* Gets the animation to the down to up.
*
* @property {Number} DOWNTOUP Down to up animation.
* @since 0.1
* @static
*/
Animation.DOWNTOUP = 3;

module.exports = Animation;