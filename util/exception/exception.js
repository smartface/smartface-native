const Exception = {}

Exception.TypeError = {}

Exception.TypeError.DEFAULT = "Parameter type must be ";
Exception.TypeError.NUMBER = "Parameter type must be number";
Exception.TypeError.STRING = "Parameter type must be string";
Exception.TypeError.BOOLEAN = "Parameter type must be boolean";
Exception.TypeError.OBJECT = "Parameter type must be object";
Exception.TypeError.ARRAY = "Parameter type must be array";
Exception.TypeError.FUNCTION = "Parameter type must be function";

Exception.TypeError.URL = "URL is not valid";
Exception.TypeError.FILE = "File is not valid";

module.exports = Exception;