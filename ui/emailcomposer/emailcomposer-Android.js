const TypeUtil = require("../../util/type");
const RequestCodes = require("../../util/Android/requestcodes");

const NativeIntent = requireClass("android.content.Intent");
const NativeUri = requireClass("android.net.Uri");
const NativeHtml = requireClass("android.text.Html");


const EXTRA_CC = "android.intent.extra.CC";
const EXTRA_BCC = "android.intent.extra.BCC";
const EXTRA_EMAIL = "android.intent.extra.EMAIL";
const EXTRA_TEXT = "android.intent.extra.TITLE";
const EXTRA_SUBJECT = "android.intent.extra.SUBJECT";
const EXTRA_STREAM = "android.intent.extra.STREAM";
const ACTION_VIEW = "android.intent.action.VIEW";

var _closeCallback;
var self;

function EmailComposer(params) {

    self = this;
    self.nativeObject = new NativeIntent(ACTION_VIEW);
    self.nativeObject.setData(NativeUri.parse("mailto:"));

    self.ios = {};
    self.ios.addAttachmentForiOS = function(blob, mimeType, fileName) {};

    Object.defineProperties(self, {
        'setCC': {
            value: function(cc) {
                if (typeof cc === "object")
                    self.nativeObject.putExtra(EXTRA_CC, array(cc, "java.lang.String"));
            }
        },
        'setBCC': {
            value: function(bcc) {
                if (typeof bcc === "object")
                    self.nativeObject.putExtra(EXTRA_BCC, array(bcc, "java.lang.String"));
            }
        },
        'setTO': {
            value: function(to) {
                if (typeof to === "object")
                    self.nativeObject.putExtra(EXTRA_EMAIL, array(to, "java.lang.String"));
            }
        },
        'setMessage': {
            value: function(text, isHtmlText) {
                if (!isHtmlText && typeof text === "string") {
                    self.nativeObject.putExtra(EXTRA_TEXT, text);
                } else {
                    self.nativeObject.putExtra(EXTRA_TEXT, NativeHtml.fromHtml(text));
                }
            }
        },
        'setSubject': {
            value: function(subject) {
                if (typeof subject === "string") {
                    self.nativeObject.putExtra(EXTRA_SUBJECT, subject);
                }
            }
        },
        'show': {
            value: function(page) {
                if (self.nativeObject && page) {
                    page.nativeObject.startActivityForResult(self.nativeObject, EmailComposer.EMAIL_REQUESTCODE);
                }
            }
        },
        'canSendMail': {
            get: function() {
                return true; //always return true
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

    self.android = {};
    Object.defineProperty(self.android, 'addAttachmentForAndroid', {
        value: function(attachment) {
            const File = require('../../io/file');
            if (attachment instanceof File) {
                var absulotePath = attachment.nativeObject.getAbsolutePath();
                self.nativeObject.putExtra(EXTRA_STREAM, NativeUri.parse("file://" + absulotePath));
            }
        }
    });
}

EmailComposer.EMAIL_REQUESTCODE = RequestCodes.EmailComposer.EMAIL_REQUESTCODE;
EmailComposer.onActivityResult = function(requestCode, resultCode, data) {
    _closeCallback && self.onClose();
};

EmailComposer.canSendMail = function() {
    return true;
};

module.exports = EmailComposer;