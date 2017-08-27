var expect = require("chai").expect;
var assert = require("chai").assert;

const VideoView = require("../../ui/videoview");

salep.test("sf-core/ui/videoview Unit Test", function() {
    var testObject = new VideoView();
    
    this.case("[loadURL] function.", function() {
        assert.doesNotThrow(function(){ testObject.loadURL("http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4") ;}, Error);
    });
    
    this.case("[play] function.", function() {
        assert.doesNotThrow(function(){ testObject.play(); }, Error);
    });
    
    this.case("[pause] function.", function() {
        assert.doesNotThrow(function(){ testObject.pause(); }, Error);
    });
    
    this.case("[stop] function.", function() {
        assert.doesNotThrow(function(){ testObject.stop(); }, Error);
    });
    
    this.case("[isPlaying] function.", function() {
        assert.isFalse(testObject.isPlaying() , Error);
    });
    
    this.case("[seekTo] function.", function() {
        assert.doesNotThrow(function(){ testObject.seekTo(500); }, Error);
    });
    
    this.case("[totalDuration] getter.", function() {
        assert.isNumber(testObject.totalDuration, Error);
    });
    
    this.case("[currentDuration] function.", function() {
        assert.isNumber(testObject.currentDuration, Error);
    });
    
    this.case("[setVolume] function.", function() {
        assert.doesNotThrow(function(){ testObject.setVolume(10); }, Error);
    });
    
    this.case("[setControllerEnabled] function.", function() {
        assert.doesNotThrow(function(){ testObject.setControllerEnabled(true); }, Error);
    });
});