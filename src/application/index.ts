import { ApplicationBase } from './application';

const Application: ApplicationBase = require(`./application.${Device.deviceOS.toLowerCase()}`).default;

export default Application;
