// This method is needed to respect border radius of the view.
export function getRippleMask(borderRadius) {
    const NativeRoundRectShape = requireClass('android.graphics.drawable.shapes.RoundRectShape');
    const NativeShapeDrawable = requireClass('android.graphics.drawable.ShapeDrawable');
  
    const outerRadii: number[] = [];
    outerRadii.length = 8;
    outerRadii.fill(borderRadius);
  
    const roundRectShape = new NativeRoundRectShape(array(outerRadii, 'float'), null, null);
    const shapeDrawable = new NativeShapeDrawable(roundRectShape);
  
    return shapeDrawable;
  }
  