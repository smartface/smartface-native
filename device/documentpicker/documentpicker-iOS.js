const File = require("../../io/file");

var DocumentPicker = {};

DocumentPicker.ios = {};
DocumentPicker.android = {};

DocumentPicker.pick = function(params) {
	if (typeof params.page === 'object') {
		var type = params.type || [DocumentPicker.Types.ALLFILES];
		var documentPicker = new __SF_UIDocumentPickerViewController(type, 0);
		documentPicker.documentDelegate = new __SF_UIDocumentPickerViewControllerDelegate();

		documentPicker.documentDelegate.didPickDocumentsAtURLs = function(urls) {
			documentPicker.delegate = undefined;
			if (typeof params.onSuccess === 'function') {
				var file = new File({
					path: urls[0].path
				});
				params.onSuccess(file);
			}
		};

		documentPicker.documentDelegate.documentPickerWasCancelled = function() {
			if (typeof params.onCancel === 'function') {
				params.onCancel();
			}
		};

		documentPicker.delegate = documentPicker.documentDelegate;
		params.page.nativeObject.presentViewController(documentPicker);
	}
	else {
		throw Error("page parameter cannot be null");
	}
};

DocumentPicker.Types = {
	ALLFILES: "public.data",
	IMAGES: "public.image",
	PLAINTEXT: "public.plain-text",
	AUDIO: "public.audio",
	PDF: "com.adobe.pdf"
};

module.exports = DocumentPicker;