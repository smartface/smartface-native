//Generated for handling ios view

function QuickLook (params) {

    this.nativeObject = null;
    this.document = null;
    this.barColor = null;
    this.itemColor = null;
    this.visible = null;
    this.document = null;
    this.style = {};
    this.statusBar = {};
    this.toString = function(){
        return "QuickLook";  
    };
    
    this.show = function(Page){};

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
};

module.exports = QuickLook;