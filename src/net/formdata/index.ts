export default class FormData {
  _parts: Array<FormDataNameValuePair>;

  constructor() {
    this._parts = [];
  }

  append(key: string, value: FormDataValue) {
    this._parts.push([key, value]);
  }

  getParts(): Array<FormDataPart> {
    return this._parts.map(([name, value]) => {
      if (typeof value === 'object' && !Array.isArray(value) && value) {
        return { ...value, fieldName: name };
      }
      return { string: String(value), fieldName: name };
    });
  }
}
