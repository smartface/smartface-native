import { DatabaseBase } from './database';

const Database: typeof DatabaseBase = require(`./database.${Device.deviceOS.toLowerCase()}`).default;
type Database = DatabaseBase;

export default Database;
