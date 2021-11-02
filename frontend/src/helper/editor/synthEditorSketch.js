import {
  SynthEditorNode,
  SourceSENode,
  ContextSENode,
  PanSENode,
  GainSENode,
  ConvolverSENode,
  OscillatorSENode
} from './synthEditorSketchNodes';

const OPTIONS = {
  name: '',
  tracks: []
};

export default class SynthEditorSketch {
  constructor(options) {
    this._nodes = [];
    this._selected = [];
    this._connected = [];
    this._options = Object.assign(OPTIONS, options);

    this._nodes.push(
      new OscillatorSENode(10, 110),
      new GainSENode(110, 110),
      new PanSENode(210, 110),
      new ConvolverSENode(310, 110),
      new ContextSENode(410, 110)
    );
  }

  set options(value) {
    this._options = Object.assign(this._options, value);
  }

  _checkSketch() {
    if (!this._sketch) {
      // throw new Error('p5.js sketch not initialized.');
    }
  }

  init(w, h) {
    this._w = w;
    this._h = h;

    return s => {
      this._sketch = s;

      s.setup = () => {
        s.createCanvas(w, h);
        s.noLoop();
      };

      s.draw = () => {
        this._sketch.clear();
        this._nodes.forEach(node => node.create(this._sketch).draw());
        this._options.tracks.forEach((track, i) => this._nodes.push(new SourceSENode(10 + 100 * i, 10, track).create().draw()));
      };
    };
  }

  draw() {
    this._checkSketch();

    this._sketch.mouseClicked = () => {
      this._nodes.filter(node => node.contains(this._sketch.mouseX, this._sketch.mouseY))[0]?.expand();
    };
  }

  clear() {
    if (this._sketch) {
      this._sketch.remove();
      SynthEditorNode._id = 0;
    }
  }

  select(node, param, target) {
    this._selected.push({ node, param, target });
    console.log(this._selected);
    if (
      this._selected.length === 2
      && !this._connected.some(connection => connection.equals(this._selected[0], this._selected[1]))
    ) {
      this._connected.push(new SEConnection(this._selected[0], this._selected[1]));
      setTimeout(() => {
        target.click();
        this._selected[0].target.click();
        this._selected = [];
      }, 100);
    }
  }

  deselect(node, param) {
    this._selected = this._selected.filter(selected => selected.node === node && selected.param === param);
  }

  update() {
    this.clear();
    this.draw(this._w, this._h);
  }
}

class SEConnection {
  constructor(first, second) {
    this._first = first;
    this._second = second;
  }

  equals(first, second) {
    return this._first.node === first.node && this._first.param === first.param &&
      this._second.node === second.node && this._second.param === second.param;
  }

  get first() {
    return this._first;
  }

  get second() {
    return this._second;
  }
}
