import { ConstructorOf } from '../../core/constructorof';
import { IBottomTabBar } from './bottomtabbar';

const BottomTabBar: ConstructorOf<IBottomTabBar, Partial<IBottomTabBar>> = require(`./bottomtabbar.${Device.deviceOS.toLowerCase()}`).default;
type BottomTabBar = IBottomTabBar;

export default BottomTabBar;
