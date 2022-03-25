import DocumentPicker from '.';
import File from '../../io/file';
import Page from '../../ui/page';
import { DocumentPickerBase, Types } from './documentpicker';

class DocumentPickerIOS implements DocumentPickerBase {
  static readonly Types = Types;
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
  }) {
    if (typeof params.page === 'object') {
      const type = params.type || [DocumentPicker.Types.ALLFILES];
      const documentPicker = new __SF_UIDocumentPickerViewController(type, 0);
      documentPicker.documentDelegate = new __SF_UIDocumentPickerViewControllerDelegate();

      documentPicker.documentDelegate.didPickDocumentsAtURLs = function (urls) {
        documentPicker.delegate = undefined;
        if (typeof params.onSuccess === 'function') {
          const file = new File({
            path: urls[0].path
          });
          params.onSuccess(file);
        }
      };

      documentPicker.documentDelegate.documentPickerWasCancelled = function () {
        if (typeof params.onCancel === 'function') {
          params.onCancel();
        }
      };

      documentPicker.delegate = documentPicker.documentDelegate;
      params.page.nativeObject.presentViewController(documentPicker);
    } else {
      throw Error('page parameter cannot be null');
    }
  }
}

export default DocumentPickerIOS;
