import Blob = require("./blob");
import Notifications = require("./notifications");
import Timer = require("./timer");
import Share = require("./share");
import Data = require("./data");
import SecureData = require("./securedata");
import SpeechRecognizer = require("./speechrecognizer");
import AsyncTask = require("./asynctask");

declare const _exports: {
  Blob: Blob,
  Notifications: Notifications,
  Timer: Timer,
  Share: typeof Share,
  Data: typeof Data,
  SecureData: SecureData,
  SpeechRecognizer: typeof SpeechRecognizer,
  AsyncTask: AsyncTask
};

export = _exports;
