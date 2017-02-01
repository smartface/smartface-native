var File = require("nf-core/io/file");

function Path() {}

Object.defineProperty(Path, 'ImagesUriScheme', {
    value: 'images://',
    writable: false
});


Object.defineProperty(Path, 'AssetsUriScheme', {
    value: 'assets://',
    writable: false
});

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
    get: function(){
        var filesDir = Android.getActivity().getFilesDir();
        if(filesDir){
            return File.createFromNativeObject(filesDir);
        }
        else{
            return null;
        }
    },
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