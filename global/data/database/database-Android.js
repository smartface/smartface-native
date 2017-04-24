/* global requireClass*/
const File                  = require('sf-core/io/file');
const FileStream            = require('sf-core/io/filestream');
const Path                  = require('sf-core/io/path');

const NativeSQLiteDatabase      = requireClass('android.database.sqlite.SQLiteDatabase');
const NativeSQLiteOpenHelper    = requireClass('android.database.sqlite.SQLiteOpenHelper');

function Database(params){
    var activity = Android.getActivity();
    this.nativeObject = null;
    
    var _file = params.file;
    
    
    
    if(typeof params.inMemory === 'boolean' && params.inMemory){
        this.nativeObject = NativeSQLiteDatabase.create(null);
    }
    else if(params.file instanceof File) {
        if(params.file.type === Path.FILE_TYPE.FILE){
            this.nativeObject = NativeSQLiteDatabase.openOrCreateDatabase(params.file.nativeObject, null);
        }
        else if(params.file.type === Path.FILE_TYPE.RAU_ASSETS || params.file.type === Path.FILE_TYPE.EMULATOR_ASSETS){
            if(!params.file.exists){
                throw new Error("Open Database from Assets failed. Database not exists and cannot create database on assets");
            }
            this.nativeObject = NativeSQLiteDatabase.openOrCreateDatabase(params.file.nativeObject, null);
        }
        else if(params.file.type === Path.FILE_TYPE.ASSETS){
            var destinationOnRoot = new File({path: Path.DataDirectory + "/" + params.file.name});
            if(!destinationOnRoot.exists){
                var copyResult = params.file.copy(destinationOnRoot.path);
                if(!copyResult){
                    throw new Error("Open Database from Assets failed.");
                }
            }
            this.nativeObject = NativeSQLiteDatabase.openOrCreateDatabase(destinationOnRoot.nativeObject, null);
        }
    }
    
    if(this.nativeObject === null){
        throw new Error("Create or Read Database failed. Invalid file.");
    }
    
    
    Object.defineProperties(this,{
        'file':{
            value: _file,
            enumarable: true
        },
        'close': {
            value: function(){
                this.nativeObject.close();
            },
            enumarable: true
        },
        'execute': {
            value: function(sqlCommand){
                if(typeof sqlCommand === 'string'){
                    this.nativeObject.execSQL(sqlCommand);
                }
            },
            enumarable: true
        },
        'query': {
            value: function(sqlCommand){
                if(typeof sqlCommand === 'string'){
                    return new Database.QueryResult({
                        'isInternal': true,
                        'cursor': this.nativeObject.rawQuery(sqlCommand, null)
                    });
                    
                }
            },
            enumarable: true
        }
    });
}

Object.defineProperty(Database, "createFromSQLFile", {
    
});

Database.QueryResult = function(params){
    
    if(!params || !params.isInternal){
        throw new Error("Database.QueryResult in not creatable, Database.QueryResult will created with only Database.query");
    }
    
    this.nativeObject = params.cursor;

    Object.defineProperties(this,{
        'count': {
            value: function(){
                return this.nativeObject.getCount();
            }
        },
        'getFirst': {
            value: function(){
                this.nativeObject.moveToFirst();
                return new Database.DatabaseObject({
                    'isInternal': true,
                    'cursor': this.nativeObject
                });
            }
        },
        'getLast': {
            value: function(){
                this.nativeObject.moveToLast();
                return new Database.DatabaseObject({
                    'isInternal': true,
                    'cursor': this.nativeObject
                });
            }
        },
        'get': {
            value: function(location){
                if(typeof location === 'number'){
                    this.nativeObject.moveToPosition(location);
                    return new Database.DatabaseObject({
                        'isInternal': true,
                        'cursor': this.nativeObject
                    });
                }
                else{
                    throw new Error("Parameter mismatch. Parameter must be Number for Database.QueryResult#get");
                }
            }
        },
    });
};

Database.DatabaseObject = function(params){
    
    if(!params || !params.isInternal){
        throw new Error("Database.DatabaseObject in not creatable, Database.DatabaseObject will created with Database.QueryResult#getFirst, Database.QueryResult#getLast or Database.QueryResult#get");
    }
    
    this.nativeObject = params.cursor;
    
    Object.defineProperties(this,{
        'getString': {
            value: function(columnName){
                if(typeof columnName === 'string'){
                    var index = this.nativeObject.getColumnIndex(columnName);
                    if(index != -1){
                        return this.nativeObject.getString(index);
                    }
                    return null;
                }
                else{
                    throw new Error("Parameter mismatch. Parameter must be String for Database.DatabaseObject#getString");
                }
            },
            enumarable: true
        },
        'getInteger': {
            value: function(columnName){
                if(typeof columnName === 'string'){
                    var index = this.nativeObject.getColumnIndex(columnName);
                    if(index != -1){
                        return this.nativeObject.getInt(index);
                    }
                    return null;
                }
                else{
                    throw new Error("Parameter mismatch. Parameter must be String for Database.DatabaseObject#getInteger");
                }
            },
            enumarable: true
        },
        'getBoolean': {
            value: function(columnName){
                if(typeof columnName === 'string'){
                    var index = this.nativeObject.getColumnIndex(columnName);
                    if(index != -1){
                        return this.nativeObject.getBoolean(index);
                    }
                    return null;
                }
                else{
                    throw new Error("Parameter mismatch. Parameter must be String for Database.DatabaseObject#getBoolean");
                }
            },
            enumarable: true
        },
        'getFloat': {
            value: function(columnName){
                if(typeof columnName === 'string'){
                    var index = this.nativeObject.getColumnIndex(columnName);
                    if(index != -1){
                        return this.nativeObject.getFloat(index);
                    }
                    return null;
                }
                else{
                    throw new Error("Parameter mismatch. Parameter must be String for Database.DatabaseObject#getFloat");
                }
            },
            enumarable: true
        },
    });
};

module.exports = Database;