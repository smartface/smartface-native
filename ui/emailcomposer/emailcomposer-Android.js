const TypeUtil = require("../../util/type");

const NativeIntent = requireClass("android.content.Intent");
const NativeUri = requireClass("android.net.Uri");

var _closeCallback;
var self;
function EmailComposer(params) {

    self = this;
    self.nativeObject = new NativeIntent(NativeIntent.ACTION_VIEW);
    self.nativeObject.setData(NativeUri.parse("mailto:"));


    Object.defineProperties(self, {
        'setCC': {
            value: function(cc) {
                if (typeof cc === "object")
                    self.nativeObject.putExtra(NativeIntent.EXTRA_CC, array(cc, "java.lang.String"));
            }
        },
        'setBCC': {
            value: function(bcc) {
                if (typeof bcc === "object")
                    self.nativeObject.putExtra(NativeIntent.EXTRA_BCC, array(bcc, "java.lang.String"));
            }
        },
        'setTO': {
            value: function(to) {
                if (typeof to === "object")
                    self.nativeObject.putExtra(NativeIntent.EXTRA_EMAIL, array(to, "java.lang.String"));
            }
        },
        'setMessage': {
            value: function(text, isHtmlText) {
                if (!isHtmlText && typeof text === "string") {
                    self.nativeObject.putExtra(NativeIntent.EXTRA_TEXT, text);
                }
                else {
                    self.nativeObject.putExtra(NativeIntent.EXTRA_HTML_TEXT, text);
                }
            }
        },
        'setSubject': {
            value: function(subject) {
                if (typeof subject === "string") {
                    self.nativeObject.putExtra(NativeIntent.EXTRA_SUBJECT, subject);
                }
            }
        },
        'show': {
            value: function(page) {
                if (self.nativeObject && page) {
                    page.nativeObject.startActivityForResult(self.nativeObject, EmailComposer.EMAIL_REQUESTCODE);
                }
            }
        }
    });

    Object.defineProperty(self, 'onClose', {
        get: function() {
            return _closeCallback;
        },
        set: function(callback) {
            if (!TypeUtil.isFunction(callback))
                return;
            _closeCallback = callback;
        },
        enumerable: true
    });


    Object.defineProperty(self, 'addAttachmentForAndroid', {
        value: function(attachment) {
            const File = require('sf-core/io/file');
            if (attachment instanceof File) {
                let absulotePath = attachment.nativeObject.getAbsolutePath();
                self.nativeObject.putExtra(NativeIntent.EXTRA_STREAM, NativeUri.parse("file://" + absulotePath));
            }
        }
    });
}

EmailComposer.EMAIL_REQUESTCODE = 57;
EmailComposer.onActivityResult = function(requestCode, resultCode, data) {
    _closeCallback && self.onClose();
}


module.exports = EmailComposer;
