function Animator(params) {
    var self = this;
    self.layout       = params.layout;
    self.duration     = params.duration;
    self.animFunction = params.animFunction;
    
    Object.defineProperties(self, {
        'perform': {
            value: function() {
                // p1 : duration - Float, p2 : delay - Float, p3 : animations - Func(), p4 : completion - Func()  
                __SF_UIView.animation(self.duration,0,function(){
                    self.animFunction();
                    self.layout.applyLayout();
                },function(){
                    if (self.thenAnimator){
                        self.thenAnimator.perform();
                    }else if (self.completeFunction){
                        self.completeFunction();
                    }
                });
                
            }
        },
        'then': {
            value: function(duration, animFunction) {
                var animator = new Animator({
                    layout      : self.layout,
                    duration    : duration/1000, //millisecont to second
                    animFunction: animFunction
                });
                self.thenAnimator = animator;
                return animator;
            }
        },
        'complete': {
            value: function(completeFunction) {
                self.completeFunction = completeFunction;
            }
        }
    });
};

Object.defineProperty(Animator, 'animate', {
   value: function(rootLayout, duration, animFunction) {
       var animator = new Animator({
           layout      : rootLayout,
           duration    : duration/1000, //millisecont to second
           animFunction: animFunction
       });
       animator.perform();
       return animator;
   }
});

module.exports = Animator;