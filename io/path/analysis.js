/**
 * @class IO.Path
 * @since 0.1
 *
 * Path allows you to use Smartface URI scheme and operation system common paths.
 * 
 *     @example
 *     const File = require('sf-core/io/file');
 *     const Path = require('sf-core/io/path');
 * 
 *     var myImage = new File({
 *         path: Path.ImagesUriScheme + 'smartface.png'
 *     });
 * 
 *     if(Path.android.storages.external){
 *         var destinationPath = Path.android.storages.external + Path.Separator + 'myDirectory';
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
Path.ImagesUriScheme = 'images://';

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
Path.AssetsUriScheme = 'assets://';

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
Path.Separator;

/**
 * Gets data directory path of the application.
 * 
 * @property {String} DataDirectory
 * @static
 * @readonly
 * @android
 * @ios
 * @since 0.1
 */
Path.DataDirectory;

/**
 * Gets storages paths for Android.
 * 
 * @property {Object} storages
 * @property {String} storages.internal is device's internal storage path.
 * @property {String} storages.external is extended storage path.
 * @property {String} storages.usb is usb storage path which connected to the device.
 * @static
 * @readonly
 * @android
 * @since 0.1
 */
Path.android.storages;

module.exports = Path;