/* global requireClass */
const NativeMediaStore = requireClass("android.provider.MediaStore");
const NativeIntent = requireClass("android.content.Intent");
const NativeBitmapFactory = requireClass("android.graphics.BitmapFactory");
const NativeContentValues = requireClass("android.content.ContentValues");
const NativeUCrop = requireClass('com.yalantis.ucrop.UCrop');
const NativeSFUCropOptions = requireClass('io.smartface.android.sfcore.device.multimedia.crop.SFUCropOptions');
const NativeSFMultimedia = requireClass("io.smartface.android.sfcore.device.multimedia.SFMultimedia");

const AndroidConfig = require('sf-core/util/Android/androidconfig');
const AndroidUnitConverter = require('sf-core/util/Android/unitconverter');
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

const CropShape = {
    RECTANGLE: 1,
    OVAL: 2
};

function Multimedia() { }
Multimedia.CropImage = RequestCodes.Multimedia.CropImage;
Multimedia.CropImage.RESULT_OK = -1;
Multimedia.CAMERA_REQUEST = RequestCodes.Multimedia.CAMERA_REQUEST;
Multimedia.PICK_FROM_GALLERY = RequestCodes.Multimedia.PICK_FROM_GALLERY;

Object.defineProperties(Multimedia, {
    'Type': {
        value: Type,
        writable: false,
        enumerable: true
    },
    'ActionType': {
        value: ActionType,
        writable: false,
        enumerable: true
    }
});

Multimedia.Android = {};
Object.defineProperty(Multimedia.Android, 'CropShape', {
    value: CropShape,
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
var imageFileUri = null;

Multimedia.startCamera = function (params = {}) {
    if (!(params.page instanceof require("../../ui/page"))) {
        throw new TypeError('Page parameter required');
    }

    if (params.action !== undefined) {
        _action = params.action;
    }
    _pickParams = {};
    _captureParams = params;
    var page = _captureParams.page;

    if (_action === ActionType.IMAGE_CAPTURE) {
        imageFileUri = null;
        if (params.allowsEditing) {
            imageFileUri = NativeSFMultimedia.createImageFile(activity);
        }
        var takePictureIntent = NativeSFMultimedia.getCameraIntent(activity, imageFileUri);
        page.nativeObject.startActivityForResult(takePictureIntent, Multimedia.CAMERA_REQUEST);
    } else if (AndroidConfig.sdkVersion >= AndroidConfig.SDK.SDK_NOUGAT) {
        startCameraWithExtraField();
    } else {
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
        } else if (_action === ActionType.VIDEO_CAPTURE) {
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

Multimedia.pickFromGallery = function (params = {}) {
    if (!(params.page instanceof require("../../ui/page"))) {
        throw new TypeError('Page parameter required');
    }
    _captureParams = {};
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

Multimedia.android.getAllGalleryItems = function (params = {}) {
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
        } else if (params.type === Multimedia.Type.IMAGE) {
            uri = NativeMediaStore.Images.Media.EXTERNAL_CONTENT_URI;
            var images = getAllMediaFromUri({
                uri: uri,
                projection: projection,
                type: params.type
            });
            result.images = images;
        } else {
            throw new Error("Unexpected value " + params.type);
        }

        params.onSuccess && params.onSuccess(result);
    } catch (err) {
        params.onFailure && params.onFailure({
            message: err
        });
    }

};

Multimedia.onActivityResult = function (requestCode, resultCode, data) {
    if (requestCode === Multimedia.CAMERA_REQUEST) {
        getCameraData(resultCode, data);
    } else if (requestCode === Multimedia.PICK_FROM_GALLERY) {
        pickFromGallery(resultCode, data);
    } else if (requestCode === Multimedia.CropImage.CROP_CAMERA_DATA_REQUEST_CODE) {
        cropCameraData(resultCode, data);
    } else if (requestCode === Multimedia.CropImage.CROP_GALLERY_DATA_REQUEST_CODE) {
        cropGalleryData(resultCode, data);
    }
};

function cropCameraData(resultCode, data) {
    const { onSuccess, onCancel, onFailure, allowsEditing } = _captureParams;
    if (resultCode === Multimedia.CropImage.RESULT_OK) {
        try {
            var resultUri = NativeUCrop.getOutput(data);
            var croppedImage = Image.createFromFile(resultUri.getPath());
        } catch (err) {
            onFailure && onFailure({
                message: err
            });
            return;
        }
        if (allowsEditing) {
            onSuccess && onSuccess({
                image: croppedImage
            });
        }
    } else {
        onCancel && onCancel();
    }
}

function cropGalleryData(resultCode, data) {
    const { onSuccess, onFailure, onCancel, allowsEditing } = _pickParams;

    if (resultCode === Multimedia.CropImage.RESULT_OK) {
        try {
        var resultUri = NativeUCrop.getOutput(data);
        var croppedImage = Image.createFromFile(resultUri.getPath());
        } catch (err) {
            onFailure && onFailure({
                message: err
            });
            return;
        }
        if (allowsEditing) {
            onSuccess && onSuccess({
                image: croppedImage
            });
        }
    } else {
        onCancel && onCancel();
    }
}

function startCropActivity(params) {
    const { requestCode, uri, page, cropShape, aspectRatio, rotateText, scaleText, cropText, headerBarTitle, maxResultSize, hideBottomControls, enableFreeStyleCrop } = params;
    if (!uri) return;
    let { x, y } = aspectRatio;
    let { width, height } = maxResultSize;
    let uCropOptions = new NativeSFUCropOptions();

    if (TypeUtil.isNumeric(x) && TypeUtil.isNumeric(y))
        uCropOptions.withAspectRatio(x, y);

    if (cropShape === Multimedia.Android.CropShape.OVAL)
        uCropOptions.setCircleDimmedLayer(true);

    if (TypeUtil.isNumeric(width) && TypeUtil.isNumeric(height))
        uCropOptions.withMaxResultSize(AndroidUnitConverter.dpToPixel(width), AndroidUnitConverter.dpToPixel(height));

    if (rotateText)
        uCropOptions.setRotateText(rotateText);

    if (scaleText)
        uCropOptions.setScaleText(scaleText);

    if (cropText)
        uCropOptions.setCropText(cropText);

    if (headerBarTitle)
        uCropOptions.setToolbarTitle(headerBarTitle);

    uCropOptions.setHideBottomControls(hideBottomControls);
    uCropOptions.setFreeStyleCropEnabled(enableFreeStyleCrop);

    NativeSFMultimedia.startCropActivity(uri, activity, page.nativeObject, uCropOptions, requestCode);
}

function pickFromGallery(resultCode, data) {
    const {
        onFailure,
        onSuccess,
        onCancel,
        type,
        allowsEditing,
        page,
        aspectRatio = {},
        android: {
            cropShape: cropShape = CropShape.RECTANGLE,
            rotateText: rotateText,
            scaleText: scaleText,
            cropText: cropText,
            headerBarTitle: headerBarTitle,
            maxResultSize: maxResultSize = {},
            hideBottomControls: hideBottomControls = false,
            enableFreeStyleCrop: enableFreeStyleCrop = false
        } = {}
    } = _pickParams;
    if (resultCode === -1) { // -1 = Activity.RESULT_OK
        try {
            var uri = data.getData();
            var realPath = getRealPathFromURI(uri);
        } catch (err) {
            onFailure && onFailure({
                message: err
            });
            return;
        }

        if (onSuccess) {
            if (type === Multimedia.Type.IMAGE) {
                if (!allowsEditing) {
                    var inputStream = activity.getContentResolver().openInputStream(uri);
                    var bitmap = NativeBitmapFactory.decodeStream(inputStream);
                    var image = new Image({
                        bitmap: bitmap
                    });
                    onSuccess({
                        image: image
                    });
                } else {
                    startCropActivity({ requestCode: Multimedia.CropImage.CROP_GALLERY_DATA_REQUEST_CODE, uri, page, cropShape, aspectRatio, rotateText, scaleText, cropText, headerBarTitle, maxResultSize, hideBottomControls, enableFreeStyleCrop });
                }
            } else {
                onSuccess({
                    video: new File({
                        path: realPath
                    })
                });
            }
        }
    } else {
        onCancel && onCancel();
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
    } else {
        cursor.moveToFirst();
        var idx = cursor.getColumnIndex(projection[0]);
        var realPath = cursor.getString(idx);
        cursor.close();
        return realPath;
    }
}

function getCameraData(resultCode, data) {
    const {
        onSuccess,
        onFailure,
        page,
        aspectRatio = {},
        onCancel,
        android: {
            cropShape: cropShape = CropShape.RECTANGLE,
            rotateText: rotateText,
            scaleText: scaleText,
            cropText: cropText,
            headerBarTitle: headerBarTitle,
            maxResultSize: maxResultSize = {},
            hideBottomControls: hideBottomControls = false,
            enableFreeStyleCrop: enableFreeStyleCrop = false
        } = {}
    } = _captureParams;
    if (resultCode === -1) { // -1 = Activity.RESULT_OK
        try {
            if (_action !== ActionType.IMAGE_CAPTURE) {
                var uri;
                if (AndroidConfig.sdkVersion >= AndroidConfig.SDK.SDK_NOUGAT) {
                    uri = _fileURI;
                } else {
                    uri = data.getData();
                }
            }
        } catch (err) {
            var failure = true;
            onFailure && onFailure({
                message: err
            });
        }

        if (!failure && onSuccess) {
            if (_action === ActionType.IMAGE_CAPTURE) {
                if (imageFileUri != null) {
                    startCropActivity({ requestCode: Multimedia.CropImage.CROP_CAMERA_DATA_REQUEST_CODE, uri: imageFileUri, page, cropShape, aspectRatio, rotateText, scaleText, cropText, headerBarTitle, maxResultSize, hideBottomControls, enableFreeStyleCrop });
                } else {
                    var bitmap = data.getExtras().get("data");
                    onSuccess({
                        image: new Image({
                            bitmap: bitmap
                        })
                    });
                }
            } else {
                var realPath = getRealPathFromURI(uri);
                onSuccess({
                    video: new File({
                        path: realPath
                    })
                });
            }
        }
    } else {
        onCancel && onCancel();
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
            } else {
                files.push(new File({
                    path: path
                }));
            }
        }
        cursor.close();
    }
    return files;
}

Multimedia.ios = {};
Multimedia.iOS = {};

Multimedia.ios.requestGalleryAuthorization = function () { };
Multimedia.ios.requestCameraAuthorization = function () { };
Multimedia.ios.getGalleryAuthorizationStatus = function () { };
Multimedia.ios.getCameraAuthorizationStatus = function () { };
Multimedia.ios.cameraAuthorizationStatus = {};
Multimedia.ios.galleryAuthorizationStatus = {};

module.exports = Multimedia;