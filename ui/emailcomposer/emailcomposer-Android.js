const NativeIntent = requireClass("android.content.Intent");
const NativeUri = requireClass("android.net.Uri");

function EmailComposer(params) {

    const self = this;

    const nativeIntent = new NativeIntent(NativeIntent.ACTION_VIEW);
    nativeIntent.setData(NativeUri.parse("mailto:"));



    var _CC, _BCC, _TO, _htmlText, _subject, _text, _title, _attachment;
    Object.defineProperties(self, {
        'setCC': {
            value: function(cc) {
                if (typeof cc === "array")
                    nativeIntent.putExtra(NativeIntent.EXTRA_CC, array(cc, "java.lang.String"));
            }
        },
        'setBCC': {
            value: function(bcc) {
                if (typeof bcc === "array")
                    nativeIntent.putExtra(NativeIntent.EXTRA_BCC, array(bcc, "java.lang.String"));
            }
        },
        'setTO': {
            value: function(to) {
                if (typeof to === "array")
                    nativeIntent.putExtra(NativeIntent.EXTRA_EMAIL, array(to, "java.lang.String"));
            }
        },
        'setMessage': {
            value: function(text, isHtmlText) {
                if (!isHtmlText && text.isString()) {
                    nativeIntent.putExtra(NativeIntent.EXTRA_TEXT, text);
                }
                else {

                }
            }
        },
        'setSubject': {
            value: function(subject) {
                if (title.isString()) {
                    nativeIntent.putExtra(NativeIntent.EXTRA_TITLE, title);
                }
            }
        },
        'addAttachment': {
            value: function(attachment) {
                const File = require('sf-core/io/file');

                if (attachment instanceof File) {
                    let absulotePath = attachment.nativeObject.getAbsolutePath();
                    nativeIntent.putExtra(NativeIntent.EXTRA_STREAM, NativeUri.parse("file://" + absulotePath));
                }
            }
        }
    });


    Object.keys(params || {}).forEach(function(key) {
        this[key]
    });
}
