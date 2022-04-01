type FormDataValue = string | { name?: string; type?: string; uri: string };
type FormDataNameValuePair = [string, FormDataValue];

type Headers = { [name: string]: string };
type FormDataPart =
  | {
      string: string;
      headers: Headers;
    }
  | {
      uri: string;
      headers: Headers;
      name?: string;
      type?: string;
    };

export class FormData {
  _parts: Array<FormDataNameValuePair>;

  constructor() {
    this._parts = [];
  }

  append(key: string, value: FormDataValue) {
    this._parts.push([key, value]);
  }

  getParts(): Array<FormDataPart> {
    return this._parts.map(([name, value]) => {
      const contentDisposition = 'form-data; name="' + name + '"';

      const headers: Headers = { 'content-disposition': contentDisposition };
      if (typeof value === 'object' && !Array.isArray(value) && value) {
        if (typeof value.name === 'string') {
          headers['content-disposition'] += '; filename="' + value.name + '"';
        }
        if (typeof value.type === 'string') {
          headers['content-type'] = value.type;
        }
        return { ...value, headers, fieldName: name };
      }
      return { string: String(value), headers, fieldName: name };
    });
  }
}