import { IMapView, MapViewType } from './mapview';
import Color from '../color';
import ViewAndroid from '../view/view.android';
import { MapViewEvents } from './mapview-events';
import PinAndroid from './pin/pin.android';
import Cluster from './cluster';
import AndroidConfig from '../../util/Android/androidconfig';
import ColorAndroid from '../color/color.android';
import FontAndroid from '../font/font.android';

// TODO: [AND-3663] Create a java wrapper class for google map
const NativeClusterItem = requireClass('io.smartface.android.sfcore.ui.mapview.MapClusterItem');
const NativeMapView = requireClass('com.google.android.gms.maps.MapView');
const NativeGoogleMap = requireClass('com.google.android.gms.maps.GoogleMap');
const NativeMapReadyCallback = requireClass('com.google.android.gms.maps.OnMapReadyCallback');
const NativeCameraUpdateFactory = requireClass('com.google.android.gms.maps.CameraUpdateFactory');
const NativeLatLng = requireClass('com.google.android.gms.maps.model.LatLng');
const NativeMarkerOptions = requireClass('com.google.android.gms.maps.model.MarkerOptions');
const NativeClusterManager = requireClass('com.google.maps.android.clustering.ClusterManager');

const NativeOnMarkerClickListener = NativeGoogleMap.OnMarkerClickListener;
const NativeOnInfoWindowClickListener = NativeGoogleMap.OnInfoWindowClickListener;
const NativeOnMapClickListener = NativeGoogleMap.OnMapClickListener;
const NativeOnMapLongClickListener = NativeGoogleMap.OnMapLongClickListener;
const NativeOnCameraMoveStartedListener = NativeGoogleMap.OnCameraMoveStartedListener;
const NativeOnCameraIdleListener = NativeGoogleMap.OnCameraIdleListener;

const DefaultLocation = Object.freeze({
  latitude: 40.7828647,
  longitude: -73.9675491
});

export default class MapViewAndroid<TEvent extends string = MapViewEvents> extends ViewAndroid<TEvent | MapViewEvents, any, IMapView> implements IMapView {
  onClusterPress: (pins: PinAndroid[]) => void;
  onPress: (location: { latitude: number; longitude: number }) => void;
  onCameraMoveStarted: () => void;
  onCameraMoveEnded: () => void;
  onLongPress: (location: { latitude: number; longitude: number }) => void;
  onCreate: () => void;
  protected savedBundles: any;
  protected activityIntent: any;
  protected _borderColor: Color;
  private lazyLoading: boolean; // lazyLoading is true by default after smartface-native 3.0.2 version.
  private _font: FontAndroid;
  private _fillColor: ColorAndroid;
  private _textColor: ColorAndroid;
  private _nativeCustomMarkerRenderer: Cluster | null;
  private _nativeGoogleMap: any;
  private _clusterEnabled: IMapView['clusterEnabled'];
  private _pins: PinAndroid[];
  private _pendingPins: PinAndroid[];
  private _isMoveStarted: boolean;
  private _nativeClusterManager: any;
  private _zoomLevel: IMapView['zoomLevel'];
  private _centerLocation: IMapView['centerLocation'];
  private _compassEnabled: IMapView['compassEnabled'];
  private _rotateEnabled: IMapView['rotateEnabled'];
  private _scrollEnabled: IMapView['scrollEnabled'];
  private _zoomEnabled: IMapView['zoomEnabled'];
  private _userLocationEnabled: IMapView['userLocationEnabled'];
  private _type: IMapView['type'];
  private _maxZoomLevel: IMapView['maxZoomLevel'];
  private _minZoomLevel: IMapView['minZoomLevel'];
  private _locationButtonVisible: IMapView['android']['locationButtonVisible'];
  private _pinArray: Record<string, PinAndroid> = {};
  createNativeObject() {
    return new NativeMapView(AndroidConfig.activity);
  }
  protected init(params?: Partial<IMapView>): void {
    this._minZoomLevel = 0;
    this._maxZoomLevel = 19;
    this._type = MapViewType.NORMAL;
    this._centerLocation = DefaultLocation;
    this._compassEnabled = true;
    this._rotateEnabled = true;
    this._scrollEnabled = true;
    this._zoomEnabled = true;
    this._userLocationEnabled = false;
    this._zoomLevel = 10;
    this._isMoveStarted = false;
    this._clusterEnabled = false;
    this._pins = [];
    this._pendingPins = [];
    this._nativeCustomMarkerRenderer = null;
    this._locationButtonVisible = true;
    this.lazyLoading = true; // lazyLoading is true by default after smartface-native 3.0.2 version.
    this._borderColor = ColorAndroid.WHITE;
    this._font = FontAndroid.create(FontAndroid.DEFAULT, 20, FontAndroid.BOLD);
    this._fillColor = ColorAndroid.RED;
    this._textColor = ColorAndroid.WHITE;
    this.lazyLoading = true;
    this.activityIntent = AndroidConfig.activity.getIntent();
    this.savedBundles = this.activityIntent.getExtras();
    super.init(params);
    this.addAndroidProps(this.getAndroidProps());
  }
  constructor(params?: IMapView) {
    super(params);
  }
  getVisiblePins(): PinAndroid[] {
    const result: PinAndroid[] = [];
    if (this._nativeGoogleMap) {
      const latLongBounds = this._nativeGoogleMap.getProjection().getVisibleRegion().latLngBounds;

      this._pins.forEach((pin) => {
        if (latLongBounds.contains(pin.nativeObject.getPosition())) {
          result.push(pin);
        }
      });
    }
    return result;
  }
  addPin(pin: PinAndroid): void {
    if (!(pin instanceof PinAndroid)) {
      return;
    }
    if (!this.nativeObject || !this._nativeGoogleMap) {
      this._pendingPins.push(pin);
      return;
    }
    if (pin.nativeObject) {
      return;
    }
    if (!this._clusterEnabled) {
      const marker = new NativeMarkerOptions();
      // pin location must set before adding to map.
      if (pin.location?.latitude && pin.location?.longitude) {
        const position = new NativeLatLng(pin.location.latitude, pin.location.longitude);
        marker.position(position);
      }
      pin.nativeObject = this._nativeGoogleMap.addMarker(marker);
    } else {
      pin.nativeObject = this.createItem(pin);
      pin.isClusterEnabled = this.clusterEnabled;
      this._nativeClusterManager.addItem(pin.nativeObject);
      this._nativeClusterManager.cluster();
    }
    this._pins.push(pin);
    // Sets pin properties. They don't affect until nativeObject is created.
    pin.image = pin.image;
    pin.color = pin.color;
    pin.title = pin.title;
    pin.subtitle = pin.subtitle;
    pin.visible = pin.visible;
  }
  removePin(pin: PinAndroid): void {
    if (!(pin instanceof PinAndroid)) {
      return;
    }
    if (!this.nativeObject) {
      if (this._pendingPins.indexOf(pin) !== -1) {
        this._pendingPins.splice(this._pendingPins.indexOf(pin), 1);
        pin.nativeObject = null;
        return;
      }
    }
    if (!this._clusterEnabled) {
      if (this._pins.indexOf(pin) !== -1) {
        this._pins.splice(this._pins.indexOf(pin), 1);
        pin.nativeObject.remove();
        pin.nativeObject = null;
      }
    } else {
      if (this._pins.indexOf(pin) !== -1) {
        this._pins.splice(this._pins.indexOf(pin), 1);
        this._nativeClusterManager.removeItem(pin.nativeObject);
        this._nativeClusterManager.cluster();
        pin.nativeObject = null;
      }
    }
  }
  removeAllPins(): void {
    if (this._clusterEnabled && this._nativeClusterManager) {
      this._nativeClusterManager.clearItems();
      this._nativeClusterManager.cluster();
      this._pins = [];
    } else if (this._pins.length > 0) {
      this._pins.forEach((pin) => pin.nativeObject.remove());
      this._pins = [];
    }
  }

  setCenterLocationWithZoomLevel(centerLocation: { latitude: number; longitude: number }, zoomLevel: number, animated: boolean): void {
    if (typeof centerLocation === 'object') {
      this._centerLocation = centerLocation;
    }
    if (typeof zoomLevel === 'number') {
      this._zoomLevel = zoomLevel + 2;
    }

    if (this._nativeGoogleMap) {
      const latLng = new NativeLatLng(this._centerLocation.latitude, this._centerLocation.longitude); // Location of Central Park
      const cameraUpdate = NativeCameraUpdateFactory.newLatLngZoom(latLng, this._zoomLevel);

      animated ? this._nativeGoogleMap.animateCamera(cameraUpdate) : this._nativeGoogleMap.moveCamera(cameraUpdate);
    }
  }
  private createItem(pin: PinAndroid): any {
    const clusterItemImage = pin.image?.nativeObject || null;
    const clusterItemObj = new NativeClusterItem(pin.location.latitude, pin.location.longitude, pin.title, pin.subtitle, pin.clusterColor, clusterItemImage);
    this._pinArray[clusterItemObj] = pin;
    return clusterItemObj;
  }
  private asyncMap() {
    this.nativeObject.getMapAsync(
      NativeMapReadyCallback.implement({
        onMapReady: (googleMap: any) => {
          this._nativeGoogleMap = googleMap;

          this.nativeObject.onStart();
          this.nativeObject.onResume();

          if (!this._clusterEnabled) {
            googleMap.setOnMarkerClickListener(
              NativeOnMarkerClickListener.implement({
                onMarkerClick: (marker: any) => {
                  this._pins.forEach((pin) => {
                    if (pin.nativeObject.getId() === marker.getId()) {
                      pin.onPress?.();
                      pin.emit('press');
                    }
                  });
                  return false;
                }
              })
            );

            googleMap.setOnInfoWindowClickListener(
              NativeOnInfoWindowClickListener.implement({
                onInfoWindowClick: (marker: any) => {
                  this._pins.forEach((pin) => {
                    if (pin.nativeObject.getId() === marker.getId()) {
                      pin.onInfoWindowPress?.();
                      pin.emit('infoWindowPress');
                    }
                  });
                }
              })
            );
          }

          googleMap.setOnMapClickListener(
            NativeOnMapClickListener.implement({
              onMapClick: (location: IMapView['centerLocation']) => {
                const params = {
                  latitude: location.latitude,
                  longitude: location.longitude
                };
                this.onPress?.(params);
                this.emit('press', params);
              }
            })
          );

          googleMap.setOnMapLongClickListener(
            NativeOnMapLongClickListener.implement({
              onMapLongClick: (location: IMapView['centerLocation']) => {
                const params = {
                  latitude: location.latitude,
                  longitude: location.longitude
                };
                this.onLongPress?.(params);
                this.emit('longPress', params);
              }
            })
          );

          googleMap.setOnCameraMoveStartedListener(
            NativeOnCameraMoveStartedListener.implement({
              onCameraMoveStarted: (reason: any) => {
                this.onCameraMoveStarted?.();
                this.emit('cameraMoveStarted');
                this._isMoveStarted = true;
              }
            })
          );

          googleMap.setOnCameraIdleListener(
            NativeOnCameraIdleListener.implement({
              onCameraIdle: () => {
                this._nativeClusterManager?.onCameraIdle();
                this._zoomLevel = this.zoomLevel; // Current zoom level always kept by those properties
                this._centerLocation = this.centerLocation;
                if (this._isMoveStarted) {
                  this.onCameraMoveEnded?.();
                  this.emit('cameraMoveEnded');
                  this._isMoveStarted = false;
                }
              }
            })
          );
          this._zoomLevel && this.setCenterLocationWithZoomLevel(this._centerLocation, this._zoomLevel, false);
          this.compassEnabled = this._compassEnabled;
          this.rotateEnabled = this._rotateEnabled;
          this.scrollEnabled = this._scrollEnabled;
          this.zoomEnabled = this._zoomEnabled;
          this.userLocationEnabled = this._userLocationEnabled;
          this.type = this._type;
          this.maxZoomLevel = this._maxZoomLevel;
          this.minZoomLevel = this._minZoomLevel;
          this.android.locationButtonVisible = this._locationButtonVisible;

          this._pins = []; // ToDo: Clearing array on map ready should be re-considered while refactoring;
          this._pendingPins.forEach((element) => {
            this.addPin(element);
          });
          this._pendingPins = [];

          if (this.clusterEnabled) {
            this.startCluster();
          }
          this.onCreate?.();
          this.emit('create');
        }
      })
    );
  }
  private getAndroidProps() {
    const self = this;
    return {
      prepareMap() {
        self.nativeObject.onCreate(self.savedBundles);
        self.asyncMap();
      },
      get locationButtonVisible(): IMapView['android']['locationButtonVisible'] {
        return self._locationButtonVisible;
      },
      set locationButtonVisible(value: IMapView['android']['locationButtonVisible']) {
        self._locationButtonVisible = value;
        self._nativeGoogleMap?.getUiSettings().setMyLocationButtonEnabled(value);
      }
    };
  }
  private startCluster() {
    this._nativeClusterManager = new NativeClusterManager(AndroidConfig.activity, this._nativeGoogleMap);
    this._nativeGoogleMap.setOnMarkerClickListener(this._nativeClusterManager);
    this._nativeGoogleMap.setOnInfoWindowClickListener(this._nativeClusterManager);

    this._nativeClusterManager.setOnClusterItemClickListener(
      NativeClusterManager.OnClusterItemClickListener.implement({
        onClusterItemClick: (item) => {
          this._pinArray[item]?.onPress();
          this._pinArray[item].emit('press');
          return false;
        }
      })
    );

    this._nativeClusterManager.setOnClusterItemInfoWindowClickListener(
      NativeClusterManager.OnClusterItemInfoWindowClickListener.implement({
        onClusterItemInfoWindowClick: (item) => {
          this._pinArray[item]?.onInfoWindowPress();
          this._pinArray[item].emit('infoWindowPress');
        }
      })
    );

    this._nativeClusterManager.setOnClusterClickListener(
      NativeClusterManager.OnClusterClickListener.implement({
        onClusterClick: (cluster: any) => {
          const pinArray: PinAndroid[] = [];
          const clusterArray = toJSArray(cluster.getItems().toArray());
          for (let i = 0; i < clusterArray.length; i++) {
            pinArray.push(this._pinArray[clusterArray[i]]);
          }
          this.onClusterPress?.(pinArray);
          return true;
        }
      })
    );

    const clusterRender = this.cluster.setDefaultClusterRenderer(this, this._nativeGoogleMap, this._nativeClusterManager);
    this._nativeClusterManager.setRenderer(clusterRender);
  }
  get centerLocation() {
    if (!this._nativeGoogleMap) {
      return this._centerLocation;
    }
    const nativeLatLng = this._nativeGoogleMap.getCameraPosition().target;
    return {
      latitude: nativeLatLng.latitude,
      longitude: nativeLatLng.longitude
    };
  }
  get visibleRegion(): IMapView['visibleRegion'] {
    if (!this._nativeGoogleMap) {
      return undefined;
    }
    const visibleRegion = this._nativeGoogleMap.getProjection().getVisibleRegion();
    const farLeft = visibleRegion.farLeft;
    const farRight = visibleRegion.farRight;
    const nearLeft = visibleRegion.nearLeft;
    const nearRight = visibleRegion.nearRight;

    return {
      topLeft: {
        latitude: farLeft.latitude,
        longitude: farLeft.longitude
      },
      topRight: {
        latitude: farRight.latitude,
        longitude: farRight.longitude
      },
      bottomLeft: {
        latitude: nearLeft.latitude,
        longitude: nearLeft.longitude
      },
      bottomRight: {
        latitude: nearRight.latitude,
        longitude: nearRight.longitude
      }
    };
  }

  get scrollEnabled() {
    return this._scrollEnabled;
  }
  set scrollEnabled(value) {
    this._scrollEnabled = value;
    this._nativeGoogleMap?.getUiSettings().setScrollGesturesEnabled(value);
  }
  get rotateEnabled() {
    return this._rotateEnabled;
  }
  set rotateEnabled(value) {
    this._rotateEnabled = value;
    this._nativeGoogleMap?.getUiSettings().setRotateGesturesEnabled(value);
  }
  get compassEnabled() {
    return this._compassEnabled;
  }
  set compassEnabled(value) {
    this._compassEnabled = value;
    this._nativeGoogleMap?.getUiSettings().setCompassEnabled(value);
  }
  get clusterEnabled() {
    return this._clusterEnabled;
  }
  set clusterEnabled(value) {
    this._clusterEnabled = value;
  }

  get zoomEnabled() {
    return this._zoomEnabled;
  }
  set zoomEnabled(value) {
    this._zoomEnabled = value;
    this._nativeGoogleMap?.getUiSettings().setZoomGesturesEnabled(value);
  }
  get maxZoomLevel() {
    return this._maxZoomLevel;
  }
  set maxZoomLevel(value) {
    this._maxZoomLevel = value;
    this._nativeGoogleMap?.setMaxZoomPreference(value + 2);
  }

  get minZoomLevel() {
    return this._minZoomLevel;
  }
  set minZoomLevel(value) {
    this._minZoomLevel = value;
    this._nativeGoogleMap?.setMinZoomPreference(value + 2);
  }

  get zoomLevel(): number | undefined {
    return this._nativeGoogleMap?.getCameraPosition().zoom - 2 || undefined;
  }
  set zoomLevel(value: number | undefined) {
    this._zoomLevel = value;
    if (this._nativeGoogleMap && value) {
      const zoomCameraUpdateFactory = NativeCameraUpdateFactory.zoomTo(value + 2);
      this._nativeGoogleMap.animateCamera(zoomCameraUpdateFactory);
    }
  }
  get userLocationEnabled() {
    return this._userLocationEnabled;
  }
  set userLocationEnabled(value) {
    this._userLocationEnabled = value;
    this._nativeGoogleMap?.setMyLocationEnabled(value);
  }
  get cluster() {
    this._nativeCustomMarkerRenderer ||= new Cluster();
    return this._nativeCustomMarkerRenderer;
  }

  get clusterFillColor() {
    return this._fillColor.nativeObject;
  }
  set clusterFillColor(value) {
    //cant set after added mapview
    if (value instanceof ColorAndroid) {
      this._fillColor = value;
    }
  }
  get clusterBorderColor() {
    return this._borderColor.nativeObject;
  }
  set clusterBorderColor(value) {
    //cant set after added mapview
    if (value instanceof Color) {
      this._borderColor = value;
    }
  }
  get clusterTextColor() {
    return this._textColor.nativeObject;
  }
  set clusterTextColor(value) {
    //cant set after added mapview
    if (value instanceof ColorAndroid) {
      this._textColor = value;
    }
  }
  get clusterFont() {
    return this._font;
  }
  set clusterFont(value) {
    if (value instanceof FontAndroid) {
      this._font = value;
    }
  }
  get type(): MapViewType {
    return this._type;
  }
  set type(value) {
    this._type = value;
    this._nativeGoogleMap?.setMapType(value);
  }
  toString(): string {
    return 'MapView';
  }

  static Type = MapViewType;
  static Pin = PinAndroid;
  static Cluster = Cluster;
}
