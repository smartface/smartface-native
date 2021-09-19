import Color from "../color";
import View from "../view";
import _ActivityIndicatorViewStyle from "./ios/activityindicatorviewstyle";

declare class ActivityIndicator extends View {
  color: Color;
}

declare namespace ActivityIndicator {
  namespace iOS {
    export import ActivityIndicatorViewStyle = _ActivityIndicatorViewStyle;
    export import SemanticContentAttribute = View.iOS.SemanticContentAttribute;
  }
}

export = ActivityIndicator;