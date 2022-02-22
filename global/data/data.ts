/**
 * @class Data
 * @since 0.1
 *
 * Data is an interface for storing key data on Device like user information, login data or token.
 *
 *     @example
 *     const Data = require('@smartface/native/data');
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
export declare class BaseData {
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
  static getStringVariable: (key: string) => string;
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
  static getBooleanVariable: (key: string) => boolean;
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
  static getIntVariable: (key: string) => number;
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
  static getFloatVariable: (key: string) => number;
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
  static getLongVariable: (key: string) => number;
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
  static setStringVariable: (key: string, value: string) => void;
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
  static setBooleanVariable: (key: string, value: boolean) => void;
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
  static setIntVariable: (key: string, value: number) => void;
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
  static setFloatVariable: (key: string, value: number) => void;
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
  static setLongVariable: (key: string, value: number) => void;

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
  static containsVariable: (key: string) => boolean;
  /**
   * Remove variable.
   *
   * @method removeVariable
   * @param {String} key
   * @android
   * @ios
   * @since 0.1
   */
  static removeVariable: (key: string) => void;
  /**
   * Removes all variables from storage regardless of their types
   *
   * @method removeAllVariables
   * @param {String} key
   * @android
   * @ios
   * @since 0.1
   */
  static removeAllVariables: (key: string) => void;
}
