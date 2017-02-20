const View = require('../view');
const extend = require('js-base/core/extend');

/**
 * @class UI.MapView
 * @since 0.1
 * @extends UI.View
 * Apple maps and Google maps equivalent. 
 *
 *     @example
 *     const MapView = require('nf-core/ui/mapview');
 *     var myMapView = new MapView({
 *         top:10, left:10, right:10, bottom:150,
 *         onCreate: function() {
 *             myMapView.centerLocation = {
 *                 latitude: 41.0209078,
 *                 longitude: 29.0039533
 *             };
 *             var myPin = new MapView.Pin({
 *                 location: {
 *                     latitude: 40.9768982,
 *                     longitude: 28.8146
 *                  },
 *                  title: 'Ataturk Airport',
 *                  subtitle: 'LTBA',
 *                  color: Color.CYAN
 *             });
 *             myMapView.addPin(myPin);
 *        }
 *     });
 *     myPage.layout.addChild(myMapView);
 * 
 */
const MapView = extend(View)(
    function (_super, params) {
        _super(this);

        /**
         * Enables scroll gestures so that map can be dragged.
         * 
         * @property {Boolean} [scrollEnabled = true]
         * @since 0.1
         */
        this.scrollEnabled;

        /**
         * Enables rotate gestures so that map can be rotated.
         * 
         * @property {Boolean} [rotateEnabled = true]
         * @since 0.1
         */
        this.rotateEnabled;

        /**
         * Enables zoom gestures so that map can be zoomed in and out.
         * 
         * @property {Boolean} [zoomEnabled = true]
         * @since 0.1
         */
        this.zoomEnabled;

        /**
         * Enables compass on map.
         * 
         * @property {Boolean} [compassEnabled = true]
         * @since 0.1
         */
        this.compassEnabled;

        /**
         * Centers map on the location.
         * 
         *     @example
         *     const MapView = require('nf-core/ui/mapview');
         *     var myMapView = new MapView({
         *         centerLocation: {
         *             latitude: 41.0209078,
         *             longitude: 29.0039533
         *         }
         *     });
         * @property {Object} centerLocation
         * @since 0.1
         */
        this.centerLocation;

        /**
         * Adds a pin on the map.
         *
         * @param {UI.MapView.Pin} pin
         * @method addPin
         * @since 0.1
         */
        this.addPin = function(){};

        /**
         * Removes the pin from the map.
         *
         * @param {UI.MapView.Pin} pin
         * @method removePin
         * @since 0.1
         */
        this.removePin = function(){};

        /**
         * Triggered when map is ready to be used.
         * 
         * @since 0.1
         * @event onCreate
         */
        this.onCreate = function onCreate(){ }

        /**
         * Sets map type
         * 
         * @property {UI.MapView.Type} [type = UI.MapView.Type.NORMAL]   
         * @since 0.1
         */
        this.type = UI.MapView.Type.NORMAL;

        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

/**
 * @class UI.MapView.Pin
 * @since 0.1
 * Pin is placed on UI.MapView.
 *
 *     @example
 *     const MapView = require('nf-core/ui/mapview');
 *     var myPin = new MapView.Pin({
 *         location: {
 *             latitude: 40.9844753,
 *             longitude: 28.8184597
 *         },
 *         title: 'Ataturk Airport'
 *     });
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
 *         },
 *         onCreate: function() {
 *             myMapView.addPin(myPin);
 *         }
 *     });
 *     myPage.layout.addChild(myMapView);
 */
const Pin = function() {

        /**
         * Pin location on the map. 
         * 
         *     @example
         *     const MapView = require('nf-core/ui/mapview');
         *     var myPin = new MapView.Pin({
         *         location: {
         *             latitude: 40.9844753,
         *             longitude: 28.8184597
         *         }
         *     });
         *
         * @property {Object} location
         * @since 0.1
         */
        this.location;

        /**
         * Showed title when touch on the pin.
         * 
         * @property {String} title
         * @since 0.1
         */
        this.title;

        /**
         * Showed subtitle when touch on the pin.
         * 
         * @property {String} subtitle
         * @since 0.1
         */
        this.subtitle;

        /**
         * Avaliable colors for Android: [BLUE, CYAN, GREEN, MAGENTA, RED, YELLOW]
         * 
         * @property {UI.Color} color
         * @since 0.1
         */
        this.color;

        /**
         * An image can be set as pin instead of default native pins.
         * 
         * @property {UI.Image} image
         * @since 0.1
         */
        this.image;

        /**
         * Sets pin visibility.
         *
         * @property {Boolean} visible
         * @since 0.1
         */
        this.visible;
};

Object.defineProperty(MapView, 'Pin', {
    value: Pin,
    writable: false
});

/**
 * @enum UI.MapView.Type
 * @static
 * @readonly
 * @since 0.1
 *
 * Indicates how map is displayed.
 *
 */
MapView.Type={};
Object.defineProperties(MapType, {
    /**
     * @property {Number} [NORMAL = 0] 
     * @static
     * @readonly
     * @since 0.1
     */
    'NORMAL': {
        value: 0,
        configurable: false
    },
    /**
     * @property {Number} [SATELLITE = 1]
     * @static
     * @readonly
     * @since 0.1
     */
    'SATELLITE': {
        value: 1,
        configurable: false
    },
    /**
     * @property {Number} [HYBRID = 2]
     * @static
     * @readonly
     * @since 0.1
     */
    'HYBRID': {
        value: 2,
        configurable: false
    }
});

module.exports = MapView;