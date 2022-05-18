import { SoundImpl } from './sound';

const Sound: typeof SoundImpl = require(`./sound.${Device.deviceOS.toLowerCase()}`).default;
type Sound = SoundImpl;

export default Sound;
