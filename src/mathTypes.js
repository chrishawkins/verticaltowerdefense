// @flow

export type Bounds = {| x: number, y: number, width: number, height: number |};
export type Point = {| x: number, y: number |};

export function doBoundsIntersect(a: Bounds, b: Bounds) {
    return !(
      b.x > a.x + a.width || 
      b.x + b.width < a.x || 
      b.y > a.y + a.height ||
      b.y + b.height < a.y);
}