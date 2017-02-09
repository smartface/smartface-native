const View = require('../view');
const extend = require('js-base/core/extend');
const MapType = require('nf-core/ui/mapview/maptype');
/**
 * @class UI.MapView
 * @since 0.1
 * @extends UI.View
 * Apple maps and Google maps equivalent. 
 *
 *     @example
 *     const MapView = require('nf-core/ui/mapview');
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
            self.nativeObject = new SMFMKMapView();
        }
        
        _super(this);
        
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
                self.nativeObject.addAnnotation(value.nativeObject);
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
        self.nativeObject = Annotation.createAnnotation();
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
    
    Object.defineProperty(self, 'color', {
            get: function() {
                return self.nativeObject.color;
            },
            set: function(value) {
                self.nativeObject.color = value;
            },
            enumerable: true
    });
    
    Object.defineProperty(self, 'image', {
            get: function() {
                return self.nativeObject.image;
            },
            set: function(value) {
                self.nativeObject.image = value;
            },
            enumerable: true
    });
    
    Object.defineProperty(self, 'visible', {
            get: function() {
                return self.nativeObject.visible;
            },
            set: function(value) {
                self.nativeObject.visible = value;
            },
            enumerable: true
    });

    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
    
};


module.exports = MapView;