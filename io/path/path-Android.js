const File                  = require("nf-core/io/file");
const AndroidConfig         = require("nf-core/util/Android/androidconfig");
const TypeUtil              = require("nf-core/util/type");
const NativeFile            = requireClass('java.io.File');

const storages = {'internal': null, 'external': null, 'usb': null, 'isResolved': false};
const resolvedPaths = {};
const emulatorPath = Android.getActivity().getExternalCacheDir().getAbsolutePath();


var drawableSizes = ['small', 'normal', 'large' ,'xlarge'];
var drawableDensities = ['ldpi', 'mdpi', 'hdpi', 'xhdpi', 'xxhdpi', 'xxxhdpi']
var desiredDrawableSizeIndex;
var desiredDrawableDensityIndex;

setScreenConfigs();

const Path = function(){};

Object.defineProperties(Path, {
    'ImagesUriScheme': {
        value: 'images://',
        writable: false,
        enumarable: true
    },
    'AssetsUriScheme': {
        value: 'assets://',
        writable: false,
        enumerable: true
    },
    'Separator': {
        value: "/",
        writable: false,
        enumerable: true
    },
    'DataDirectory': {
        get: function(){
            var filesDir = Android.getActivity().getFilesDir();
            if(filesDir){
                return filesDir.getAbsolutePath();
            }
            else{
                return null;
            }
        },
        enumerable: true
    },
    'resolve': {
        value: function(path){
            if(TypeUtil.isString(path)){
                return getResolvedPath(path);
            }
            return null;
        },
        enumerable: false,
        writable: false
    }
});

Path.android = {};
Object.defineProperty(Path.android, 'storages', {
    get: function(){
        if(!storages.isResolved){
            var filesDir = Android.getActivity().getFilesDir();
            if(filesDir){
                storages['internal'] = filesDir.getAbsolutePath();
            }
            
            // @todo test for more devices
            var externalStorage = new NativeFile('/storage/sdcard1/');
            if(externalStorage.exists() && externalStorage.list() != null){
                storages['external'] = '/storage/sdcard1/';
            }
            
            // @todo test for more devices
            var usbStorage = new NativeFile('/storage/usbdisk/');
            if(usbStorage.exists() && usbStorage.list() != null){
                storages['usb'] = '/storage/usbdisk/';
            }
            storages.isResolved = true;
        }
        return storages;
    },
    enumerable: true
});


function getResolvedPath(path){
    if(resolvedPaths[path]){
        return resolvedPaths[path];
    }
    
    resolvedPaths[path] = {};
    
    if(path.startsWith('assets://')){
        // assets://smartface.png to smartface.png
        var fileName = path.slice(9);
        if(AndroidConfig.isEmulator){
            // This is emulator. Check file system
            resolvedPaths[path].name = fileName;
            resolvedPaths[path].type = Path.FILE_TYPE.EMULATOR_ASSETS;
            resolvedPaths[path].path = getEmulatorAssetsPath() + "/" + fileName;
        }
        else{
            // This is player. Check RAU
            resolvedPaths[path].type = Path.FILE_TYPE.RAU_ASSETS;
            resolvedPaths[path].path = getRauAssetsPath() + "/" + fileName;
            // if assets not exists in rau
            if(!checkFileExistsInPath(resolvedPaths[path])){
                resolvedPaths[path].name = fileName;
                resolvedPaths[path].type = Path.FILE_TYPE.ASSET;
                resolvedPaths[path].path = path;
            }
        }
    }
    else if (path.startsWith('images://')){
        // images://smartface.png to smartface.png
        var fileName = path.slice(9);
        if(fileName.endsWith(".png")){
            // we need file name without extension. We should check fileName.png and fileName.9.png for 9Path drawable.
            // images://smartface.png to smartface
            fileName = fileName.substring(0, fileName.lastIndexOf(".png"));
        }
        if(AndroidConfig.isEmulator){
            // This is emulator. Check file system
            resolvedPaths[path].name = fileName;
            resolvedPaths[path].type = Path.FILE_TYPE.EMULATOR_DRAWABLE;
            resolvedPaths[path].path = findDrawableAtDirectory(getEmulatorDrawablePath(), fileName);
        }
        else{
            // This is player. Check RAU
            resolvedPaths[path].type = Path.FILE_TYPE.RAU_DRAWABLE;
            resolvedPaths[path].path = findDrawableAtDirectory(getRauDrawablePath(), fileName);
            if(!resolvedPaths[path]){
                // drawable not exists in RAU get it from apk
                resolvedPaths[path].name = fileName;
                resolvedPaths[path].type = Path.FILE_TYPE.DRAWABLE;
                resolvedPaths[path].path = path;
            }
        }
    }
    else{
        // cache normal path too for performance. We dont want to check more.
        resolvedPaths[path].type = Path.FILE_TYPE.FILE;
        resolvedPaths[path].path = path;
    }
    return resolvedPaths[path];
}

function getEmulatorAssetsPath(){
    return emulatorPath + "/assets";
}
function getEmulatorDrawablePath(){
    return emulatorPath + "/res";
}
function getRauAssetsPath(){
    return emulatorPath + "/system/rau/assets/";
}
function getRauDrawablePath(){
    return emulatorPath + "/system/rau/res/";
}

function findDrawableAtDirectory(path,drawableName){
    // searching drawable on device density and screen size
    var targetPath = checkDrawableVariations(path, drawableSizes[desiredDrawableSizeIndex], drawableDensities[desiredDrawableDensityIndex], drawableName);
    if(targetPath){
        return targetPath;
    }
    
    // searching drawable on densities and screen size which are over the device density and screen size
    for(var i = desiredDrawableDensityIndex+1; i<drawableDensities.length; i++){
        for(var j = desiredDrawableSizeIndex+1; j<drawableSizes.length; j++){
            targetPath = checkDrawableVariations(path, drawableSizes[j], drawableDensities[i], drawableName);
            if(targetPath){
                return targetPath;
            }
        }
    }
    
    // searching drawable on densities and screen size which are below the device density and screen size
    for(var i = desiredDrawableDensityIndex-1; i>=0; i--){
        for(var j = desiredDrawableSizeIndex-1; j>=0; j--){
            targetPath = checkDrawableVariations(path, drawableSizes[j], drawableDensities[i], drawableName);
            if(targetPath){
                return targetPath;
            }
        }
    }
    return null;
}

function checkDrawableVariations(path, drawableSize, drawableDensity, drawableName){
    var targetPath = path + "/drawable-" + drawableDensity + "/" + drawableName + ".png";
    if(checkFileExistsInPath(targetPath)){
        return targetPath;
    }

    var targetPath9Path = path + "/drawable-" + drawableDensity + "/" + drawableName + ".9.png";
    if(checkFileExistsInPath(targetPath9Path)){
        return targetPath9Path;
    }
    
    targetPath = path + "/drawable-" + drawableSize + "/" + drawableName + ".png";
    if(checkFileExistsInPath(targetPath)){
        return targetPath;
    }

    targetPath9Path = path + "/drawable-" + drawableSize + "/" + drawableName + ".9.png";
    if(checkFileExistsInPath(targetPath9Path)){
        return targetPath9Path;
    }
    
    targetPath = path + "/drawable-" + drawableSize + "-" + drawableDensity + "/" + drawableName + ".png";
    if(checkFileExistsInPath(targetPath)){
        return targetPath;
    }

    targetPath9Path = path + "/drawable-" + drawableSize + "-" + drawableDensity + "/" + drawableName + ".9.png";
    if(checkFileExistsInPath(targetPath9Path)){
        return targetPath9Path;
    }
    return null;
}

function checkFileExistsInPath(path){
    // for preventing loop between File and Path, one of them must use native.
    var fileInPath = new NativeFile(path);
    return fileInPath.exists();
}

function setScreenConfigs(){
    const NativeDisplayMetrics  = requireClass("android.util.DisplayMetrics")
    const NativeConfiguration   = requireClass("android.content.res.Configuration");

    var configuration = Android.getActivity().getResources().getConfiguration();
    if ( (configuration.screenLayout & NativeConfiguration.SCREENLAYOUT_SIZE_MASK) == NativeConfiguration.SCREENLAYOUT_SIZE_SMALL) {
        desiredDrawableSizeIndex = 0;
    } 
    else if ( (configuration.screenLayout & NativeConfiguration.SCREENLAYOUT_SIZE_MASK) == NativeConfiguration.SCREENLAYOUT_SIZE_NORMAL) {
        desiredDrawableSizeIndex = 1;
    } 
    else if ( (configuration.screenLayout & NativeConfiguration.SCREENLAYOUT_SIZE_MASK) == NativeConfiguration.SCREENLAYOUT_SIZE_LARGE) {
        desiredDrawableSizeIndex = 2;
    } 
    else if ( (configuration.screenLayout & NativeConfiguration.SCREENLAYOUT_SIZE_MASK) == NativeConfiguration.SCREENLAYOUT_SIZE_XLARGE) {
        desiredDrawableSizeIndex = 3;
    } 
    else {
        desiredDrawableSizeIndex = 1;
    }
    
    var metrics = Android.getActivity().getResources().getDisplayMetrics();
    
    if (metrics.densityDpi <= NativeDisplayMetrics.DENSITY_LOW) {
        desiredDrawableDensityIndex = 0;
    } 
    else if (metrics.densityDpi <= NativeDisplayMetrics.DENSITY_MEDIUM) {
        desiredDrawableDensityIndex = 1;
    } 
    else if (metrics.densityDpi <= NativeDisplayMetrics.DENSITY_HIGH) {
        desiredDrawableDensityIndex = 2;
    } 
    else if (metrics.densityDpi <= NativeDisplayMetrics.DENSITY_XHIGH) {
        desiredDrawableDensityIndex = 3;
    } 
    else if (metrics.densityDpi <= NativeDisplayMetrics.DENSITY_XXHIGH) {
        desiredDrawableDensityIndex = 4;
    }
    else {
        desiredDrawableDensityIndex = 5;
    }
}

Path.FILE_TYPE = {};
Path.FILE_TYPE.FILE = 0, 
Path.FILE_TYPE.ASSET = 1, 
Path.FILE_TYPE.DRAWABLE = 2, 
Path.FILE_TYPE.EMULATOR_ASSETS = 3, 
Path.FILE_TYPE.EMULATOR_DRAWABLE = 4, 
Path.FILE_TYPE.RAU_ASSETS = 5;
Path.FILE_TYPE.RAU_DRAWABLE = 6;

module.exports = Path;