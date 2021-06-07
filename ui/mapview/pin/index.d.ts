export = Pin;

import Color from "sf-core/ui/color";
import Image from "sf-core/ui/image";
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
