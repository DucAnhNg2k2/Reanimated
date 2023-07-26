type Point = {
  x: number;
  y: number;
};

type Vector = {
  x: number;
  y: number;
};

const getVectorFromTwoPoint = (a: Point, b: Point): Vector => {
  'worklet';
  return {
    x: b.x - a.x,
    y: b.y - a.y,
  };
};

const getAngleFromThreePoint = (a: Point, b: Point, c: Point): number => {
  'worklet';
  const v1 = getVectorFromTwoPoint(a, b);
  const v2 = getVectorFromTwoPoint(a, c);
  const num =
    (v1.x * v2.x + v1.y * v2.y) /
    (Math.sqrt(v1.x * v1.x + v1.y * v1.y) *
      Math.sqrt(v2.x * v2.x + v2.y * v2.y));
  return Math.acos(num);
};

export {getAngleFromThreePoint};
