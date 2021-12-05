const Application = require("../../application");
const MenuItem = require('../../ui/menuitem');
const { MapList, TransportTypes } = require('./shared/map');

function Linking() { }

Linking.openMap = (options) => {
  let menu = undefined;
  return new Promise((resolve, reject) => {
    // Use from cache if necessary
    menu = menu || createMapsMenuForIOS();

    const { page, location, name } = options;
    const locationName = name || "";

    const appleMapsOnSelected = () => {
      Application.call({
        uriScheme: MapList.APPLE_MAPS.URL,
        data: {
          ll: `${location.latitude},${location.longitude}`,
          q: encodeURIComponent(locationName),
        },
        onSuccess: () => resolve(MapList.APPLE_MAPS.SUCCESS_TEXT),
        onFailure: () => reject(MapList.APPLE_MAPS.FAILURE_TEXT),
      });
    };
    menu.items.forEach((item) => {
      if (item.title === MapList.APPLE_MAPS.NAME) {
        item.onSelected = appleMapsOnSelected;
      } else if (item.title === MapList.GOOGLE_MAPS.NAME) {
        item.onSelected = () => {
          Application.call({
            uriScheme: MapList.GOOGLE_MAPS.URL,
            data: {
              api: "1",
              query: `${location.latitude},${location.longitude}`,
              q: encodeURIComponent(locationName),
            },
            onSuccess: () => resolve(MapList.GOOGLE_MAPS.SUCCESS_TEXT),
            onFailure: () => reject(MapList.GOOGLE_MAPS.FAILURE_TEXT),
          });
        };
      } else if (item.title === MapList.YANDEX_MAPS.NAME) {
        item.onSelected = () => {
          Application.call({
            uriScheme: MapList.YANDEX_MAPS.SCHEME,
            data: {
              ll: `${location.latitude},${location.longitude}`,
              text: encodeURIComponent(locationName),
            },
            onSuccess: () => resolve(MapList.YANDEX_MAPS.SUCCESS_TEXT),
            onFailure: () => reject(MapList.YANDEX_MAPS.FAILURE_TEXT),
          });
        };
      } else if (item.ios.style === MenuItem.ios.Style.CANCEL) {
        item.onSelected = () => reject("User Cancelled the choice");
      }
    });
    menu.items.length ? menu.show(page) : appleMapsOnSelected();
  });
};

Linking.openNavigation = (options) => {
  let menu = undefined;
  return new Promise((resolve, reject) => {
    // Use from cache if necessary
    menu = menu || createMapsMenuForIOS();

    const { page, location } = options;
    const isDriving = options.transportType === TransportTypes.WALKING;

    const appleMapsOnSelected = () => {
      Application.call({
        uriScheme: MapList.APPLE_MAPS.URL,
        data: {
          daddr: `${location.latitude},${location.longitude}`,
          dirflg: isDriving ? TransportTypes.DRIVING : TransportTypes.WALKING,
        },
        onSuccess: () => resolve(MapList.APPLE_MAPS.SUCCESS_TEXT),
        onFailure: () => reject(MapList.APPLE_MAPS.FAILURE_TEXT),
      });
    };
    menu.items.forEach((item) => {
      if (item.title === MapList.APPLE_MAPS.NAME) {
        item.onSelected = appleMapsOnSelected;
      } else if (item.title === MapList.GOOGLE_MAPS.NAME) {
        item.onSelected = () => {
          Application.call({
            uriScheme: "https://www.google.com/maps/dir/",
            data: {
              api: "1",
              travelmode: isDriving ? "driving" : "walking",
              dir_action: "navigate",
              destination: `${location.latitude},${location.longitude}`,
            },
            onSuccess: () => resolve(MapList.GOOGLE_MAPS.SUCCESS_TEXT),
            onFailure: () => reject(MapList.GOOGLE_MAPS.FAILURE_TEXT),
          });
        };
      } else if (item.title === MapList.YANDEX_MAPS.NAME) {
        item.onSelected = () => {
          Application.call({
            uriScheme: `${MapList.YANDEX_NAVIGATION.SCHEME}build_route_on_map?lat_to=${location.latitude}&lon_to=${location.longitude}`,
            data: {},
            onSuccess: () =>
              resolve(MapList.YANDEX_NAVIGATION.SUCCESS_TEXT),
            onFailure: () => reject(MapList.YANDEX_NAVIGATION.FAILURE_TEXT),
          });
        };
      } else if (item.ios.style === MenuItem.ios.Style.CANCEL) {
        item.onSelected = () => reject("User Cancelled the choice");
      }
    });
    menu.items.length ? menu.show(page) : appleMapsOnSelected();
  });
}