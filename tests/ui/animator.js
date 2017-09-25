var expect = require("chai").expect;
var assert = require("chai").assert;

const Animator = require("../../ui/animator");
const FlexLayout = require("../../ui/flexlayout");

salep.test("sf-core/ui/animator Unit Test", function () {
    
    this.case("[animate] getter/setter.", function() {
        var myFlexLayout = new FlexLayout();
    	assert.doesNotThrow( function(){
    	    Animator.animate(myFlexLayout, 5000, function() {
                myFlexLayout.left = 0;
                myFlexLayout.right = 0;
            }).then(2500, function() {
                myFlexLayout.left = 10;
                myFlexLayout.right = 10;
            }).complete(function() {
                myFlexLayout.left = 0;
                myFlexLayout.right = 0;
            });
    	}, Error);
    });
    
});