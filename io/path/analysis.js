/**
 * @class IO.Path
 * @since 0.1
 *
 * Path allows you to use Smartface URI scheme and operation system common paths.
 * 
 *     @example
 *     const File = require('nf-core/ui/file');
 *     const Path = require('nf-core/ui/path');
 * 
 *     var myImage = new File({
 *         path: Path.ImagesUriScheme + 'smartface.png'
 *     });
 * 
 *     if(Path.android.externalStorages.external){
 *         var destinationPath = Path.android.externalStorages.external + Path.Separator + 'myDirectory';
 *         var destinationDirectory = new File({
 *             path: destinationPath
 *         });
 *         if(!destinationDirectory.exists){
 *             destinationDirectory.createDirectory();
 *         }
 *         myImage.copy(destinationPath);
 *     };
 * 
 */
function Path() {}

/**
 * Gets URI scheme for files under images folder.
 * 
 * @property {String} ImagesUriSheme
 * @static
 * @readonly
 * @android
 * @ios
 * @since 0.1
 */
Object.defineProperty(Path, 'ImagesUriScheme', {
    value: 'images://',
    writable: false
});

/**
 * Gets URI scheme for files under assets folder.
 * 
 * @property {String} AssetsUriSheme
 * @static
 * @readonly
 * @android
 * @ios
 * @since 0.1
 */
Object.defineProperty(Path, 'AssetsUriScheme', {
    value: 'assets://',
    writable: false
});

/**
 * Gets path separator for the running environment.
 * 
 * @property {String} Separator
 * @static
 * @readonly
 * @android
 * @ios
 * @since 0.1
 */
Object.defineProperty(Path, 'Separator', {
    value: "/",
    writable: false
});

/**
 * Gets data directory path of the application.
 * 
 * @property {IO.File} DataDirectory
 * @static
 * @readonly
 * @android
 * @ios
 * @since 0.1
 */
Object.defineProperty(Path, 'DataDirectory', {
    writable: false
});

/**
 * Gets external storage paths for Android.
 * 
 * @property {Object} externalStorages
 * @property {String} externalStorages.internal
 * @property {String} externalStorages.external
 * @property {String} externalStorages.usb
 * @static
 * @readonly
 * @android
 * @ios
 * @since 0.1
 */
Object.defineProperty(Path.android, 'externalStorages', {
    writable: false
});

module.exports = Path;