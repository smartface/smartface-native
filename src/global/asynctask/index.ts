import { AbstractAsyncTask } from './asynctask';

const AsyncTask: typeof AbstractAsyncTask = require(`./asynctask.${Device.deviceOS.toLowerCase()}`).default;
type AsyncTask = AbstractAsyncTask;

export default AsyncTask;
