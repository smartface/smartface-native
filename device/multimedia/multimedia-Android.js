const NativeMediaStore = requireClass("android.provider.MediaStore");
const NativeIntent = requireClass("android.content.Intent");

const File = require("nf-core/io/file");
const Image = require("nf-core/ui/image");

const Type = {
    IMAGE: 0,
    VIDEO: 1,
    ALL: 2
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

Multimedia.CAMERA_REQUEST = 1002;
Multimedia.PICK_FROM_GALLERY = 1003;

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

var _captureParams = {};
var _pickParams = {};
var _action = 0;

Multimedia.startCamera = function(params) {
    _captureParams = params;
    if(params && params.action != undefined)
        _action = params.action;
    var takePictureIntent = new NativeIntent(NativeAction[_action]);
    getCurrentPageFragment().startActivityForResult(takePictureIntent, Multimedia.CAMERA_REQUEST);
};

Multimedia.pickFromGallery = function(params) {
    _pickParams = params;
    var intent = new NativeIntent();
    var type = Type.ALL;
    if(params && (params.type != undefined))
        type = params.type;
    intent.setType(_types[type]);
    intent.setAction(NativeIntent.ACTION_GET_CONTENT);
    getCurrentPageFragment().startActivityForResult(intent, Multimedia.PICK_FROM_GALLERY);
};

Multimedia.getAllGalleryItems = function(params) {
    try {
        var projection = [ NativeMediaStore.MediaColumns.DATA ];
        var result = {};
        var uri;
        if((params.type == undefined) || (params.type == Multimedia.Type.VIDEO || 
            params.type == Multimedia.Type.ALL)) {
            uri = NativeMediaStore.Video.Media.EXTERNAL_CONTENT_URI;
            var videos = getAllMediaFromUri({
                uri: uri, 
                projection: projection, 
                type: "video"
            });  
            result.videos = videos;
        }
        
        if((params.type == undefined) || (params.type == Multimedia.Type.IMAGE || 
            params.type == Multimedia.Type.ALL)) {
            uri = NativeMediaStore.Images.Media.EXTERNAL_CONTENT_URI;
            var images = getAllMediaFromUri({
                uri: uri, 
                projection: projection, 
                type: "image"
            });  
            result.images = images;
        }
        if(params && params.onSuccess) {
            params.onSuccess(result);
        }
    }
    catch(err) {
        if(params && params.onFailure)
            params.onFailure(err);
    }
    
};

Multimedia.onActivityResult = function(requestCode, resultCode, data) {
    if(requestCode == Multimedia.CAMERA_REQUEST) {
        getCameraData(resultCode, data);
    }
    else if(requestCode == Multimedia.PICK_FROM_GALLERY) {
        pickFromGallery(resultCode, data);   
    }
};

function pickFromGallery(resultCode, data) {
    var fragmentActivity = getCurrentPageFragment().getActivity();
    if (resultCode == fragmentActivity.RESULT_OK) {
        try {
            var uri = data.getData();
            var realPath = getRealPathFromURI(uri);
            if(_pickParams.onSuccess) {
                var uriStr = uri.getPath(); 
                if (uriStr.includes("images")) {
                    var image = new Image.createFromFile(realPath);
                    _pickParams.onSuccess({image: image});
                } else if (uriStr.includes("video")) {
                    var file = new File({path: realPath});
                    _pickParams.onSuccess({video: file});
                }
            }
        }
        catch (err) {
            if(_pickParams.onFailure)
                _pickParams.onFailure(err);
        }
    }
    else {
        if(_pickParams.onCancel)
            _pickParams.onCancel();
    }
}

function getRealPathFromURI(uri) {
    var projection = [
        NativeMediaStore.MediaColumns.DATA
    ];
    var contentResolver = getCurrentPageFragment().getActivity().getContentResolver();
    var cursor = contentResolver.query(uri, projection, null, null, null);
    // Source is Dropbox or other similar local file path
    if (cursor == null) { 
        return uri.getPath();
    } else {
        cursor.moveToFirst();
        var idx = cursor.getColumnIndex(projection[0]);
        return cursor.getString(idx);
    }
}

function getCameraData(resultCode, data) {
    var fragmentActivity = getCurrentPageFragment().getActivity();
    
    if (resultCode == fragmentActivity.RESULT_OK) {
        try {
            var uri = data.getData();
            var realPath = getRealPathFromURI(uri);
            if(_captureParams.onSuccess) {
                if(_action == NativeAction[0]) {
                    var image = new Image.createFromFile(realPath);
                    _captureParams.onSuccess({image: image});
                }
                else {
                    var file = new File({path: realPath});
                    _captureParams.onSuccess({video: file});
                }
            }
        } catch(err) {
            if(_captureParams.onFailure)
                _captureParams.onFailure();
        }
    }
    else {
        if(_captureParams.onCancel)
            _captureParams.onCancel();
    }
}

function getAllMediaFromUri(params) {
    var activity = getCurrentPageFragment().getActivity();
    var contentResolver = activity.getContentResolver();
    var cursor = contentResolver.query(params.uri, params.projection, null, null, null);
    var files = [];
    if (cursor) {
        while (cursor.moveToNext()) {
            var path = cursor.getString(0);
            if(params.type == "image") {
                var image = new Image.createFromFile(path);
                files.push(image);
            }
            else if(params.type == "video") {
                var file = new File({path: path});
                files.push(file);
            }
        }
        cursor.close();
    }
    return files;
}

function getCurrentPageFragment() {
    const Pages = require("nf-core/ui/pages");
    var currentPage = Pages.currentPage;
    return currentPage.nativeObject;
}

module.exports = Multimedia;