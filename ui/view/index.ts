// if (Device.deviceOS === "iOS") {
//     module.exports = require('./view-iOS');
// } else if (Device.deviceOS === "Android") {
import { IView } from "./iview";

//@ts-ignore
import View from `./view-${Device.deviceOS}`;
// }

export default View as IView;
