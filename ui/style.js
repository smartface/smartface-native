/**
 * @class Style
 * 
 * This class wraps common UI styling options. Instances of Style
 * class can be set to style property of any UI object. For same
 * style object different UI objects can behave different. 
 * 
 *      @example
 *      var label = new Label({
 *          width: "80%",
 *          height: "10%"
 *      });
 *      label.style = new Style({
 *          borderColor: "#000000",
 *          borderWidth: 2
 *      });
 */
function Style(params) {
    /**
     * Sets/gets border color of bounded view.
     * 
     * @property {Color} borderColor Border color
     */
    this.borderColor = "#000000";

    /**
     * Sets/gets border thickness of bounded view. Accepts unsigned
     * numbers, 0 means no border.
     * 
     * @property {Number} borderWidth Border width
     */
    this.borderWidth = 0;
}

module.exports = Style;