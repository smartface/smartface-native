module.exports =
  Device.deviceOS === "Android" ? require("./navigationbar-Android.js") : {};
