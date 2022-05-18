namespace TypeUtil {
  export function isNumeric(param: any) {
    return typeof param === 'number';
  }
  export function isBoolean(param: any) {
    return typeof param === 'boolean';
  }
  export function isString(param: any) {
    return typeof param === 'string';
  }
  export function isObject(param: any) {
    return typeof param !== null && !Array.isArray(param);
  }
  export function isFunction(param: any) {
    return typeof param === 'function';
  }
  export function isArray(param: any) {
    return Array.isArray(param);
  }
  export function isURL(param: any) {
    const pattern = new RegExp(
      '^((ft|htt)ps?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name and extension
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?' + // port
        '(\\/[-a-z\\d%@_.~+&:]*)*' + // path
        '(\\?[;&a-z\\d%@_.,~+&:=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // fragment locator
    return pattern.test(param);
  }
}

export function isNotEmpty<TValue = any>(value: TValue): value is TValue extends undefined | null ? never : TValue {
  return value !== null && value !== undefined;
}

export default TypeUtil;
