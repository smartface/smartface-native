const View = require('../view');
const extend = require('js-base/core/extend');
const MapType = require('sf-core/ui/mapview/maptype');
const Image = require("sf-core/ui/image");
/**
 * @class UI.MapView
 * @since 0.1
 * @extends UI.View
 * Apple maps and Google maps equivalent. 
 *
 *     @example
 *     const MapView = require('sf-core/ui/mapview');
 *     var myMapView = new MapView({
 *         left:0, top:0, right:0, bottom:0,
 *         scrollEnabled: true,
 *         rotateEnabled: true,
 *         zoomEnabled: true,
 *         compassEnabled: true,
 *         type: MapView.Type.NORMAL,
 *         centerLocation: {
 *             latitude: 41.0209078,
 *             longitude: 29.0039533
 *         }
 *     });
 *     myPage.layout.addChild(myMapView);
 */
const MapView = extend(View)(
    function (_super, params) {
        var self = this;
        
        if(!self.nativeObject){
            self.nativeObject = new __SF_MKMapView();
            
        }
        
        _super(this);
        
        var _isFirstRender = 1;
        function mapRender(){
            if (_isFirstRender){
                _isFirstRender = 0;
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
        
        Object.defineProperty(self, 'compassEnabled', {
            get: function() {
                return self.nativeObject.showsCompass;
            },
            set: function(value) {
                self.nativeObject.showsCompass = value;
            },
            enumerable: true
        });
        
        
        Object.defineProperty(self, 'centerLocation', {
            get: function() {
                return self.nativeObject.centerLocation;
            },
            set: function(value) {
                value.latitudeDelta = 10;
                value.longitudeDelta = 10;
                self.nativeObject.centerLocation = value;
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
                return self.nativeObject.color;
            },
            set: function(value) {
                self.nativeObject.color = value;
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