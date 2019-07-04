function SelectablePicker(params) {
    this.onSelectedItems = function(index, selected) {};
    this.show = function(done, cancel) {};

    this.toString = function() {
        return "SelectablePicker";
    };
}

module.exports = SelectablePicker;