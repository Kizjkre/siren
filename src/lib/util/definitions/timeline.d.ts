interface Timeline {
  [key: number]: any;
  synth: number;
}

type TimelineCallback = (timeline: Timeline) => any;
type TimelineCreator = (callback: TimelineCallback) => any;
