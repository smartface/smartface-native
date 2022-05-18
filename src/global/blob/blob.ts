import { INativeMobileComponent, MobileOSProps } from '../../core/native-mobile-component';

export interface IBlobAndroidProps {
  /**
   * Returns a new Blob object containing the data in the specified range of bytes of the existing Blob.
   *
   * @method slice
   * @since 0.1
   */
  slice?: (start: number, end: number) => IBlob;
}

/**
 * @class Blob
 * @since 0.1
 *
 * Blob is a binary large object.
 *
 *     @example
 *     import Blob from '@smartface/native/blob';
 *     var myBase64Str = "SGVsbG8gV29ybGQ=";
 *     var blob = Blob.createFromBase64(myBase64Str);
 */
export interface IBlob<TNative = any, TProps extends MobileOSProps<{}, IBlobAndroidProps> = MobileOSProps<{}, IBlobAndroidProps>> extends INativeMobileComponent<TNative, TProps> {
  /**
   * Returns the type of Blob data.
   *
   * @property {String} type
   * @readonly
   * @since 0.1
   */
  readonly type: string;
  /**
   * Returns blob size.
   *
   * @property {Number} size
   * @readonly
   * @since 0.1
   */
  readonly size: number;
  /**
   * Returns a base64 String
   *
   * @method toBase64
   * @since 0.1
   */
  toBase64: () => string;

  /**
   * Converts to base64 asynchronously
   *
   * @method toBase64Async
   * @param {Object} params Object describing parameters for the function.
   * @param {Function} params.onComplete Triggers when conversion is over.
   * @param {String} params.onComplete.base64
   * @param {Function} [params.onFailure] Triggers when failure situation occurred.
   * @android
   * @ios
   * @since 4.3.0
   */
  toBase64Async: (handlers: { onComplete: (base64: String) => void; onFailure?: () => void }) => void;

  /**
   *  * Returns a utf8 String
   *
   * @method toString
   * @since 0.1
   */
  toString: () => string;
}

export abstract class AbstractBlob implements IBlob {
  ios: Partial<{}>;
  android: Partial<IBlobAndroidProps>;
  nativeObject: any;
  abstract get type(): string;
  abstract get size(): number;
  abstract toBase64(): string;
  abstract toBase64Async(handlers: { onComplete: (base64: String) => void; onFailure?: () => void }): void;
  abstract toString(): string;
  /**
   * Creates a blob object from given a base64String.
   *
   * @param {String} base64String
   * @method createFromBase64
   * @return Blob
   * @static
   * @since 0.1
   */
  static createFromBase64(Base64String: string): AbstractBlob {
    throw new Error('Method not implemented');
  }
  /**
   * Creates a blob object from given a utf8 string.
   *
   * @param {String} utf8String
   * @method createFromUTF8String
   * @return Blob
   * @static
   * @since 0.1
   */
  static createFromUTF8String(utf8String: string): AbstractBlob {
    throw new Error('Method not implemented');
  }
}

export default IBlob;
