var expect = require("chai").expect;
var assert = require("chai").assert;

const View = require("../../ui/view");
const Color = require("../../ui/color");
const FlexLayout = require("../../ui/flexlayout");

salep.test("sf-core/ui/webview Unit Test", function() {
    var testObject = null;
    
    this.beforeEach(function(){
        testObject = new View();
    });
    
    this.afterEach(function(){
        testObject = null;
    });

    this.case("[alignSelf] getter/setter.", function() {
        assert.doesNotThrow(function(){testObject.alignSelf = FlexLayout.AlignSelf.CENTER;}, Error);
        assert.equal(testObject.alignSelf, FlexLayout.AlignSelf.CENTER, 'alignSelf must be FlexLayout.AlignSelf.CENTER');
    });
    
    this.case("[alpha] getter/setter.", function() {
        assert.doesNotThrow(function(){testObject.alpha = 0.5;}, Error);
        assert.equal(testObject.alpha, 0.5, 'alpha must be 0.5');
    });
    
    this.case("[aspectRatio] getter/setter.", function() {
    	assert.doesNotThrow(function(){testObject.aspectRatio = 2;}, Error);
    	assert.equal(testObject.aspectRatio, 2, "aspectRatio must be 2");
    });
    
    this.case("[backgroundColor] getter/setter.", function() {
    	assert.doesNotThrow(function(){testObject.backgroundColor = Color.RED;}, Error);
    	assert.equal(testObject.backgroundColor, Color.RED, "backgroundColor must be Color.RED");
    });
    
    this.case("[borderColor] getter/setter.", function() {
    	assert.doesNotThrow(function(){testObject.borderColor = Color.RED;}, Error);
    	assert.equal(testObject.borderColor, Color.RED, "borderColor must be Color.RED");
    });
    
    this.case("[borderRadius] getter/setter.", function() {
    	assert.doesNotThrow(function(){testObject.borderRadius = 10;}, Error);
    	assert.equal(testObject.borderRadius, 10, "borderRadius must be 10");
    });
    
    this.case("[borderWidth] getter/setter.", function() {
    	assert.doesNotThrow(function(){testObject.borderWidth = 10;}, Error);
    	assert.equal(testObject.borderWidth, 10, "borderWidth must be 10");
    });
    
    this.case("[bottom] getter/setter.", function() {
    	assert.doesNotThrow(function(){testObject.bottom = 10;}, Error);
    	assert.equal(testObject.bottom, 10, "bottom must be 10");
    });
    
    this.case("[ios.clipsToBounds] getter/setter.", function() {
    	assert.doesNotThrow(function(){testObject.ios.clipsToBounds = true;}, Error);
    	assert.isTrue(testObject.ios.clipsToBounds, "ios.clipsToBounds must be true");
    });
    
    this.case("[android.elevation] getter/setter.", function() {
    	assert.doesNotThrow(function(){testObject.android.elevation = 10;}, Error);
    	assert.equal(testObject.android.elevation, 10, "elevation must be 10");
    });
    
    this.case("[flexBasis] getter/setter.", function() {
    	assert.doesNotThrow(function(){testObject.flexBasis = 10;}, Error);
    	assert.equal(testObject.flexBasis, 10, "flexBasis must be 10");
    });
    
    this.case("[flexGrow] getter/setter.", function() {
    	assert.doesNotThrow(function(){testObject.flexGrow = 10;}, Error);
    	assert.equal(testObject.flexGrow, 10, "flexGrow must be 10");
    });
    
    this.case("[flexShrink] getter/setter.", function() {
    	assert.doesNotThrow(function(){testObject.flexShrink = 10;}, Error);
    	assert.equal(testObject.flexShrink, 10, "flexShrink must be 10");
    });
    
    this.case("[height] getter/setter.", function() {
    	assert.doesNotThrow(function(){testObject.height = 10;}, Error);
    	assert.equal(testObject.height, 10, "height must be 10");
    });
    
    this.case("[id] getter/setter.", function() {
    	assert.doesNotThrow(function(){testObject.id = 10;}, Error);
    	assert.equal(testObject.id, 10, "id must be 10");
    });
    
    this.case("[left] getter/setter.", function() {
    	assert.doesNotThrow(function(){testObject.left = 10;}, Error);
    	assert.equal(testObject.left, 10, "left must be 10");
    });
    
    this.case("[margin] getter/setter.", function() {
    	assert.doesNotThrow(function(){testObject.margin = 10;}, Error);
    	assert.equal(testObject.margin, 10, "margin must be 10");
    });
    
    this.case("[marginBottom] getter/setter.", function() {
    	assert.doesNotThrow(function(){testObject.marginBottom = 10;}, Error);
    	assert.equal(testObject.marginBottom, 10, "marginBottom must be 10");
    });
    
    this.case("[marginLeft] getter/setter.", function() {
    	assert.doesNotThrow(function(){testObject.marginLeft = 10;}, Error);
    	assert.equal(testObject.marginLeft, 10, "marginLeft must be 10");
    });
    
    this.case("[marginRight] getter/setter.", function() {
    	assert.doesNotThrow(function(){testObject.marginRight = 10;}, Error);
    	assert.equal(testObject.marginRight, 10, "marginRight must be 10");
    });
    
    this.case("[marginTop] getter/setter.", function() {
    	assert.doesNotThrow(function(){testObject.marginTop = 10;}, Error);
    	assert.equal(testObject.marginTop, 10, "marginTop must be 10");
    });
    
    this.case("[ios.masksToBounds] getter/setter.", function() {
    	assert.doesNotThrow(function(){testObject.ios.masksToBounds = true;}, Error);
    	assert.isTrue(testObject.ios.masksToBounds, "ios.masksToBounds must be true");
    });
    
    this.case("[maxHeight] getter/setter.", function() {
    	assert.doesNotThrow(function(){testObject.maxHeight = 10;}, Error);
    	assert.equal(testObject.maxHeight, 10, "maxHeight must be 10");
    });
    
    this.case("[maxWidth] getter/setter.", function() {
    	assert.doesNotThrow(function(){testObject.maxWidth = 10;}, Error);
    	assert.equal(testObject.maxWidth, 10, "maxWidth must be 10");
    });
    
    this.case("[minHeight] getter/setter.", function() {
    	assert.doesNotThrow(function(){testObject.minHeight = 10;}, Error);
    	assert.equal(testObject.minHeight, 10, "minHeight must be 10");
    });
    
    this.case("[minWidth] getter/setter.", function() {
    	assert.doesNotThrow(function(){testObject.minWidth = 10;}, Error);
    	assert.equal(testObject.minWidth, 10, "minWidth must be 10");
    });
    
    this.case("[padding] getter/setter.", function() {
    	assert.doesNotThrow(function(){testObject.padding = 10;}, Error);
    	assert.equal(testObject.padding, 10, "padding must be 10");
    });
    
    this.case("[paddingBottom] getter/setter.", function() {
    	assert.doesNotThrow(function(){testObject.paddingBottom = 10;}, Error);
    	assert.equal(testObject.paddingBottom, 10, "paddingBottom must be 10");
    });
    
    this.case("[paddingLeft] getter/setter.", function() {
    	assert.doesNotThrow(function(){testObject.paddingLeft = 10;}, Error);
    	assert.equal(testObject.paddingLeft, 10, "paddingLeft must be 10");
    });
    
    this.case("[paddingRight] getter/setter.", function() {
    	assert.doesNotThrow(function(){testObject.paddingRight = 10;}, Error);
    	assert.equal(testObject.paddingRight, 10, "paddingRight must be 10");
    });
    
    this.case("[paddingTop] getter/setter.", function() {
    	assert.doesNotThrow(function(){testObject.paddingTop = 10;}, Error);
    	assert.equal(testObject.paddingTop, 10, "paddingTop must be 10");
    });
    
    this.case("[positionType] getter/setter.", function() {
    	assert.doesNotThrow(function(){testObject.positionType = FlexLayout.PositionType.ABSOLUTE;}, Error);
    	assert.equal(testObject.positionType, FlexLayout.PositionType.ABSOLUTE, "positionType must be FlexLayout.PositionType.ABSOLUTE");
    });
    
    this.case("[right] getter/setter.", function() {
    	assert.doesNotThrow(function(){testObject.right = 10;}, Error);
    	assert.equal(testObject.right, 10, "right must be 10");
    });
    
    this.case("[rotation] getter/setter.", function() {
    	assert.doesNotThrow(function(){testObject.rotation = 10;}, Error);
    	assert.equal(testObject.rotation, 10, "rotation must be 10");
    });
    
    this.case("[rotationX] getter/setter.", function() {
    	assert.doesNotThrow(function(){testObject.rotationX = 10;}, Error);
    	assert.equal(testObject.rotationX, 10, "rotationX must be 10");
    });
    
    this.case("[rotationY] getter/setter.", function() {
    	assert.doesNotThrow(function(){testObject.rotationY = 10;}, Error);
    	assert.equal(testObject.rotationY, 10, "rotationY must be 10");
    });
    
    this.case("[top] getter/setter.", function() {
    	assert.doesNotThrow(function(){testObject.top = 10;}, Error);
    	assert.equal(testObject.top, 10, "top must be 10");
    });
    
    this.case("[touchEnabled] getter/setter.", function() {
    	assert.doesNotThrow(function(){testObject.touchEnabled = true;}, Error);
    	assert.isTrue(testObject.touchEnabled, "touchEnabled must be true");
    });
    
    this.case("[visible] getter/setter.", function() {
    	assert.doesNotThrow(function(){testObject.visible = true;}, Error);
    	assert.isTrue(testObject.visible, "visible must be true");
    });
    
    this.case("[width] getter/setter.", function() {
    	assert.doesNotThrow(function(){testObject.width = 10;}, Error);
    	assert.equal(testObject.width, 10, "width must be 10");
    });
    
    this.case("[bringToFront] function.", function() {
    	assert.doesNotThrow(function(){testObject.bringToFront();}, Error);
    });
    
    this.case("[getParent] getter/setter.", function() {
    	assert.isNull(testObject.getParent(), Error);
    });
});