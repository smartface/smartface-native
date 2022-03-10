import { NavigationBarBase } from './navigationbar';

const NavigationBar: NavigationBarBase = require(`./navigationbar.${Device.deviceOS.toLowerCase()}`).default;
type NavigationBar = NavigationBarBase;
export default NavigationBar;
