import { IMapView, MapViewType } from './mapview';
import Location from '../../device/location';
import Invocation from '../../util/iOS/invocation';
import ViewIOS from '../view/view.ios';
import ClusterIOS from './cluster/cluster.ios';
import { MapViewEvents } from './mapview-events';
import Pin from './pin';

const DefaultLocation = Object.freeze({
  latitude: 40.7828647,
  longitude: -73.9675491
});

const MERCATOR_OFFSET = 268435456.0;
const MERCATOR_RADIUS = 85445659.44705395;
const DEGREES = 180.0;
const MAX_POSSIBLE_ZOOM_LEVEL = 28;
const DEFAULT_MIN_ZOOM_LEVEL = 0;
const DEFAULT_MAX_ZOOM_LEVEL = 19;
const DEFAULT_ZOOM_LEVEL = 15;

const NativeMapType = {
  [MapViewType.NORMAL]: 0,
  [MapViewType.SATELLITE]: 1,
  [MapViewType.HYBRID]: 2
};
export default class MapViewIOS<TEvent extends string = MapViewEvents> extends ViewIOS<TEvent | MapViewEvents, any, IMapView> implements IMapView {
  private tapGesture: __SF_UITapGestureRecognizer;
  private longGesture: __SF_UILongPressGestureRecognizer;
  private _isFirstRender: boolean;
  private _pinArray: Record<string, Pin>;
  private _minZoomLevel: IMapView['minZoomLevel'];
  private _maxZoomLevel: IMapView['maxZoomLevel'];
  private _zoomLevel: IMapView['zoomLevel'];
  private _cluster: ClusterIOS[];
  private _mapViewType: MapViewType;
  constructor(params?: Partial<IMapView>) {
    super(params);
    this.tapGesture = new __SF_UITapGestureRecognizer();
    this.longGesture = new __SF_UILongPressGestureRecognizer();
    this.nativeObject.setCenter(DefaultLocation.latitude, DefaultLocation.longitude, false);
    this.setGestureHandlers();
    this.setNativeEvents();
  }
  createNativeObject() {
    return new __SF_MKMapView();
  }
  protected preConstruct(params?: Partial<Record<string, any>>): void {
    this._minZoomLevel = DEFAULT_MIN_ZOOM_LEVEL;
    this._maxZoomLevel = DEFAULT_MAX_ZOOM_LEVEL;
    this._zoomLevel = DEFAULT_ZOOM_LEVEL;
    this._cluster = [];
    this._pinArray = {};
    this._isFirstRender = false;
    super.preConstruct(params);
    this.addIOSProps(this.getIOSProps());
    this.addAndroidProps(this.getAndroidProps());
  }
  getVisiblePins(): Pin[] {
    const annotationVisibleRect = Invocation.invokeInstanceMethod(this.nativeObject, 'visibleMapRect', [], 'CGRect');

    const argAnnotationVisibleRect = new Invocation.Argument({
      type: 'CGRect',
      value: annotationVisibleRect
    });

    const annotationSet = Invocation.invokeInstanceMethod(this.nativeObject, 'annotationsInMapRect:', [argAnnotationVisibleRect], 'id') as __SF_NSOBject;

    const annotationArray = Invocation.invokeInstanceMethod(annotationSet, 'allObjects', [], 'id') as unknown as any[];
    const pinArray: Pin[] = [];
    for (const i in annotationArray) {
      if (annotationArray[i].toString() !== '[object MKClusterAnnotation]') {
        //Check cluster
        pinArray.push(this._pinArray[annotationArray[i].uuid]);
      }
    }
    return pinArray;
  }
  addPin(pin: Pin): void {
    if (pin instanceof Pin) {
      // pin.parentMapView = this; //Unused variable. Bring it back if there's an error.
      const uuid = pin.nativeObject.uuid;
      this._pinArray[uuid] = pin;
      this.nativeObject.addAnnotation(pin.nativeObject);
    }
  }
  removePin(pin: Pin): void {
    if (pin instanceof Pin) {
      const uuid = pin.nativeObject.uuid;
      delete this._pinArray[uuid];
      this.nativeObject.removeAnnotation(this.nativeObject);
    }
  }
  removeAllPins(): void {
    const nativeObjects = Object.values(this._pinArray).map((pin) => pin.nativeObject);
    this.nativeObject.removeAnnotations(nativeObjects);
    this._pinArray = {};
  }
  setCenterLocationWithZoomLevel(centerLocation: { latitude: number; longitude: number }, zoomLevel: number, animated: boolean): void {
    this.setZoomLevelWithAnimated(centerLocation, zoomLevel + 1, animated);
  }
  onPress: (location: { latitude: number; longitude: number }) => void;
  onCameraMoveStarted: () => void;
  onCameraMoveEnded: () => void;
  onLongPress: (location: { latitude: number; longitude: number }) => void;
  onClusterPress: (pins: Pin[]) => void;
  onCreate: () => void;

  private getAndroidProps() {
    return {
      prepareMap() {}
    };
  }
  private getIOSProps() {
    const self = this;
    return {
      get clusterPadding(): IMapView['ios']['clusterPadding'] {
        return self.cluster.ios.padding;
      },
      set clusterPadding(value: IMapView['ios']['clusterPadding']) {
        self.cluster.ios.padding = value;
      },
      get clusterBorderWidth(): IMapView['ios']['clusterBorderWidth'] {
        return self.cluster.ios.borderWidth;
      },
      set clusterBorderWidth(value: IMapView['ios']['clusterBorderWidth']) {
        self.cluster.ios.borderWidth = value;
      },
      get clusterSize(): IMapView['ios']['clusterSize'] {
        return self.cluster.ios.size;
      },
      set clusterSize(value: IMapView['ios']['clusterSize']) {
        self.cluster.ios.size = value;
      }
    };
  }

  private setGestureHandlers() {
    this.tapGesture.handle = (e) => {
      const gesture = e.gesture;
      if (gesture.gestureRecognizerstate === 3) {
        const point = gesture.locationView(this.nativeObject);
        const coordinate = this.nativeObject.convertToCoordinateFromView(point, this.nativeObject);
        const params = {
          latitude: coordinate.latitude,
          longitude: coordinate.longitude
        };
        this.onPress?.(params);
        this.emit('press', params);
      }
    };
    this.nativeObject.addGestureRecognizer(this.tapGesture);
    this.longGesture.handle = (e) => {
      const gesture = e.gesture;
      if (gesture.gestureRecognizerstate === 1) {
        const point = gesture.locationView(this.nativeObject);
        const coordinate = this.nativeObject.convertToCoordinateFromView(point, this.nativeObject);
        const params = {
          latitude: coordinate.latitude,
          longitude: coordinate.longitude
        };
        this.onLongPress?.(params);
        this.emit('longPress', params);
      }
    };
    this.nativeObject.addGestureRecognizer(this.longGesture);
  }

  private coordinateSpanWithCenterCoordinate(centerCoordinate: IMapView['centerLocation'], zoomLevel: IMapView['zoomLevel']) {
    // convert center coordiate to pixel space
    const centerPixelX = this.longitudeToPixelSpaceX(centerCoordinate.longitude);
    const centerPixelY = this.latitudeToPixelSpaceY(centerCoordinate.latitude);

    // determine the scale value from the zoom level
    if (zoomLevel) {
      const zoomExponent = 20.0 - zoomLevel;
      const zoomScale = Math.pow(2.0, zoomExponent);

      // scale the map’s size in pixel space
      const mapSizeInPixels = this.nativeObject.bounds;
      const scaledMapWidth = parseFloat(mapSizeInPixels.width) * zoomScale;
      const scaledMapHeight = parseFloat(mapSizeInPixels.height) * zoomScale;

      // figure out the position of the top-left pixel
      const topLeftPixelX = centerPixelX - scaledMapWidth / 2.0;
      const topLeftPixelY = centerPixelY - scaledMapHeight / 2.0;

      // find delta between left and right longitudes
      const minLng = this.pixelSpaceXToLongitude(topLeftPixelX);
      const maxLng = this.pixelSpaceXToLongitude(topLeftPixelX + scaledMapWidth);
      const longitudeDelta = maxLng - minLng;

      const minLat = this.pixelSpaceYToLatitude(topLeftPixelY);
      const maxLat = this.pixelSpaceYToLatitude(topLeftPixelY + scaledMapHeight);
      const latitudeDelta = -1.0 * (maxLat - minLat);
      return {
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta
      };
    }

    return null;
  }

  private longitudeToPixelSpaceX(longitude: number) {
    return Math.round(MERCATOR_OFFSET + (MERCATOR_RADIUS * longitude * Math.PI) / DEGREES);
  }

  private latitudeToPixelSpaceY(latitude: number) {
    return Math.round(MERCATOR_OFFSET - (MERCATOR_RADIUS * Math.log((1 + Math.sin((latitude * Math.PI) / DEGREES)) / (1 - Math.sin((latitude * Math.PI) / DEGREES)))) / 2.0);
  }

  private pixelSpaceXToLongitude(pixelX: number) {
    return (((Math.round(pixelX) - MERCATOR_OFFSET) / MERCATOR_RADIUS) * DEGREES) / Math.PI;
  }

  private pixelSpaceYToLatitude(pixelY: number) {
    return ((Math.PI / 2.0 - 2.0 * Math.atan(Math.exp((Math.round(pixelY) - MERCATOR_OFFSET) / MERCATOR_RADIUS))) * DEGREES) / Math.PI;
  }

  private setZoomLevelWithAnimated(centerLocation: IMapView['centerLocation'], zoomLevel: IMapView['zoomLevel'], animated?: boolean) {
    if (zoomLevel) {
      const zoomLevelClamped = Math.min(zoomLevel, MAX_POSSIBLE_ZOOM_LEVEL); // clamp large numbers to 28
      // use the zoom level to compute the region
      const span = this.coordinateSpanWithCenterCoordinate(centerLocation, zoomLevelClamped);
      if (span)
        this.nativeObject.centerLocation = {
          latitudeDelta: span.latitudeDelta,
          longitudeDelta: span.longitudeDelta,
          latitude: centerLocation.latitude,
          longitude: centerLocation.longitude,
          animated: animated
        };
    }
  }
  private setNativeEvents() {
    this.nativeObject.mapViewFinishRender = () => {
      if (!this._isFirstRender) {
        return;
      }
      this._isFirstRender = false;
      this.onCreate?.();
      this.emit('create');
    };
    this.nativeObject.regionWillChangeAnimated = () => {
      if (this._isFirstRender) {
        return;
      }
      this.onCameraMoveStarted?.();
      this.emit('cameraMoveStarted');
    };

    this.nativeObject.regionDidChangeAnimated = () => {
      if (this._isFirstRender) {
        return;
      }
      this.onCameraMoveEnded?.();
      this.emit('cameraMoveEnded');

      if (this.minZoomLevel > this.maxZoomLevel) {
        return;
      }
      if (this.minZoomLevel === this.maxZoomLevel) {
        this.zoomLevel = this.minZoomLevel;
        return;
      }
      if (this.zoomLevel && this.minZoomLevel > DEFAULT_MIN_ZOOM_LEVEL && this.zoomLevel < this.minZoomLevel) {
        this.zoomLevel = this.minZoomLevel;
      } else if (this.zoomLevel && this.maxZoomLevel < DEFAULT_MAX_ZOOM_LEVEL && this.zoomLevel > this.maxZoomLevel) {
        this.zoomLevel = this.maxZoomLevel;
      }
    };

    this.cluster.onPress = (e: any) => {
      const pinArray: Pin[] = [];
      for (const i in e.memberAnnotations) {
        pinArray.push(this._pinArray[e.memberAnnotations[i].uuid]);
      }
      this.onClusterPress?.(pinArray);
      this.emit('clusterPress', pinArray);
    };
  }
  get scrollEnabled(): IMapView['scrollEnabled'] {
    return this.nativeObject.scrollEnabled;
  }
  set scrollEnabled(value: IMapView['scrollEnabled']) {
    this.nativeObject.setScrollEnabled(value);
  }
  get rotateEnabled(): IMapView['rotateEnabled'] {
    return this.nativeObject.rotateEnabled;
  }
  set rotateEnabled(value: IMapView['rotateEnabled']) {
    this.nativeObject.setRotateEnabled(value);
  }
  get compassEnabled(): IMapView['compassEnabled'] {
    return this.nativeObject.showsCompass;
  }
  set compassEnabled(value: IMapView['compassEnabled']) {
    this.nativeObject.showsCompass = value;
  }
  get userLocationEnabled(): IMapView['userLocationEnabled'] {
    return this.nativeObject.showsUserLocation;
  }
  set userLocationEnabled(value: IMapView['userLocationEnabled']) {
    value ? Location.start() : Location.stop();
    this.nativeObject.showsUserLocation = value;
  }
  get clusterFillColor(): IMapView['clusterFillColor'] {
    return this.cluster.fillColor;
  }
  set clusterFillColor(value: IMapView['clusterFillColor']) {
    this.cluster.fillColor = value;
  }
  get cluster(): ClusterIOS {
    if (this._cluster.length === 0) {
      const cluster = new ClusterIOS({ nativeObject: this.nativeObject.getCluster() });
      this._cluster.push(cluster);
    }
    return this._cluster[0];
  }

  get clusterEnabled(): IMapView['clusterEnabled'] {
    return this.nativeObject.isClusterEnabled;
  }
  set clusterEnabled(value: IMapView['clusterEnabled']) {
    this.nativeObject.isClusterEnabled = value;
  }
  get clusterBorderColor(): IMapView['clusterBorderColor'] {
    return this.cluster.borderColor;
  }
  set clusterBorderColor(value: IMapView['clusterBorderColor']) {
    this.cluster.borderColor = value;
  }
  get clusterTextColor(): IMapView['clusterTextColor'] {
    return this.cluster.textColor;
  }
  set clusterTextColor(value: IMapView['clusterTextColor']) {
    this.cluster.textColor = value;
  }
  get clusterFont(): IMapView['clusterFont'] {
    return this.cluster.font;
  }
  set clusterFont(value: IMapView['clusterFont']) {
    this.cluster.font = value;
  }
  get zoomLevel() {
    if (this.nativeObject.getRegion) {
      const region = this.nativeObject.getRegion();

      const centerPixelX = this.longitudeToPixelSpaceX(region.center.longitude);
      const topLeftPixelX = this.longitudeToPixelSpaceX(region.center.longitude - region.span.longitudeDelta / 2);

      const scaledMapWidth = (centerPixelX - topLeftPixelX) * 2;
      const mapSizeInPixels = this.nativeObject.bounds;
      const zoomScale = scaledMapWidth / mapSizeInPixels.width;
      const zoomExponent = Math.log(zoomScale) / Math.log(2);
      const zoomLevel = 20 - Number(zoomExponent.toFixed(2));

      return zoomLevel - 1;
    }
    return this._zoomLevel;
  }
  set zoomLevel(value) {
    this._zoomLevel = value;
    if (typeof value === 'number') {
      this.setZoomLevelWithAnimated(this.centerLocation, value + 1, false);
    }
  }
  get minZoomLevel() {
    return this._minZoomLevel;
  }
  set minZoomLevel(value) {
    this._minZoomLevel = value;
  }
  get maxZoomLevel() {
    return this._maxZoomLevel;
  }
  set maxZoomLevel(value) {
    this._maxZoomLevel = value;
  }
  get centerLocation(): IMapView['centerLocation'] {
    return this.nativeObject.centerLocation;
  }

  set centerLocation(value: IMapView['centerLocation']) {
    this.setCenterLocationWithZoomLevel(value, this._zoomLevel ?? DEFAULT_ZOOM_LEVEL, false);
  }
  get zoomEnabled(): IMapView['zoomEnabled'] {
    return this.nativeObject.zoomEnabled;
  }
  set zoomEnabled(value: IMapView['zoomEnabled']) {
    this.nativeObject.setZoomEnabled(value);
  }
  get visibleRegion(): IMapView['visibleRegion'] {
    const topLeft = this.nativeObject.getTopLeftCoordinate();
    const topRight = this.nativeObject.getTopRightCoordinate();
    const bottomLeft = this.nativeObject.getBottomLeftCoordinate();
    const bottomRight = this.nativeObject.getBottomRightCoordinate();

    return {
      topLeft,
      topRight,
      bottomLeft,
      bottomRight
    };
  }
  get type(): MapViewType {
    return this._mapViewType;
  }
  set type(value: MapViewType) {
    this._mapViewType = value;
    this.nativeObject.mapType = NativeMapType[value];
  }

  static Pin = Pin;
  static Cluster = ClusterIOS;
  static Type = MapViewType;
}
