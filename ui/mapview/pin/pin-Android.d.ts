import Color = require("sf-core/ui/color");
import Image = require("sf-core/ui/image");

export = Pin;
declare class Pin {
  location: {
    latitude: number;
    longitude: number;
  };
  title: string;
  subtitle:string;
  color: Color;
  id: number;
  image: Image;
  visible: boolean;
  onPress: () => void;
  onInfoWindowPress: () => void;
}
