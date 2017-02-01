/**
 * @class IO.Path
 * @since 0.1
 *
 * // @todo add description
 * 
 *     @example
 *     // @todo add example
 * 
 */
function Path() {}

/**
 * @property {String} ImagesUriSheme
 * // @todo add description.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(Path, 'ImagesUriScheme', {
    value: 'images://',
    writable: false
});

/**
 * @property {String} AssetsUriSheme
 * // @todo add description.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(Path, 'AssetsUriScheme', {
    value: 'assets://',
    writable: false
});

/**
 * @property {String} Separator
 * // @todo add description.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(Path, 'Separator', {
    value: "/",
    writable: false
});

/**
 * @property {IO.File} DataDirectory
 * // @todo add description.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(Path, 'DataDirectory', {
    writable: false
});


Path.android = {};

/**
 * @property {IO.File[]} externalStorages
 * // @todo add description.
 * 
 * @static
 * @readonly
 * @since 0.1
 */
Object.defineProperty(Path.android, 'externalStorages', {
    writable: false
});

/**
 * // @todo add description
 * 
 *     @example
 *     // @todo add example
 * 
 * @param {String} [path=""]
 * @return {String} resolved path.
 * @method resolve
 * @static
 * @since 0.1
 */
Path.resolve = function(path){
    
}


module.exports = Path;