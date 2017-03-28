/**
 * @class Device.Sound
 * @since 0.1
 * 
 * Controls sound files.
 * 
 *     @example
 *     const Sound = require("nf-core/device/sound");
 *     var mySound = new Sound();
 *     mySound.dataSource = {path: your-sound-full-path};
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
     * @since 0.1
     */
    this.isPlaying;
    
    /**
     * Gets/sets whether the sound is looping or non-looping.
     *
     * @property {Boolean} isLooping
     * @since 0.1
     */
    this.isLooping = false;
    
    /**
     * Gets/sets the volume of the sound. The range is between {0.0, 1.0}
     *
     * @property {Number} volume
     * @since 0.1
     */
    this.volume = 1.0;
    
    /**
     * Gets the current position in milliseconds.
     *
     * @property {Number} currentPosition
     * @readonly
     * @since 0.1
     */
    this.currentPosition;
    
    /**
     * Gets the current duration in milliseconds.
     *
     * @property {Number} currentDuration
     * @readonly
     * @since 0.1
     */
    this.currentDuration;
    
    /**
     * Gets/sets data source of the sound.
     *
     * @property {Object} dataSource
     * @since 0.1
     */
    this.dataSource = null;
    
    /**
     * Seeks to specified time position.
     *
     * @method seekTo
     * @param {Number} milliseconds
     * @since 0.1
     */
    this.seekTo = function(milliseconds){};
    
    /**
     * plays the sound.
     *
     * @method play
     * @since 0.1
     */
    this.play = function(){};
    
    /**
     * Pauses the sound.
     *
     * @method pause
     * @since 0.1
     */
    this.pause = function(){};
    
    /**
     * Stops the sound.
     *
     * @method stop
     * @since 0.1
     */
    this.stop = function(){};

    /**
     * Triggered when the sound is ready for playing.
     * 
     * @since 0.1
     * @param {Function} callback
     * @event onReady
     */
    this.onReady = function onReady(){ };

    /**
     * 
     * Triggered when the sound complited playing.
     *
     * @event onFinish
     * @param {Function} callback
     * @since 0.1
     */
    this.onFinish = function onFinish(e){ };
}

Sound.android = {};

/**
 * Gets all sounds on the device. Returns sound array.
 *
 * @method getAll
 * @param {Object} params Object describing function parameters.
 * @param {Function} [params.onSuccess] Callback for success situation.
 * @param {Function} [params.onFailure] Callback for failure situation.
 * @return {Array}
 * @static
 * @android
 * @since 0.1
 */
Sound.android.getAll = function(params) {};

/**
 * Picks a sound on the device.
 * 
 *     @example
 *     const Sound = require("nf-core/device/sound");
 *     Sound.android.pick({onSuccess: soundPicked});
 * 
 *     function soundPicked(sound) {
 *         if(!sound.isPlaying)
 *             sound.play();
 *     }
 *
 * @method pick
 * @param {Object} params Object describing function parameters.
 * @param {Function} [params.onSuccess] Callback for success situation.
 * @param {Function} [params.onFailure] Callback for failure situation.
 * @return {Device.Sound}
 * @static
 * @android
 * @since 0.1
 */
Sound.android.pick = function(params) {};

module.exports = Sound;