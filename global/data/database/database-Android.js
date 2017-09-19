/* global requireClass*/
const File                  = require('../../../io/file');
const Path                  = require('../../../io/path');

const NativeSQLiteDatabase      = requireClass('android.database.sqlite.SQLiteDatabase');

function Database(params){
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
            enumerable: true
        },
        'close': {
            value: function(){
                this.nativeObject.close();
            },
            enumerable: true
        },
        'execute': {
            value: function(sqlCommand){
                if(typeof sqlCommand === 'string'){
                    this.nativeObject.execSQL(string(sqlCommand));
                }
            },
            enumerable: true
        },
        'query': {
            value: function(sqlCommand){
                if(typeof sqlCommand === 'string'){
                    return new Database.QueryResult({
                        'isInternal': true,
                        'cursor': this.nativeObject.rawQuery(string(sqlCommand), null)
                    });
                    
                }
            },
            enumerable: true
        }
    });
}

Database.QueryResult = function(params){
    
    if(!params || !params.isInternal){
        throw new Error("Database.QueryResult in not creatable, Database.QueryResult will created with only Database.query");
    }
    
    this.nativeObject = params.cursor;

    Object.defineProperties(this,{
        'count': {
            value: function(){
                return int(this.nativeObject.getCount());
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
                    this.nativeObject.moveToPosition(int(location));
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
                    var index = int(this.nativeObject.getColumnIndex(string(columnName)));
                    if(index != -1){
                        return string(this.nativeObject.getString(int(index)));
                    }
                    return null;
                }
                else{
                    throw new Error("Parameter mismatch. Parameter must be String for Database.DatabaseObject#getString");
                }
            },
            enumerable: true
        },
        'getInteger': {
            value: function(columnName){
                if(typeof columnName === 'string'){
                    var index = int(this.nativeObject.getColumnIndex(string(columnName)));
                    if(index != -1){
                        return int(this.nativeObject.getInt(int(index)));
                    }
                    return null;
                }
                else{
                    throw new Error("Parameter mismatch. Parameter must be String for Database.DatabaseObject#getInteger");
                }
            },
            enumerable: true
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
            enumerable: true
        },
        'getFloat': {
            value: function(columnName){
                if(typeof columnName === 'string'){
                    var index = int(this.nativeObject.getColumnIndex(string(columnName)));
                    if(index != -1){
                        return float(this.nativeObject.getFloat(int(index)));
                    }
                    return null;
                }
                else{
                    throw new Error("Parameter mismatch. Parameter must be String for Database.DatabaseObject#getFloat");
                }
            },
            enumerable: true
        },
    });
};

module.exports = Database;