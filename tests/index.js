require("salep");

salep.on("success", function(testCase) {
});
salep.on("fail", function(testCase) {
    log("Case [" + testCase.name + "]...failed: " + testCase.reason);
    console.log("Case [" + testCase.name + "]...failed: " + testCase.reason);
});

require("./ui");

var result = salep.getResults();
alert("Success: " + result.success + ", Fail: " + result.fail + ", Skip: " + result.skip + ", Total: " + result.total);