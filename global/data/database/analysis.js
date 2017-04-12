/**
 * @class Data.Database
 * @since 1.0
 *
 * An interface for perfoming database operations using SqLite.
 * 
 * 
 *     @example
 * 
 */
function Database(params){
    
    /**
     * If the given file is Directory, and the {@link Database#name name} database file exists in this directory, database will be open othervise 
     * Database will created inside this directory with given {@link Database#name name}.
     * If the given file is Assets, the database will be open but if assets not exists the exception will thrown. 
     * The parameter will setted if only given in constructor.
     *
     * @property {IO.File} file
     * @readonly
     * @android
     * @ios
     * @since 1.0
     */
    this.file;

    /**
     * You should close the database after you done your job. 
     * If you don't, you will not open the database until close and will throw exception if you want to reopen it.
     * 
     * @method close
     * @android
     * @ios
     * @since 0.1
     */
    this.close = function(){};
    
    /**
     * Execute Non SELECT SQL Command on Database.
     * 
     * @param {String} sqlCommand
     * @method execute
     * @android
     * @ios
     * @since 0.1
     */
    this.execute = function(sqlCommand){};
    
    /**
     * Execute SQL SQL Command on Database.
     * 
     * @param {String} sqlCommand
     * @return {Database.QueryResult}
     * @method query
     * @android
     * @ios
     * @since 0.1
     */
    this.query = function(sqlCommand){};
}


/**
 * @class Database.QueryResult
 * @since 1.0
 *
 * An interface for result of the Query. You can not create instance 
 * from QueryResult, you should use {@link Database#query query}. 
 * 
 *     @example
 * 
 */
Database.QueryResult = function(params){

    /**
     * Returns the count of the query result.
     * 
     * @method count
     * @return {Number}
     * @android
     * @ios
     * @since 0.1
     */
    this.count = function(){};
    
    /**
     * Returns first match from Query. If no result match with Query, will return null.
     * 
     * @method getFirst
     * @return {Database.DatabaseObject}
     * @android
     * @ios
     * @since 0.1
     */
    this.getFirst = function(){};
    
    /**
     * Returns last match from Query. If no result match with Query, will return null.
     * 
     * @method getAll
     * @return {Database.DatabaseObject}
     * @android
     * @ios
     * @since 0.1
     */
    this.getLast = function(){};
    
    /**
     * Returns the element at the specified location in this list.
     * If no result match with Query, will return null.
     * 
     * @method get
     * @param {Number} location
     * @return {Database.DatabaseObject}
     * @android
     * @ios
     * @since 0.1
     */
    this.get = function(location){};
};

/**
 * @class Database.DatabaseObject
 * @since 1.0
 *
 * The one object from database. You can not create instance 
 * from DatabaseObject, you should use {@link Database#getFirst getFirst}, 
 * {@link Database#getLast getLast} or {@link Database#get get},
 * 
 *     @example
 */
Database.DatabaseObject = function(params){
    
    /**
     * Returns given column name with String. If the given column is not String will thrown exception.
     * 
     * @method getString
     * @param {String} columnName
     * @return {String}
     * @android
     * @ios
     * @since 0.1
     */
    this.getString = function(columnName){};
    
    /**
     * Returns given column name with Integer. If the given column is not Integer will thrown exception.
     * 
     * @method getInteger
     * @param {String} columnName
     * @return {Number}
     * @android
     * @ios
     * @since 0.1
     */
    this.getInteger = function(columnName){};
    
    /**
     * Returns given column name with Boolean. If the given column is not Boolean will thrown exception.
     * 
     * @method getBoolean
     * @param {String} columnName
     * @return {Boolean}
     * @android
     * @ios
     * @since 0.1
     */
    this.getBoolean = function(columnName){};
    
    /**
     * Returns given column name with Float. If the given column is not Float will thrown exception.
     * 
     * @method getFloat
     * @param {String} columnName
     * @return {Float}
     * @android
     * @ios
     * @since 0.1
     */
    this.getFloat = function(columnName){};
};

module.exports = Database;