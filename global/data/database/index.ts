import { BaseDatabase } from './database';

const Database: typeof BaseDatabase = require(`./database.${Device.deviceOS.toLowerCase()}`).default;
type Database = BaseDatabase;

export default Database;
