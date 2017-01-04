var expect  = require("chai").expect;
var assert  = require("chai").assert;

const Label = require("../../../ui/label");

salep.test("sf-core/ui/label Unit Test", function() {
  this.case("[htmlText] setter/getter with html value", function() {
    var value = "<a href='http://www.smartface.io'>Smartface Rocks!</a>";

    var label = new Label();
    label.htmlText = value;
    assert.equal(label.htmlText, value);
  });

  this.case("[htmlText] setter/getter with normal text", function() {
    var value = "Hello";

    var label = new Label();
    label.htmlText = value;
    assert.equal(label.htmlText, value);
  });

  this.case("[htmlText] should change 'text' property", function() {
    var textValue = "Text value";
    var htmlTextValue = "Html text value";

    var label = new Label();
    label.text = textValue;
    assert.equal(label.text, textValue);

    label.htmlText = htmlTextValue;
    assert.equal(label.text, htmlTextValue);
  });

  // it("property: font", function() {
  //   var label = new Label();
  //   label.font = UI.Font.create("Arial", 16, UI.Font.BOLD);
  //   assert.equal(label.font, UI.Font.create("Arial", 16, UI.Font.BOLD));
  // });

  // it("property: multipleLine", function() {
  //   var label = getNewLabel();
  //   label.multipleLine = true;
  //   assert.equal(label.multipleLine,true);
  // });

  // it("property: text", function() {
  //   var label = getNewLabel();
  //   label.text = "Smartface Rocks!";
  //   assert.equal(label.text,"Smartface Rocks!");
  // });

  // it("property: textAlignment", function() {
  //   var label = getNewLabel();
  //   label.textAlignment = TextAlignment.TOPCENTER;
  //   assert.equal(label.textAlignment,TextAlignment.TOPCENTER);
  // });

  // it("property: color", function() {
  //   var label = getNewLabel();
  //   label.color = UI.Color.BLACK;
  //   assert.equal(label.color,UI.Color.BLACK);
  // });

  // it("property: showScrollBar", function() {
  //   var label = getNewLabel();
  //   label.showScrollBar = true;
  //   assert.equal(label.showScrollBar, true);
  // });

  // it("property: alpha", function() {
  //   var label = getNewLabel();
  //   label.alpha = 0.755;
  //   assert.equal(label.alpha,0.755);
  // });

  // it("property: backgroundColor", function() {
  //   var label = getNewLabel();
  //   label.backgroundColor = "#FFFFFFFF";
  //   assert.equal(label.backgroundColor,true);
  // });

  // it("property: height", function() {
  //   var label = getNewLabel();
  //   label.height = "10%";
  //   assert.equal(label.height,"10%");
  // });

  // it("property: id", function() {
  //   var label = getNewLabel();
  //   label.id = 1125813;
  //   assert.equal(label.id,1125813);
  // });

  // it("property: left", function() {
  //   var label = getNewLabel();
  //   label.left = 40;
  //   assert.equal(label.left,40);
  // });

  // it("property: top", function() {
  //   var label = getNewLabel();
  //   label.top = "11%";
  //   assert.equal(label.top,"11%");
  // });

  // it("property: visible", function() {
  //   var label = getNewLabel();
  //   label.visible = true;
  //   assert.equal(label.visible,true);
  // });

  // it("property: width", function() {
  //   var label = getNewLabel();
  //   label.width = 100;
  //   assert.equal(label.width, 100);
  // });

  // it("function: getPosition", function() {
  //   var label = getNewLabel();
  //   label.width = 100;
  //   label.top = "11%";
  //   label.left = 40;
  //   label.height = "10%";
  //   assert.equal(label.getPosition(), { width: 100, height: "10%", top: "11%", left: 40 });
  // });

  // it("function: setPosition", function() {
  //   var label = getNewLabel();
  //   label.setPosition({ width: 100, height: "10%", top: "11%", left: 40 });
  //   assert.equal(label.getPosition(), { width: 100, height: "10%", top: "11%", left: 40 });
  // });

  // it("property: touchEnabled", function() {
  //   var label = getNewLabel();
  //   label.touchEnabled = true;
  //   assert.equal(label.touchEnabled,true);
  // });

  // it("property: style", function() {
  //   var label = getNewLabel();
  //   var style = new Style({
  //         borderColor: "#FF000000",
  //         borderWidth: 2
  //   });
  //   label.style = style;
  //   assert.equal(label.style,style);
  //   style.borderWidth = 10;
  //   assert.equal(label.style.borderWidth,style.borderWidth);
  // });
});