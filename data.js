const Application = require("sf-core/application");
const Page = require("sf-core/ui/page");
const extend = require("js-base/core/extend");
const AlertView = require('sf-core/ui/alertview');
const CircularProgressBar = require("sf-extension-utils/lib/art/CircularProgressBar");


var Page1 = extend(Page)(
    function(_super) {
        _super(this, {
            onShow: function(params) {
                Application.statusBar.visible = false;
                this.headerBar.visible = false; //For Android
            }
        });


        let circularProgressBar = new CircularProgressBar({
            width: 130,
            trailColor: "rgb(247,201,71)",
            color: "rgb(55,85,147)",
            webView: this.wvCircularAnimation
        });

        // Triggers the render method whenever the value is set
        circularProgressBar.value = 70;

    }
);
module.exports = Page1;
