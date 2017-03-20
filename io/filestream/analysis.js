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
     * Gets the mode of FileStream operation.
     * 
     * @property {IO.FileStream.StreamType} mode
     * @readonly
     * @android
     * @ios
     * @since 0.1
     */
    this.mode;
    
    /**
     * Checks whether the stream is readable.
     * 
     * @property {Boolean} isReadable
     * @readonly
     * @android
     * @ios
     * @since 0.1
     */
    this.isReadable;
    
    /**
     * Checks whether the stream is writable.
     * 
     * @property {Boolean} isWritable
     * @readonly
     * @android
     * @ios
     * @since 0.1
     */
    this.isWritable;
    
    /**
     * Gets the name of the file it belongs to.
     *
     * @property {String} name
     * @readonly
     * @android
     * @ios
     * @since 0.1
     */
    this.name;
    
    /**
     * Gets the path of the file it belongs to.
     * 
     * @property {String} path
     * @readonly
     * @android
     * @ios
     * @since 0.1
     */
    this.path;
    
    /**
     * Closes the FileStream instance. FileStream have to be closed when its job is done.
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
     * Gets all characters from the FileStream. If FileStream not opened with {@link IO.FileStream.StreamType#READ} mode,
     * returns null.
     *
     * @return {String}
     * @method readToEnd
     * @android
     * @ios
     * @since 0.1
     */
    this.readToEnd = function(){};
    
    /**
     * Writes all characters into the file stream. If the file stream opened with {@link IO.FileStream.StreamType#READ} 
     * ,returns false.
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
 * The StreamType determines type of the FileStream operation.
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
FileStream.StreamType.APPEND = 0;

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
FileStream.StreamType.READ = 1;

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
FileStream.StreamType.WRITE = 2;

module.exports = FileStream;