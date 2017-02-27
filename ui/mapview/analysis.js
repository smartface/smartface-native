const View = require('../view');
const extend = require('js-base/core/extend');

/**
 * @class UI.MapView
 * @since 0.1
 * @extends UI.View
 * MapView is a view that shows Apple Maps on iOS and Google Maps on Android.
 *
 *     @example
 *     const MapView = require('nf-core/ui/mapview');
 *     var myMapView = new MapView({
 *         flexGrow :1,
           alignSelf : FlexLayout.AlignSelf.STRETCH,
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
         * Enables/Disables scroll gestures so that map can be dragged.
         *
         * @property {Boolean} [scrollEnabled = true]
         * @android
         * @ios
         * @since 0.1
         */
        this.scrollEnabled;

        /**
         * Enables/Disables rotate gestures so that map can be rotated.
         *
         * @property {Boolean} [rotateEnabled = true]
         * @android
         * @ios
         * @since 0.1
         */
        this.rotateEnabled;

        /**
         * Enables/Disables zoom gestures so that map can be zoomed in and out.
         *
         * @property {Boolean} [zoomEnabled = true]
         * @android
         * @ios
         * @since 0.1
         */
        this.zoomEnabled;

        /**
         * Enables/Disables compass on map.
         *
         * @property {Boolean} [compassEnabled = true]
         * @android
         * @ios
         * @since 0.1
         */
        this.compassEnabled;

        /**
         * This property sets center location of the map to the given latitude & longitude.
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
         * @android
         * @ios
         * @since 0.1
         */
        this.centerLocation;

        /**
         * Adds a UI.MapView.Pin on the map.
         *
         * @param {UI.MapView.Pin} pin
         * @android
         * @ios
         * @method addPin
         * @since 0.1
         */
        this.addPin = function(){};

        /**
         * Removes the UI.MapView.Pin from the map.
         *
         * @param {UI.MapView.Pin} pin
         * @method removePin
         * @android
         * @ios
         * @since 0.1
         */
        this.removePin = function(){};

        /**
         * This event is called when map is ready to be used.
         *
         * @since 0.1
         * @event onCreate
         * @android
         * @ios
         */
        this.onCreate = function onCreate(){ }

        /**
         * Gets/Sets map type
         *
         * @property {UI.MapView.Type} [type = UI.MapView.Type.NORMAL]
         * @android
         * @ios
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
 *          left:0,
 *          top:0,
 *          right:0,
 *          bottom:0,
 *          onCreate: function() {
 *            myMapView.scrollEnabled =  true;
 *            myMapView.rotateEnabled = true;
 *            myMapView.zoomEnabled =  true;
 *            myMapView.compassEnabled = true;
 *            myMapView.type =  MapView.Type.NORMAL;
 *            myMapView.centerLocation = {
 *                 latitude: 41.0209078,
 *                 longitude: 29.0039533
 *             };
 *            myMapView.addPin(myPin);
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
         * @android
         * @ios
         * @since 0.1
         */
        this.location;

        /**
         * This property shows title when user touches on the pin.
         *
         * @property {String} title
         * @android
         * @ios
         * @since 0.1
         */
        this.title;

        /**
         * This property shows subtitle when user touches on the pin.
         *
         * @property {String} subtitle
         * @android
         * @ios
         * @since 0.1
         */
        this.subtitle;

        /**
         * This property sets pin color.
         * Avaliable colors for Android: [BLUE, CYAN, GREEN, MAGENTA, RED, YELLOW]
         *
         * @property {UI.Color} color
         * @android
         * @ios
         * @since 0.1
         */
        this.color;

        /**
         * This property sets an image as pin instead of default pin.
         *
         * @property {UI.Image} image
         * @android
         * @ios
         * @since 0.1
         */
        this.image;

        /**
         * Gets/Sets visibility of a pin.
         *
         * @property {Boolean} visible
         * @android
         * @ios
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
 * This property indicates how map will be displayed.
 *
 */
MapView.Type={};
Object.defineProperties(MapType, {
    /**
     * @property {Number} [NORMAL = 0]
     * @android
     * @ios
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
     * @android
     * @ios
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
     * @android
     * @ios
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
