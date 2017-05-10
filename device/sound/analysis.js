/**
 * @class Device.Sound
 * @since 0.1
 * @android
 * @ios
 * 
 * Controls sound files.
 * 
 *     @example
 *     const Sound = require("sf-core/device/sound");
 *     var mySound = new Sound();
 *     mySound.loadURL(your-url);
 *     mySound.isLooping = true;
 *     mySound.play();
 * 
 */
function Sound() {
    /**
     * Checks whether the sound is playing.
     *
     * @property {Boolean} isPlaying
     * @readonly
     * @android
     * @ios
     * @since 0.1
     */
    this.isPlaying;
    
    /**
     * Gets/sets whether the sound is looping or non-looping.
     *
     * @property {Boolean} isLooping
     * @readonly
     * @android
     * @ios
     * @since 0.1
     */
    this.isLooping = false;
    
    /**
     * Gets/sets the volume of the sound. The range is between {0.0, 1.0}
     *
     * @property {Number} volume
     * @android
     * @ios
     * @since 0.1
     */
    this.volume = 1.0;
    
    /**
     * Gets the duration in milliseconds.
     *
     * @property {Number} totalDuration
     * @readonly
     * @android
     * @ios
     * @since 0.1
     */
    this.totalDuration;
    
    /**
     * Gets the current duration in milliseconds.
     *
     * @property {Number} currentDuration
     * @readonly
     * @android
     * @ios
     * @since 0.1
     */
    this.currentDuration;
    
    /**
     * Seeks to specified time position.
     *
     * @method seekTo
     * @param {Number} milliseconds
     * @android
     * @ios
     * @since 0.1
     */
    this.seekTo = function(milliseconds){};
    
    /**
     * plays the sound.
     *
     * @method play
     * @android
     * @ios
     * @since 0.1
     */
    this.play = function(){};
    
    /**
     * Pauses the sound.
     *
     * @method pause
     * @android
     * @ios
     * @since 0.1
     */
    this.pause = function(){};
    
    /**
     * Stops the sound.
     *
     * @method stop
     * @android
     * @ios
     * @since 0.1
     */
    this.stop = function(){};

    /**
     * Triggered when the sound is ready for playing.
     * 
     * @since 0.1
     * @android
     * @ios
     * @event onReady
     */
    this.onReady = function onReady(){ };

    /**
     * 
     * Triggered when the sound complited playing.
     *
     * @event onFinish
     * @android
     * @ios
     * @since 0.1
     */
    this.onFinish = function onFinish(e){ };
}

Sound.android = {};

/**
 * Picks a sound on the device.
 * 
 *     @example
 *     const Sound = require("sf-core/device/sound");
 *     Sound.android.pick({onSuccess: soundPicked});
 * 
 *     function soundPicked(e) {
 *         if(!e.sound.isPlaying)
 *             e.sound.play();
 *     }
 *
 * @method pick
 * @param {Object} params Object describing function parameters.
 * @param {UI.Page} params.page (required since 1.1.8)
 * @param {Function} params.onSuccess Callback for success situation.
 * @param {Object} params.onSuccess.param 
 * @param {Device.Sound} params.onSuccess.param.sound 
 * @param {Function} [params.onFailure] Callback for failure situation.
 * @static
 * @android
 * @since 1.1.8
 */
Sound.android.pick = function(params) {};


module.exports = Sound;