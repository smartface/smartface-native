import File from '../../io/file';
import Page from '../../ui/page';

export enum Types {
  /**
   * @property {String} ALLFILES All document types, on Android this is &#42;&#47;&#42;, on iOS is is public.data.
   * @static
   * @readonly
   * @android
   * @ios
   * @since 4.1.5
   */
  ALLFILES = '*/*',
  /**
   * @property {String} IMAGES All image types (image/* or public.image).
   * @static
   * @readonly
   * @android
   * @ios
   * @since 4.1.5
   */
  IMAGES = 'image/*',
  /**
   * @property {String} PLAINTEXT Plain text files ie: .txt (text/plain or public.plain-text).
   * @static
   * @readonly
   * @android
   * @ios
   * @since 4.1.5
   */
  PLAINTEXT = 'text/plain',
  /**
   * @property {String} AUDIO All audio types (audio/* or public.audio).
   * @static
   * @readonly
   * @android
   * @ios
   * @since 4.1.5
   */
  AUDIO = 'audio/*',
  /**
   * @property {String} PDF PDF documents (application/pdf or com.adobe.pdf).
   * @static
   * @readonly
   * @android
   * @ios
   * @since 4.1.5
   */
  PDF = 'application/pdf'
}

/**
 * @class Device.DocumentPicker
 * @since 4.1.5
 *
 * This class provides access to documents.
 *
 * @example
 *     import DocumentPicker from '@smartface/native/device/documentpicker';
 *
 *     DocumentPicker.pick({
 *      page,
 *      type: [DocumentPicker.Types.PDF],
 *      onSuccess: function (file) {
 *          console.log("onSuccess : ",file.path);
 *       },
 *      onCancel: function () {
 *          console.log("onCancel");
 *       }
 *     });
 *
 */
export class DocumentPickerBase {
  /**
   * @enum {String} Device.DocumentPicker.Types
   * @since 4.1.5
   * @android
   * @ios
   *
   * Provides a few common types for use as type values.
   */
  static readonly Types = Types;
  /**
   * Use pick to open a document picker for the user to select file.
   *
   * @param {Object} params
   * @param {UI.Page} params.page
   * @param {[DocumentPicker.Types]} params.type On Android these are MIME types such as text/plain or partial MIME types such as image/*. On iOS these must be Apple "Uniform Type Identifiers". Also can use {@link Device.DocumentPicker.Types}.
   * @param {Function} params.onSuccess This event is called after picking document successfully.
   * @param {IO.File} params.onSuccess.file
   * @param {Function} params.onCancel If the user cancels the document picker without choosing a file (by pressing the system back button on Android or the Cancel button on iOS) the Promise will be rejected with a cancellation error.
   * @param {Function} params.onFailure
   * @method pick
   * @android
   * @ios
   * @since 4.1.5
   */
  static pick(params: {
    page: Page;
    /** On Android these are MIME types such as text/plain or partial MIME types such as image/*. On iOS these must be Apple "Uniform Type Identifiers". Also can use {@link Device.DocumentPicker.Types}. */
    type: Types[];
    /** This event is called after picking document successfully. */
    onSuccess: (file: File) => void;
    /** If the user cancels the document picker without choosing a file (by pressing the system back button on Android or the Cancel button on iOS) the Promise will be rejected with a cancellation error. */
    onCancel: () => void;
    /** Android only, if any runtime error occures, this method will be called. This method will be ignored on iOS */
    onFailure: (e?: Error) => void;
  }): void {
    throw new Error('Method not implemented.');
  }
}

const DocumentPicker: typeof DocumentPickerBase = require(`./documentpicker.${Device.deviceOS.toLowerCase()}`).default;
type DocumentPicker = DocumentPickerBase;

export default DocumentPicker;
