const extend = require('js-base/core/extend');
const View = require('nf-core/ui/view');

const VideoView = extend(View)(
    function (_super, params) {
        var self = this;
        _super(this);

        Object.defineProperties(VideoView, {
            'play': {
                value: function() {}
            },
            'pause': {
                value: function() {}
            },
            'stop': {
                value: function() {}
            },
            'isPlaying': {
                value: function() {return true | false}
            },
            'setLoopEnabled': {
                value: function(enabled) {}
            },
            'loadURL': {
                value: function(url) {}
            },
            'loadFile': {
                value: function(path) {}
            },
            'onReady': {
                get: function() {},
                set: function(callback) {}
            },
            'onFinish': {
                get: function() {},
                set: function(callback) {}
            },
            'seekTo': {
                value: function(milliseconds) {}
            },
            'totalDuration': {
                get: function() {return milliseconds}
            },
            'currentDuration': {
                get: function() {return milliseconds}
            },
            'setVolume': {
                value: function(volume) {}
            }
        });

        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);
