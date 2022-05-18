import { AbstractSystem } from './system';

const System: typeof AbstractSystem = require(`./system.${Device.deviceOS.toLowerCase()}`).default;
type System = AbstractSystem;

export default System;
