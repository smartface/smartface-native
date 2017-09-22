var assert = require("chai").assert;

const Page = require("../../ui/page");
const Router = require("../../ui/router");
const extend = require('js-base/core/extend');
const Sound = require("../../device/sound");

var pageInstance = null;
const PageSound = extend(Page)(
    function (_super, params) {
        _super(this);
        pageInstance = this;
    }
);
Router.add("soundPage", PageSound);
Router.go("soundPage");

var sound;
salep.test("sf-core/device/sound Unit Test", function() {

    this.case("Sound constructor function.", function() {
        assert.doesNotThrow(function(){ sound = new Sound(); }, Error);
    });

    this.case("Sound loadUrl function.", function() {
        assert.doesNotThrow(function(){ sound.loadURL("https://www.rmp-streaming.com/media/bbb-360p.mp4"); }, Error);
    });
    
    this.case("Sound play function", function() {
        assert.doesNotThrow(function(){sound.play()}, Error);
    });
    
    this.case("Sound isLooping property.", function() {
        assert.isFalse(sound.isLooping, "isLooping must be equal to false.");
    });
    
    this.case("Sound volume property.", function() {
        assert.isNumber(sound.volume, "volume must be a number.");
    });
    
    this.case("Sound isPlaying property.", function() {
        assert.isTrue(sound.isPlaying, "isPlaying must be equal to true.");
    });
    
    this.case("Sound totalDuration property.", function() {
        assert.isNumber(sound.totalDuration, "totalDuration must be a number.");
    });
    
    this.case("Sound currentDuration property.", function() {
        assert.isNumber(sound.currentDuration, "currentDuration must be a number.");
    });
    
    this.case("Sound pause function", function() {
        assert.doesNotThrow(function(){sound.pause()}, Error);
    });
    
    this.case("Sound stop function", function() {
        assert.doesNotThrow(function(){sound.stop()}, Error);
    });
});