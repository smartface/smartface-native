import Path = require("./path");
import FileStream = require("./filestream");
import File = require("./file");

declare const _exports: {
  File: File,
  FileStream: FileStream,
  Path: typeof Path
};
export = _exports;