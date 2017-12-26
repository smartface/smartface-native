var assert = require("chai").assert;

const Http = require('../../net/http');

var httpManager;

salep.test("sf-core/net/http Unit Test", function() {
    var sessionManager = null;
    
    this.beforeEach(function(){
        sessionManager = new Http();
    });
    
    this.afterEach(function(){
       sessionManager = null; 
    });

    this.case("Http constructor test", function() {
        assert.doesNotThrow(function() { httpManager = new Http(); }, Error);
    });

    this.case("Http timeout property", function() {
        httpManager.timeout = 2000;
        assert.equal(httpManager.timeout, 2000, "timeout must be equal to 2000.");
    });

    salep.skipNext();
    this.case("Http request function", function() {
        var params = {
            url: "http://lorempixel.com/400/200/sports/Dummy-Text/",
            onLoad: function(e) {
                assert.equal(e.statusCode, 200, "statusCode must be equal to 200.");
                assert.typeOf(e.image, 'object', "image must be an instance of UI.Image.");
            },
            onError: function(e) {
                alert("onError " + JSON.stringify(e));
            }
        };
        assert.doesNotThrow(function() { httpManager.request(params); }, Error);
    });

    this.case("Http timeout default", function() {
        assert.equal(sessionManager.timeout, 60000, "default timeout must be equal to 60000");
    });

});
