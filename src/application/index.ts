import { IApplication } from './application';

const Application: IApplication = require(`./application.${Device.deviceOS.toLowerCase()}`).default;

export default Application;
