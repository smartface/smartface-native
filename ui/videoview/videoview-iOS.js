const extend = require('js-base/core/extend');
const View = require('sf-core/ui/view');
const File = require("sf-core/io/file");
const Exception = require("sf-core/util").Exception;
const TypeUtil = require("sf-core/util/type");

const VideoView = extend(View)(
    function (_super, params) {
        
        var self = this;
        
        if(!self.nativeObject){
            self.avPlayerViewController = new __SF_AVPlayerViewController();
        }
        _super(this);
        self.nativeObject.addSubview(self.avPlayerViewController.view);
        
        self.loadURL = function(value){
            if (TypeUtil.isURL(value)){
                self.avPlayerViewController.removeObserver();
                var url = __SF_NSURL.URLWithString(value);
                self.avPlayer = __SF_AVPlayer.createFromURL(url);
                self.avPlayerViewController.player = self.avPlayer;
                self.avPlayerViewController.videoGravity = "AVLayerVideoGravityResizeAspect";
                self.avPlayerViewController.addObserver();   
            }else{
                throw new TypeError(Exception.TypeError.URL);
            }
        };
        
        self.loadFile = function(value){
            self.avPlayerViewController.removeObserver();
            var filePath = new File({path:value});
            var actualPath = filePath.nativeObject.getActualPath();
            var url = __SF_NSURL.fileURLWithPath(actualPath);
            self.avPlayer = __SF_AVPlayer.createFromURL(url);
            self.avPlayerViewController.player = self.avPlayer;
            self.avPlayerViewController.videoGravity = "AVLayerVideoGravityResizeAspect";
            self.avPlayerViewController.addObserver();     
        }
        
        self.play = function(){
            self.avPlayer.play();
        }
        
        self.pause = function(){
            self.avPlayer.pause();
        };
        
        self.stop = function(){
            self.avPlayer.pause();
            self.seekTo(0);
        };
        
        self.avPlayerViewController.onReady = function(){
            if (typeof self.onReady === "function"){
                self.onReady();
            }
        }
        
        var _loopEnabled = false;
        self.setLoopEnabled = function(value){
            _loopEnabled = value;
        };
        
        self.avPlayerViewController.AVPlayerItemDidPlayToEndTime = function(){
            if (typeof self.onFinish === "function"){
                self.onFinish();
            }
            if (_loopEnabled === true){
                self.seekTo(0);
                self.play();
            }
        };
        
        self.seekTo = function(milliseconds){
            self.avPlayer.seekToMillisecond(milliseconds);
        };
        
        self.isPlaying = function(){
            if (self.avPlayer.rate !== 0){
                return true;
            }else {
                return false;
            }
        };
        
        self.ios = {};
        
        var _page;
        Object.defineProperty(self.ios, 'page', {
            get: function() {
                return _page;
            },
            set: function(value) {
                _page = value;
                self.avPlayerViewController.removeFromParentViewController();
                value.nativeObject.addChildViewController(self.avPlayerViewController);
            },
            enumerable: true
        });
        
        Object.defineProperty(self, 'totalDuration', {
            get: function() {
                
                return self.avPlayer.duration() * 1000;
            },
            enumerable: true
        });
        
        Object.defineProperty(self, 'currentDuration', {
            get: function() {
                
                return self.avPlayer.getCurrentTime() * 1000;
            },
            enumerable: true
        });
        
        self.setVolume = function(value){
            self.avPlayer.volume = value;
        };
        
        self.setControllerEnabled = function(value){
            self.avPlayerViewController.showsPlaybackControls = value;
        };
        
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = VideoView;