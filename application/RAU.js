const HTTP = require("sf-core/net/http");
const Path = require('sf-core/io/path');
const File = require('sf-core/io/file');
const FileStream = require('sf-core/io/filestream');

const RemoteUpdateService = {};
RemoteUpdateService.firstUrl  = "";
RemoteUpdateService.secondUrl = "";

var zipPath = "";
if (Device.deviceOS === "iOS") {
    zipPath = Path.DataDirectory + "/stage/iOS.zip";
} else if (Device.deviceOS === "Android") {
    zipPath = Path.android.storages.internal + "/Android/data/AndroidRAU.zip";
}

RemoteUpdateService.checkUpdate = function(callback) {
    HTTP.request(
        {
            'url': "https://portalapi.smartface.io/api/v1/rau/check",
            'method':'POST',
            'body': RAU.getRequestBody(),
        },
        function(response) {
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
        function(error) {
            if (error.statusCode === 304) { // No update for iOS
                callback("No update", null);
            } else if (error.statusCode === 404 || error.statusCode == 406 || error.statusCode == 400) {
                var responseJSON = JSON.parse(error.body.toString());
                callback(responseJSON.message, null);
            } else {
                callback("Unknown Error", null);
            }
        }
    );
};

function download(callback) {
    // TODO: enable firstURL request after IOS-2283
    HTTP.request(
        {
            url: RemoteUpdateService.secondUrl,
            method: "GET"
        },
        function(response) {
            var zipFile = new File({ path: zipPath });
            var zipFileStream = zipFile.openStream(FileStream.StreamType.WRITE, FileStream.ContentMode.BINARY);
            zipFileStream.write(response.body);
            zipFileStream.close();

            callback(null, {
                updateAll: updateAll,
                updateCancel: updateCancel
            });
        },
        function(error) {
            callback("An error occured while downloding", null);
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