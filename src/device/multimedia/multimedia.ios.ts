import { MultimediaBase } from '.';
import File from '../../io/file';
import Image from '../../ui/image';
import Page from '../../ui/page';
import Invocation from '../../util/iOS/invocation';

const UIImagePickerControllerSourceType = {
  photoLibrary: 0,
  camera: 1,
  savedPhotosAlbum: 2
};

const UIImagePickerMediaTypes = {
  image: 'public.image',
  video: 'public.movie'
};

const UIImagePickerControllerCameraFlashMode = {
  off: -1,
  auto: 0,
  on: 1
};

const UIImagePickerControllerCameraDevice = {
  rear: 0,
  front: 1
};

const UIImagePickerControllerQualityType = {
  typeHigh: 0,
  typeMedium: 1,
  typeLow: 2,
  type640x480: 3,
  typeIFrame1280x720: 4,
  typeIFrame960x540: 5
};

const AVMediaType = {
  Video: 'vide'
};

const AVAuthorizationStatus = {
  NotDetermined: 0,
  Restricted: 1,
  Denied: 2,
  Authorized: 3
};

const PHAuthorizationStatus = {
  NotDetermined: 0, // User has not yet made a choice with regards to this application
  Restricted: 1, // This application is not authorized to access photo data.
  // The user cannot change this application’s status, possibly due to active restrictions
  //   such as parental controls being in place.
  Denied: 2, // User has explicitly denied this application access to photos data.
  Authorized: 3 // User has authorized this application to access photos data.
};

class MultimediaIOS extends MultimediaBase {
  CropShape = {
    RECTANGLE: 0,
    OVAL: 1
  };
  android = {};
  Android = {
    CropShape: {}
  };
  ios = {
    native: {
      AVCaptureDeviceRequestAccessForMediaType(callback) {
        const argType = new Invocation.Argument({
          type: 'NSString',
          value: AVMediaType.Video
        });
        const argCallback = new Invocation.Argument({
          type: 'BoolBlock',
          value: callback
        });
        Invocation.invokeClassMethod('AVCaptureDevice', 'requestAccessForMediaType:completionHandler:', [argType, argCallback]);
      },
      AVCaptureDeviceaAuthorizationStatusForMediaType() {
        const argType = new Invocation.Argument({
          type: 'NSString',
          value: AVMediaType.Video
        });
        return Invocation.invokeClassMethod('AVCaptureDevice', 'authorizationStatusForMediaType:', [argType], 'NSInteger');
      },
      PHPhotoLibraryRequestAuthorization(callback) {
        const argCallback = new Invocation.Argument({
          type: 'NSIntegerBlock',
          value: callback
        });
        Invocation.invokeClassMethod('PHPhotoLibrary', 'requestAuthorization:', [argCallback]);
      },
      PHPhotoLibraryAuthorizationStatus() {
        return Invocation.invokeClassMethod('PHPhotoLibrary', 'authorizationStatus', [], 'NSInteger');
      }
    },
    cameraAuthorizationStatus: AVAuthorizationStatus,
    galleryAuthorizationStatus: PHAuthorizationStatus
  };
  iOS = {
    CameraFlashMode: {
      OFF: [UIImagePickerControllerCameraFlashMode.off],
      AUTO: [UIImagePickerControllerCameraFlashMode.auto],
      ON: [UIImagePickerControllerCameraFlashMode.on]
    },
    CameraDevice: {
      REAR: UIImagePickerControllerCameraDevice.rear,
      FRONT: UIImagePickerControllerCameraDevice.front
    },
    CameraAuthorizationStatus: {
      NOTDETERMINED: 0,
      RESTRICTED: 1,
      DENIED: 2,
      AUTHORIZED: 3
    },
    GalleryAuthorizationStatus: {
      NOTDETERMINED: 0,
      RESTRICTED: 1,
      DENIED: 2,
      AUTHORIZED: 3
    }
  };
  VideoQuality = {
    LOW: 0,
    HIGH: 1,
    iOS: {
      MEDIUM: 100,
      TYPE640x480: 101,
      TYPEIFRAME1280x720: 102,
      TYPEIFRAME960x540: 103
    }
  };
  ActionType = {
    IMAGE_CAPTURE: [UIImagePickerMediaTypes.image],
    VIDEO_CAPTURE: [UIImagePickerMediaTypes.video]
  };
  Type = {
    IMAGE: [UIImagePickerMediaTypes.image],
    VIDEO: [UIImagePickerMediaTypes.video],
    ALL: [UIImagePickerMediaTypes.image, UIImagePickerMediaTypes.video]
  };
  private picker: __SF_UIImagePickerController;
  private pickerDelegate = new __SF_UIImagePickerControllerDelegate();
  hasCameraFeature =
    Invocation.invokeClassMethod('UIImagePickerController', 'isCameraDeviceAvailable:', 0 as any, 'BOOL') ||
    Invocation.invokeClassMethod('UIImagePickerController', 'isCameraDeviceAvailable:', 1 as any, 'BOOL');
  constructor() {
    super();
    const self = this;
    const ios = {
      _fixVideoOrientation(e) {
        const file = e.videoFile;
        const onCompleted = e.onCompleted;
        const onFailure = e.onFailure;
        const url = file.ios.getNSURL();

        __SF_UIImagePickerController.fixVideoOrientation(url, function (e) {
          if (e.filePath && typeof onCompleted === 'function') {
            const video = new File({
              path: e.filePath
            });
            onCompleted({ video });
          } else if (typeof onFailure === 'function') {
            onFailure();
          }
        });
      },
      requestGalleryAuthorization(callback) {
        self.ios.native.PHPhotoLibraryRequestAuthorization(function (status) {
          if (typeof callback === 'function') {
            if (status === PHAuthorizationStatus.Authorized) {
              callback(true);
            } else {
              callback(false);
            }
          }
        });
      },
      requestCameraAuthorization(callback) {
        self.ios.native.AVCaptureDeviceRequestAccessForMediaType(function (status) {
          if (typeof callback === 'function') {
            callback(status);
          }
        });
      },
      getGalleryAuthorizationStatus() {
        return self.ios.native.PHPhotoLibraryAuthorizationStatus();
      },
      getCameraAuthorizationStatus() {
        return self.ios.native.AVCaptureDeviceaAuthorizationStatusForMediaType();
      }
    };
    Object.assign(this.ios, ios);
  }
  createImagePickerController(e): __SF_UIImagePickerController {
    const picker = new __SF_UIImagePickerController();
    if (e.action) {
      picker.mediaTypes = e.action;
    }

    if (e.type) {
      picker.mediaTypes = e.type;
    }

    if (e.maximumDuration) {
      picker.setValueForKey(e.maximumDuration, 'videoMaximumDuration');
    }

    if (e.videoQuality !== undefined) {
      let quality;
      switch (e.videoQuality) {
        case this.VideoQuality.LOW:
          quality = UIImagePickerControllerQualityType.typeLow;
          break;
        case this.VideoQuality.HIGH:
          quality = UIImagePickerControllerQualityType.typeHigh;
          break;
        case this.VideoQuality.iOS.MEDIUM:
          quality = UIImagePickerControllerQualityType.typeMedium;
          break;
        case this.VideoQuality.iOS.TYPE640x480:
          quality = UIImagePickerControllerQualityType.type640x480;
          break;
        case this.VideoQuality.iOS.TYPEIFRAME1280x720:
          quality = UIImagePickerControllerQualityType.typeIFrame1280x720;
          break;
        case this.VideoQuality.iOS.TYPEIFRAME960x540:
          quality = UIImagePickerControllerQualityType.typeIFrame960x540;
          break;
        default:
          quality = UIImagePickerControllerQualityType.typeMedium;
      }
      picker.setValueForKey(quality, 'videoQuality');
    }

    picker.allowsEditing = e.allowsEditing ? e.allowsEditing : false;

    picker.sourceType = e.sourceType;

    if (picker.sourceType === UIImagePickerControllerSourceType.camera) {
      if (e.ios) {
        if (e.ios.cameraDevice !== undefined) {
          picker.cameraDevice = e.ios.cameraDevice;
        }
        if (e.ios.cameraFlashMode !== undefined) {
          picker.cameraFlashMode = e.ios.cameraFlashMode;
        }
      }
    }

    this.pickerDelegate.imagePickerControllerDidCancel = function () {
      picker.dismissViewController();
      if (e.onCancel) {
        e.onCancel();
      }
    };

    this.pickerDelegate.didFinishPickingMediaWithInfo = function (param) {
      picker.dismissViewController(function () {
        if (e.onSuccess) {
          if (param.info['UIImagePickerControllerMediaType'] === UIImagePickerMediaTypes.image) {
            let image;
            if (param.info['UIImagePickerControllerEditedImage']) {
              image = Image.createFromImage(param.info['UIImagePickerControllerEditedImage']);
            } else {
              image = Image.createFromImage(param.info['UIImagePickerControllerOriginalImage']);
            }

            if (image.nativeObject.fixOrientation) {
              const fixedImage = image.nativeObject.fixOrientation();
              image = Image.createFromImage(fixedImage);
            }
            e.onSuccess({
              image: image
            });
          } else if (param.info['UIImagePickerControllerMediaType'] === UIImagePickerMediaTypes.video) {
            const videoURL = param.info['UIImagePickerControllerMediaURL'];
            const file = new File({
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
  startCamera(e) {
    e['sourceType'] = UIImagePickerControllerSourceType.camera;
    this.picker = this.createImagePickerController(e);
    if (e.page && e.page instanceof Page) {
      e.page.nativeObject.presentViewController(this.picker);
    } else {
      throw new TypeError('Parameter type mismatch. params.page must be Page instance');
    }
  }
  convertToMp4(e) {
    const file = e.videoFile;
    const outputFileName = e.outputFileName;
    const onCompleted = e.onCompleted;
    const onFailure = e.onFailure;

    __SF_UIImagePickerController.convertToMP4WithPresetQualityWithShouldOptimizeForNetworkUseVideoFilePathFileNameCallback(0, false, file.path, outputFileName, function (e) {
      if (e.filePath && typeof onCompleted === 'function') {
        const video = new File({
          path: e.filePath
        });
        onCompleted({ video });
      } else if (typeof onFailure === 'function') {
        onFailure();
      }
    });
  }
  capturePhoto(e) {
    e['sourceType'] = UIImagePickerControllerSourceType.camera;
    e['action'] = this.ActionType.IMAGE_CAPTURE;
    this.picker = this.createImagePickerController(e);
    if (e.page && e.page instanceof Page) {
      e.page.nativeObject.presentViewController(this.picker);
    } else {
      throw new TypeError('Parameter type mismatch. params.page must be Page instance');
    }
  }
  recordVideo(e) {
    e['sourceType'] = UIImagePickerControllerSourceType.camera;
    e['action'] = this.ActionType.VIDEO_CAPTURE;
    this.picker = this.createImagePickerController(e);
    if (e.page && e.page instanceof Page) {
      e.page.nativeObject.presentViewController(this.picker);
    } else {
      throw new TypeError('Parameter type mismatch. params.page must be Page instance');
    }
  }
  pickFromGallery(e) {
    e['sourceType'] = UIImagePickerControllerSourceType.photoLibrary;
    this.picker = this.createImagePickerController(e);
    if (e.page && e.page instanceof Page) {
      e.page.nativeObject.presentViewController(this.picker);
    } else {
      throw new TypeError('Parameter type mismatch. params.page must be Page instance');
    }
  }
  pickMultipleFromGallery(e) {
    const type = e.type;
    const onSuccess = e.onSuccess;
    const onCancel = e.onCancel;

    const libraryMediaType = type === this.Type.VIDEO ? 1 : 0;

    const ypImagePickerConfig = new __SF_YPImagePickerConfiguration();

    ypImagePickerConfig.showsPhotoFilters = false;
    ypImagePickerConfig.startOnScreen = 0;
    ypImagePickerConfig.hidesStatusBar = false;
    ypImagePickerConfig.libraryItemOverlayType = 1;
    ypImagePickerConfig.screens = [0];
    ypImagePickerConfig.showsVideoTrimmer = false;
    ypImagePickerConfig.videoCompression = 'AVAssetExportPresetPassthrough';
    ypImagePickerConfig.galleryHidesRemoveButton = false;
    ypImagePickerConfig.librarySkipSelectionsGallery = true;
    ypImagePickerConfig.videoLibraryTimeLimit = 500.0;
    ypImagePickerConfig.isSquareByDefault = false;

    // 0 = photo, 1 = video, 2 = photoAndVideo, default = photo
    ypImagePickerConfig.libraryMediaType = libraryMediaType;
    ypImagePickerConfig.maxNumberOfItems = Number.MAX_SAFE_INTEGER;

    let ypImagePicker: __SF_YPImagePicker | undefined = new __SF_YPImagePicker(ypImagePickerConfig);

    ypImagePicker.didFinishPicking = function (data) {
      ypImagePicker?.picker.dismissViewController(function () {
        if (data.cancelled) {
          onCancel && onCancel();
          return;
        }

        const imageAssets = data.photos.map(function (image) {
          return {
            image: Image.createFromImage(image.originalImage)
          };
        });

        const videoAssets = data.videos.map(function (video) {
          return {
            file: new File({
              path: video.url.path
            })
          };
        });

        onSuccess &&
          onSuccess({
            assets: type === this.Type.IMAGE ? imageAssets : videoAssets
          });
      }, true);
      ypImagePicker = undefined;
    };
    if (e.page && e.page instanceof Page) {
      e.page.nativeObject.presentViewController(ypImagePicker.picker);
    } else {
      throw new TypeError('Parameter type mismatch. params.page must be Page instance');
    }
  }
  launchCropper(e) {
    const croppingStyle = e.cropShape !== undefined ? e.cropShape : 0;
    const title = e.headerBarTitle ? e.headerBarTitle : '';
    const aspectRatio = e.aspectRatio ? e.aspectRatio : { x: 1, y: 1 };
    const enableFreeStyleCrop = e.enableFreeStyleCrop !== undefined ? e.enableFreeStyleCrop : false;

    let aspectRatioPickerButtonHidden = true;
    let resetAspectRatioEnabled = false;
    let resetButtonHidden = false;
    let aspectRatioLockDimensionSwapEnabled = true;
    let rotateButtonsHidden = false;
    let showOnlyIcons = false;

    const onSuccess = e.onSuccess;
    const onCancel = e.onCancel;

    if (e.ios) {
      const ios = e.ios;
      aspectRatioPickerButtonHidden = ios.aspectRatioPickerButtonHidden !== undefined ? ios.aspectRatioPickerButtonHidden : aspectRatioPickerButtonHidden;
      resetAspectRatioEnabled = ios.resetAspectRatioEnabled !== undefined ? ios.resetAspectRatioEnabled : resetAspectRatioEnabled;
      resetButtonHidden = ios.resetButtonHidden !== undefined ? ios.resetButtonHidden : resetButtonHidden;
      aspectRatioLockDimensionSwapEnabled = ios.aspectRatioLockDimensionSwapEnabled !== undefined ? ios.aspectRatioLockDimensionSwapEnabled : aspectRatioLockDimensionSwapEnabled;
      rotateButtonsHidden = ios.rotateButtonsHidden !== undefined ? ios.rotateButtonsHidden : rotateButtonsHidden;
      showOnlyIcons = ios.showOnlyIcons !== undefined ? ios.showOnlyIcons : showOnlyIcons;
    }

    let image;
    if (e.asset instanceof File) {
      image = new Image({
        path: e.asset.nativeObject.getActualPath()
      });
    } else if (e.asset instanceof Image) {
      image = e.asset;
    } else {
      throw new TypeError('Parameter type mismatch. params.asset must be File or Image instance');
    }

    let toCropViewController: __SF_TOCropViewController | undefined = __SF_TOCropViewController.createWithCroppingStyleImage(croppingStyle, image.nativeObject);
    toCropViewController.title = title;

    toCropViewController.setCustomAspect({
      width: aspectRatio.x,
      height: aspectRatio.y
    });

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

    const delegate = new __SF_TOCropViewControllerDelegate();
    delegate.didCropToImage = function (data) {
      toCropViewController?.dismissViewController(function () {
        const image = Image.createFromImage(data.image);
        onSuccess && onSuccess({ image: image });
      }, true);
      toCropViewController = undefined;
    };

    delegate.didCropToCircularImage = function (data) {
      toCropViewController?.dismissViewController(function () {
        const image = Image.createFromImage(data.image);
        onSuccess && onSuccess({ image: image });
      }, true);
      toCropViewController = undefined;
    };

    delegate.didFinishCancelled = function () {
      toCropViewController?.dismissViewController(function () {
        onCancel && onCancel();
      }, true);
      toCropViewController = undefined;
    };

    toCropViewController.delegate = delegate;
    toCropViewController.delegateStrong = delegate;

    if (e.page && e.page instanceof Page) {
      e.page.nativeObject.presentViewController(toCropViewController);
    } else {
      throw new TypeError('Parameter type mismatch. params.page must be Page instance');
    }
  }
}

const Multimedia = new MultimediaIOS();

export default Multimedia;
