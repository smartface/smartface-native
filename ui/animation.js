
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
* Gets the animation to the fade in.
*
* @property {Number} FADEIN Fade in animation.
* @since 0.1
* @static
*/
Animation.FADEIN = 0;

// Constants
/**
* Gets the animation to the fade out.
*
* @property {Number} FADEOUT Fade out animation.
* @since 0.1
* @static
*/
Animation.FADEOUT = 1;

// Constants
/**
* Gets the animation to the slide in.
*
* @property {Number} SLIDEIN Slide in animation.
* @since 0.1
* @static
*/
Animation.SLIDEIN = 2;

// Constants
/**
* Gets the animation to the slide out.
*
* @property {Number} SLIDEOUT Slide out animation.
* @since 0.1
* @static
*/
Animation.SLIDEOUT = 3;

module.exports = Animation;