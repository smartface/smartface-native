const File                  = require("nf-core/io/file");
const AndroidConfig         = require("nf-core/util/Android/androidconfig");
const TypeUtil              = require("nf-core/util/type");

const NativeFile            = requireClass("java.io.File");
const NativeEnvironment     = requireClass("android.os.Environment");
const NativeConfiguration   = requireClass("android.content.res.Configuration");
const NativeDisplayMetrics  = requireClass("android.util.DisplayMetrics")

const storages = {};
const resolvedPaths = {};
const emulatorPath = NativeEnvironment.getExternalStorageDirectory().getAbsolutePath() + "/Android/data/" + Android.getActivity().getPackageName() +  "/cache";

var desiredDrawableSize;
var desiredDrawableDensity;
setScreenConfigs();

function Path() {}


Object.defineProperty(Path, 'ImagesUriScheme', {
    value: 'images://',
    writable: false
});


Object.defineProperty(Path, 'AssetsUriScheme', {
    value: 'assets://',
    writable: false
});

Object.defineProperty(Path, 'Separator', {
    value: "/",
    writable: false
});

Object.defineProperty(Path, 'DataDirectory', {
    get: function(){
        var filesDir = Android.getActivity().getFilesDir();
        if(filesDir){
            return File.createFromNativeObject(filesDir);
        }
        else{
            return null;
        }
    },
    writable: false
});


Path.android = {};
Object.defineProperty(Path.android, 'storages', {
    get: function(){
        if(!storages){
            storages = {'internal': null, 'external': null, 'usb': null};
            var filesDir = Android.getActivity().getFilesDir();
            if(filesDir){
                storages['internal'] = File.createFromNativeObject(filesDir);
            }
            
            // @todo test for more devices
            var externalStorage = new NativeFile('/storage/sdcard1/');
            if(externalStorage.exists() && externalStorage.listFiles() != null){
                storages['external'] = File.createFromNativeObject(externalStorage);
            }
            
            // @todo test for more devices
            var usbStorage = new NativeFile('/storage/usbdisk/');
            if(usbStorage.exists() && usbStorage.listFiles() != null){
                storages['usb'] = File.createFromNativeObject(usbStorage);
            }
        }
        return storages;
    },
    writable: false
});

Path.resolve = function(path){
    if(TypeUtil.isString(path)){
        // checking if assets
        if(AndroidConfig.isEmulator){
            return getEmulatorAssetsPath(path);
        }
        else{
            return path;
        }
    }
    return null;
}

function getEmulatorPath(path){
    if(resolvedPaths[path]){
        return resolvedPaths[path];
    }
    if(path.startsWith('assets://')){
        var fileName = path.slice(9);
        
        resolvedPaths[path] = getRauAssetsPath() + "/" + fileName;
        var fileAssetRau = new File({
            path: resolvedPaths[path]
        });
        
        if(!fileAssetRau.exists){
            resolvedPaths[path] = getEmulatorAssetsPath() + "/" + fileName;
        }
        return resolvedPaths[path];
    }
    else if (path.startsWith('images://')){
        // keep latest / for not adding again
        var fileName = path.slice(9);
        if(fileName.endsWith(".png")){
            fileName = fileName.substring(fileName.lastIndexOf(".png"),fileName.length);
        }
        
        resolvedPaths[path] = findDrawableAtDirectory(getRauDrawablePath(), fileName) || findDrawableAtDirectory(getEmulatorDrawablePath(), fileName);
        return resolvedPaths[path];
    }
    else{
        return path;
    }
}

function getEmulatorAssetsPath(){
    return emulatorPath + "/assets";
}
function getEmulatorDrawablePath(){
    return emulatorPath + "/assets/res";
}
function getRauAssetsPath(){
    return emulatorPath + "/system/rau/assets/";
}
function getRauDrawablePath(){
    return emulatorPath + "/system/rau/res/";
}

function findDrawableAtDirectory(path,drawableName){
    // assuming js developer enter path with extension.
    var targetPath = path + "/drawable-" + desiredDrawableSize + "-" + desiredDrawableDensity + "/" + drawableName + ".png";
    var fileDrawable = new File({
        path: targetPath
    });
    if(fileDrawable.exists){
        return targetPath;
    }
    
    var targetPath9Path = path + "/drawable-" + desiredDrawableSize + "-" + desiredDrawableDensity + "/" + drawableName + ".9.png";
    var fileDrawable9Path = new File({
        path: targetPath9Path
    });
    if(fileDrawable9Path.exists){
        return targetPath9Path;
    }
    
}

function setScreenConfigs(){
    var configuration = Android.getActivity().getResources().getConfiguration();
    if ( (configuration.screenLayout & NativeConfiguration.SCREENLAYOUT_SIZE_MASK) == NativeConfiguration.SCREENLAYOUT_SIZE_SMALL) {
        desiredDrawableSize = "small";
    } 
    else if ( (configuration.screenLayout & NativeConfiguration.SCREENLAYOUT_SIZE_MASK) == NativeConfiguration.SCREENLAYOUT_SIZE_NORMAL) {
        desiredDrawableSize = "normal";
    } 
    else if ( (configuration.screenLayout & NativeConfiguration.SCREENLAYOUT_SIZE_MASK) == NativeConfiguration.SCREENLAYOUT_SIZE_LARGE) {
        desiredDrawableSize = "large";
    } 
    else if ( (configuration.screenLayout & NativeConfiguration.SCREENLAYOUT_SIZE_MASK) == NativeConfiguration.SCREENLAYOUT_SIZE_XLARGE) {
        desiredDrawableSize = "large";
    } 
    else {
        desiredDrawableSize = "normal";
    }
    
    var metrics = Android.getActivity().getResources().getDisplayMetrics();
    
    if (metrics.densityDpi <= NativeDisplayMetrics.DENSITY_LOW) {
        desiredDrawableDensity = "ldpi";
    } 
    else if (metrics.densityDpi <= NativeDisplayMetrics.DENSITY_MEDIUM) {
        desiredDrawableDensity = "mdpi";
    } 
    else if (metrics.densityDpi <= NativeDisplayMetrics.DENSITY_HIGH) {
        desiredDrawableDensity = "hdpi";
    } 
    else if (metrics.densityDpi <= NativeDisplayMetrics.DENSITY_XHIGH) {
        desiredDrawableDensity = "xhdpi";
    } 
    else {
        desiredDrawableDensity = "xxhdpi";
    }
    
}



module.exports = Path;