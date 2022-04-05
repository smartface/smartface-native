import { IScreen } from './screen';

const Screen: IScreen = require(`./screen.${Device.deviceOS.toLowerCase()}`).default;
export default Screen;
