import { ConstructorOf } from "../../core/constructorof";
import Image from "./image";

const Image: ConstructorOf<Image> = require(`./image.${Device.deviceOS.toLowerCase()}`)
.default;

export default Image;
