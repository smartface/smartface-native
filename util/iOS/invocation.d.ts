declare class Invocation {
  static invokeInstanceMethod(target: any, selector: any, argumentsArray: any, returnValueType: any);
  static invokeClassMethod(target: any, selector: any, argumentsArray: any, returnValueType: any);
  static Argument(params: any);
  type: any;
  value: any;
}

export = Invocation;
