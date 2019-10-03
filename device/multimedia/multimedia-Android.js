/* global requireClass */
const NativeMediaStore = requireClass("android.provider.MediaStore");
const NativeIntent = requireClass("android.content.Intent");
const NativeBitmapFactory = requireClass("android.graphics.BitmapFactory");
const NativeContentValues = requireClass("android.content.ContentValues");
const NativeCropImage = requireClass('com.theartofdev.edmodo.cropper.CropImage');
const NativeSFMultimedia = requireClass("io.smartface.android.sfcore.device.multimedia.SFMultimedia");
const NativeUri = requireClass("android.net.Uri");

const AndroidConfig = require('sf-core/util/Android/androidconfig');
const RequestCodes = require("sf-core/util/Android/requestcodes");
const File = require("sf-core/io/file");
const Image = require("sf-core/ui/image");
const TypeUtil = require("sf-core/util/type");

const Type = {
    IMAGE: 0,
    VIDEO: 1
};

const ActionType = {
    IMAGE_CAPTURE: 0,
    VIDEO_CAPTURE: 1
};

const NativeAction = [
    NativeMediaStore.ACTION_IMAGE_CAPTURE,
    NativeMediaStore.ACTION_VIDEO_CAPTURE
];

function Multimedia() {}
Multimedia.CropImage = RequestCodes.Multimedia.CropImage;
Multimedia.CropImage.RESULT_OK = -1;
Multimedia.CAMERA_REQUEST = RequestCodes.Multimedia.CAMERA_REQUEST;
Multimedia.PICK_FROM_GALLERY = RequestCodes.Multimedia.PICK_FROM_GALLERY;

Object.defineProperty(Multimedia, 'Type', {
    value: Type,
    writable: false,
    enumerable: true
});

Object.defineProperty(Multimedia, 'ActionType', {
    value: ActionType,
    writable: false,
    enumerable: true
});

const _types = [
    "image/*",
    "video/*",
    "image/* video/*"
];
const activity = AndroidConfig.activity;

var _captureParams = {};
var _pickParams = {};
var _action = 0;
var _fileURI = null;

// We should store image file, because data.getData() and data.getExtras() return null on activity result
// when we use intent with MediaStore.EXTRA_OUTPUT.
// https://github.com/ArthurHub/Android-Image-Cropper/wiki/FAQ#why-image-captured-from-camera-is-blurred-or-low-quality
var nativeImageFile = null;

Multimedia.startCamera = function(params = {}) {
    if (!(params.page instanceof require("../../ui/page"))) {
        throw new TypeError('Page parameter required');
    }

    if (params.action !== undefined) {
        _action = params.action;
    }
    _captureParams = params;
    var page = _captureParams.page;

    if (_action === ActionType.IMAGE_CAPTURE) {
        nativeImageFile = null;
        if (params.allowsEditing) {
            nativeImageFile = NativeSFMultimedia.createImageFile();
        }
        var takePictureIntent = NativeSFMultimedia.getCameraIntent(activity, nativeImageFile);
        page.nativeObject.startActivityForResult(takePictureIntent, Multimedia.CAMERA_REQUEST);
    }
    else if (AndroidConfig.sdkVersion >= AndroidConfig.SDK.SDK_NOUGAT) {
        startCameraWithExtraField();
    }
    else {
        takePictureIntent = new NativeIntent(NativeAction[_action]);
        page.nativeObject.startActivityForResult(takePictureIntent, Multimedia.CAMERA_REQUEST);
    }
};

function startCameraWithExtraField() {
    var takePictureIntent = new NativeIntent(NativeAction[_action]);
    var packageManager = activity.getPackageManager();

    if (takePictureIntent.resolveActivity(packageManager)) {
        var contentUri;
        var contentValues = new NativeContentValues();
        var contentResolver = activity.getContentResolver();
        if (_action === ActionType.IMAGE_CAPTURE) {
            contentUri = NativeMediaStore.Images.Media.EXTERNAL_CONTENT_URI;
            _fileURI = contentResolver.insert(contentUri, contentValues);
        }
        else if (_action === ActionType.VIDEO_CAPTURE) {
            contentUri = NativeMediaStore.Video.Media.EXTERNAL_CONTENT_URI;
            _fileURI = contentResolver.insert(contentUri, contentValues);
        }

        if (_fileURI) {
            var output = NativeMediaStore.EXTRA_OUTPUT;
            takePictureIntent.putExtra(output, _fileURI);
            _captureParams.page.nativeObject.startActivityForResult(takePictureIntent, Multimedia.CAMERA_REQUEST);
        }
    }
}

Multimedia.pickFromGallery = function(params = {}) {
    if (!(params.page instanceof require("../../ui/page"))) {
        throw new TypeError('Page parameter required');
    }
    _pickParams = params;
    var intent = new NativeIntent();
    var type = Type.ALL;
    if (params.type !== undefined)
        type = params.type;
    intent.setType(_types[type]);
    intent.setAction(NativeIntent.ACTION_PICK);
    /** @todo
     * An error occured
     */
    params.page.nativeObject.startActivityForResult(intent, Multimedia.PICK_FROM_GALLERY);
};

Multimedia.android = {};

Multimedia.android.getAllGalleryItems = function(params = {}) {
    try {
        var projection = array([NativeMediaStore.MediaColumns.DATA], "int");
        var result = {};
        var uri;
        if (params.type === Multimedia.Type.VIDEO) {
            uri = NativeMediaStore.Video.Media.EXTERNAL_CONTENT_URI;
            var videos = getAllMediaFromUri({
                uri: uri,
                projection: projection,
                type: params.type
            });
            result.videos = videos;
        }
        else if (params.type === Multimedia.Type.IMAGE) {
            uri = NativeMediaStore.Images.Media.EXTERNAL_CONTENT_URI;
            var images = getAllMediaFromUri({
                uri: uri,
                projection: projection,
                type: params.type
            });
            result.images = images;
        }
        else {
            throw new Error("Unexpected value " + params.type);
        }

        params.onSuccess && params.onSuccess(result);
    }
    catch (err) {
        params.onFailure && params.onFailure({ message: err });
    }

};

Multimedia.onActivityResult = function(requestCode, resultCode, data) {
    if (requestCode === Multimedia.CAMERA_REQUEST) {
        getCameraData(resultCode, data);
    }
    else if (requestCode === Multimedia.PICK_FROM_GALLERY) {
        pickFromGallery(resultCode, data);
    }
    else if (requestCode === Multimedia.CropImage.CROP_IMAGE_ACTIVITY_REQUEST_CODE) {
        cropImage(resultCode, data);
    }
};

function cropImage(resultCode, data) {
    if (resultCode === Multimedia.CropImage.RESULT_OK) {
        var result = NativeCropImage.getActivityResult(data);
        var resultUri = result.getUri();
        var croppedImage = Image.createFromFile(resultUri.getPath());
        if (_captureParams.allowsEditing) {
            _captureParams.onSuccess && _captureParams.onSuccess({
                image: croppedImage
            });
        }
        else if (_pickParams.allowsEditing) {
            _pickParams.onSuccess && _pickParams.onSuccess({
                image: croppedImage
            });
        }
    }
    else if (resultCode === Multimedia.CropImage.CROP_IMAGE_ACTIVITY_RESULT_ERROR_CODE) {
        throw Error('Unexpected error occured while cropping image');
    }
}

function startCropActivity(uri, nativeFragment, aspectRatio = {}) {
    if (!uri) return;
    let {x, y} = aspectRatio;
    if (TypeUtil.isNumeric(x) && TypeUtil.isNumeric(y)) {
        NativeSFMultimedia.startCropActivity(uri, activity, nativeFragment, x, y);
    }
    else {
        NativeSFMultimedia.startCropActivity(uri, activity, nativeFragment);
    }
}

function pickFromGallery(resultCode, data) {
    var success = true;
    if (resultCode === -1) { // -1 = Activity.RESULT_OK
        try {
            var uri = data.getData();
            var realPath = getRealPathFromURI(uri);
        }
        catch (err) {
            success = false;
            _pickParams.onFailure && _pickParams.onFailure({ message: err });
        }

        if (success && _pickParams.onSuccess) {
            if (_pickParams.type === Multimedia.Type.IMAGE) {
                if (!_pickParams.allowsEditing) {
                    var inputStream = activity.getContentResolver().openInputStream(uri);
                    var bitmap = NativeBitmapFactory.decodeStream(inputStream);
                    var image = new Image({
                        bitmap: bitmap
                    });
                    _pickParams.onSuccess({
                        image: image
                    });
                }
                else {
                    startCropActivity(uri, _pickParams.page.nativeObject, _pickParams.aspectRatio);
                }
            }
            else {
                _pickParams.onSuccess({
                    video: new File({ path: realPath })
                });
            }
        }
    }
    else {
        _pickParams.onCancel && _pickParams.onCancel();
    }
}

function getRealPathFromURI(uri) {
    var projection = [
        "_data" //NativeMediaStore.MediaColumns.DATA
    ];
    var contentResolver = activity.getContentResolver();
    var cursor = contentResolver.query(uri, array(projection, "java.lang.String"), null, null, null);

    if (cursor == null) {
        return uri.getPath();
    }
    else {
        cursor.moveToFirst();
        var idx = cursor.getColumnIndex(projection[0]);
        var realPath = cursor.getString(idx);
        cursor.close();
        return realPath;
    }
}

function getCameraData(resultCode, data) {
    if (resultCode === -1) { // -1 = Activity.RESULT_OK
        try {
            if (_action !== ActionType.IMAGE_CAPTURE) {
                var uri;
                if (AndroidConfig.sdkVersion >= AndroidConfig.SDK.SDK_NOUGAT) {
                    uri = _fileURI;
                }
                else {
                    uri = data.getData();
                }
            }
        }
        catch (err) {
            var failure = true;
            _captureParams.onFailure && _captureParams.onFailure({ message: err });
        }


        if (!failure && _captureParams.onSuccess) {
            if (_action === ActionType.IMAGE_CAPTURE) {
                if (nativeImageFile != null) {
                    var imageFileUri = NativeUri.fromFile(nativeImageFile);
                    startCropActivity(imageFileUri, _captureParams.page.nativeObject, _captureParams.aspectRatio);
                }
                else {
                    var bitmap = data.getExtras().get("data");
                    _captureParams.onSuccess({
                        image: new Image({ bitmap: bitmap })
                    });
                }
            }
            else {
                var realPath = getRealPathFromURI(uri);
                _captureParams.onSuccess({
                    video: new File({ path: realPath })
                });
            }
        }
    }
    else {
        _captureParams.onCancel && _captureParams.onCancel();
    }
}

function getAllMediaFromUri(params) {
    var contentResolver = activity.getContentResolver();
    var cursor = contentResolver.query(params.uri, params.projection, null, null, null);
    var files = [];
    if (cursor) {
        while (cursor.moveToNext()) {
            var path = cursor.getString(0);
            if (params.type === Multimedia.Type.IMAGE) {
                files.push(new Image.createFromFile(path));
            }
            else {
                files.push(new File({ path: path }));
            }
        }
        cursor.close();
    }
    return files;
}

Multimedia.ios = {};
Multimedia.iOS = {};

Multimedia.ios.requestGalleryAuthorization = function() {};
Multimedia.ios.requestCameraAuthorization = function() {};
Multimedia.ios.getGalleryAuthorizationStatus = function() {};
Multimedia.ios.getCameraAuthorizationStatus = function() {};
Multimedia.ios.cameraAuthorizationStatus = {};
Multimedia.ios.galleryAuthorizationStatus = {};

module.exports = Multimedia;