import Color from "../../../ui/color";
import Image from "../../../ui/image";
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

export = Pin;
