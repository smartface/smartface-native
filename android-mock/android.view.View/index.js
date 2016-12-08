module.exports = View;

function View(props){
    
}

View.VISIBLE = 0x00000000;
View.INVISIBLE = 0x00000004;
View.GONE = 0x00000008;

View.OnTouchListener = function(props){
    var functionOnTouch;

    // Assign properties given in constructor
    if (props) {
        for (var prop in props) {
            this[prop] = props[prop];
        }
    }
    
};
View.OnTouchListener.implement = function(paramEvent){
        return paramEvent.onTouch;
}