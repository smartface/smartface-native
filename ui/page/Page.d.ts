export declare enum UIInterfaceOrientation {
  unknown = 0,
  portrait = 1,
  portraitUpsideDown = 2,
  landscapeLeft = 3,
  landscapeRight = 4
}

export declare namespace Page {
  const Orientation: {
    PORTRAIT: [UIInterfaceOrientation.portrait];
    UPSIDEDOWN: [UIInterfaceOrientation.portraitUpsideDown];
    AUTOPORTRAIT: [UIInterfaceOrientation.portrait, UIInterfaceOrientation.portraitUpsideDown];
    LANDSCAPELEF: [UIInterfaceOrientation.landscapeLeft];
    LANDSCAPERIGHT: [UIInterfaceOrientation.landscapeRight];
    AUTOLANDSCAPE: [UIInterfaceOrientation.landscapeLeft, UIInterfaceOrientation.landscapeRight];
    AUTO: [UIInterfaceOrientation.portrait, UIInterfaceOrientation.portraitUpsideDown, UIInterfaceOrientation.landscapeLeft, UIInterfaceOrientation.landscapeRight];
  };
  type Orientation = ExtractValue<typeof Orientation>;
  namespace iOS {
    enum LargeTitleDisplayMode {
      AUTOMATIC = 0,
      ALWAYS = 1,
      NEVER = 2
    }
    enum PresentationStyle {
      COVERVERTICAL = 0,
      FLIPHORIZONTAL = 1,
      CROSSDISSOLVE = 2,
      PARTIALCURL = 3
    }
  }
}

// declare type OrientationType =
// 	| Page.Orientation["AUTO"]
// 	| Page.Orientation["AUTOLANDSCAPE"]
// 	| Page.Orientation["AUTOPORTRAIT"]
// 	| Page.Orientation["LANDSCAPELEF"]
// 	| Page.Orientation["LANDSCAPERIGHT"]
// 	| Page.Orientation["PORTRAIT"]
// 	| Page.Orientation["UPSIDEDOWN"];
