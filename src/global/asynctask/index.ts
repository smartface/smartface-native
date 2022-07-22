import { IAsyncTask } from './asynctask';

const AsyncTask: ConstructorOf<IAsyncTask, Partial<IAsyncTask>> = require(`./asynctask.${Device.deviceOS.toLowerCase()}`).default;
type AsyncTask = IAsyncTask;

export default AsyncTask;
