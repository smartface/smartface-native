require("salep");
salep.on("success", function(testCase) {
    console.log("Case [" + testCase.name + "]...succeeded"); 
});
salep.on("fail", function(testCase) {
    console.log("Case [" + testCase.name + "]...failed: " + testCase.reason); 
});

salep.run();

require("./ui");

var result = salep.stop();
alert(JSON.stringify(result, null, 2));
