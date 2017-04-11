var expect  = require("chai").expect;
var assert  = require("chai").assert;

const ActivityIndicator = require('sf-core/ui/activityindicator');
const Color = require('sf-core/ui/color');

salep.test("sf-core/ui/activityindicator Unit Test", function () {
    this.case("[color] setter/getter.", function () {
        var myActivityIndicator = new ActivityIndicator();
        myActivityIndicator.color = Color.BLUE;

        assert.equal(myActivityIndicator.color, Color.BLUE, "color must be equal to Color.BLUE");
        assert.notEqual(myActivityIndicator.color, Color.RED, "color is not equal to Color.RED");
    });

    this.case("[color] setter/getter.", function () {
        var myActivityIndicator = new ActivityIndicator();
        myActivityIndicator.color = Color.create(0, 255, 0); // RGB

        assert.equal(myActivityIndicator.color, Color.create("#00FF00"), "color must be equal to Color.create('#00FF00')");
        assert.equal(myActivityIndicator.color, Color.GREEN, "color must be equal to Color.GREEN");
        assert.notEqual(myActivityIndicator.color, Color.RED, "color is not equal to Color.RED");
    });

    this.case("[color] setter/getter.", function () {
        var myActivityIndicator = new ActivityIndicator();
        myActivityIndicator.color = Color.create(255, 0, 255, 0); // ARGB

        assert.equal(myActivityIndicator.color, Color.create("#FF00FF00"), "color must be equal to Color.create('#FF00FF00')");
        assert.notEqual(myActivityIndicator.color, Color.GREEN, "color is not equal to Color.GREEN");
    });
});