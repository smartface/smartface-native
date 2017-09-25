var expect = require("chai").expect;
var assert = require("chai").assert;

const Application = require("../../application");

salep.test("sf-core/application Unit Test", function() {
    
    this.case("[byteReceived] getter.", function() {
        assert.isNumber(Application.byteReceived, 'byteReceived must be number');
    });
    
    this.case("[byteSent] getter.", function() {
        assert.isNumber(Application.byteSent, 'byteSent must be number');
    });
    
    this.case("[currentReleaseChannel] getter.", function() {
        assert.isString(Application.currentReleaseChannel, 'currentReleaseChannel must be string');
    });
    
    this.case("[smartfaceAppName] getter.", function() {
        assert.isString(Application.smartfaceAppName, 'smartfaceAppName must be string');
    });
    
    this.case("[version] getter.", function() {
        assert.isString(Application.version, 'version must be number');
    });
    
    this.case("[call] function.", function() {
        assert.doesNotThrow(function(){ Application.call("http://www.google.com"); }, Error);
    });
    
    salep.skipNext();
    this.case("[exit] function.", function() {
        assert.doesNotThrow(function(){ Application.exit(); }, Error);
    });
    
    salep.skipNext();
    this.case("[restart] function.", function() {
        assert.doesNotThrow(function(){ Application.restart(); }, Error);
    });
    
    this.case("[checkUpdate] function.", function() {
        assert.doesNotThrow(function(){ 
            Application.checkUpdate(function(err, result) {
                if (err) {
                    console.log("check update error: " + err);
                } else {
                    result.download(function(err, downloadFinish) {
                        if (err) {
                            console.log("download error: " + err);
                        } else {
                            downloadFinish.updateAll(function(err) {
                                if (err) {
                                    console.log("update all error: " + err);
                                } else {
                                    console.log(downloadFinish.meta);
                                    Application.restart();
                                }
                            });
                        }
                    });
                }
            });
            
        }, Error);
    });
    
    this.case("[android.packageName] getter.", function() {
        assert.isString(Application.android.packageName, 'android.packageName must be number');
    });
    
    this.case("[android.checkPermission] function.", function() {
        assert.isBoolean(Application.android.checkPermission(Application.Android.Permissions.READ_CALENDAR) , 'android.checkPermission must be boolean');
    });
    
    this.case("[android.requestPermissions] function.", function() {
        assert.doesNotThrow(function(){ Application.android.requestPermissions(1234, Application.android.Permissions.RECORD_AUDIO); }, Error);
    });
    
    this.case("[android.shouldShowRequestPermissionRationale] function.", function() {
        assert.isBoolean(Application.android.shouldShowRequestPermissionRationale(Application.Android.Permissions.READ_CALENDAR) , 'android.shouldShowRequestPermissionRationale must be boolean');
    });
    
});