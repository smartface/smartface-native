const View = require('../view');
const extend = require('js-base/core/extend');

/**
 * @class UI.MapView
 * @since 0.1
 * @extends UI.View
 * MapView is a view that shows Apple Maps on iOS and Google Maps on Android.
 *
 *     @example
 *     const MapView = require('sf-core/ui/mapview');
 *     var myMapView = new MapView({
 *         flexGrow: 1,
 *         alignSelf: FlexLayout.AlignSelf.STRETCH,
 *         onCreate: function() {
 *             myMapView.centerLocation = {
 *                 latitude: 37.4488259,
 *                 longitude: -122.1600047
 *             };
 *             var myPin = new MapView.Pin({
 *                 location: {
 *                     latitude: 37.4488259,
 *                     longitude: -122.1600047
 *                 },
 *                 title: 'Smartface Inc.',
 *                 subtitle: '2nd Floor, 530 Lytton Ave, Palo Alto, CA 94301',
 *                 color: Color.RED,
 *                 onPress: function() {
 *                     const Application = require('sf-core/application');
 *                     Application.call("geo:" + myPin.location.latitude + ',' + myPin.location.longitude, {
 *                         'hl': 'en',
 *                     });
 *                 }
 *             });
 *             myMapView.addPin(myPin);
 *        }
 *     });
 *     myPage.layout.addChild(myMapView);
 * 
 */
function MapView(params) {}

/**
 * Enables/Disables scroll gestures so that map can be dragged.
 *
 * @property {Boolean} [scrollEnabled = true]
 * @android
 * @ios
 * @since 0.1
 */
MapView.prototype.scrollEnabled;

/**
 * Enables/Disables rotate gestures so that map can be rotated.
 *
 * @property {Boolean} [rotateEnabled = true]
 * @android
 * @ios
 * @since 0.1
 */
MapView.prototype.rotateEnabled;

/**
 * Enables/Disables compass on map.
 *
 * @property {Boolean} [compassEnabled = true]
 * @android
 * @ios
 * @since 0.1
 */
MapView.prototype.compassEnabled;

/**
 * Enables/Disables user location indicator on map.
 *
 * @property {Boolean} [userLocationEnabled = false]
 * @android
 * @ios
 * @since 1.1.10
 */
MapView.prototype.userLocationEnabled;

/**
 * This property sets center location of the map to the given latitude & longitude.
 *
 *     @example
 *     const MapView = require('sf-core/ui/mapview');
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
MapView.prototype.centerLocation;

/**
 * Gets/sets minimum zoom level.
 * @property {Number} [minZoomLevel = 0]
 * @android
 * @ios
 * @since 2.0.8
 */
MapView.prototype.minZoomLevel;

/**
 * Gets/sets minimum zoom level.
 * @property {Number} [maxZoomLevel = 0]
 * @android
 * @ios
 * @since 2.0.8
 */
MapView.prototype.maxZoomLevel;

/**
 * This property sets zoom level of the map to the given level. Zoom level must between 0 to 19. When you try to get value of this property; in iOS you will get what you set, but in Android you will get the actual zoom level which means if user changed zoom level via pinching you will get different value than you set.
 *
 * @property {Number} [zoomLevel = 15]
 * @android
 * @ios
 * @since 1.1.10
 */
MapView.prototype.zoomLevel = 15;

/**
 * This property sets center location of the map to the given latitude & longitude.
 *
 *     @example
 *     const MapView = require('sf-core/ui/mapview');
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
MapView.prototype.centerLocation;

/**
 * Get visible pins on MapView.
 *
 * @return {UI.MapView.Pin[]} Visible pin array.
 * @android
 * @ios
 * @method getVisiblePins
 * @since 0.1
 */
MapView.prototype.getVisiblePins = function(){};

/**
 * Adds a UI.MapView.Pin on the map.
 *
 * @param {UI.MapView.Pin} pin
 * @android
 * @ios
 * @method addPin
 * @since 0.1
 */
MapView.prototype.addPin = function(){};

/**
 * Removes the UI.MapView.Pin from the map.
 *
 * @param {UI.MapView.Pin} pin
 * @method removePin
 * @android
 * @ios
 * @since 0.1
 */
MapView.prototype.removePin = function(){};

/**
 * Triggered when pressed on the map and sends the location pressed on the map.
 *
 * @event onPress
 * @param {Object} location
 * @param {Number} location.latitude
 * @param {Number} location.longitude
 * @android
 * @ios
 * @since 1.1.3
 */
MapView.prototype.onPress;

/**
 * Triggered when long pressed on the map and sends the location pressed on the map.
 *
 * @event onLongPress
 * @param {Object} location
 * @param {Number} location.latitude
 * @param {Number} location.longitude
 * @android
 * @ios
 * @since 1.1.3
 */
MapView.prototype.onLongPress;

/**
 * This event is called when map is ready to be used.
 *
 * @since 0.1
 * @event onCreate
 * @android
 * @ios
 */
MapView.prototype.onCreate = function onCreate(){ };

/**
 * Gets/Sets map type
 *
 * @property {UI.MapView.Type} [type = UI.MapView.Type.NORMAL]
 * @android
 * @ios
 * @since 0.1
 */
MapView.prototype.type = UI.MapView.Type.NORMAL;

/**
 * @class UI.MapView.Pin
 * @since 0.1
 * Pin is placed on UI.MapView.
 *
 *     @example
 *     const MapView = require('sf-core/ui/mapview');
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
function Pin() {}

/**
 * Pin location on the map. 
 *
 *     @example
 *     const MapView = require('sf-core/ui/mapview');
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
Pin.prototype.location;

/**
 * This property shows title when user touches on the pin.
 *
 * @property {String} title
 * @android
 * @ios
 * @since 0.1
 */
Pin.prototype.title;

/**
 * This property shows subtitle when user touches on the pin.
 *
 * @property {String} subtitle
 * @android
 * @ios
 * @since 0.1
 */
Pin.prototype.subtitle;

/**
 * This property sets pin color.
 * Avaliable colors for Android: [BLUE, CYAN, GREEN, MAGENTA, RED, YELLOW]
 *
 * @property {UI.Color} color
 * @android
 * @ios
 * @since 0.1
 */
Pin.prototype.color;

/**
 * This property sets an image as pin instead of default pin.
 *
 * @property {UI.Image} image
 * @android
 * @ios
 * @since 0.1
 */
Pin.prototype.image;

/**
 * Gets/Sets visibility of a pin.
 *
 * @property {Boolean} visible
 * @android
 * @ios
 * @since 0.1
 */
Pin.prototype.visible;

/**
 * This event will be fired when the pin is touched.
 *
 * @event onPress
 * @android
 * @ios
 * @since 1.1.2
 */
Pin.prototype.onPress;

MapView.Pin = Pin;

/**
 * @enum UI.MapView.Type
 * @static
 * @readonly
 * @since 0.1
 *
 * This property indicates how map will be displayed.
 *
 */
MapView.Type = {};

/**
 * @property {Number} NORMAL
 * @android
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
MapView.Type.NORMAL = 0;

/**
 * @property {Number} SATELLITE
 * @android
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
MapView.Type.SATELLITE = 1;

/**
 * @property {Number} HYBRID
 * @android
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
MapView.Type.HYBRID = 2;

module.exports = MapView;
