const HTTP = require("../net/http");
const Path = require('../io/path');
const File = require('../io/file');
const FileStream = require('../io/filestream');
const System = require('../device/system');

const RemoteUpdateService = {};
RemoteUpdateService.firstUrl  = "";
RemoteUpdateService.secondUrl = "";

var zipPath = "";
if (System.OS === "iOS") {
    zipPath = Path.DataDirectory + "/stage/iOS.zip";
} else if (System.OS === "Android") {
    zipPath = Path.android.storages.internal + "/Android/data/AndroidRAU.zip";
}

RemoteUpdateService.checkUpdate = function(callback) {
    var checkUpdateRequest = new HTTP();
    checkUpdateRequest.request(
        {
            'url': "https://portalapi.smartface.io/api/v1/rau/check?v=" + Math.floor(Math.random() * 100000), // to avoid response cache
            'method':'POST',
            'body': RAU.getRequestBody(),
            'onLoad': function(response) {
                if (response.statusCode === 200) { // Has update
                    var responseString = response.body.toString();
                    var responseJSON = JSON.parse(responseString);
                    RemoteUpdateService.firstUrl  = responseJSON["url"][0];
                    RemoteUpdateService.secondUrl = responseJSON["url"][1];
                    RAU.setUpdateResponse(responseString);
                    
                    callback(null, {
                        meta: responseJSON.meta,
                        newVersion: responseJSON.version,
                        revision: responseJSON.revision,
                        download: download
                    });
                } else if (response.statusCode === 304) { // No update for Android
                    callback("No update", null);
                } else {
                    callback("Unknown Response", null); // Unknown Response
                }
            },
            'onError': function(error) {
                if (error.statusCode === 304) { // No update for iOS
                    callback("No update", null);
                } else if (error.statusCode === 404 || error.statusCode == 406 || error.statusCode == 400) {
                    callback(error.message, null);
                } else {
                    callback("Unknown Error", null);
                }
            }
        }
    );
};

function download(callback) {
    // TODO: enable firstURL request after IOS-2283
    var downloadUpdateRequest = new HTTP();
    downloadUpdateRequest.request(
        {
            url: RemoteUpdateService.secondUrl,
            method: "GET",
            onLoad: function(response) {
                var zipFile = new File({ path: zipPath });
                zipFile.createFile(true);
                var zipFileStream = zipFile.openStream(FileStream.StreamType.WRITE, FileStream.ContentMode.BINARY);
                zipFileStream.write(response.body);
                zipFileStream.close();
    
                callback(null, {
                    updateAll: updateAll,
                    updateCancel: updateCancel
                });
            },
            onError: function(error) {
                callback("An error occured while downloding", null);
            }
        }
    );
};

function updateAll(callback) {
    RAU.updateAll();
    callback(null, "success");
}

function updateCancel(callback) {
    var zipFile = new File({
        path: zipPath
    });
    if(zipFile.exists){
        zipFile.remove();
    }    

    RemoteUpdateService.firstUrl  = "";
    RemoteUpdateService.secondUrl = "";
}

module && (module.exports = RemoteUpdateService);