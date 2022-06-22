import { ISwipeView } from './swipeview';

const SwipeView: ConstructorOf<ISwipeView, Partial<ISwipeView>> = require(`./swipeview.${Device.deviceOS.toLowerCase()}`).default;
type SwipeView = ISwipeView;
export default SwipeView;
