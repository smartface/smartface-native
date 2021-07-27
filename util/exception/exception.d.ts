/**
 * @type {{
 *   TypeError: {
 *      DEFAULT: "Parameter type must be ",
 *      NUMBER: "Parameter type must be number",
 *      STRING: "Parameter type must be string",
 *      BOOLEAN: "Parameter type must be boolean",
 *      OBJECT: "Parameter type must be object",
 *      ARRAY: "Parameter type must be array",
 *      FUNCTION: "Parameter type must be function",
 *      URL: "URL is not valid",
 *   }
 * }}
 */
declare const Exception: {
    readonly TypeError: {
        readonly DEFAULT: "Parameter type must be ";
        readonly NUMBER: "Parameter type must be number";
        readonly STRING: "Parameter type must be string";
        readonly BOOLEAN: "Parameter type must be boolean";
        readonly OBJECT: "Parameter type must be object";
        readonly ARRAY: "Parameter type must be array";
        readonly FUNCTION: "Parameter type must be function";
        readonly URL: "URL is not valid";
    }
};

export = Exception;
