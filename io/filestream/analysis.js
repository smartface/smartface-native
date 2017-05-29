/**
 * @class IO.FileStream
 * @since 0.1
 *
 * FileStream is a class which allows you to making IO operations. 
 * 
 *     @example
 *     const File = require('sf-core/io/file');
 *     const Path = require('sf-core/io/path');
 *     const FileStream = require('sf-core/io/filestream');
 *     var myFile = new File({
 *         path: Path.DataDirectory + '/myFile.txt'
 *     });
 *     var myFileStream = myFile.openStream(FileStream.StreamType.WRITE, FileStream.ContentMode.TEXT);
 *     myFileStream.write('Smartface');
 *     myFileStream.close();
 * 
 */
function FileStream(params) {}
    
/**
 * Gets the mode of FileStream operation.
 * 
 * @property {IO.FileStream.StreamType} mode
 * @readonly
 * @android
 * @ios
 * @since 0.1
 */
FileStream.prototype.mode;

/**
 * Gets the content mode of FileStream operation.
 * 
 * @property {IO.FileStream.ContentMode} mode
 * @readonly
 * @android
 * @ios
 * @since 0.1
 */
FileStream.prototype.contentMode;

/**
 * Checks whether the stream is readable.
 * 
 * @property {Boolean} isReadable
 * @readonly
 * @android
 * @ios
 * @since 0.1
 */
FileStream.prototype.isReadable;

/**
 * Checks whether the stream is writable.
 * 
 * @property {Boolean} isWritable
 * @readonly
 * @android
 * @ios
 * @since 0.1
 */
FileStream.prototype.isWritable;

/**
 * Gets the name of the file it belongs to.
 *
 * @property {String} name
 * @readonly
 * @android
 * @ios
 * @since 0.1
 */
FileStream.prototype.name;

/**
 * Gets the path of the file it belongs to.
 * 
 * @property {String} path
 * @readonly
 * @android
 * @ios
 * @since 0.1
 */
FileStream.prototype.path;

/**
 * Closes the FileStream instance. FileStream have to be closed when its job is done.
 *
 * @method close
 * @android
 * @ios
 * @since 0.1
 */
FileStream.prototype.close = function(){};

/**
 * Gets the {@link Blob} object from FileStream.
 *
 * @return {Blob}
 * @method readBlob
 * @android
 * @ios
 * @deprecated since 1.1.10, you may use FileStream.readToEnd() function after you change contentMode of FileStream to FileStream.ContentMode.BINARY.
 */
FileStream.prototype.readBlob = function(){};

/**
 * Gets all characters or blob content from the file stream depending of {@link IO.FileStream#ContentMode contentMode} content mode.
 * If FileStream not opened with {@link IO.FileStream.StreamType#READ} mode, returns null.
 *
 * @return {String|Blob}
 * @method readToEnd
 * @android
 * @ios
 * @since 0.1
 */
FileStream.prototype.readToEnd = function(){};

/**
 * Writes all characters or blob content into the file stream depending of {@link IO.FileStream#ContentMode contentMode} content mode.
 * If the file stream opened with {@link IO.FileStream.StreamType#READ}, returns false. 
 * 
 * @param {String|Blob} content
 * @return {Boolean}
 * @method write
 * @android
 * @ios
 * @since 0.1
 */
FileStream.prototype.write = function(content){};

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

/**
 * The ContentMode is read/write mode for the FileStream operation.
 * 
 * @enum {Number} IO.FileStream.ContentMode
 * @static
 * @readonly
 * @android
 * @ios
 * @since 1.1.11
 */
FileStream.ContentMode = {};

/**
 * Changes content type of FileStream as text.
 * 
 * @property TEXT
 * @static
 * @readonly
 * @android
 * @ios
 * @since 1.1.11
 */
FileStream.ContentMode.TEXT;

/**
 * Changes content type of FileStream as binary.
 * 
 * @property BINARY
 * @static
 * @readonly
 * @android
 * @ios
 * @since 1.1.11
 */
FileStream.ContentMode.BINARY;

module.exports = FileStream;