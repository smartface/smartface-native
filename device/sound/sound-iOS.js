const File = require("../../io/file");
const { EventEmitterCreator } = require("../../core/eventemitter");
const Events = require('./events');



function Sound() {
    var self = this;

    const EventFunctions = {
        [Events.Ready]: () => {
            this.onReady = function (state) {
                this.emitter.emit(Events.Ready, state);
            }
        },
        [Events.Finish]: () => {
            this.onFinish = function (state) {
                this.emitter.emit(Events.Finish, state);
            }
        }
    }
    EventEmitterCreator(this, EventFunctions);
    self.android = {};

    self.loadURL = function(value) {
        var url = __SF_NSURL.URLWithString(value);
        self.avPlayerItem = __SF_AVPlayerItem.createFromURL(url);
        if (self.nativeObject) {
            self.nativeObject.removeObserver();
            self.nativeObject.replaceCurrentItem(self.avPlayerItem);
        } else {
            self.nativeObject = new __SF_AVPlayer(self.avPlayerItem);
            self.addCallbackFunction();
        }
        self.nativeObject.addObserver();
    }

    self.loadFile = function(value) {
        var actualPath = value.nativeObject.getActualPath();
        var url = __SF_NSURL.fileURLWithPath(actualPath);
        self.avPlayerItem = __SF_AVPlayerItem.createFromURL(url);
        if (self.nativeObject) {
            self.nativeObject.removeObserver();
            self.nativeObject.replaceCurrentItem(self.avPlayerItem);
        } else {
            self.nativeObject = new __SF_AVPlayer(self.avPlayerItem);
            self.addCallbackFunction();
        }
        self.nativeObject.addObserver();
    }

    self.play = function() {
        self.nativeObject.play();
    }

    self.pause = function() {
        self.nativeObject.pause();
    };

    self.stop = function() {
        self.nativeObject.pause();
        self.seekTo(0);
    };

    self.seekTo = function(milliseconds) {
        self.nativeObject.seekToMillisecond(milliseconds);
    }

    self.isPlaying = function() {
        if (self.nativeObject.rate !== 0) {
            return true;
        } else {
            return false;
        }
    };

    self.setVolume = function(value) {
        self.nativeObject.volume = value;
    }

    Object.defineProperty(self, 'totalDuration', {
        get: function() {

            return self.nativeObject.duration() * 1000;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'currentDuration', {
        get: function() {

            return self.nativeObject.getCurrentTime() * 1000;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'volume', {
        get: function() {
            return self.nativeObject.volume;
        },
        set: function(value) {
            self.nativeObject.volume = value;
        },
        enumerable: true
    });

    Object.defineProperty(this, 'on', {
        value: (event, callback) => {
            EventFunctions[event].call(this);
            this.emitter.on(event, callback);
        }
    });

    self.addCallbackFunction = function() {
        self.nativeObject.onItemReady = function() {
            if (typeof self.onReady === "function") {
                self.onReady();
            }
        };

        self.nativeObject.AVPlayerItemDidPlayToEndTime = function() {
            if (typeof self.onFinish === "function") {
                self.onFinish();
            }
            if (self.isLooping === true) {
                self.seekTo(0);
                self.play();
            }
        };
    };

    var _isLooping = false;
    Object.defineProperty(self, 'isLooping', {
        get: function() {
            return _isLooping;
        },
        set: function(value) {
            _isLooping = value;
        },
        enumerable: true
    });


}


module.exports = Sound;