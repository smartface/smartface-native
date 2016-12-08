module.exports = AbsoluteLayout;

function AbsoluteLayout(props){
    
}

AbsoluteLayout.LayoutParams = function(props){
    this.width = 0;
    this.height = 0;
    this.left = 0;
    this.top = 0;
    
    // Assign properties given in constructor
    if (props) {
        for (var prop in props) {
            this[prop] = props[prop];
        }
    }
};
