const View = require('../view');
const extend = require('js-base/core/extend');
const Image = require("sf-core/ui/image");
const Color = require('sf-core/ui/color');
const Location = require('sf-core/device/location');
const Invocation    = require('sf-core/util').Invocation;

const MapView = extend(View)(
    function (_super, params) {
        var self = this;
        
        if(!self.nativeObject){
            self.nativeObject = new __SF_MKMapView();
            
            var tapGesture = new __SF_UITapGestureRecognizer();
            
            var longGesture = new __SF_UILongPressGestureRecognizer();
        }
        
        _super(this);
        
        self.nativeObject.setCenter(40.7828647,-73.9675491,false); //Default coordinate
                
        self.onPressHandler = function(e){
            var gesture = e.gesture;
            if (gesture.gestureRecognizerstate == 3){
                var point = gesture.locationView(self.nativeObject);
                var coordinate = self.nativeObject.convertToCoordinateFromView(point,self.nativeObject);
                if (typeof self.onPress === "function"){
                    self.onPress({latitude :  coordinate.latitude, longitude : coordinate.longitude});
                }
            }
        }
        tapGesture.handle = self.onPressHandler;
        self.nativeObject.addGestureRecognizer(tapGesture);
        
        self.onLongPressHandler = function(e){
            var gesture = e.gesture;
            if (gesture.gestureRecognizerstate == 1){
                var point = gesture.locationView(self.nativeObject);
                var coordinate = self.nativeObject.convertToCoordinateFromView(point,self.nativeObject);
                if (typeof self.onLongPress === "function"){
                    self.onLongPress({latitude :  coordinate.latitude, longitude : coordinate.longitude});
                }
            }
        }
        longGesture.handle = self.onLongPressHandler;
        self.nativeObject.addGestureRecognizer(longGesture);
        
        var _isFirstRender = 1;
        function mapRender(){
            if (_isFirstRender){
                _isFirstRender = 0;
                self.setZoomLevelWithAnimated(self.centerLocation,_zoomLevel,true);
                if (typeof self.onCreate === "function"){
                    self.onCreate();
                }
            }
        }
        
        self.nativeObject.mapViewFinishRender = mapRender;
        
        Object.defineProperty(self, 'type', {
            get: function() {
                return self.nativeObject.mapType;
            },
            set: function(value) {
                self.nativeObject.mapType = value;
            },
            enumerable: true
        });
          
        Object.defineProperty(self, 'scrollEnabled', {
            get: function() {
                return self.nativeObject.scrollEnabled;
            },
            set: function(value) {
                self.nativeObject.scrollEnabled = value;
            },
            enumerable: true
        });
        
        Object.defineProperty(self, 'userLocationEnabled', {
            get: function() {
                return self.nativeObject.showsUserLocation;
            },
            set: function(value) {
                if (value) {
                   Location.start(); 
                }else{
                   Location.stop();
                }
                self.nativeObject.showsUserLocation = value;
            },
            enumerable: true
        });
        
        Object.defineProperty(self, 'rotateEnabled', {
            get: function() {
                return self.nativeObject.rotateEnabled;
            },
            set: function(value) {
                self.nativeObject.rotateEnabled = value;
            },
            enumerable: true
        });
        
        Object.defineProperty(self, 'zoomEnabled', {
            get: function() {
                return self.nativeObject.zoomEnabled;
            },
            set: function(value) {
                self.nativeObject.zoomEnabled = value;
            },
            enumerable: true
        });
        
        var _minZoomLevel = 0;
        Object.defineProperty(self, 'minZoomLevel', {
            get: function() {
                return _minZoomLevel;
            },
            set: function(value) {
                _minZoomLevel = value;
            },
            enumerable: true
        });
        
        var _maxZoomLevel = 19;
        Object.defineProperty(self, 'maxZoomLevel', {
            get: function() {
                return _maxZoomLevel;
            },
            set: function(value) {
                _maxZoomLevel = value;
            },
            enumerable: true
        });
        
        Object.defineProperty(self, 'compassEnabled', {
            get: function() {
                return self.nativeObject.showsCompass;
            },
            set: function(value) {
                self.nativeObject.showsCompass = value;
            },
            enumerable: true
        });
        
        var _centerLocation;
        Object.defineProperty(self, 'centerLocation', {
            get: function() {
                if (_centerLocation) {
                    return _centerLocation;
                }else{
                    return self.nativeObject.centerLocation;
                }
            },
            set: function(value) {
                _centerLocation = value;
                self.setZoomLevelWithAnimated(value,_zoomLevel,true);
            },
            enumerable: true
        });
        
        Object.defineProperty(self, 'addPin', {
            value: function(value){
                value.parentMapView = self;
                self.nativeObject.addAnnotation(value.nativeObject);
            },
            configurable: false
        });
        
        Object.defineProperty(self, 'removePin', {
            value: function(value){
                self.nativeObject.removeAnnotation(value.nativeObject);
            },
            configurable: false
        });

        var MERCATOR_OFFSET = 268435456.0;
        var MERCATOR_RADIUS = 85445659.44705395;
        var DEGREES = 180.0;
    
        function longitudeToPixelSpaceX(longitude){
            return Math.round(MERCATOR_OFFSET + MERCATOR_RADIUS * longitude * Math.PI / DEGREES);
        }
    
        function latitudeToPixelSpaceY(latitude){
            return Math.round(MERCATOR_OFFSET - MERCATOR_RADIUS * Math.log((1 + Math.sin(latitude * Math.PI / DEGREES)) / (1 - Math.sin(latitude * Math.PI / DEGREES))) / 2.0);
        }
        
        function pixelSpaceXToLongitude(pixelX){
            return ((Math.round(pixelX) - MERCATOR_OFFSET) / MERCATOR_RADIUS) * DEGREES / Math.PI;
            
        }
        
        function pixelSpaceYToLatitude(pixelY){
            return (Math.PI / 2.0 - 2.0 * Math.atan(Math.exp((Math.round(pixelY) - MERCATOR_OFFSET) / MERCATOR_RADIUS))) * DEGREES / Math.PI;
        }
        
        function coordinateSpanWithCenterCoordinate(centerCoordinate, zoomLevel){
            
            // convert center coordiate to pixel space
            var centerPixelX = longitudeToPixelSpaceX(centerCoordinate.longitude);
            var centerPixelY = latitudeToPixelSpaceY(centerCoordinate.latitude);
            
            // determine the scale value from the zoom level
            var zoomExponent = 20.0 - zoomLevel;
            var zoomScale = Math.pow(2.0, zoomExponent);
    
            // scale the map’s size in pixel space
            var mapSizeInPixels = self.nativeObject.bounds;
            var scaledMapWidth = parseFloat(mapSizeInPixels.width) * zoomScale;
            var scaledMapHeight = parseFloat(mapSizeInPixels.height) * zoomScale;
            
            // figure out the position of the top-left pixel
            var topLeftPixelX = centerPixelX - (scaledMapWidth / 2.0);
            var topLeftPixelY = centerPixelY - (scaledMapHeight / 2.0);
            
            // find delta between left and right longitudes
            var minLng = pixelSpaceXToLongitude(topLeftPixelX);
            var maxLng = pixelSpaceXToLongitude(topLeftPixelX + scaledMapWidth);
            var longitudeDelta = maxLng - minLng;
            
            var minLat = pixelSpaceYToLatitude(topLeftPixelY);
            var maxLat = pixelSpaceYToLatitude(topLeftPixelY + scaledMapHeight);
            var latitudeDelta = -1.0 * (maxLat - minLat);
            
            return {latitudeDelta: latitudeDelta, longitudeDelta: longitudeDelta};
        }
        
        var _zoomLevel = 15; //Default Zoom Level
        Object.defineProperty(self, 'zoomLevel', {
            get: function() {
                if (self.nativeObject.getRegion) {
                    var region = self.nativeObject.getRegion();
            
                    var centerPixelX = longitudeToPixelSpaceX(region.center.longitude);
                    var topLeftPixelX = longitudeToPixelSpaceX(region.center.longitude - region.span.longitudeDelta / 2);
                    
                    var scaledMapWidth = (centerPixelX - topLeftPixelX) * 2;
                    var mapSizeInPixels = self.nativeObject.bounds;
                    var zoomScale = scaledMapWidth / mapSizeInPixels.width;
                    var zoomExponent = Math.log(zoomScale) / Math.log(2);
                    var zoomLevel = 20 - zoomExponent.toFixed(2);
    
                    return zoomLevel - 1;
                }
                return _zoomLevel;
            },
            set: function(value) {
                self.setZoomLevelWithAnimated(self.centerLocation,value + 1,true);
            },
            enumerable: true
        });
        self.nativeObject.regionWillChangeAnimated = function(){
            if (typeof self.onCameraMoveStarted === 'function') {
                self.onCameraMoveStarted();
            }
        }
        
        self.nativeObject.regionDidChangeAnimated = function(){
            if (self.minZoomLevel > self.maxZoomLevel) {
                return;
            }
            if (self.minZoomLevel == self.maxZoomLevel) {
                self.zoomLevel = self.minZoomLevel
                return;
            }
            
            if (self.minZoomLevel > 0 && self.zoomLevel < self.minZoomLevel) {
                self.zoomLevel = self.minZoomLevel;
            }else if(self.maxZoomLevel < 19 && self.zoomLevel > self.maxZoomLevel){
                self.zoomLevel = self.maxZoomLevel
            }
            
            if (typeof self.onCameraMoveEnded === 'function') {
                self.onCameraMoveEnded();
            }
        }
        
        self.setZoomLevelWithAnimated = function(centerLocation,zoomLevel,animated){
            // clamp large numbers to 28
            _zoomLevel = zoomLevel;
            zoomLevel = Math.min(zoomLevel, 28);
            
            // use the zoom level to compute the region
            var span = coordinateSpanWithCenterCoordinate(centerLocation,zoomLevel);
            self.nativeObject.centerLocation = {latitudeDelta : span.latitudeDelta,longitudeDelta : span.longitudeDelta,latitude : centerLocation.latitude, longitude : centerLocation.longitude,animated : animated};
        }
        
        self.getVisiblePins = function(){
            var annotationVisibleRect = Invocation.invokeInstanceMethod(self.nativeObject,"visibleMapRect",[],"CGRect");
            
            var argAnnotationVisibleRect = new Invocation.Argument({
                type:"CGRect",
                value: annotationVisibleRect
            });
            
            var annotationSet = Invocation.invokeInstanceMethod(self.nativeObject,"annotationsInMapRect:",[argAnnotationVisibleRect],"id");
            
            var annotationArray = Invocation.invokeInstanceMethod(annotationSet,"allObjects",[],"id");
            var pinArray = [];
            for (var i in annotationArray) {
                var pin = new Pin();
                pin.nativeObject = annotationArray[i];
                pinArray.push(pin);
            }
            return pinArray;
        }
        
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
});

Object.defineProperty(MapView, 'Pin', {
    value: Pin,
    configurable: false
});


function Pin(params) {

    var self = this;
    if(!self.nativeObject){
        self.nativeObject = __SF_Annotation.createAnnotation();
    }

    Object.defineProperty(self, 'location', {
            get: function() {
                return self.nativeObject.setCoordinate;
            },
            set: function(value) {
                self.nativeObject.setCoordinate = value;
            },
            enumerable: true
    });
    
    Object.defineProperty(self, 'title', {
            get: function() {
                return self.nativeObject.title;
            },
            set: function(value) {
                self.nativeObject.title = value;
            },
            enumerable: true
    });
    
    Object.defineProperty(self, 'subtitle', {
            get: function() {
                return self.nativeObject.subtitle;
            },
            set: function(value) {
                self.nativeObject.subtitle = value;
            },
            enumerable: true
    });
    
    Object.defineProperty(self, 'color', { //cant set after added mapview
            get: function() {
                return new Color({color : self.nativeObject.color});
            },
            set: function(value) {
                self.nativeObject.color = value.nativeObject;
            },
            enumerable: true
    });
    
    Object.defineProperty(self, 'image', { //cant set after added mapview
            get: function() {
                return Image.createFromImage(self.nativeObject.image);
            },
            set: function(value) {
                self.nativeObject.image = value.nativeObject;
            },
            enumerable: true
    });
    
    Object.defineProperty(self, 'visible', { //cant set after added mapview
            get: function() {
                return !self.nativeObject.visible;
            },
            set: function(value) {
                self.nativeObject.visible = value;
            },
            enumerable: true
    });
    
    Object.defineProperty(self, 'onPress', {
            get: function() {
                return self.nativeObject.onPress;
            },
            set: function(value) {
                self.nativeObject.onPress = value.bind(this);
            },
            enumerable: true
    });
    
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
    
};

MapView.Type = {}

Object.defineProperties(MapView.Type, {
    'NORMAL': {
        value: 0,
        configurable: false
    },

    'SATELLITE': {
        value: 1,
        configurable: false
    },

    'HYBRID': {
        value: 2,
        configurable: false
    }
});

module.exports = MapView;