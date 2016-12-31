
/**
* @class KeyEvent
* @since 0.1
* KeyEvent represents device buttons.
*
*     @example
*     const KeyEvent = require('sf-core/ui/keyevent');
*     var textAlignment = KeyEvent.VOLUMEDOWN;
*/
const KeyEvent = { }

// Constants
/**
* Gets the key event to the volume up.
*
* @property {Number} VOLUMEUP Device volume up key.
* @since 0.1
* @static
*/
KeyEvent.VOLUMEUP = 0;

// Constants
/**
* Gets the key event to the volume down.
*
* @property {Number} VOLUMEDOWN Device volume down key.
* @since 0.1
* @static
*/
KeyEvent.VOLUMEDOWN = 1;

// Constants
/**
* Gets the key event to the menu.
*
* @property {Number} MENU Device menu key.
* @since 0.1
* @static
*/
KeyEvent.MENU = 2;

// Constants
/**
* Gets the key event to the home.
*
* @property {Number} HOME Device home key.
* @since 0.1
* @static
*/
KeyEvent.HOME = 3;

module.exports = KeyEvent;