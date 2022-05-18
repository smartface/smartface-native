import { AbstractMapView } from './mapview';

const MapView: typeof AbstractMapView = require(`./mapview.${Device.deviceOS.toLowerCase()}`).default;
type MapView = AbstractMapView;
export default MapView;
