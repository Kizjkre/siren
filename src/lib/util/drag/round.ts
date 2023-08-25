type Round = (x: number, interval: number) => number;

const round: Round =
  (x: number, interval: number): number => Math.round(x / interval) * interval;

export default round;
