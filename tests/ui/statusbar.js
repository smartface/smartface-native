var assert = require("chai").assert;

const Page = require("../../ui/page");
const Color = require("../../ui/color");

const Creator = {page: new Page()};

salep.test("sf-core/ui/page.statusBar Unit Test", function () {
    this.case("StatusBar visible property", function () {
        Creator.page.statusBar.visible = true;
        assert.isTrue(Creator.page.statusBar.visible, "visible must be equal to true.");
    });
    
    this.case("StatusBar height property.", function () { // read-only
        Creator.page.statusBar.android.height = -10;
        assert.notEqual(Creator.page.statusBar.height, -10, "height cannot be equal to -10.");
    });
    
    this.case("StatusBar color property", function () {
        Creator.page.statusBar.android.color = Color.BLUE;
        assert.equal(Creator.page.statusBar.android.color, Color.BLUE, "color must be equal to Color.BLUE.");
    });
});