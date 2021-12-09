import { Location, MapTypes, TransportTypes } from "../linking/shared/map";

export declare function getMapOptions(options: {
  locationName?: string,
  isNavigation?: boolean,
  transportType?: TransportTypes,
  mapType: MapTypes,
  location: Location
}): any;