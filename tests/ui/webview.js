var expect = require("chai").expect;
var assert = require("chai").assert;

const WebView = require("../../ui/webview");

salep.test("sf-core/ui/webview Unit Test", function() {
    var testObject = null;
    
    this.beforeEach(function(){
        testObject = new WebView();
    });
    
    this.afterEach(function(){
        testObject = null;
    });

    this.case("[scrollBarEnabled] getter/setter.", function() {
        assert.doesNotThrow(function(){testObject.scrollBarEnabled = true;}, Error);
        assert.isTrue(testObject.scrollBarEnabled, 'scrollBarEnabled must be true');
    });
    
    this.case("[bounceEnabled] getter/setter.", function() {
        assert.doesNotThrow(function(){testObject.bounceEnabled = true;}, Error);
        assert.isTrue(testObject.bounceEnabled, 'bounceEnabled must be true');
    });
    
    this.case("[openLinkInside] getter/setter.", function() {
        assert.doesNotThrow(function(){testObject.openLinkInside = true;}, Error);
        assert.isTrue(testObject.openLinkInside, 'openLinkInside must be true');
    });
    
    this.case("[zoomEnabled] getter/setter.", function() {
        assert.doesNotThrow(function(){testObject.zoomEnabled = true;}, Error);
        assert.isTrue(testObject.zoomEnabled, 'zoomEnabled must be true');
    });
    
    this.case("[refresh] function.", function() {
        assert.doesNotThrow(function(){testObject.refresh();}, Error);
    });
    
    this.case("[goBack] function.", function() {
        assert.doesNotThrow(function(){testObject.goBack();}, Error);
    });
    
    this.case("[goForward] function.", function() {
        assert.doesNotThrow(function(){testObject.goForward();}, Error);
    });
    
    this.case("[loadURL] function.", function() {
        assert.doesNotThrow(function(){testObject.loadURL("http://www.smartface.io");}, Error);
    });
    
    this.case("[loadFile] function.", function() {
        assert.doesNotThrow(function(){testObject.loadFile(null);}, Error);
    });
    
    this.case("[evaluateJS] function.", function() {
        assert.doesNotThrow(function(){testObject.evaluateJS("var smf = 'smartface';");}, Error);
    });
});