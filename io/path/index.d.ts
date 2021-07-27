export = Path;
/**
 * @class IO.Path
 * @since 0.1
 *
 * Path allows you to use Smartface URI scheme and operation system common paths.
 * 
 *     @example
 *     const File = require('@smartface/native/io/file');
 *     const Path = require('@smartface/native/io/path');
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
declare namespace Path {
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
    const DataDirectory: string;
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
    const AssetsUriScheme: string;
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
    const Separator: string;

	const ImagesUriScheme: 'images://';

	namespace android {
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
 * 
 * @deprecated The path returned from this method is no longer directly accessible to apps.
 */
		const storages: {
			external: string | null;
			internal: string | null;
			usb: string | null;
			isResolved: boolean | null;
		};
	}
	enum FILE_TYPE {
		FILE = 0,
		ASSET = 1,
		DRAWABLE = 2,
		EMULATOR_ASSETS = 3,
		EMULATOR_DRAWABLE = 4,
		RAU_ASSETS = 5,
		RAU_DRAWABLE = 6
	}
}
