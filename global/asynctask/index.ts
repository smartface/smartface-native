import { AsyncTaskBase } from './asynctask';

const AsyncTask: typeof AsyncTaskBase = require(`./asynctask.${Device.deviceOS.toLowerCase()}`).default;
type AsyncTask = AsyncTaskBase;

export default AsyncTask;
