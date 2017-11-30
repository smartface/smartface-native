var expect = require("chai").expect;
var assert = require("chai").assert;

const Button = require('../../ui/button');
const Color = require('../../ui/color');
const Font = require('../../ui/font');
const Image = require('../../ui/image');
const TextAlignment = require('../../ui/textalignment');

salep.test("sf-core/ui/label Unit Test", function() {
    var testObject = null;

    this.beforeEach(function() {
        testObject = new Button();
    });

    this.afterEach(function() {
        testObject = null;
    });

    this.case("[backgroundColor] getter/setter.", function() {
        assert.doesNotThrow(function() { testObject.backgroundColor = Color.RED; }, Error);
        assert.equal(testObject.backgroundColor, Color.RED, "backgroundColor must be Color.RED");
    });

    this.case("[backgroundImage] getter/setter.", function() {
        var myImage = Image.createFromFile("images://smartface.png");
        assert.doesNotThrow(function() { testObject.backgroundImage = myImage; }, Error);
        assert.equal(testObject.backgroundImage, myImage, "backgroundImage must be myImage");
    });

    this.case("[enabled] getter/setter.", function() {
        assert.doesNotThrow(function() { testObject.enabled = false; }, Error);
        assert.isFalse(testObject.enabled, "enabled must be false");
    });

    this.case("[font] getter/setter.", function() {
        var myFont = Font.create(Font.DEFAUL, 17, Font.NORMAL);
        assert.doesNotThrow(function() { testObject.font = myFont; }, Error);
        assert.equal(testObject.font, myFont, "font must be myFont");
    });

    this.case("[text] getter/setter.", function() {
        assert.doesNotThrow(function() { testObject.text = "Smartface"; }, Error);
        assert.equal(testObject.text, "Smartface", "text must be 'Smartface'");
    });

    this.case("[textAlignment] getter/setter.", function() {
        assert.doesNotThrow(function() { testObject.textAlignment = TextAlignment.BOTTOMCENTER; }, Error);
        assert.equal(testObject.textAlignment, TextAlignment.BOTTOMCENTER, "textAlignment must be TextAlignment.BOTTOMCENTER");
    });

    this.case("[textColor] getter/setter.", function() {
        assert.doesNotThrow(function() { testObject.textColor = Color.BLACK; }, Error);
        assert.equal(testObject.textColor, Color.BLACK, "textColor must be Color.BLACK");
    });
    
    this.case("[withheight] getter/setter", function() {
        assert.doesNotThrow(function() { testObject.withheight = 70 }, Error);
        assert.equal(testObject.withheight, 70, "withheight must be equal to 70");
    });
    
     this.case("[AND-3034] [height] getter/setter", function() {
        assert.doesNotThrow(function() { testObject.height = 70 }, Error);
        assert.equal(testObject.height, 70, "height must be equal to 70");
    });
});
