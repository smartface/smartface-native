import { Location, MapTypes, TransportTypes } from "../linking/shared/map";

export declare function getMapOptions(options: {
  locationName?: string,
  isNavigation?: boolean,
  transportType?: TransportTypes,
  mapType: MapTypes,
  location: Location
}): {
  type: MapTypes,
  data: any,
  scheme: string,
  errorText: string,
  successText: string
};