const Image = require("sf-core/ui/image");
const File = require("sf-core/io/file");
const Page = require('sf-core/ui/page');

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
                e.onSuccess({image : Image.createFromImage(param.info["UIImagePickerControllerOriginalImage"])});
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

module.exports = Multimedia;