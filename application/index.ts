import ApplicationBase from './application';

export const Application: typeof ApplicationBase = require(`./application.${Device.deviceOS.toLowerCase()}`).default;
