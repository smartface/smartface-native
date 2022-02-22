import { Database, BaseDatabase } from './database';
import File from '../../../io/file';

class DatabaseIOS extends BaseDatabase {
  constructor(params?: { file?: File; inMemory?: boolean }) {
    super();
    if (!this.nativeObject) {
      if (params.inMemory) {
        this.nativeObject = new __SF_Database(':memory:');
      } else {
        //TODO: file needs nativeObject
        this.nativeObject = new __SF_Database(params.file.nativeObject.getActualPath());
      }
    }

    if (this.nativeObject === null) {
      throw new Error('Create or Read Database failed. Invalid file.');
    }

    this.nativeObject.errorHandler = function (e) {
      throw new Error(e.message);
    };

    this.file = params.file;
  }
  close() {}
  execute(sqlCommand: string) {
    if (typeof sqlCommand === 'string') {
      this.nativeObject.run(sqlCommand);
    }
  }
  query(query: string) {
    if (typeof query === 'string') {
      return new DatabaseIOS.QueryResult({
        data: this.nativeObject.prepare(query)
      });
    }
  }
  static QueryResult: typeof QueryResult;
  static DatabaseObject: typeof DatabaseObject;
}

export class QueryResult implements Database.QueryResult {
  private _data: any;
  constructor(params?: { data: any }) {
    this._data = params.data;
  }
  android = {
    close() {}
  };
  count() {
    if (this._data && this._data.dataArray) {
      return this._data.dataArray.length;
    } else {
      return null;
    }
  }
  getFirst() {
    if (this._data && this._data.dataArray) {
      return new DatabaseIOS.DatabaseObject({
        data: this._data.dataArray[0],
        columnNames: this._data.columnNames
      });
    }
    return null;
  }
  getLast() {
    if (this._data && this._data.dataArray) {
      return new DatabaseIOS.DatabaseObject({
        data: this._data.dataArray[this.count() - 1],
        columnNames: this._data.columnNames
      });
    }
    return null;
  }
  get(location: number) {
    if (this._data && this._data.dataArray) {
      return new DatabaseIOS.DatabaseObject({
        data: this._data.dataArray[location],
        columnNames: this._data.columnNames
      });
    }
    return null;
  }
}

export class DatabaseObject implements Database.DatabaseObject {
  private _data: any;
  private _columnNames: string[];
  constructor(params?: { data: any; columnNames: string[] }) {
    this._data = params.data;
    this._columnNames = params.columnNames;
  }
  getString(columnName: string) {
    return this.getData(columnName);
  }

  getInteger(columnName: string) {
    return this.getData(columnName);
  }

  getBoolean(columnName: string) {
    return this.getData(columnName);
  }

  getFloat(columnName: string) {
    return this.getData(columnName);
  }

  getData(columnName: string) {
    if (typeof columnName === 'string') {
      const index = this._columnNames.indexOf(columnName);
      if (index !== -1 && this._data && this._data.length > 0) {
        return this._data[index];
      }
      return null;
    } else {
      throw new Error('Parameter mismatch. Parameter must be String');
    }
  }
}

export default DatabaseIOS;
