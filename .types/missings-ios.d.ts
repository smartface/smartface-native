declare class __SF_UIColor {
  static hexColor: (hex: String) => __SF_UIColor;
  constructor(r: number, g: number, b: number);
  constructor(a: number, r: number, g: number, b: number);
}

declare class __SF_UIView {}
declare class __SF_FILE {}

declare class __SF_UIFont {
  // TODO: it must be fontNamesByFamilyName
  static systemFontOfSize(size: number): number;
  static fontWithNameSize(fontFamily: string, size: number): any;
}

declare class UIFont {
  static fontNamesForFamilyName(familyName: string): string[];
  static familyNames(): string[];
}

declare class __SF_CAGradientLayer {
  static createGradient(...args: any[]): __SF_CAGradientLayer;
}

declare class __SF_Label {
  static createFromFile(path: string, size: number): any;
}
