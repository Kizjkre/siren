import { SplineCurve, Vector2 } from 'three';

const interpolate = data =>
  new SplineCurve(data.map((d, i) => new Vector2(i, d))).getPoints(data.length * 10).map(p => [p.x, p.y]);

export default interpolate;
