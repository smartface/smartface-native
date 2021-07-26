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

Multimedia.VideoQuality = {};
Multimedia.VideoQuality.iOS = {};
Multimedia.VideoQuality.LOW = 0;
Multimedia.VideoQuality.HIGH = 1;
Multimedia.VideoQuality.iOS.MEDIUM = 100;
Multimedia.VideoQuality.iOS.TYPE640x480 = 101;
Multimedia.VideoQuality.iOS.TYPEIFRAME1280x720 = 102;
Multimedia.VideoQuality.iOS.TYPEIFRAME960x540 = 103;


Multimedia.android = {};

Multimedia.android.getAllGalleryItems = function () { };
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

    __SF_UIImagePickerController.fixVideoOrientation(url,function(e){
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