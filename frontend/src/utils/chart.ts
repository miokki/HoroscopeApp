export const degreesToRadians = (degrees: number): number => 
    (degrees * Math.PI) / 180;
  
  export const polarToCartesian = (
    centerX: number, 
    centerY: number, 
    radius: number, 
    degrees: number
  ) => {
    const radians = degreesToRadians(degrees);
    return {
      x: centerX + radius * Math.cos(radians),
      y: centerY + radius * Math.sin(radians)
    };
  };