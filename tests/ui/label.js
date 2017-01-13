var expect  = require("chai").expect;
var assert  = require("chai").assert;

const Label = require("../../ui/label");

salep.test("sf-core/ui/label Unit Test", function() {
  this.case("[textColor] setter/getter.", function() {
    const Color = require('../../ui/color');
    var myLabel = new Label();
    assert.equal(0, Color.red(myLabel.textColor)  , "default red value must be 0.");
    assert.equal(0, Color.green(myLabel.textColor), "default green value must be 0.");
    assert.equal(0, Color.blue(myLabel.textColor) , "default blue value must be 0.");

    myLabel.textColor = Color.create(255, 0, 0); // red
    assert.equal(255, Color.red(myLabel.textColor)  , "assigned red value must be 255.");
    assert.equal(0  , Color.green(myLabel.textColor), "assigned green value must be 0.");
    assert.equal(0  , Color.blue(myLabel.textColor) , "assigned blue value must be 0.");
  });
  
  this.case("[textAlignment] setter/getter.", function() {
    var myLabel = new Label();
    const TextAlignment = require('../../ui/textalignment');
    
    myLabel.textAlignment = TextAlignment.MIDCENTER;
    assert.equal(TextAlignment.MIDCENTER, myLabel.textAlignment, "textAlignment must be TextAlignment.MIDCENTER");
    
    myLabel.textAlignment = TextAlignment.BOTTOMCENTER;
    assert.notEqual(TextAlignment.MIDCENTER, myLabel.textAlignment, "textAlignment must NOT be TextAlignment.MIDCENTER");
  });
  
  salep.skipNext(); // TODO: uncomment when text can be fetched.
  this.case("[text] setter/getter.", function() {
    var myLabel = new Label();
    assert.equal("Text", myLabel.text, "default value must be 'Text'");

    myLabel.text = "I am not Text";
    assert.equal("I am not Text", myLabel.text, "mismatching text value");
  });

  this.case("[showScrollBar] setter/getter.", function() {
    var myLabel = new Label();
    var defaultValue = myLabel.showScrollBar;
    myLabel.showScrollBar = false;
    
    assert.isTrue (defaultValue, "default value must be true");
    assert.isFalse(myLabel.showScrollBar, "showScrollBar must be false");
  });

  this.case("[multiLine] setter/getter.", function() {
    var myLabel = new Label();
    var defaultValue = myLabel.multiLine;
    myLabel.multiLine = false;
    
    assert.isTrue (defaultValue, "default value must be true");
    assert.isFalse(myLabel.multiLine, "multiLine must be false");
  });
  
  this.case("[font] setter/getter.", function() {
    const Font = require('../../ui/font');
    var myFont = Font.create("Arial", 16, Font.BOLD);

    var myLabel = new Label();
    myLabel.font = myFont;
    
    assert.equal(myFont, myLabel.font, "current font must be myFont");
    assert.notEqual(Font.create("Verdana", 16, Font.BOLD)  ,myLabel.font, "mismatching font name");
    assert.notEqual(Font.create("Arial"  , 12, Font.BOLD)  ,myLabel.font, "mismatching font size");
    assert.notEqual(Font.create("Arial"  , 16, Font.NORMAL),myLabel.font, "mismatching font style");
  });
  
  this.case("[htmlText] setter/getter with html value", function() {
    var value = "<a href='http://www.smartface.io'>Smartface Rocks!</a>";

    var label = new Label();
    label.htmlText = value;
    assert.equal(value, label.htmlText);
  });

  this.case("[htmlText] setter/getter with normal text", function() {
    var value = "Hello";

    var label = new Label();
    label.htmlText = value;
    assert.equal(value, label.htmlText);
  });

  this.case("[htmlText] should change 'text' property", function() {
    var label = new Label();
    var defaultHtmlTextValue = label.htmlText;
    var textValue = "Text value";
    var htmlTextValue = "Html text value";

    assert.equal("", defaultHtmlTextValue, "default HtmlTextValue must be an empty string");

    label.text = textValue;
    assert.equal(textValue, label.text);

    label.htmlText = htmlTextValue;
    assert.equal(htmlTextValue, label.text);
  });
});