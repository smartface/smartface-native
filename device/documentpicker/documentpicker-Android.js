/* global requireClass array require module*/
const SFDocumentPicker = requireClass('io.smartface.android.sfcore.device.documentpicker.SFDocumentPicker');
const RequestCode = require('../../util/Android/requestcodes');

const DocumentPicker = {};
var _onSuccess, _onCancel, _onFailure;
DocumentPicker.pick = function (params) {
    const { page, onSuccess, onCancel, onFailure, type = [] } = params;
    _onSuccess = onSuccess;
    _onCancel = onCancel;
    _onFailure = onFailure;

    if (page)
        SFDocumentPicker.pick(page.nativeObject, array(type, "java.lang.String"), RequestCode.DocumentPicker.PICK_DOCUMENT_CODE);
    else
        throw Error("page parameter cannot be null");
};

DocumentPicker.onActivityResult = function (requestCode, resultCode, data) {
    if (resultCode === 0) {
        _onCancel && _onCancel();
        return;
    }
    try {
        const File = require("../../io/file");
        let uri = data.getData();
        let filePath = SFDocumentPicker.getFilePathFromUri(uri);
        let pickedFile = new File({
            path: filePath
        });
        _onSuccess && _onSuccess(pickedFile);
    } catch (e) {
        _onFailure && _onFailure(e);
    }
}

DocumentPicker.Types = {
    ALLFILES: "*/*",
    IMAGES: "image/*",
    PLAINTEXT: "text/plain",
    AUDIO: "audio/*",
    PDF: "application/pdf"
};

DocumentPicker.ios = {};

module.exports = DocumentPicker;