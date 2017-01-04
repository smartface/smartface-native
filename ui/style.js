/**
 * @class UI.Style
 * @since 0.1
 * 
 * This class wraps common UI styling options. Instances of Style
 * class can be set to style property of any UI object. For same
 * style object different UI objects can behave different. 
 * 
 *     @example
 *     const Label = require('sf-core/ui/label');
 *     var myLabel = new Label({
 *         width: "80%",
 *         height: "10%"
 *     });
 *     myLabel.text = "My label text";
 * 
 *     const Style = require('sf-core/ui/style');
 *     const Color = require('sf-core/ui/color');
 *     myLabel.style = new Style({
 *         borderColor: Color.create("#000000"),
 *         borderWidth: 2
 *     });
 */
function Style(params) {
    /**
     * Sets/gets border color of bounded view.
     * 
     * @property {Color} borderColor 
     * @since 0.1
     */
    var borderColor = "";
    Object.defineProperty(this, 'borderColor', {
        get: function() {
            return borderColor;
        },
        set: function(value) {
            borderColor = value;
            changeHandlers && changeHandlers.forEach(function(handler) {
                handler('borderColor', value);
            });
        }
    });

    /**
     * Sets/gets border thickness of bounded view. Accepts unsigned
     * numbers, 0 means no border.
     * 
     * @property {Number} borderWidth 
     * @since 0.1
     */
    var borderWidth = 0;
    Object.defineProperty(this, 'borderWidth', {
        get: function() {
            return borderWidth;
        },
        set: function(value) {
            borderWidth = value;
            changeHandlers && changeHandlers.forEach(function(handler) {
                handler('borderWidth', value);
            });
        }
    });

    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }

    var changeHandlers = [];
    this.addChangeHandler = function(handler) {
        changeHandlers.push(handler);
    }
    this.removeChangeHandler = function(handler) {
        for (var i = 0; i < changeHandlers.length; ++i) {
            if (changeHandlers[i] == handler) {
                changeHandlers.splice(i, 1);
            }
        }
    }
}

module.exports = Style;