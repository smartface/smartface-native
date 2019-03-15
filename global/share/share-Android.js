const AndroidConfig = require("../../util/Android/androidconfig");
const NativeIntent = requireClass('android.content.Intent');
const NativeBuildConfig = requireClass(AndroidConfig.activity.getPackageName() + ".BuildConfig");
const NativeFileProvider = requireClass('android.support.v4.content.FileProvider');

const Authority = NativeBuildConfig.APPLICATION_ID + ".provider";

const Share = {};
Object.defineProperties(Share, {
    'shareText': {
        value: function(text, page, blacklist) {
            var shareIntent = new NativeIntent(NativeIntent.ACTION_SEND);
            shareIntent.setType("text/plain");
            shareIntent.putExtra(NativeIntent.EXTRA_TEXT, text);
            AndroidConfig.activity.startActivity(shareIntent);
        }
    },
    'shareImage': {
        value: function(image, page, blacklist) {
            const NativeURI = requireClass('android.net.Uri');
            var imageFile = writeImageToFile(image);

            var uri;
            if (AndroidConfig.sdkVersion < 24) {
                uri = NativeURI.fromFile(imageFile);
            }
            else {
                uri = NativeFileProvider.getUriForFile(AndroidConfig.activity, Authority, imageFile);
            }

            var shareIntent = new NativeIntent();
            shareIntent.setAction(NativeIntent.ACTION_SEND);
            shareIntent.putExtra(NativeIntent.EXTRA_STREAM, uri);
            shareIntent.setType("image/*");
            AndroidConfig.activity.startActivity(shareIntent);
        }
    },
    'shareFile': {
        value: function(file, page, blacklist) {
            const NativeURI = requireClass('android.net.Uri');
            var uri;
            if (AndroidConfig.sdkVersion < 24) {
                uri = NativeURI.fromFile(file.nativeObject);
            }
            else {
                uri = NativeFileProvider.getUriForFile(AndroidConfig.activity, Authority, file.nativeObject);
            }

            var shareIntent = new NativeIntent();
            shareIntent.setAction(NativeIntent.ACTION_SEND);
            shareIntent.putExtra(NativeIntent.EXTRA_STREAM, uri);
            shareIntent.setType("application/*");
            AndroidConfig.activity.startActivity(shareIntent);
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
            let mimeTypes = [],
                parcelabels = new NativeArrayList();
            itemList.forEach((item) => {
                if (item instanceof File) {
                    const NativeURI = requireClass('android.net.Uri');
                    let uri;
                    if (AndroidConfig.sdkVersion < 24) {
                        uri = NativeURI.fromFile(item.nativeObject);
                    }
                    else {
                        uri = NativeFileProvider.getUriForFile(AndroidConfig.activity, Authority, item.nativeObject);
                    }
                    mimeTypes.push("application/*");
                    parcelabels.add(uri);
                }
                else if (typeof(item) === 'string') {
                    shareIntent.putExtra(NativeIntent.EXTRA_TEXT, item);
                    mimeTypes.push("text/plain");
                }
                else if (item instanceof Image) {
                    const NativeURI = requireClass('android.net.Uri');
                    var imageFile = writeImageToFile(item);
                    let uri;
                    if (AndroidConfig.sdkVersion < 24) {
                        uri = NativeURI.fromFile(imageFile);
                    }
                    else {
                        uri = NativeFileProvider.getUriForFile(AndroidConfig.activity, Authority, imageFile);
                    }
                    parcelabels.add(uri);
                    mimeTypes.push("image/*");
                }
            });
            !(parcelabels.isEmpty()) && shareIntent.putExtra(NativeIntent.EXTRA_STREAM, parcelabels);
            shareIntent.putExtra(NativeIntent.EXTRA_MIME_TYPES, array(mimeTypes, 'java.lang.String'));
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
};

Share.ios = {};

module.exports = Share;
