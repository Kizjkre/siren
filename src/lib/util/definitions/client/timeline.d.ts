interface Timeline {
  [key: number]: any;
  synth: number;
}

type TimelineCallback = (id: number, timeline: Timeline) => any;
type TimelineCreator = (callback: TimelineCallback) => any;
