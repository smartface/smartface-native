const StatusBarStyle = require('nf-core/ui/statusbarstyle');
const Color = require("nf-core/ui/color");

function QuickLook(params) {
        
        /**
         * Gets/sets barColor on QuickLook.
         *
         *     @example
         *     const QuickLook = require('nf-core/ui/quicklook');
         *     var quicklook = new QuickLook();
         *     quicklook.document = ["images://.png","assests://.pdf"];
         *
         * @property {[String]} document
         * @since 0.1
         */
        this.document = [];
        
        /**
         * Gets/sets barColor on QuickLook.
         *
         *     @example
         *     const QuickLook = require('nf-core/ui/quicklook');
         *     var quicklook = new QuickLook();
         *     quicklook.barColor = UI.Color.BLACK;
         *
         * @property {UI.Color} barColor
         * @since 0.1
         */
        this.barColor = false;
        
        /**
         * Gets/sets itemColor on QuickLook.
         *
         *     @example
         *     const QuickLook = require('nf-core/ui/quicklook');
         *     var quicklook = new QuickLook();
         *     quicklook.itemColor = UI.Color.BLACK;
         *
         * @property {UI.Color} itemColor
         * @since 0.1
         */
        this.itemColor = UI.Color.BLACK;
    
        /**
         * Gets/sets statusBar visible status on QuickLook.
         *
         *     @example
         *     const QuickLook = require('nf-core/ui/quicklook');
         *     var quicklook = new QuickLook();
         *     quicklook.statusBar.visible = false;
         *
         * @property {Boolean} statusBar.visible
         * @since 0.1
         */
        this.statusBar.visible = false;
        
        /**
         * Gets/sets statusBar style on QuickLook.
         *
         *     @example
         *     const QuickLook = require('nf-core/ui/quicklook');
         *     var quicklook = new QuickLook();
         *     quicklook.statusBar.style = false;
         *
         * @property {UI.StatusBarStyle} statusBar.style
         * @since 0.1
         */
        this.statusBar.style = UI.StatusBarStyle.DEFAULT;
        
        
        this.show = function(Page) {};
}

module.exports = QuickLook;