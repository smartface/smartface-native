/* global requireClass*/
const File = require('../../../io/file');
const Path = require('../../../io/path');

const NativeSQLiteDatabase = requireClass('android.database.sqlite.SQLiteDatabase');
const SFQueryResult = requireClass('io.smartface.android.sfcore.global.data.database.SFQueryResult');

function Database(params) {
    this.nativeObject = null;

    var _file = params.file;

    if (typeof params.inMemory === 'boolean' && params.inMemory) {
        this.nativeObject = NativeSQLiteDatabase.create(null);
    }
    else if (params.file instanceof File) {
        if (params.file.type === Path.FILE_TYPE.FILE) {
            this.nativeObject = NativeSQLiteDatabase.openOrCreateDatabase(params.file.nativeObject, null);
        }
        else if (params.file.type === Path.FILE_TYPE.RAU_ASSETS || params.file.type === Path.FILE_TYPE.EMULATOR_ASSETS) {
            if (!params.file.exists) {
                throw new Error("Open Database from Assets failed. Database not exists and cannot create database on assets");
            }
            this.nativeObject = NativeSQLiteDatabase.openOrCreateDatabase(params.file.nativeObject, null);
        }
        else if (params.file.type === Path.FILE_TYPE.ASSETS) {
            var destinationOnRoot = new File({ path: Path.DataDirectory + "/" + params.file.name });
            if (!destinationOnRoot.exists) {
                var copyResult = params.file.copy(destinationOnRoot.path);
                if (!copyResult) {
                    throw new Error("Open Database from Assets failed.");
                }
            }
            this.nativeObject = NativeSQLiteDatabase.openOrCreateDatabase(destinationOnRoot.nativeObject, null);
        }
    }

    if (this.nativeObject === null) {
        throw new Error("Create or Read Database failed. Invalid file.");
    }

    Object.defineProperties(this, {
        'file': {
            value: _file,
            enumerable: true
        },
        'close': {
            value: function() {
                this.nativeObject.close();
            },
            enumerable: true
        },
        'execute': {
            value: function(sqlCommand) {
                if (typeof sqlCommand === 'string') {
                    this.nativeObject.execSQL(sqlCommand);
                }
            },
            enumerable: true
        },
        'query': {
            value: function(sqlCommand) {
                if (typeof sqlCommand === 'string') {
                    let nativeCursor = this.nativeObject.rawQuery(sqlCommand, null);
                    return new Database.QueryResult({
                        isInternal: true,
                        cursor: new SFQueryResult(nativeCursor)
                    });
                }
            },
            enumerable: true
        }
    });
}

Database.QueryResult = function(params) {

    if (!params || !params.isInternal) {
        throw new Error("Database.QueryResult in not creatable, Database.QueryResult will created with only Database.query");
    }

    this.nativeObject = params.cursor;

    Object.defineProperties(this, {
        'count': {
            value: function() {
                return this.nativeObject.getCount();
            }
        },
        'getFirst': {
            value: function() {
                return new Database.DatabaseObject({
                    isInternal: true,
                    cursorRefIndex: this.nativeObject.moveToFirst(),
                    cursor: this.nativeObject
                });
            }
        },
        'getLast': {
            value: function() {
                return new Database.DatabaseObject({
                    isInternal: true,
                    cursorRefIndex: this.nativeObject.moveToLast(),
                    cursor: this.nativeObject
                });
            }
        },
        'get': {
            value: function(location) {
                if (typeof location === 'number') {
                    return new Database.DatabaseObject({
                        isInternal: true,
                        cursorRefIndex: this.nativeObject.moveToPosition(int(location)),
                        cursor: this.nativeObject
                    });
                }
                else {
                    throw new Error("Parameter mismatch. Parameter must be Number for Database.QueryResult#get");
                }
            }
        },
    });

    this.android = {};
    Object.defineProperty(this.android, 'close', {
        value: () => {
            this.nativeObject.close();
        },
        enumerable: true
    });
};

Database.DatabaseObject = function(params) {

    if (!params || !params.isInternal) {
        throw new Error("Database.DatabaseObject in not creatable, Database.DatabaseObject will created with Database.QueryResult#getFirst, Database.QueryResult#getLast or Database.QueryResult#get");
    }

    this.nativeObject = params.cursor;
    let cursorRefIndex = params.cursorRefIndex;
    Object.defineProperties(this, {
        'getString': {
            value: function(columnName) {
                if (typeof columnName === 'string') {
                    let value = this.nativeObject.getString(cursorRefIndex, columnName);
                    return value;
                }
                else {
                    throw new Error("Parameter mismatch. Parameter must be String for Database.DatabaseObject#getString");
                }
            },
            enumerable: true
        },
        'getInteger': {
            value: function(columnName) {
                if (typeof columnName === 'string') {
                    let value = this.nativeObject.getInt(cursorRefIndex, columnName);
                    return value;
                }
                else {
                    throw new Error("Parameter mismatch. Parameter must be String for Database.DatabaseObject#getInteger");
                }
            },
            enumerable: true
        },
        'getBoolean': {
            value: function(columnName) {
                if (typeof columnName === 'string') {
                    let value = this.nativeObject.getBoolean(cursorRefIndex, columnName);
                    return value;
                }
                else {
                    throw new Error("Parameter mismatch. Parameter must be String for Database.DatabaseObject#getBoolean");
                }
            },
            enumerable: true
        },
        'getFloat': {
            value: function(columnName) {
                if (typeof columnName === 'string') {
                    let value = this.nativeObject.getFloat(cursorRefIndex, columnName);
                    return value;
                }
                else {
                    throw new Error("Parameter mismatch. Parameter must be String for Database.DatabaseObject#getFloat");
                }
            },
            enumerable: true
        },
    });
};

module.exports = Database;
