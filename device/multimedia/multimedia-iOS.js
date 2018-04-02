const Image = require("sf-core/ui/image");
const File = require("sf-core/io/file");
const Page = require('sf-core/ui/page');
const Invocation = require('sf-core/util').Invocation;

const UIImagePickerControllerSourceType = {
    photoLibrary : 0,
    camera : 1,
    savedPhotosAlbum : 2
}

const UIImagePickerMediaTypes = {
    image : "public.image",
    video : "public.movie"
}

function Multimedia() {}

Multimedia.createImagePickerController = function(e){
    var picker =  new __SF_UIImagePickerController();
    if (e.action) {
        picker.mediaTypes = e.action;
    }
    
    if (e.type) {
        picker.mediaTypes = e.type;
    }
    
    picker.allowsEditing = false;
    picker.sourceType = e.sourceType;
    this.pickerDelegate =  new __SF_UIImagePickerControllerDelegate();
          
    this.pickerDelegate.imagePickerControllerDidCancel = function(){
        picker.dismissViewController();
        if (e.onCancel){
            e.onCancel();
        }
    };
  
    this.pickerDelegate.didFinishPickingMediaWithInfo = function(param){
        picker.dismissViewController();
        if (e.onSuccess){
            if (param.info["UIImagePickerControllerMediaType"] === UIImagePickerMediaTypes.image){
                var image = Image.createFromImage(param.info["UIImagePickerControllerOriginalImage"]);
                if (image.nativeObject.fixOrientation) {
                    var fixedImage = image.nativeObject.fixOrientation();
                    image = Image.createFromImage(fixedImage);
                }
                e.onSuccess({image : image});
            }else if(param.info["UIImagePickerControllerMediaType"] === UIImagePickerMediaTypes.video){
                var videoURL = param.info["UIImagePickerControllerMediaURL"];
                var file = new File({path:videoURL.absoluteString});
                e.onSuccess({video : file});
            }
        }
    };
    
    picker.delegate = this.pickerDelegate;
    
    return picker;
}

Multimedia.startCamera = function(e) {
    e["sourceType"] = UIImagePickerControllerSourceType.camera;
    this.picker = Multimedia.createImagePickerController(e);
    if (e.page && (e.page instanceof Page)) {
        e.page.nativeObject.presentViewController(this.picker);
    }else{
        throw new TypeError("Parameter type mismatch. params.page must be Page instance");
    }
};

Multimedia.pickFromGallery = function(e) {
    e["sourceType"] = UIImagePickerControllerSourceType.photoLibrary;
    this.picker = Multimedia.createImagePickerController(e);
    if (e.page && (e.page instanceof Page)) {
        e.page.nativeObject.presentViewController(this.picker);
    }else{
        throw new TypeError("Parameter type mismatch. params.page must be Page instance");
    }
};

Multimedia.android = {};

Multimedia.android.getAllGalleryItems = function(){};

Multimedia.Type = { };

Multimedia.Type.IMAGE = [UIImagePickerMediaTypes.image];

Multimedia.Type.VIDEO = [UIImagePickerMediaTypes.video];

Multimedia.Type.ALL = [UIImagePickerMediaTypes.image, UIImagePickerMediaTypes.video];

Multimedia.ActionType = { };

Multimedia.ActionType.IMAGE_CAPTURE = [UIImagePickerMediaTypes.image];

Multimedia.ActionType.VIDEO_CAPTURE = [UIImagePickerMediaTypes.video];

Multimedia.ios = {};

Multimedia.ios.requestGalleryAuthorization = function(callback){
    Multimedia.ios.native.PHPhotoLibraryRequestAuthorization(function(status){
        if (typeof callback == 'function') {
            if (status == PHAuthorizationStatus.Authorized) {
                callback(true);
            }else{
                callback(false);
            }
        }
    });
}

Multimedia.ios.requestCameraAuthorization = function(callback){
    Multimedia.ios.native.AVCaptureDeviceRequestAccessForMediaType(function(status){
        if (typeof callback == 'function') {
            callback(status);
        }
    });
}

Multimedia.ios.native = {};

const AVMediaType = {
    Video : "vide"
}

const AVAuthorizationStatus = {
    NotDetermined : 0,
    Restricted : 1,
    Denied : 2,
    Authorized : 3,
}

Multimedia.ios.native.AVCaptureDeviceRequestAccessForMediaType = function(callback){
    var argType = new Invocation.Argument({
        type:"NSString",
        value: AVMediaType.Video
    });
    var argCallback = new Invocation.Argument({
        type:"BoolBlock",
        value: callback
    });
    Invocation.invokeClassMethod("AVCaptureDevice","requestAccessForMediaType:completionHandler:",[argType,argCallback]);
};

Multimedia.ios.native.AVCaptureDeviceaAuthorizationStatusForMediaType = function(){
    var argType = new Invocation.Argument({
        type:"NSString",
        value: AVMediaType.Video
    });
    return Invocation.invokeClassMethod("AVCaptureDevice","authorizationStatusForMediaType:",[argType],"NSInteger");
}

const PHAuthorizationStatus = {
    NotDetermined : 0, // User has not yet made a choice with regards to this application
    Restricted : 1,        // This application is not authorized to access photo data.
                                            // The user cannot change this application’s status, possibly due to active restrictions
                                            //   such as parental controls being in place.
    Denied : 2,            // User has explicitly denied this application access to photos data.
    Authorized : 3      // User has authorized this application to access photos data.
};

Multimedia.ios.native.PHPhotoLibraryRequestAuthorization = function(callback){
    var argCallback = new Invocation.Argument({
        type:"NSIntegerBlock",
        value: callback
    });
    Invocation.invokeClassMethod("PHPhotoLibrary","requestAuthorization:",[argCallback]);
};

Multimedia.ios.native.PHPhotoLibraryAuthorizationStatus = function(){
    return Invocation.invokeClassMethod("PHPhotoLibrary","authorizationStatus",[],"NSInteger");
}

module.exports = Multimedia;