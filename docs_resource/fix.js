var fs = require("fs");

console.log('Start of Fix...');

// Read the SMF.json file.
try {
    var json = JSON.parse(fs.readFileSync('SMF.json', 'utf8'));
    // if came to here, then valid
  } catch(e) {
    // failed to parse
    console.log("SMF.JSON is not valid !!!");
    console.log('Error in SMF.JSON: ' + e);
    process.exit(1);
  }


//console.log(typeof json === 'object');

// Starts to iterate over the parent class.
iterateAllClassesRecursively(json);


// Save json to a file.
//var str = JSON.stringify(json, null, "\t");
var str = JSON.stringify(json, null, "\t");

fs.writeFileSync("SMF.json", str);


console.log('End of Fix...');


// Function to iterate all classes recursively in the API.
function iterateAllClassesRecursively(jsonObject) {
    var nameOfElement;
    for (var element in jsonObject) {
        nameOfElement = element.toString();
        
        if (typeof jsonObject[element]['!type'] === "undefined" && jsonObject[element]['!kind'] === "class") {
            jsonObject[element]['!type'] = "";
            console.log(nameOfElement);
        }
        
        if(nameOfElement.substring(0,1) !== '!')
        {
             iterateAllClassesRecursively(jsonObject[element]);
        }
    }
}