import { ILinking } from './linking';

const Linking: ILinking = require(`./linking.${Device.deviceOS.toLowerCase()}`).default;

export default Linking;
