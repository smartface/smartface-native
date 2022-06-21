/**
 * @class Data
 * @since 0.1
 *
 * Data is an interface for storing key data on Device like user information, login data or token.
 *
 *     @example
 *     import Data from '@smartface/native/data';
 *
 *     Data.setStringVariable('userName','Smartface');
 *     Data.setStringVariable('userEmail','info@smartface.io');
 *     Data.setIntVariable('userAge',5);
 *     Data.setBooleanVariable('userLogged',true);
 *
 *     // get values from Data
 *     let userName = Data.getStringVariable('userName');
 *     let userEmail = Data.getStringVariable('userEmail');
 *
 */

export interface IData {
  /**
   * Get stored string type variable. If variable is not exists, will return null.
   *
   * @method getStringVariable
   * @param {String} key
   * @return {String}
   * @android
   * @ios
   * @since 0.1
   */
  getStringVariable(key: string): string | null;
  /**
   * Get stored boolean type variable. If variable is not exists, will return null.
   *
   * @method getBooleanVariable
   * @param {String} key
   * @return {Boolean}
   * @android
   * @ios
   * @since 0.1
   */
  getBooleanVariable(key: string): boolean | null;
  /**
   * Get stored integer type variable. If variable is not exists, will return null
   *
   * @method getIntVariable
   * @param {String} key
   * @return {Number}
   * @android
   * @ios
   * @since 0.1
   */
  getIntVariable(key: string): number | null;
  /**
   * Get stored float type variable. If variable is not exists, will return null
   *
   * @method getFloatVariable
   * @param {String} key
   * @return {Number}
   * @android
   * @ios
   * @since 0.1
   */
  getFloatVariable(key: string): number | null;
  /**
   * Get stored long type variable. If variable is not exists, will return null
   *
   * @method getLongVariable
   * @param {String} key
   * @return {Number}
   * @android
   * @ios
   * @since 0.1
   */
  getLongVariable(key: string): number | null;
  /**
   * Store string type variable
   *
   * @method setStringVariable
   * @param {String} key
   * @param {String} value
   * @android
   * @ios
   * @since 0.1
   */
  setStringVariable(key: string, value: string): void;
  /**
   * Store boolean type variable
   *
   * @method setBooleanVariable
   * @param {String} key
   * @param {Boolean} value
   * @android
   * @ios
   * @since 0.1
   */
  setBooleanVariable(key: string, value: boolean): void;
  /**
   * Store integer type variable
   *
   * @method setIntVariable
   * @param {String} key
   * @param {Number} value
   * @android
   * @ios
   * @since 0.1
   */
  setIntVariable(key: string, value: number): void;
  /**
   * Store float type variable
   *
   * @method setFloatVariable
   * @param {String} key
   * @param {Number} value
   * @android
   * @ios
   * @since 0.1
   */
  setFloatVariable(key: string, value: number): void;
  /**
   * Store long type variable
   *
   * @method setLongVariable
   * @param {String} key
   * @param {Number} value
   * @android
   * @ios
   * @since 0.1
   */
  setLongVariable(key: string, value: number): void;

  /**
   * Check variable exist within storaged variables.
   *
   * @method containsVariable
   * @param {String} key
   * @return {Boolean}
   * @android
   * @ios
   * @since 0.1
   */
  containsVariable(key: string): boolean;
  /**
   * Remove variable.
   *
   * @method removeVariable
   * @param {String} key
   * @android
   * @ios
   * @since 0.1
   */
  removeVariable(key: string): void;
  /**
   * Removes all variables from storage regardless of their types
   *
   * @method removeAllVariables
   * @param {String} key
   * @android
   * @ios
   * @since 0.1
   */
  removeAllVariables(): void;
}
