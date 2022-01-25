/* global requireClass */
const NativeMediaStore = requireClass("android.provider.MediaStore");
const NativeIntent = requireClass("android.content.Intent");
const NativeBitmapFactory = requireClass("android.graphics.BitmapFactory");
const NativeUCrop = requireClass('com.yalantis.ucrop.UCrop');
const NativeSFUCropOptions = requireClass('io.smartface.android.sfcore.device.multimedia.crop.SFUCropOptions');
const NativeSFMultimedia = requireClass("io.smartface.android.sfcore.device.multimedia.SFMultimedia");

const AndroidConfig = require('../../util/Android/androidconfig');
const AndroidUnitConverter = require('../../util/Android/unitconverter');
const RequestCodes = require("../../util/Android/requestcodes");
const File = require("../../io/file");
const Image = require("../../ui/image");
const TypeUtil = require("../../util/type");

const Type = {
    IMAGE: NativeSFMultimedia.TYPE_IMAGE,
    VIDEO: NativeSFMultimedia.TYPE_VIDEO
};

const ActionType = {
    IMAGE_CAPTURE: 0,
    VIDEO_CAPTURE: 1
};

const CropShape = {
    RECTANGLE: 1,
    OVAL: 2
};

const VideoQuality = {
    HIGH: 1,
    LOW: 0
};

const MULTIMEDIA_ACTIVITY_RESULT_OK = -1;
function Multimedia() { }
Multimedia.CropImage = RequestCodes.Multimedia.CropImage;
Multimedia.CAMERA_REQUEST = RequestCodes.Multimedia.CAMERA_REQUEST;
Multimedia.PICK_FROM_GALLERY = RequestCodes.Multimedia.PICK_FROM_GALLERY;
Multimedia.PICK_MULTIPLE_FROM_GALLERY = RequestCodes.Multimedia.PICK_MULTIPLE_FROM_GALLERY;


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
    },
    'VideoQuality': {
        value: VideoQuality,
        writable: false,
        enumerable: true
    },
    'CropShape': {
        value: CropShape,
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

Object.defineProperty(Multimedia, 'hasCameraFeature', {
    get : function () {
        const NativeContext = requireClass("android.content.Context");
        const context = AndroidConfig.activity;
        const cameraManager = context.getSystemService(NativeContext.CAMERA_SERVICE);
        const cameraIdList = toJSArray(cameraManager.getCameraIdList());
        return cameraIdList.length > 0;
    },
    enumerable : true
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
var _imageFileUri = null;

//Deprecated since 4.3.0
Multimedia.startCamera = function (params = {}) {

    if (!(params.page instanceof require("../../ui/page")))
        throw new TypeError('Page parameter required');

    if (params.action !== undefined)
        _action = params.action;

    _pickParams = {};
    _captureParams = params;
    var page = _captureParams.page;

    if (_action === ActionType.IMAGE_CAPTURE) {
        _imageFileUri = NativeSFMultimedia.createImageFile(activity);
        var takePictureIntent = NativeSFMultimedia.getCameraIntent(activity, _imageFileUri);
        page.nativeObject.startActivityForResult(takePictureIntent, Multimedia.CAMERA_REQUEST);
    } else
        startRecordVideoWithExtraField();
};


Multimedia.recordVideo = function (params = {}) {

    if (!(params.page instanceof require("../../ui/page")))
        throw new TypeError('Page parameter required');

    _pickParams = {};
    _captureParams = params;
    _action = ActionType.VIDEO_CAPTURE;
    startRecordVideoWithExtraField();
};

Multimedia.capturePhoto = function (params = {}) {

    if (!(params.page instanceof require("../../ui/page")))
        throw new TypeError('Page parameter required');

    _pickParams = {};
    _captureParams = params;
    _action = ActionType.IMAGE_CAPTURE;
    const page = params.page;
    _imageFileUri = NativeSFMultimedia.createImageFile(activity);
    let takePictureIntent = NativeSFMultimedia.getCameraIntent(activity, _imageFileUri);

    page.nativeObject.startActivityForResult(takePictureIntent, Multimedia.CAMERA_REQUEST);
};

Multimedia.pickFromGallery = function (params = {}) {
    if (!(params.page instanceof require("../../ui/page"))) {
        throw new TypeError('Page parameter required');
    }
    _captureParams = {};
    _pickParams = params;
    var intent = new NativeIntent();
    var type = Type.IMAGE;
    if (params.type !== undefined)
        type = params.type;
    intent.setType(_types[type]);
    intent.setAction(NativeIntent.ACTION_PICK);
    /** @todo
     * An error occured
     */
    params.page.nativeObject.startActivityForResult(intent, Multimedia.PICK_FROM_GALLERY);
};

Multimedia.convertToMp4 = function (params) {
    const { videoFile, outputFileName, onCompleted, onFailure } = params;

    if (!videoFile || !outputFileName)
        throw new Error("Video File or Output File Name cannot be undefined");

    NativeSFMultimedia.convertToMp4(videoFile.nativeObject, outputFileName,
        {
            onCompleted: (outputVideoFilePath) => {
                let video = new File({ path: outputVideoFilePath });
                onCompleted && onCompleted({ video });
            },
            onFailure
        });
};

Multimedia.android = {};

Multimedia.launchCropper = function (params) {
    const {
        page,
        aspectRatio = {},
        asset,
        cropShape = CropShape.RECTANGLE,
        headerBarTitle,
        enableFreeStyleCrop = false,
        onFailure,
        android: {
            rotateText: rotateText,
            scaleText: scaleText,
            cropText: cropText,
            maxResultSize: maxResultSize = {},
            hideBottomControls: hideBottomControls = false
        } = {}
    } = params;

    if (!asset || (!(asset instanceof File) && !(asset instanceof Image)))
        throw new TypeError("Asset parameter must be typeof File or Image");

    _captureParams = {};
    _pickParams = params;
    let startCropActivityParams = Object.assign({
        requestCode: Multimedia.CropImage.CROP_GALLERY_DATA_REQUEST_CODE, asset: asset.nativeObject,
        page, cropShape, aspectRatio, rotateText, scaleText, cropText, headerBarTitle, maxResultSize,
        hideBottomControls, enableFreeStyleCrop
    }, (asset instanceof Image) ? { onFailure } : {});

    startCropActivity(startCropActivityParams);
};

Multimedia.pickMultipleFromGallery = function (params = {}) {
    if (!(params.page instanceof require("../../ui/page"))) {
        throw new TypeError('Page parameter required');
    }
    _captureParams = {};
    _pickParams = params;
    let intent = new NativeIntent();
    let type = params.type !== undefined ? params.type : Type.IMAGE;
    intent.setType(_types[type]);
    intent.setAction(NativeIntent.ACTION_GET_CONTENT);
    intent.putExtra(NativeIntent.EXTRA_ALLOW_MULTIPLE, true)

    params.page.nativeObject.startActivityForResult(NativeIntent.createChooser(intent, null), Multimedia.PICK_MULTIPLE_FROM_GALLERY);
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
    } else if (requestCode === Multimedia.PICK_MULTIPLE_FROM_GALLERY) {
        pickMultipleFromGallery(resultCode, data);
    }
};


function startRecordVideoWithExtraField() {

    const {
        videoQuality,
        maximumDuration,
        page
    } = _captureParams;
    let cameraIntent = new NativeIntent(NativeMediaStore.ACTION_VIDEO_CAPTURE);

    if (maximumDuration != undefined)
        cameraIntent.putExtra(NativeMediaStore.EXTRA_DURATION_LIMIT, maximumDuration);
    if (videoQuality != undefined)
        cameraIntent.putExtra(NativeMediaStore.EXTRA_VIDEO_QUALITY, videoQuality);

    page.nativeObject.startActivityForResult(cameraIntent, Multimedia.CAMERA_REQUEST);
}

function cropCameraData(resultCode, data) {
    const {
        onSuccess, onCancel,
        onFailure,
        android: {
            fixOrientation: fixOrientation = false,
            maxImageSize: maxImageSize = -1
        } = {}
    } = _captureParams;

    if (resultCode === MULTIMEDIA_ACTIVITY_RESULT_OK) {
        let resultUri = NativeUCrop.getOutput(data);
        //follow the uCrop lib issue. https://github.com/Yalantis/uCrop/issues/743. If they fixes, no need to fix orientation issue.
        NativeSFMultimedia.getBitmapFromUriAsync(activity, resultUri, maxImageSize, fixOrientation, {
            onCompleted: (bitmap) => {
                let croppedImage = new Image({
                    bitmap
                });
                onSuccess && onSuccess({
                    image: croppedImage
                });

            },
            onFailure: (err) => {
                onFailure && onFailure({
                    message: err
                });
            }
        });
    } else {
        onCancel && onCancel();
    }
}

function cropGalleryData(resultCode, data) {
    const {
        onSuccess, onFailure,
        onCancel,
        android: {
            fixOrientation: fixOrientation = false,
            maxImageSize: maxImageSize = -1
        } = {}
    } = _pickParams;

    if (resultCode === MULTIMEDIA_ACTIVITY_RESULT_OK) {

        let resultUri = NativeUCrop.getOutput(data);
        //follow the uCrop lib issue. https://github.com/Yalantis/uCrop/issues/743. If they fixes, no need to fix orientation issue.
        NativeSFMultimedia.getBitmapFromUriAsync(activity, resultUri, maxImageSize, fixOrientation, {
            onCompleted: (bitmap) => {
                let croppedImage = new Image({
                    bitmap
                });
                onSuccess && onSuccess({
                    image: croppedImage
                });
            },
            onFailure: (err) => {
                onFailure && onFailure({
                    message: err
                });
            }
        });
    } else {
        onCancel && onCancel();
    }
}

function startCropActivity(params) {
    const {
        requestCode, asset, page, cropShape, aspectRatio,
        rotateText, scaleText, cropText, headerBarTitle,
        maxResultSize, hideBottomControls, enableFreeStyleCrop,
        onFailure
    } = params;

    if (!asset) return;
    let { x, y } = aspectRatio;
    let { width, height } = maxResultSize;
    let uCropOptions = new NativeSFUCropOptions();

    if (TypeUtil.isNumeric(x) && TypeUtil.isNumeric(y))
        uCropOptions.withAspectRatio(x, y);

    if (cropShape === Multimedia.CropShape.OVAL)
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

    if (onFailure)
        NativeSFMultimedia.startCropActivity(asset, activity, page.nativeObject, uCropOptions, requestCode, {
            onFailure: (err) => {
                onFailure({
                    message: err
                });
            }
        });
    else
        NativeSFMultimedia.startCropActivity(asset, activity, page.nativeObject, uCropOptions, requestCode);
}

function pickMultipleFromGallery(resultCode, data) {
    const {
        onFailure,
        onSuccess,
        onCancel,
        type = Multimedia.Type.IMAGE,
        android: {
            fixOrientation: fixOrientation = false,
            maxImageSize: maxImageSize = -1
        } = {},
        page
    } = _pickParams;

    if (resultCode === MULTIMEDIA_ACTIVITY_RESULT_OK) {

        try {
            let uris = [];
            let clipData = data.getClipData();
            if (clipData == null) {
                uris.push(data.getData());
            } else {
                let count = clipData.getItemCount();
                for (let i = 0; i < count; i++) {
                    uris.push(clipData.getItemAt(i).getUri());
                }
            }

            if (onSuccess) {

                NativeSFMultimedia.getMultimediaAssetsFromUrisAsync(activity, array(uris, 'android.net.Uri'), type, maxImageSize, fixOrientation, {
                    onCompleted: (mAssets) => {

                        const assets = toJSArray(mAssets).map(asset => {

                            return type === Multimedia.Type.IMAGE ?
                                {
                                    image: new Image({
                                        bitmap: asset.bitmap
                                    }),
                                    file: new File({
                                        path: asset.realPath
                                    })
                                } :
                                {
                                    file: new File({
                                        path: asset.realPath
                                    })
                                }
                        });

                        onSuccess({
                            assets
                        });
                    },
                    onFailure: (errors) => {

                        const errorObject = toJSArray(errors).map(error => {
                            return {
                                message: error.message,
                                fileName: error.fileName,
                                uri: error.uri
                            }
                        })
                        onFailure && onFailure(errorObject);
                    }
                });
            }

        } catch (err) {
            onFailure && onFailure({
                message: err
            });
            return;
        }
    } else {
        onCancel && onCancel();
    }
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
            enableFreeStyleCrop: enableFreeStyleCrop = false,
            fixOrientation: fixOrientation = false,
            maxImageSize: maxImageSize = -1
        } = {}
    } = _pickParams;
    if (resultCode === MULTIMEDIA_ACTIVITY_RESULT_OK) {
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
                    NativeSFMultimedia.getBitmapFromUriAsync(activity, uri, maxImageSize, fixOrientation, {
                        onCompleted: (bitmap) => {
                            let image = new Image({
                                bitmap
                            });
                            onSuccess({
                                image
                            });
                        },
                        onFailure: (err) => {
                            onFailure && onFailure({
                                message: err
                            });
                        }
                    });
                } else {
                    startCropActivity({ requestCode: Multimedia.CropImage.CROP_GALLERY_DATA_REQUEST_CODE, asset: uri, page, cropShape, aspectRatio, rotateText, scaleText, cropText, headerBarTitle, maxResultSize, hideBottomControls, enableFreeStyleCrop });
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

//TODO: user method in the java (SFMultimedia.java)
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
        allowsEditing,
        android: {
            cropShape: cropShape = CropShape.RECTANGLE,
            rotateText: rotateText,
            scaleText: scaleText,
            cropText: cropText,
            headerBarTitle: headerBarTitle,
            maxResultSize: maxResultSize = {},
            hideBottomControls: hideBottomControls = false,
            enableFreeStyleCrop: enableFreeStyleCrop = false,
            fixOrientation: fixOrientation = false,
            maxImageSize: maxImageSize = -1
        } = {}
    } = _captureParams;
    if (resultCode === MULTIMEDIA_ACTIVITY_RESULT_OK) {
        try {
            if (_action !== ActionType.IMAGE_CAPTURE) {
                var uri = data.getData();
            }
        } catch (err) {
            var failure = true;
            onFailure && onFailure({
                message: err
            });
        }

        if (!failure && onSuccess) {
            if (_action === ActionType.IMAGE_CAPTURE) {
                if (allowsEditing) {
                    startCropActivity({ requestCode: Multimedia.CropImage.CROP_CAMERA_DATA_REQUEST_CODE, asset: _imageFileUri, page, cropShape, aspectRatio, rotateText, scaleText, cropText, headerBarTitle, maxResultSize, hideBottomControls, enableFreeStyleCrop });
                } else {
                    NativeSFMultimedia.getBitmapFromUriAsync(activity, _imageFileUri, maxImageSize, fixOrientation, {
                        onCompleted: (bitmap) => {
                            let image = new Image({
                                bitmap
                            });
                            onSuccess({
                                image
                            });
                        },
                        onFailure: (err) => {
                            onFailure && onFailure({
                                message: err
                            });
                        }
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
Multimedia.VideoQuality.iOS = {};
Multimedia.iOS.CameraFlashMode = {};
Multimedia.iOS.CameraDevice = {};

Multimedia.ios.requestGalleryAuthorization = function () { };
Multimedia.ios.requestCameraAuthorization = function () { };
Multimedia.ios.getGalleryAuthorizationStatus = function () { };
Multimedia.ios.getCameraAuthorizationStatus = function () { };
Multimedia.ios.cameraAuthorizationStatus = {};
Multimedia.ios.galleryAuthorizationStatus = {};

module.exports = Multimedia;