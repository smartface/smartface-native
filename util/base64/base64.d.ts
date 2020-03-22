export = Base64Util;
/**
 * @type {{
*   Utf8ArrayToStr: (data:string[]) => string,
*   StrToUtf8Array: (data: string) => string[]
* }}
*/
declare const Base64Util: {
    Utf8ArrayToStr: (data: string[]) => string;
    StrToUtf8Array: (data: string) => string[];
};
