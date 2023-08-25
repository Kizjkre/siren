type Displacement = (pos: number, interval: number) => number;

const displacement: Displacement = (pos: number, interval: number): number =>
  Math.abs(Math.abs(pos % interval - interval / 2) - interval / 2);

export default displacement;
