import { INativeMobileComponent, MobileOSProps } from '../../core/native-mobile-component';

interface SecureDataIOSProps {
  service: string;
}

interface ISecureData extends INativeMobileComponent<any, MobileOSProps<SecureDataIOSProps, {}>> {
  /**
   * Saves the given value to the secure data.
   */
  save(params: { value: string }): Promise<void>;
  /**
   * Reads the value from the secure data.
   */
  read(): Promise<any>;
  /**
   * Deletes the value from the secure data.
   */
  delete(): Promise<void>;
  /**
   * Gets the key of the secure data.
   */
  readonly key: string;
}

export default ISecureData;
