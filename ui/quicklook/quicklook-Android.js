//Generated for handling ios view

function QuickLook (params) {
    var self = this;
   
    self.nativeObject = null;
    self.document = null;
    self.barColor = null;
    self.itemColor = null;
    self.visible = null;
    self.document = null;
    self.style = {};
    self.statusBar = {};
    self.show = function(Page){};

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
};

module.exports = QuickLook;