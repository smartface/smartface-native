var assert = require("chai").assert;

const MenuItem = require("../../ui/menuitem");
const Color         = require("../../ui/color");

const Creator = {menuItem: new MenuItem()};

salep.test("MenuItem Unit Test", function () {
    this.case("MenuItem title property", function () {
        Creator.menuItem.title = "my title";
        assert.equal(Creator.menuItem.title, "my title", "visible must be equal to 'my title'.");
    });
    
    this.case("MenuItem titleColor property", function () {
        Creator.menuItem.titleColor = Color.YELLOW;
        assert.equal(Creator.menuItem.titleColor.nativeObject, Color.YELLOW.nativeObject, "titleColor must be equal to Color.YELLOW.");
    });
});
