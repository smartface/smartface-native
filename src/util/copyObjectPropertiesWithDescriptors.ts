/**
 * This internal method will be used for inheriting OS specific getter and setters.
 * This also helps for composition between multiple objects across different files.
 * 
 * @param target 
 * @param args 
 * @example
 * ```
 * // base class
 * const self = this;
 *  const android = {
      get test() {
        return self._test;
      },
      set test(value: string) {
        self._test = value;
      }
    };
    // child class
    const self = this;
 *  const android = {
      get test() {
        this.doStuffBefore();
        return self._test;
      },
      set test(value: string) {
        this.setOtherStuff();
        self._test = value;
      }
    };
    // Not always necessary
 *  const otherAndroid = {
      get test() {
        this.doStuffBefore();
        return self._test;
      }
    };
    copyObjectPropertiesWithDescriptors(this._android, android, otherAndroid)
 * ```
 */
export default function copyObjectPropertiesWithDescriptors(target: Record<string, any>, ...args: Record<string, any>[]) {
  args.forEach((obj) => Object.defineProperties(target, Object.getOwnPropertyDescriptors(obj)));
}
