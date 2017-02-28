const activity = Android.getActivity();
const NativeIntent = requireClass('android.content.Intent');

const Share = {};
Object.defineProperties(Share, {
    'shareText': {
        value: function(text, page = null, blacklist = []) {
            var shareIntent = new NativeIntent(NativeIntent.ACTION_SEND);
            shareIntent.setType("text/plain");
            shareIntent.putExtra(NativeIntent.EXTRA_TEXT, text);
            activity.startActivity(shareIntent);
        }
    },
    'shareImage': {
        value: function(image, page = null, blacklist = []) {
            const NativeURI = requireClass('android.net.Uri');
            var tempFile = writeImageToFile(image);
            var uri = NativeURI.fromFile(tempFile);
            
            var shareIntent = new NativeIntent();
            shareIntent.setAction(NativeIntent.ACTION_SEND);
            shareIntent.putExtra(NativeIntent.EXTRA_STREAM, uri);
            shareIntent.setType("image/*");
            activity.startActivity(shareIntent);
        }
    },
    'shareFile': {
        value: function(file, page = null, blacklist = []) {
            const NativeURI  = requireClass('android.net.Uri');
            const NativeFile = requireClass('java.io.File');

            var uri = NativeURI.fromFile(new NativeFile(file.path));

            var shareIntent = new NativeIntent();
            shareIntent.setAction(NativeIntent.ACTION_SEND);
            shareIntent.putExtra(NativeIntent.EXTRA_STREAM, uri);
            shareIntent.setType("application/*");
            activity.startActivity(shareIntent);
        }
    },
});

function writeImageToFile(image) {
    const NativeFile          = requireClass('java.io.File');
    const NativeBitmap        = requireClass('android.graphics.Bitmap');
    const NativeOutStream     = requireClass('java.io.ByteArrayOutputStream');
    const NativeFileOutStream = requireClass('java.io.FileOutputStream');

    var outStream = new NativeOutStream();
    var bitmap = image.nativeObject.getBitmap();
    bitmap.compress(NativeBitmap.CompressFormat.PNG, 100, outStream);

    var byteArray = outStream.toByteArray();
    var tempFile = new NativeFile(activity.getExternalFilesDir(null), "nf-core-temp.png");
    var fileOutStream = new NativeFileOutStream(tempFile);
    fileOutStream.write(byteArray);
    fileOutStream.flush();
    fileOutStream.close();

    return tempFile;
};

module.exports = Share;