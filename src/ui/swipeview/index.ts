import { AbstractSwipeView } from './swipeview';

const SwipeView: typeof AbstractSwipeView = require(`./swipeview.${Device.deviceOS.toLowerCase()}`).default;
type SwipeView = AbstractSwipeView;
export default SwipeView;
