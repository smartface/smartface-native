/* global requireClass */
const AndroidConfig = require("../../util/Android/androidconfig");
const NativeIntent = requireClass('android.content.Intent');
const NativeBuildConfig = requireClass(AndroidConfig.activity.getPackageName() + ".BuildConfig");
const NativeFileProvider = requireClass('android.support.v4.content.FileProvider');

const Authority = NativeBuildConfig.APPLICATION_ID + ".provider";

const Share = {};
Object.defineProperties(Share, {
    'shareText': {
        value: function(text, page, blacklist) {
            shareContent({
                type: "text/plain",
                extra: text,
                extraType: NativeIntent.EXTRA_TEXT
            });
        }
    },
    'shareImage': {
        value: function(image, page, blacklist) {
            var imageFile = writeImageToFile(image);
            let uri = getUriFromFile(imageFile);

            shareContent({
                type: "image/*",
                extra: uri,
                extraType: NativeIntent.EXTRA_STREAM,
                actionType: NativeIntent.ACTION_SEND
            });
        }
    },
    'shareFile': {
        value: function(file, page, blacklist) {
            let uri = getUriFromFile(file.nativeObject);

            shareContent({
                type: "application/*",
                extra: uri,
                extraType: NativeIntent.EXTRA_STREAM,
                actionType: NativeIntent.ACTION_SEND
            });
        }
    },
    'share': {
        value: function(params) {
            const File = require("sf-core/io/file");
            const Image = require("sf-core/ui/image");
            const NativeArrayList = requireClass("java.util.ArrayList");


            let itemList = params.items || [];
            let shareIntent = new NativeIntent(NativeIntent.ACTION_SEND_MULTIPLE);
            shareIntent.setType("*/*");

            let contentSharing = { mimeTypes: [], parcelabels: new NativeArrayList() };
            addContent.bind(contentSharing);

            itemList.forEach((item) => {
                if (item instanceof File) {
                    addContent(item.nativeObject, "application/*");
                }
                else if (typeof(item) === 'string') {
                    shareIntent.putExtra(NativeIntent.EXTRA_TEXT, item);
                    contentSharing.mimeTypes.push("text/plain");
                }
                else if (item instanceof Image) {
                    addContent(item.nativeObject, "image/*");
                }
            });
            !(contentSharing.parcelabels.isEmpty()) && shareIntent.putExtra(NativeIntent.EXTRA_STREAM, contentSharing.parcelabels);
            shareIntent.putExtra(NativeIntent.EXTRA_MIME_TYPES, array(contentSharing.mimeTypes, 'java.lang.String'));
            AndroidConfig.activity.startActivity(shareIntent);
        }
    }
});

function writeImageToFile(image) {
    const NativeFile = requireClass('java.io.File');
    const NativeBitmap = requireClass('android.graphics.Bitmap');
    const NativeOutStream = requireClass('java.io.ByteArrayOutputStream');
    const NativeFileOutStream = requireClass('java.io.FileOutputStream');

    var outStream = new NativeOutStream();
    var bitmap = image.nativeObject.getBitmap();
    bitmap.compress(NativeBitmap.CompressFormat.PNG, 100, outStream);

    var byteArray = outStream.toByteArray();
    var tempFile = new NativeFile(AndroidConfig.activity.getExternalFilesDir(null), "sf-core-temp.png");
    var fileOutStream = new NativeFileOutStream(tempFile);
    fileOutStream.write(byteArray);
    fileOutStream.flush();
    fileOutStream.close();

    return tempFile;
}

function getUriFromFile(fileNativeObject) {
    const NativeURI = requireClass('android.net.Uri');
    if (AndroidConfig.sdkVersion < 24) {
        return NativeURI.fromFile(fileNativeObject);
    }
    return NativeFileProvider.getUriForFile(AndroidConfig.activity, Authority, fileNativeObject);
}

function addContent(fileNativeObject, fileType) {
    var contentSharing = this;
    const NativeURI = requireClass('android.net.Uri');
    let uri;
    if (AndroidConfig.sdkVersion < 24) {
        uri = NativeURI.fromFile(fileNativeObject);
    }
    else {
        uri = NativeFileProvider.getUriForFile(AndroidConfig.activity, Authority, fileNativeObject);
    }
    contentSharing.mimeTypes.push(fileType);
    contentSharing.parcelabels.add(uri);
}

function shareContent(params = {}) {
    let { type, extra, extraType, actionType } = params;

    var shareIntent = new NativeIntent(actionType);
    shareIntent.setType(type);
    shareIntent.putExtra(extraType, extra);
    AndroidConfig.activity.startActivity(shareIntent);
}

Share.ios = {};

module.exports = Share;
