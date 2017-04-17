function Clonable(params) {
    Object.defineProperties(this, {
        // Clone method
        'clone': {
            value: function(cloneParams){
                var Constructor = findConstructor(this);
                console.log("clone: " + cloneParams.nativeObject)
                cloneParams['isClone'] = true;
                return new Constructor(cloneParams);
            },
            enumerable: true
        }
    });
}

function findConstructor(self){
    return require("sf-core/ui/" + self.toString().toLowerCase());
}


module.exports = Clonable;