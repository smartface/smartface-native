require("salep");

salep.on("success", function(testCase) {
    // log("Case Success : [" + testCase.name + "].");
    // console.log("Case Success : [" + testCase.name + "].");
});
salep.on("fail", function(testCase) {
    log("Case Failed : [" + testCase.name + "]. Reason : " + testCase.reason);
    console.log("Case Failed : [" + testCase.name + "]. Reason : " + testCase.reason);

    // UnComment below after salep's testCase.parent.name bug is fixed
    // log("Case Failed : [" + testCase.name + "] in " + testCase.parent.name + ". Reason : " + testCase.reason);
    // console.log("Case Failed : [" + testCase.name + "] in " + testCase.parent.name + ". Reason : " + testCase.reason);
});
salep.on("skip", function(testCase) {
    log("Skipped Case [" + testCase.name + "].");
    console.log("Skipped Case [" + testCase.name + "].");

    // UnComment below after salep's testCase.parent.name bug is fixed
    // log("Skipped Case [" + testCase.name + "] in " + testCase.parent.name + ".");
    // console.log("Skipped Case [" + testCase.name + "] in " + testCase.parent.name + ".");
});

require("./application");
require("./device");
require("./net");
require("./io");
require("./ui");

var result = salep.getResults();
alert("Success: " + result.success + ", Fail: " + result.fail + ", Skip: " + result.skip + ", Total: " + result.total);