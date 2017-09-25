var assert = require("chai").assert;
const Page = require("../../ui/page");

const Creator = {page: new Page()};

salep.test("HeaderBar Unit Test", function () {
    this.case("HeaderBar height property", function () {
        Creator.page.headerBar.height = -10;
        assert.notEqual(Creator.page.headerBar.height, -10, "height cannot be equal to -10.");
    });
    
    this.case("HeaderBar leftItemEnabled property", function () {
        Creator.page.headerBar.leftItemEnabled = false;
        assert.isFalse(Creator.page.headerBar.leftItemEnabled, "leftItemEnabled must be equal to false.");
    });
    
    this.case("HeaderBar logoEnabled property", function () {
        Creator.page.headerBar.android.logoEnabled = true;
        assert.isTrue(Creator.page.headerBar.android.logoEnabled, "logoEnabled must be equal to true.");
    });
    
    this.case("HeaderBar subtitle property", function () {
        Creator.page.headerBar.android.subtitle = "my subtitle";
        assert.equal(Creator.page.headerBar.android.subtitle, "my subtitle", "subtitle must be equal to 'my subtitle'.");
    });
    
    this.case("HeaderBar title property", function () {
        Creator.page.headerBar.title = "my title";
        assert.equal(Creator.page.headerBar.title,"my title", "title must be equal to 'my title'.");
    });
    
    this.case("HeaderBar visible property", function () {
        Creator.page.headerBar.visible = true;
        assert.isTrue(Creator.page.headerBar.visible, "visible must be equal to true.");
    });
});
