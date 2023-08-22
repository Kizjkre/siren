const round: (x: number, interval: number) => number =
  (x: number, interval: number): number => Math.round(x / interval) * interval;

export default round;
