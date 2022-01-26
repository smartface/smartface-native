const Image = require("../../ui/image");
const File = require("../../io/file");
const Page = require('../../ui/page');
const Invocation = require('../../util').Invocation;

const UIImagePickerControllerSourceType = {
    photoLibrary: 0,
    camera: 1,
    savedPhotosAlbum: 2
}

const UIImagePickerMediaTypes = {
    image: "public.image",
    video: "public.movie"
}

const UIImagePickerControllerCameraFlashMode = {
    off: -1,
    auto: 0,
    on: 1
}

const UIImagePickerControllerCameraDevice = {
    rear: 0,
    front: 1
}

const UIImagePickerControllerQualityType = {
    typeHigh: 0,
    typeMedium: 1,
    typeLow: 2,
    type640x480: 3,
    typeIFrame1280x720: 4,
    typeIFrame960x540: 5
}

function Multimedia() { }

Multimedia.createImagePickerController = function (e) {
    var picker = new __SF_UIImagePickerController();
    if (e.action) {
        picker.mediaTypes = e.action;
    }

    if (e.type) {
        picker.mediaTypes = e.type;
    }

    if (e.maximumDuration) {
        picker.setValueForKey(e.maximumDuration, "videoMaximumDuration");
    }

    if (e.videoQuality !== undefined) {
        var quality;
        switch (e.videoQuality) {
            case Multimedia.VideoQuality.LOW:
                quality = UIImagePickerControllerQualityType.typeLow;
                break;
            case Multimedia.VideoQuality.HIGH:
                quality = UIImagePickerControllerQualityType.typeHigh;
                break;
            case Multimedia.VideoQuality.iOS.MEDIUM:
                quality = UIImagePickerControllerQualityType.typeMedium;
                break;
            case Multimedia.VideoQuality.iOS.TYPE640x480:
                quality = UIImagePickerControllerQualityType.type640x480;
                break;
            case Multimedia.VideoQuality.iOS.TYPEIFRAME1280x720:
                quality = UIImagePickerControllerQualityType.typeIFrame1280x720;
                break;
            case Multimedia.VideoQuality.iOS.TYPEIFRAME960x540:
                quality = UIImagePickerControllerQualityType.typeIFrame960x540;
                break;
            default:
                quality = UIImagePickerControllerQualityType.typeMedium;
        }
        picker.setValueForKey(quality, "videoQuality");
    }

    picker.allowsEditing = e.allowsEditing ? e.allowsEditing : false;

    picker.sourceType = e.sourceType;

    if (picker.sourceType == UIImagePickerControllerSourceType.camera) {
        if (e.ios) {
            if (e.ios.cameraDevice !== undefined) {
                picker.cameraDevice = e.ios.cameraDevice;
            }
            if (e.ios.cameraFlashMode !== undefined) {
                picker.cameraFlashMode = e.ios.cameraFlashMode;
            }
        }
    }


    this.pickerDelegate = new __SF_UIImagePickerControllerDelegate();

    this.pickerDelegate.imagePickerControllerDidCancel = function () {
        picker.dismissViewController();
        if (e.onCancel) {
            e.onCancel();
        }
    };

    this.pickerDelegate.didFinishPickingMediaWithInfo = function (param) {
        picker.dismissViewController(function () {
            if (e.onSuccess) {
                if (param.info["UIImagePickerControllerMediaType"] === UIImagePickerMediaTypes.image) {
                    var image;
                    if (param.info["UIImagePickerControllerEditedImage"]) {
                        image = Image.createFromImage(param.info["UIImagePickerControllerEditedImage"]);
                    } else {
                        image = Image.createFromImage(param.info["UIImagePickerControllerOriginalImage"]);
                    }

                    if (image.nativeObject.fixOrientation) {
                        var fixedImage = image.nativeObject.fixOrientation();
                        image = Image.createFromImage(fixedImage);
                    }
                    e.onSuccess({
                        image: image
                    });
                } else if (param.info["UIImagePickerControllerMediaType"] === UIImagePickerMediaTypes.video) {
                    var videoURL = param.info["UIImagePickerControllerMediaURL"];
                    var file = new File({
                        path: videoURL.path
                    });
                    e.onSuccess({
                        video: file
                    });
                }
            }
        });
    };

    picker.delegate = this.pickerDelegate;

    return picker;
}

Multimedia.startCamera = function (e) {
    e["sourceType"] = UIImagePickerControllerSourceType.camera;
    this.picker = Multimedia.createImagePickerController(e);
    if (e.page && (e.page instanceof Page)) {
        e.page.nativeObject.presentViewController(this.picker);
    } else {
        throw new TypeError("Parameter type mismatch. params.page must be Page instance");
    }
};

Multimedia.convertToMp4 = function (e) {
    var file = e.videoFile;
    var outputFileName = e.outputFileName;
    var onCompleted = e.onCompleted;
    var onFailure = e.onFailure;

    __SF_UIImagePickerController.convertToMP4WithPresetQualityWithShouldOptimizeForNetworkUseVideoFilePathFileNameCallback(0, false, file.path, outputFileName, function (e) {
        if (e.filePath && typeof onCompleted == 'function') {
            var video = new File({
                path: e.filePath
            });
            onCompleted({ video });
        } else if (typeof onFailure == 'function') {
            onFailure();
        }
    });
}

Multimedia.capturePhoto = function (e) {
    e["sourceType"] = UIImagePickerControllerSourceType.camera;
    e["action"] = Multimedia.ActionType.IMAGE_CAPTURE;
    this.picker = Multimedia.createImagePickerController(e);
    if (e.page && (e.page instanceof Page)) {
        e.page.nativeObject.presentViewController(this.picker);
    } else {
        throw new TypeError("Parameter type mismatch. params.page must be Page instance");
    }
};

Multimedia.recordVideo = function (e) {
    e["sourceType"] = UIImagePickerControllerSourceType.camera;
    e["action"] = Multimedia.ActionType.VIDEO_CAPTURE;
    this.picker = Multimedia.createImagePickerController(e);
    if (e.page && (e.page instanceof Page)) {
        e.page.nativeObject.presentViewController(this.picker);
    } else {
        throw new TypeError("Parameter type mismatch. params.page must be Page instance");
    }
};

Multimedia.pickFromGallery = function (e) {
    e["sourceType"] = UIImagePickerControllerSourceType.photoLibrary;
    this.picker = Multimedia.createImagePickerController(e);
    if (e.page && (e.page instanceof Page)) {
        e.page.nativeObject.presentViewController(this.picker);
    } else {
        throw new TypeError("Parameter type mismatch. params.page must be Page instance");
    }
};

Multimedia.pickMultipleFromGallery = function (e) {
    let type = e.type;
    let onSuccess = e.onSuccess;
    let onCancel = e.onCancel;

    let libraryMediaType = (type == Multimedia.Type.VIDEO) ? 1 : 0;

    let ypImagePickerConfig = new __SF_YPImagePickerConfiguration();

    ypImagePickerConfig.showsPhotoFilters = false;
    ypImagePickerConfig.startOnScreen = 0;
    ypImagePickerConfig.hidesStatusBar = false;
    ypImagePickerConfig.libraryItemOverlayType = 1;
    ypImagePickerConfig.screens = [0];
    ypImagePickerConfig.showsVideoTrimmer = false;
    ypImagePickerConfig.videoCompression = "AVAssetExportPresetPassthrough";
    ypImagePickerConfig.galleryHidesRemoveButton = false;
    ypImagePickerConfig.librarySkipSelectionsGallery = true;
    ypImagePickerConfig.videoLibraryTimeLimit = 500.0;
    ypImagePickerConfig.isSquareByDefault = false;

    // 0 = photo, 1 = video, 2 = photoAndVideo, default = photo 
    ypImagePickerConfig.libraryMediaType = libraryMediaType;
    ypImagePickerConfig.maxNumberOfItems = Number.MAX_SAFE_INTEGER;

    let ypImagePicker = new __SF_YPImagePicker(ypImagePickerConfig);

    ypImagePicker.didFinishPicking = function (data) {
        ypImagePicker.picker.dismissViewController(function () {

            if (data.cancelled) {
                onCancel && onCancel();
                return;
            }

            let imageAssets = data.photos.map(function (image) {
                return {
                    image: Image.createFromImage(image.originalImage)
                };
            });

            let videoAssets = data.videos.map(function (video) {
                return {
                    file: new File({
                        path: video.url.path
                    })
                };
            });


            onSuccess && onSuccess({
                assets: type == Multimedia.Type.IMAGE ?
                    imageAssets :
                    videoAssets
            });
        }, true);
        ypImagePicker = undefined;
    }
    if (e.page && (e.page instanceof Page)) {
        e.page.nativeObject.presentViewController(ypImagePicker.picker);
    } else {
        throw new TypeError("Parameter type mismatch. params.page must be Page instance");
    }
};

Multimedia.launchCropper = function (e) {

    let croppingStyle = e.cropShape != undefined ? e.cropShape : 0;
    let title = e.headerBarTitle ? e.headerBarTitle : "";
    let aspectRatio = e.aspectRatio ? e.aspectRatio : { x: 1, y: 1 };
    let enableFreeStyleCrop = e.enableFreeStyleCrop != undefined ? e.enableFreeStyleCrop : false;

    let aspectRatioPickerButtonHidden = true;
    let resetAspectRatioEnabled = false;
    let resetButtonHidden = false;
    let aspectRatioLockDimensionSwapEnabled = true;
    let rotateButtonsHidden = false;
    let showOnlyIcons = false;

    let onSuccess = e.onSuccess;
    let onCancel = e.onCancel;

    if (e.ios) {
        let ios = e.ios;
        aspectRatioPickerButtonHidden = ios.aspectRatioPickerButtonHidden != undefined ? ios.aspectRatioPickerButtonHidden : aspectRatioPickerButtonHidden;
        resetAspectRatioEnabled = ios.resetAspectRatioEnabled != undefined ? ios.resetAspectRatioEnabled : resetAspectRatioEnabled;
        resetButtonHidden = ios.resetButtonHidden != undefined ? ios.resetButtonHidden : resetButtonHidden;
        aspectRatioLockDimensionSwapEnabled = ios.aspectRatioLockDimensionSwapEnabled != undefined ? ios.aspectRatioLockDimensionSwapEnabled : aspectRatioLockDimensionSwapEnabled;
        rotateButtonsHidden = ios.rotateButtonsHidden != undefined ? ios.rotateButtonsHidden : rotateButtonsHidden;
        showOnlyIcons = ios.showOnlyIcons != undefined ? ios.showOnlyIcons : showOnlyIcons;
    }

    var image;
    if (e.asset instanceof File) {
        image = new Image({
            "path": e.asset.nativeObject.getActualPath()
        });
    } else if (e.asset instanceof Image) {
        image = e.asset
    } else {
        throw new TypeError("Parameter type mismatch. params.asset must be File or Image instance");
    }

    let toCropViewController = __SF_TOCropViewController.createWithCroppingStyleImage(
        croppingStyle,
        image.nativeObject
        );
    toCropViewController.title = title;
    
    toCropViewController.setCustomAspect({
        width: aspectRatio.x,
        height: aspectRatio.y
    })


    toCropViewController.aspectRatioLockEnabled = !enableFreeStyleCrop;
    toCropViewController.aspectRatioPickerButtonHidden = aspectRatioPickerButtonHidden;
    toCropViewController.resetAspectRatioEnabled = resetAspectRatioEnabled;
    toCropViewController.aspectRatioLockDimensionSwapEnabled = aspectRatioLockDimensionSwapEnabled;
    toCropViewController.resetButtonHidden = resetButtonHidden;
    toCropViewController.rotateButtonsHidden = rotateButtonsHidden;
    toCropViewController.showOnlyIcons = showOnlyIcons;

    if (e.ios && e.ios.doneButtonTitle) {
        toCropViewController.doneButtonTitle = e.ios.doneButtonTitle;
    }
    
    if (e.ios && e.ios.cancelButtonTitle) {
        toCropViewController.cancelButtonTitle = e.ios.cancelButtonTitle;
    }
    
    if (e.ios && e.ios.doneButtonColor) {
        toCropViewController.doneButtonColor = e.ios.doneButtonColor.nativeObject;
    }
    
    if (e.ios && e.ios.cancelButtonColor) {
        toCropViewController.cancelButtonColor = e.ios.cancelButtonColor.nativeObject;
    }
    
    let delegate = new __SF_TOCropViewControllerDelegate();
    delegate.didCropToImage = function(data) {
        toCropViewController.dismissViewController(function() {
            let image = Image.createFromImage(data.image);
            onSuccess && onSuccess({ image: image });
        }, true);
        toCropViewController = undefined;
    };

    delegate.didCropToCircularImage = function(data) {
        toCropViewController.dismissViewController(function() {
            let image = Image.createFromImage(data.image);
            onSuccess && onSuccess({ image: image });
        }, true);
        toCropViewController = undefined;
    };
    

    delegate.didFinishCancelled = function(cancelled) {
        toCropViewController.dismissViewController(function() {
            onCancel && onCancel();
        }, true);
        toCropViewController = undefined;
    }

    toCropViewController.delegate = delegate;
    toCropViewController.delegateStrong = delegate;

    if (e.page && (e.page instanceof Page)) {
        e.page.nativeObject.presentViewController(toCropViewController);
    } else {
        throw new TypeError("Parameter type mismatch. params.page must be Page instance");
    }
};

Multimedia.hasCameraFeature = Invocation.invokeClassMethod("UIImagePickerController", "isCameraDeviceAvailable:", 0, "BOOL") ||
    Invocation.invokeClassMethod("UIImagePickerController", "isCameraDeviceAvailable:", 1, "BOOL")


Multimedia.CropShape = {};
Multimedia.CropShape.RECTANGLE = 0;
Multimedia.CropShape.OVAL = 1;

Multimedia.VideoQuality = {};
Multimedia.VideoQuality.iOS = {};
Multimedia.VideoQuality.LOW = 0;
Multimedia.VideoQuality.HIGH = 1;
Multimedia.VideoQuality.iOS.MEDIUM = 100;
Multimedia.VideoQuality.iOS.TYPE640x480 = 101;
Multimedia.VideoQuality.iOS.TYPEIFRAME1280x720 = 102;
Multimedia.VideoQuality.iOS.TYPEIFRAME960x540 = 103;


Multimedia.android = {};

Multimedia.Android = {};
Multimedia.Android.CropShape = {};

Multimedia.Type = {};

Multimedia.Type.IMAGE = [UIImagePickerMediaTypes.image];

Multimedia.Type.VIDEO = [UIImagePickerMediaTypes.video];

Multimedia.Type.ALL = [UIImagePickerMediaTypes.image, UIImagePickerMediaTypes.video];

Multimedia.ActionType = {};

Multimedia.ActionType.IMAGE_CAPTURE = [UIImagePickerMediaTypes.image];

Multimedia.ActionType.VIDEO_CAPTURE = [UIImagePickerMediaTypes.video];

Multimedia.iOS = {};
Multimedia.iOS.CameraFlashMode = {};
Multimedia.iOS.CameraFlashMode.OFF = [UIImagePickerControllerCameraFlashMode.off];
Multimedia.iOS.CameraFlashMode.AUTO = [UIImagePickerControllerCameraFlashMode.auto];
Multimedia.iOS.CameraFlashMode.ON = [UIImagePickerControllerCameraFlashMode.on];

Multimedia.iOS.CameraDevice = {};
Multimedia.iOS.CameraDevice.REAR = UIImagePickerControllerCameraDevice.rear;
Multimedia.iOS.CameraDevice.FRONT = UIImagePickerControllerCameraDevice.front;

Multimedia.ios = {};

Multimedia.ios._fixVideoOrientation = function (e) {
    var file = e.videoFile;
    var onCompleted = e.onCompleted;
    var onFailure = e.onFailure;
    var url = file.ios.getNSURL();

    __SF_UIImagePickerController.fixVideoOrientation(url, function (e) {
        if (e.filePath && typeof onCompleted == 'function') {
            var video = new File({
                path: e.filePath
            });
            onCompleted({ video });
        } else if (typeof onFailure == 'function') {
            onFailure();
        }
    });
}

Multimedia.ios.requestGalleryAuthorization = function (callback) {
    Multimedia.ios.native.PHPhotoLibraryRequestAuthorization(function (status) {
        if (typeof callback == 'function') {
            if (status == PHAuthorizationStatus.Authorized) {
                callback(true);
            } else {
                callback(false);
            }
        }
    });
}

Multimedia.ios.requestCameraAuthorization = function (callback) {
    Multimedia.ios.native.AVCaptureDeviceRequestAccessForMediaType(function (status) {
        if (typeof callback == 'function') {
            callback(status);
        }
    });
}

Multimedia.ios.getGalleryAuthorizationStatus = function () {
    return Multimedia.ios.native.PHPhotoLibraryAuthorizationStatus();
}

Multimedia.ios.getCameraAuthorizationStatus = function () {
    return Multimedia.ios.native.AVCaptureDeviceaAuthorizationStatusForMediaType();
}

Multimedia.ios.native = {};

const AVMediaType = {
    Video: "vide"
}

const AVAuthorizationStatus = {
    NotDetermined: 0,
    Restricted: 1,
    Denied: 2,
    Authorized: 3,
}

Multimedia.ios.cameraAuthorizationStatus = AVAuthorizationStatus; //deprecated
Multimedia.iOS.CameraAuthorizationStatus = {
    NOTDETERMINED: 0,
    RESTRICTED: 1,
    DENIED: 2,
    AUTHORIZED: 3
}

Multimedia.ios.native.AVCaptureDeviceRequestAccessForMediaType = function (callback) {
    var argType = new Invocation.Argument({
        type: "NSString",
        value: AVMediaType.Video
    });
    var argCallback = new Invocation.Argument({
        type: "BoolBlock",
        value: callback
    });
    Invocation.invokeClassMethod("AVCaptureDevice", "requestAccessForMediaType:completionHandler:", [argType, argCallback]);
};

Multimedia.ios.native.AVCaptureDeviceaAuthorizationStatusForMediaType = function () {
    var argType = new Invocation.Argument({
        type: "NSString",
        value: AVMediaType.Video
    });
    return Invocation.invokeClassMethod("AVCaptureDevice", "authorizationStatusForMediaType:", [argType], "NSInteger");
}

const PHAuthorizationStatus = {
    NotDetermined: 0, // User has not yet made a choice with regards to this application
    Restricted: 1, // This application is not authorized to access photo data.
    // The user cannot change this application’s status, possibly due to active restrictions
    //   such as parental controls being in place.
    Denied: 2, // User has explicitly denied this application access to photos data.
    Authorized: 3 // User has authorized this application to access photos data.
};

Multimedia.ios.galleryAuthorizationStatus = PHAuthorizationStatus; //deprecated
Multimedia.iOS.GalleryAuthorizationStatus = {
    NOTDETERMINED: 0,
    RESTRICTED: 1,
    DENIED: 2,
    AUTHORIZED: 3
}

Multimedia.ios.native.PHPhotoLibraryRequestAuthorization = function (callback) {
    var argCallback = new Invocation.Argument({
        type: "NSIntegerBlock",
        value: callback
    });
    Invocation.invokeClassMethod("PHPhotoLibrary", "requestAuthorization:", [argCallback]);
};

Multimedia.ios.native.PHPhotoLibraryAuthorizationStatus = function () {
    return Invocation.invokeClassMethod("PHPhotoLibrary", "authorizationStatus", [], "NSInteger");
}

module.exports = Multimedia;