import { ApplicationBase } from "./application";

const Application: typeof ApplicationBase = require(`./application.${Device.deviceOS.toLowerCase()}`).default;
type Application = ApplicationBase;

export default Application;
