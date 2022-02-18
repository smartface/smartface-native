import StatusBarBase from './statusbar';

export const StatusBar: typeof StatusBarBase = require(`./statusbar.${Device.deviceOS.toLowerCase()}`).default;
