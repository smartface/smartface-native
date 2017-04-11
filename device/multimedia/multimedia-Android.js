const NativeMediaStore = requireClass("android.provider.MediaStore");
const NativeIntent = requireClass("android.content.Intent");
const NativeBitmapFactory = requireClass("android.graphics.BitmapFactory");
const NativeContentValues = requireClass("android.content.ContentValues");
const NativeBuild = requireClass("android.os.Build");

const File = require("sf-core/io/file");
const Image = require("sf-core/ui/image");

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

const NOUGAT = 24;

var _fileURI = null;

Multimedia.startCamera = function(params) {
    _captureParams = params;
    if(params && params.action !== undefined) {
        _action = params.action;
    }
    
    if(NativeBuild.VERSION.SDK_INT >= NOUGAT) {
        startCameraWithExtraField();
    }
    else {
        var takePictureIntent = new NativeIntent(NativeAction[_action]);
        getCurrentPageFragment().startActivityForResult(takePictureIntent, Multimedia.CAMERA_REQUEST);
    }
};

function startCameraWithExtraField() {
    var activity = Android.getActivity();
    var takePictureIntent = new NativeIntent(NativeAction[_action]);
    var packageManager = activity.getPackageManager();
    
    if (takePictureIntent.resolveActivity(packageManager)) {
        var contentUri;
        var contentValues = new NativeContentValues();
        var contentResolver = activity.getContentResolver();
        if(_action === ActionType.IMAGE_CAPTURE) {
            contentUri = NativeMediaStore.Images.Media.EXTERNAL_CONTENT_URI;
            _fileURI = contentResolver.insert(contentUri, contentValues);
        }
        else if(_action === ActionType.VIDEO_CAPTURE) {
            contentUri = NativeMediaStore.Video.Media.EXTERNAL_CONTENT_URI;
            _fileURI = contentResolver.insert(contentUri, contentValues);
        }
        
        if(_fileURI) {
            var output = NativeMediaStore.EXTRA_OUTPUT;
            takePictureIntent.putExtra(output, _fileURI);
            getCurrentPageFragment().startActivityForResult(takePictureIntent, Multimedia.CAMERA_REQUEST);
        }
    }
}

Multimedia.pickFromGallery = function(params) {
    _pickParams = params;
    var intent = new NativeIntent();
    var type = Type.ALL;
    if(params && (params.type !== undefined))
        type = params.type;
    intent.setType(_types[type]);
    intent.setAction(NativeIntent.ACTION_GET_CONTENT);
    getCurrentPageFragment().startActivityForResult(intent, Multimedia.PICK_FROM_GALLERY);
};

Multimedia.android = {};

Multimedia.android.getAllGalleryItems = function(params) {
    try {
        var projection = [ NativeMediaStore.MediaColumns.DATA ];
        var result = {};
        var uri;
        if(params && params.type === Multimedia.Type.VIDEO) {
            uri = NativeMediaStore.Video.Media.EXTERNAL_CONTENT_URI;
            var videos = getAllMediaFromUri({
                uri: uri, 
                projection: projection, 
                type: params.type
            });  
            result.videos = videos;
        }
        else if(params && params.type === Multimedia.Type.IMAGE) {
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
        
        if(params && params.onSuccess) {
            params.onSuccess(result);
        }
    }
    catch(err) {
        if(params && params.onFailure)
            params.onFailure({message: err});
    }
    
};

Multimedia.onActivityResult = function(requestCode, resultCode, data) {
    if(requestCode === Multimedia.CAMERA_REQUEST) {
        getCameraData(resultCode, data);
    }
    else if(requestCode === Multimedia.PICK_FROM_GALLERY) {
        pickFromGallery(resultCode, data);   
    }
};

function pickFromGallery(resultCode, data) {
    var activity = Android.getActivity();
    if (resultCode === activity.RESULT_OK) {
        try {
            var uri = data.getData();
            var realPath;
            if(NativeBuild.VERSION.SDK_INT >= NOUGAT) {
                realPath = getRealPathFromID(uri, _pickParams.type);
            }
            else {
                realPath = getRealPathFromURI(uri);
            }
            
            if(_pickParams.onSuccess) {
                if (_pickParams.type === Multimedia.Type.IMAGE) {
                    var inputStream = activity.getContentResolver().openInputStream(uri);
                    var bitmap = NativeBitmapFactory.decodeStream(inputStream);
                    var image = new Image({bitmap: bitmap});
                    _pickParams.onSuccess({image: image});
                } else {
                    var file = new File({path: realPath});
                    _pickParams.onSuccess({video: file});
                }
            }
        }
        catch (err) {
            if(_pickParams.onFailure)
                _pickParams.onFailure({message: err});
        }
    }
    else {
        if(_pickParams.onCancel)
            _pickParams.onCancel();
    }
}

function getRealPathFromID(uri, action) {
    const NativeDocumentsContract = requireClass("android.provider.DocumentsContract");
    var docId = NativeDocumentsContract.getDocumentId(uri);
    var id = docId.split(":")[1];
    
    var projection = [ "_data" ]; // MediaStore.Images.Media.DATA 
    var selection = "_id" + "=?"; // MediaStore.Images.Media._ID
    var contentResolver = Android.getActivity().getContentResolver();
    var contentUri;
    
    if (_pickParams.type === Multimedia.Type.IMAGE) {
        contentUri = NativeMediaStore.Images.Media.EXTERNAL_CONTENT_URI;
    }
    else if (_pickParams.type === Multimedia.Type.VIDEO) {
        contentUri = NativeMediaStore.Video.Media.EXTERNAL_CONTENT_URI;
    }
    else {
        throw new Error("Unexpected type: " + _pickParams.type);
    }
    var cursor = contentResolver.
                    query(contentUri, projection, selection, [ id ], null);
    var filePath = null;
    if(cursor) {
        var columnIndex = cursor.getColumnIndex(projection[0]);
        if (cursor.moveToFirst()) {
            filePath = cursor.getString(columnIndex);
        }

        cursor.close();
    }
    return filePath;
}

function getRealPathFromURI(uri) {
    var projection = [
        "_data" //NativeMediaStore.MediaColumns.DATA
    ];
    var contentResolver = Android.getActivity().getContentResolver();
    var cursor = contentResolver.query(uri, projection, null, null, null);
    if (cursor === null) { 
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
    var activity = Android.getActivity();
    if (resultCode === activity.RESULT_OK) {
        try {
            var uri;
            if(NativeBuild.VERSION.SDK_INT >= NOUGAT) {
                uri = _fileURI;
            }
            else {
                uri = data.getData();
            }
            
            if(_captureParams.onSuccess) {
                if(_action === ActionType.IMAGE_CAPTURE) {
                    
                    var inputStream = activity.getContentResolver().openInputStream(uri);
                    var bitmap = NativeBitmapFactory.decodeStream(inputStream);
                    var image = new Image({bitmap: bitmap});
                    _captureParams.onSuccess({image: image});
                }
                else {
                    var realPath = getRealPathFromURI(uri);
                    var file = new File({path: realPath});
                    _captureParams.onSuccess({video: file});
                }
            }
        } catch(err) {
            if(_captureParams.onFailure)
                _captureParams.onFailure({message: err});
        }
    }
    else {
        if(_captureParams.onCancel)
            _captureParams.onCancel();
    }
}

function getAllMediaFromUri(params) {
    var activity = Android.getActivity();
    var contentResolver = activity.getContentResolver();
    var cursor = contentResolver.query(params.uri, params.projection, null, null, null);
    var files = [];
    if (cursor) {
        while (cursor.moveToNext()) {
            var path = cursor.getString(0);
            if(params.type === Multimedia.Type.IMAGE) {
                var image = new Image.createFromFile(path);
                files.push(image);
            }
            else {
                var file = new File({path: path});
                files.push(file);
            }
        }
        cursor.close();
    }
    return files;
}

function getCurrentPageFragment() {
    const Router = require("sf-core/ui/router");
    return Router.getCurrentPage().page.nativeObject;
}

module.exports = Multimedia;