/**
 * @class IO.FileStream
 * @since 0.1
 *
 * FileStream is a class which allows you to making IO operations. 
 * 
 *     @example
 *     const File = require('nf-core/io/file');
 *     const Path = require('nf-core/io/path');
 *     const FileStream = require('nf-core/ioui/filestream');
 *     var myFile = new File({
 *         path: Path.DataDirectory + '/myFile.txt'
 *     });
 *     var myFileStream = myFile.openStream(FileStream.StreamType.WRITE);
 *     myFileStream.write('NativeFace');
 *     myFileStream.close();
 * 
 */
function FileStream(params) {
    
    /**
     * Gets the mode of the FileStream. The mode determines what you can do with this FileStream.
     * 
     * @property {IO.FileStream.StreamType} mode
     * @readonly
     * @android
     * @ios
     * @since 0.1
     */
    this.mode;
    
    /**
     * Checks the stream is readable.
     * 
     * @property {Boolean} isReadable
     * @readonly
     * @android
     * @ios
     * @since 0.1
     */
    this.isReadable;
    
    /**
     * Checks the stream is writable.
     * 
     * @property {Boolean} isWritable
     * @readonly
     * @android
     * @ios
     * @since 0.1
     */
    this.isWritable;
    
    /**
     * Gets name of the File object that the FileStream object created with. 
     *
     * @property {String} name
     * @readonly
     * @android
     * @ios
     * @since 0.1
     */
    this.name;
    
    /**
     * Gets path of the File object that the FileStream object created with. 
     * 
     * @property {String} path
     * @readonly
     * @android
     * @ios
     * @since 0.1
     */
    this.path;
    
    /**
     * Closes the FileStream object. FileStream have to be closed when its job is done.
     *
     * @method close
     * @android
     * @ios
     * @since 0.1
     */
    this.close = function(){};
    
    /**
     * Gets the {@link Blob} object from FileStream.
     *
     * @return {Blob}
     * @method readBlob
     * @android
     * @ios
     * @since 0.1
     */
    this.readBlob = function(){};
    
    /**
     * Gets all characters from the FileStream. If FileStream not opened with {@link IO.FileStream.StreamType.READ} mode,
     * will return null.
     *
     * @return {String}
     * @method readToEnd
     * @android
     * @ios
     * @since 0.1
     */
    this.readToEnd = function(){};
    
    /**
     * Writes all characters into the FileStream. If FileStream not opened with {@link IO.FileStream.StreamType.WRITE} 
     * or {@link IO.FileStream.StreamType.APPEND} mode, will writes nothing.
     * 
     * @param {String} text
     * @return {Boolean}
     * @method write
     * @android
     * @ios
     * @since 0.1
     */
    this.write = function(text){};
}

/**
 * The StreamType determines what you can do with this FileStream.
 * 
 * @enum {Number} IO.FileStream.StreamType
 * @static
 * @readonly
 * @android
 * @ios
 * @since 0.1
 */
FileStream.StreamType = {};

/**
 * Keep existing file and append inside of it.
 * 
 * @property {Number} APPEND
 * @static
 * @readonly
 * @android
 * @ios
 * @since 0.1
 */
Object.defineProperty(FileStream.StreamType, 'APPEND', {
    value: 0,
    writable: false
});

/**
 * Read existing file.
 * 
 * @property {Number} READ
 * @static
 * @readonly
 * @android
 * @ios
 * @since 0.1
 */
Object.defineProperty(FileStream.StreamType, 'READ', {
    value: 1,
    writable: false
});

/**
 * Delete file if exists and write inside of it.
 * 
 * @property {Number} WRITE
 * @static
 * @readonly
 * @android
 * @ios
 * @since 0.1
 */
Object.defineProperty(FileStream.StreamType, 'WRITE', {
    value: 2,
    writable: false
});

module.exports = FileStream;