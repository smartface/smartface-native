import NativeComponent from '../../../core/native-component';
import File from '../../../io/file';
import { Database, BaseDatabase } from './database';

const NativeSQLiteDatabase = requireClass('android.database.sqlite.SQLiteDatabase');

class DatabaseAndroid extends BaseDatabase {
  private _file: File;
  constructor(params?: { file?: File; inMemory?: boolean }) {
    super();
    this.nativeObject = null;
    this._file = params.file;

    if (typeof params.inMemory === 'boolean' && params.inMemory) {
      this.nativeObject = NativeSQLiteDatabase.create(null);
    } else if (params.file instanceof File) {
      if (params.file.type === Path.FILE_TYPE.FILE) {
        //TODO: file needs nativeObject
        this.nativeObject = NativeSQLiteDatabase.openOrCreateDatabase(params.file.nativeObject, null);
      } else if (params.file.type === Path.FILE_TYPE.RAU_ASSETS || params.file.type === Path.FILE_TYPE.EMULATOR_ASSETS) {
        if (!params.file.exists) {
          throw new Error('Open Database from Assets failed. Database not exists and cannot create database on assets');
        }
        //TODO: file needs nativeObject
        this.nativeObject = NativeSQLiteDatabase.openOrCreateDatabase(params.file.nativeObject, null);
      } else if (params.file.type === Path.FILE_TYPE.ASSETS) {
        const destinationOnRoot = new File({
          path: Path.DataDirectory + '/' + params.file.name
        });
        if (!destinationOnRoot.exists) {
          const copyResult = params.file.copy(destinationOnRoot.path);
          if (!copyResult) {
            throw new Error('Open Database from Assets failed.');
          }
        }
        //TODO: file needs nativeObject
        this.nativeObject = NativeSQLiteDatabase.openOrCreateDatabase(destinationOnRoot.nativeObject, null);
      }
    }

    if (this.nativeObject === null) {
      throw new Error('Create or Read Database failed. Invalid file.');
    }
  }
  close() {
    this.nativeObject.close();
  }
  execute(query: string) {
    if (typeof query === 'string') {
      return new DatabaseAndroid.QueryResult({
        isInternal: true,
        cursor: this.nativeObject.rawQuery(query, null)
      });
    }
  }
  query(query: string) {
    if (typeof query === 'string') {
      return new DatabaseAndroid.QueryResult({
        isInternal: true,
        cursor: this.nativeObject.rawQuery(query, null)
      });
    }
  }
  static QueryResult: typeof QueryResult;
  static DatabaseObject: typeof DatabaseObject;
}

export class QueryResult extends NativeComponent implements Database.QueryResult {
  constructor(params?: { isInternal: boolean; cursor: any }) {
    super();
    if (!params || !params.isInternal) {
      throw new Error('Database.QueryResult in not creatable, Database.QueryResult will created with only Database.query');
    }
    this.nativeObject = params.cursor;
  }
  count() {
    return this.nativeObject.getCount();
  }
  getFirst() {
    this.nativeObject.moveToFirst();
    return new DatabaseAndroid.DatabaseObject({
      isInternal: true,
      cursor: this.nativeObject
    });
  }
  getLast() {
    this.nativeObject.moveToLast();
    return new DatabaseAndroid.DatabaseObject({
      isInternal: true,
      cursor: this.nativeObject
    });
  }
  get(location: number) {
    if (typeof location === 'number') {
      this.nativeObject.moveToPosition(int(location));
      return new DatabaseAndroid.DatabaseObject({
        isInternal: true,
        cursor: this.nativeObject
      });
    } else {
      throw new Error('Parameter mismatch. Parameter must be Number for Database.QueryResult#get');
    }
  }
  android = {
    close() {
      this.nativeObject.close();
    }
  };
}

export class DatabaseObject extends NativeComponent implements Database.DatabaseObject {
  constructor(params?: { isInternal: boolean; cursor: any }) {
    super();
    if (!params || !params.isInternal) {
      throw new Error('Database.DatabaseObject in not creatable, Database.DatabaseObject will created with Database.QueryResult#getFirst, Database.QueryResult#getLast or Database.QueryResult#get');
    }
    this.nativeObject = params.cursor;
  }
  getString(columnName: string) {
    if (typeof columnName === 'string') {
      const index = this.nativeObject.getColumnIndex(columnName);
      if (index !== -1) {
        return this.nativeObject.getString(index);
      }
      return null;
    } else {
      throw new Error('Parameter mismatch. Parameter must be String for Database.DatabaseObject#getString');
    }
  }
  getInteger(columnName: string) {
    if (typeof columnName === 'string') {
      const index = this.nativeObject.getColumnIndex(columnName);
      if (index !== -1) {
        return this.nativeObject.getInt(index);
      }
      return null;
    } else {
      throw new Error('Parameter mismatch. Parameter must be String for Database.DatabaseObject#getInteger');
    }
  }
  getBoolean(columnName: string) {
    if (typeof columnName === 'string') {
      const index = this.nativeObject.getColumnIndex(columnName);
      if (index !== -1) {
        return this.nativeObject.getBoolean(index);
      }
      return null;
    } else {
      throw new Error('Parameter mismatch. Parameter must be String for Database.DatabaseObject#getBoolean');
    }
  }
  getFloat(columnName: string) {
    if (typeof columnName === 'string') {
      const index = this.nativeObject.getColumnIndex(columnName);
      if (index !== -1) {
        return this.nativeObject.getFloat(index);
      }
      return null;
    } else {
      throw new Error('Parameter mismatch. Parameter must be String for Database.DatabaseObject#getFloat');
    }
  }
}

export default DatabaseAndroid;
