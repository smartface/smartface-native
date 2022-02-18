import { AbstractView } from "./view";

const View: typeof AbstractView = require(`./view.${Device.deviceOS.toLowerCase()}`).default;

export default View;
