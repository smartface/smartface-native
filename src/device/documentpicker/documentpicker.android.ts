import File from '../../io/file';
import Page from '../../ui/page';
import * as RequestCodes from '../../util/Android/requestcodes';
import { DocumentPickerBase, Types } from '.';
const SFDocumentPicker = requireClass('io.smartface.android.sfcore.device.documentpicker.SFDocumentPicker');

class DocumentPickerAndroid implements DocumentPickerBase {
  static readonly Types = Types;
  static _onSuccess: (file: File) => void;
  static _onCancel: () => void;
  static _onFailure: (e?: Error) => void;
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
    const { page, onSuccess, onCancel, onFailure, type = [] } = params;
    DocumentPickerAndroid._onSuccess = onSuccess;
    DocumentPickerAndroid._onCancel = onCancel;
    DocumentPickerAndroid._onFailure = onFailure;

    if (page) {
      SFDocumentPicker.pick(page.nativeObject, array(type, 'java.lang.String'), RequestCodes.DocumentPicker.PICK_DOCUMENT_CODE);
    } else throw Error('page parameter cannot be null');
  }
  static onActivityResult(requestCode, resultCode, data) {
    if (resultCode === 0) {
      DocumentPickerAndroid._onCancel && DocumentPickerAndroid._onCancel();
      return;
    }
    try {
      const uri = data.getData();
      const filePath = SFDocumentPicker.getFilePathFromUri(uri);
      const pickedFile = new File({
        path: filePath
      });
      DocumentPickerAndroid._onSuccess?.(pickedFile);
    } catch (e) {
      DocumentPickerAndroid._onFailure?.(e);
    }
  }
}

export default DocumentPickerAndroid;
