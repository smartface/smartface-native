var expect  = require("chai").expect;
var assert  = require("chai").assert;

const Label = require("../scripts/lib/smf-ui-label");

function getNewLabel(){
  return new Label({
  	fillColor: "#00A1F1",
  	fontColor: "#FFFFFFFF",
  	visible: true,
  	touchEnabled: true,
  	text: "Hi there!",
  	onTouch: function() {
  		alert("Hi!");
  	},
  });
}

//label.setPosition(-1, 300, 0, 0);


describe("SF.UI.LABEL Tester", function() {
  /*describe("Unit Test", function() {
    it("property: attributedText", function() {
      var label = getNewLabel();
      label.attributedText = "Test Text";
      assert.equal(label.attributedText,"Test Text");
    });
    it("property: alpha", function() {
      var label = getNewLabel();
      label.alpha = 0.755;
      assert.equal(label.alpha,0.755);
    });
    it("property: backgroundTransparent", function() {
      var label = getNewLabel();
      label.backgroundTransparent = true;
      assert.equal(label.backgroundTransparent,true);
    });
    it("property: text", function() {
      var label = getNewLabel();
      label.text = "Unit Test";
      assert.equal(label.text,"Unit Test");
    });
    it("property: fillColor", function() {
      var label = getNewLabel();
      label.fillColor = "red";
      assert.equal(label.fillColor,0xFFFF0000);
    });
    it("property: fontColor", function() {
      var label = getNewLabel();
      label.fontColor = "blue";
      assert.equal(label.fontColor,0xFF0000FF);
    });
    it("property: multipleLine", function() {
      var label = getNewLabel();
      label.multipleLine = true;
      // for mock TestView must be +25 chars to line count 1+
      label.text = "qwertyuiopasdfghjklzxcvbnm"
      assert.equal(label.multipleLine,true);
    });
    it("property: detectURLsInString", function() {
      var label = getNewLabel();
      label.detectURLsInString = true;
      assert.equal(label.detectURLsInString,true);
    });
    it("property: z", function() {
      var label = getNewLabel();
      label.z = 10;
      assert.equal(label.z,10);
    });
    it("property: visible", function() {
      var label = getNewLabel();
      label.visible = true;
      assert.equal(label.visible,true);
    });
  });*/
  
  describe("Coverage Test", function() {
    var label = getNewLabel();
    label.addGesture();
    label.removeGesture();
    label.focus()
    label.animate();
    label.clone();
    label.gestures;
    label.textAlignment = 1;
    label.borderColor = 0;
    label.strikeThrough = false;
    label.borderWidth = -1;
    label.autoSize = true;
    label.horizontalGap = 10;
    label.showScrollBar = true;
    label.adjustFontSizeToFit = false;
    label.minimumFontSize = -1;
    label.roundedEdge = -1;
    label.font = null;
    label.top = 0;
    label.left = 0;
    label.width = 0;
    label.height = 0; 
    label.touchEnabled = true;
    label.name = "";
    label.onTouchEnded = null;
    //label.onTouch = null;
    label.setPosition(10,11,12,13);
  });
});