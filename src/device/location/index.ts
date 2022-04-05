import { ILocation } from './location';

const Location: ILocation = require(`./location.${Device.deviceOS.toLowerCase()}`).default;
type Location = ILocation;

export default Location;
