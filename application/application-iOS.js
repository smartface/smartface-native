
Object.defineProperty(Application, 'byteReceived', {
    get: function() {
        var counterInfo = SMFApplication.dataCounters();
        return counterInfo.WiFiReceived + counterInfo.WWANReceived;
    },
    enumerable: true
});

Object.defineProperty(Application, 'byteSent', {
    get: function() {
        var counterInfo = SMFApplication.dataCounters();
        return counterInfo.WiFiSent + counterInfo.WWANSent;
    },
    enumerable: true
});

Object.defineProperty(Application, 'currentReleaseChannel', {
    get: function(){
        var projectJson = getProjectJsonObject();
        if(projectJson.config && projectJson.config.rau){
            return projectJson.config.rau.currentReleaseChannel;
        }
        return null;
    },
    enumerable: true
});

Object.defineProperty(Application, 'smartfaceAppName', {
    get: function(){
        var projectJson = getProjectJsonObject();
        if(projectJson.info){
            return projectJson.info.name;
        }
        return null;
    },
    enumerable: true
});

Object.defineProperty(Application, 'version', {
    get: function(){
        var projectJson = getProjectJsonObject();
        if(projectJson.info){
            return projectJson.info.version;
        }
        return -1;
    },
    enumerable: true
});

Application.call = function(uriScheme, data){
    SMFApplication.callWithData(uriScheme, data);
};

Application.exit = function(){
    Application.onExit();
    SMFApplication.exit();
};

Application.restart = function(){
    SMFApplication.restart();
};

function getProjectJsonObject(){
    const File = require("nf-core/io/file");
    const projectFile = new File({path: File.getDocumentsDirectory() + "/project.json"});
    
    // Publish case
    if(!projectFile.exists){ 
        projectFile = new File({path: File.getMainBundleDirectory() + "/project.json"});
    }
    
    var retval = {};
    if(projectFile.exists){
        const FileStream = require("nf-core/io/filestream");
        var projectFileStream = projectFile.openStream(FileStream.StreamType.READ);
        var projectFileContent = projectFileStream.readToEnd();
        if (projectFileContent) {
            retval = JSON.parse(projectFileContent);
        }
        projectFileStream.close();
    }
    return retval;
}

module.exports = Application;