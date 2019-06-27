function SelectablePicker(params) {

    this.nativeObject = null;
    this.items = null;
    this.onSelectedItems = function(index, selected) {};
    this.title = null;
    this.titleColor = null;
    this.titleFont = null;
    this.enableMultiplePick = null;
    this.cancelable = null;
    this.checkedItems = null;
    this.backgroundColor = null;
    this.cancelButtonColor = null;
    this.cancelButtonFont = null;
    this.cancelButtonText = null;
    this.doneButtonColor = null;
    this.doneButtonFont = null;
    this.doneButtonText = null;
    this.show = function(done, cancel) {};

    this.toString = function() {
        return "SelectablePicker";
    };

    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = SelectablePicker;