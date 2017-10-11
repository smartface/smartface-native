var assert = require("chai").assert;

const HeaderBarItem = require("../../ui/headerbaritem");
const Color         = require("../../ui/color");

const Creator = {headerBarItem: new HeaderBarItem()};

salep.test("HeaderBarItem Unit Test", function () {
    this.case("HeaderBarItem title property", function () {
        Creator.headerBarItem.title = "my title";
        assert.equal(Creator.headerBarItem.title, "my title", "visible must be equal to 'my title'.");
    });
    
    this.case("HeaderBarItem enabled property", function () {
        Creator.headerBarItem.enabled = false;
        assert.isFalse(Creator.headerBarItem.enabled, "enabled cannot be equal to false.");
    });
    
    this.case("HeaderBarItem color property", function () {
        Creator.headerBarItem.color = Color.YELLOW;
        assert.equal(Creator.headerBarItem.color.nativeObject, Color.YELLOW.nativeObject, "color must be equal to Color.YELLOW.");
    });
});
