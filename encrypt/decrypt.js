const Des3 = require("./3des");
const walk = require("walk");
const path = require("path");
const fs = require("fs");

var isEncryptedContent = fs.readFileSync(__dirname + "/isencrypted.js");
if (isEncryptedContent.toString() === "Hello World!") {
  console.log("Scripts are already decrypted");
} else {
  var des3 = new Des3();
  var walker = walk.walk("./", {
    filters: ["node_modules", "tests", "docs_resource", "dist", ".git"]
  });

  var ignoreFiles = ["encrypt.js", "decrypt.js", "3des.js"];
  
  walker.on("file", function (root, fileStats, next) {
    if (path.extname(fileStats.name) === ".js" && ignoreFiles.indexOf(fileStats.name) === -1) {
      des3.decryptFileWith3DES_ECB(path.join(root, fileStats.name),
          "RW11U21mTmYyMDE3USslLQ==",
          path.join(root, fileStats.name));
    }
    next();
  });

  walker.on("errors", function (root, nodeStatsArray, next) {
    next();
  });

  walker.on("end", function () {
    console.log("all done");
  });
}