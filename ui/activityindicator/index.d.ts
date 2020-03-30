import Color = require("../color");
import View = require("../view");
import ActivityIndicatorViewStyle = require("./ios/activityindicatorviewstyle");

declare class ActivityIndicator extends View {
  color: Color
}

declare namespace ActivityIndicator {
  export {ActivityIndicatorViewStyle};
}

export = ActivityIndicator;