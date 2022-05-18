import { ConstructorOf } from '../../core/constructorof';
import { IBottomTabBarController } from './bottomtabbarcontroller';

const BottomTabbarController: ConstructorOf<IBottomTabBarController, Partial<IBottomTabBarController>> = require(`./bottomtabbarcontroller.${Device.deviceOS.toLowerCase()}`).default;
type BottomTabbarController = IBottomTabBarController;
export default BottomTabbarController;
