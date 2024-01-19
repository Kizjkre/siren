interface Timeline {
  [key: number]: any;
  id: number;
  synth: number;
}

type TimelineCreator = () => Timeline[];
