import { Point2D } from '../../primitive/point2d';
import { Size } from '../../primitive/size';
import Color from '../../ui/color';

namespace Invocation {
  export function invokeInstanceMethod(target: __SF_NSOBject, selector: string, argumentsArray: Invocation.Argument[], returnValueType?: 'NSObject'): __SF_NSOBject;
  export function invokeInstanceMethod(target: __SF_NSOBject, selector: string, argumentsArray: Invocation.Argument[], returnValueType?: 'id'): __SF_NSOBject;
  export function invokeInstanceMethod(target: __SF_NSOBject, selector: string, argumentsArray: Invocation.Argument[], returnValueType?: 'CGFloat'): number;
  export function invokeInstanceMethod(target: __SF_NSOBject, selector: string, argumentsArray: Invocation.Argument[], returnValueType?: 'CGSize'): Size;
  export function invokeInstanceMethod(target: __SF_NSOBject, selector: string, argumentsArray: Invocation.Argument[], returnValueType?: 'CGPoint'): Point2D;
  export function invokeInstanceMethod(target: __SF_NSOBject, selector: string, argumentsArray: Invocation.Argument[], returnValueType?: 'CGColor'): __SF_UIColor;
  export function invokeInstanceMethod(target: __SF_NSOBject, selector: string, argumentsArray: Invocation.Argument[], returnValueType?: 'CGRect'): __SF_NSRect;
  export function invokeInstanceMethod(target: __SF_NSOBject, selector: string, argumentsArray: Invocation.Argument[], returnValueType?: 'NSInteger'): number;
  export function invokeInstanceMethod(target: __SF_NSOBject, selector: string, argumentsArray: Invocation.Argument[], returnValueType?: 'NSString'): string;
  export function invokeInstanceMethod(target: __SF_NSOBject, selector: string, argumentsArray: Invocation.Argument[], returnValueType?: 'BOOL'): boolean;
  // export function invokeInstanceMethod( target: __SF_NSOBject,
  //   selector: string,
  //   argumentsArray: Invocation.Argument[],
  //   returnValueType?: string): __SF_NSOBject | number | string | Point2D | Size | Invocation.Argument;
  export function invokeInstanceMethod(target: __SF_NSOBject, selector: string, argumentsArray: Invocation.Argument[], returnValueType?: string): any {
    const invocation = __SF_NSInvocation.createInvocationWithSelectorInstance(selector, target);
    if (invocation) {
      invocation.target = target;
      invocation.setSelectorWithString(selector);
      invocation.retainArguments();
      for (let i = 0; i < argumentsArray.length; i++) {
        invocation['set' + argumentsArray[i].type + 'ArgumentAtIndex'](argumentsArray[i].value, i + 2);
      }

      invocation.invoke();
      if (returnValueType) {
        return invocation['get' + returnValueType + 'ReturnValue']();
      }
    }
  }

  export function invokeClassMethod(target: string, selector: string, argumentsArray: Invocation.Argument[], returnValueType?: string): __SF_NSOBject | undefined {
    const invocation = __SF_NSInvocation.createClassInvocationWithSelectorInstance(selector, target);
    if (invocation) {
      invocation.setClassTargetFromString(target);
      invocation.setSelectorWithString(selector);
      invocation.retainArguments();
      for (let i = 0; i < argumentsArray.length; i++) {
        invocation['set' + argumentsArray[i].type + 'ArgumentAtIndex'](argumentsArray[i].value, i + 2);
      }

      invocation.invoke();

      if (returnValueType) {
        return invocation['get' + returnValueType + 'ReturnValue']();
      }
    }
  }

  export class Argument {
    private _type: string;
    private _value: any;

    constructor(params: any) {
      for (const param in params) {
        this[param] = params[param];
      }
    }

    get type(): string {
      return this._type;
    }
    set type(type: string) {
      this._type = type;
    }
    get value(): any {
      return this._value;
    }

    set value(value: any) {
      this._value = value;
    }
  }
}

export default Invocation;
