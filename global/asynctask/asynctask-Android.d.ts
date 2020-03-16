import AsyncTask = require(".");

export =  AsyncTaskAndroid
declare class AsyncTaskAndroid extends AsyncTask {
  getStatus: () => AsyncTask.Android.Status;
}
