
function DataPicker(params) {

    this.nativeObject = null;
    this.items = null;
    this.onMultipleChoiceItems = function(index, selected){};
    this.onSingleChoiceItem = function(index){};
    this.title = null;
    this.titleColor = null;
    this.titleFont = null;
    this.enableMultiplePick = null;
    this.cancelable = null;
    this.selectedItems = null;
    this.backgroundColor = null;
    this.negativeButtonColor = null;
    this.negativeButtonFont = null;
    this.negativeButtonText = null;
    this.positiveButtonColor = null;
    this.positiveButtonFont = null;
    this.positiveButtonText = null;
    this.show = function(ok, cancel) {};
    
    this.toString = function() {
        return "DataPicker";
    };
    
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = DataPicker;