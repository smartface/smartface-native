namespace Exception {
  export enum TypeError {
    DEFAULT = 'Parameter type must be ',
    NUMBER = 'Parameter type must be number',
    STRING = 'Parameter type must be string',
    BOOLEAN = 'Parameter type must be boolean',
    OBJECT = 'Parameter type must be object',
    ARRAY = 'Parameter type must be array',
    FUNCTION = 'Parameter type must be function',
    URL = 'URL is not valid'
  }
}

export default Exception;
