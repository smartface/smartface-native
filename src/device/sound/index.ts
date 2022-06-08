import { ISound } from './sound';

const Sound: ConstructorOf<ISound, Partial<ISound>> = require(`./sound.${Device.deviceOS.toLowerCase()}`).default;
type Sound = ISound;

export default Sound;
