const NodeType = Object.freeze({
  SOURCE: 1,
  EFFECT: 2
});

const SourceType = Object.freeze({
  OSCILLATOR: 1,
  PANNER: 2,
  GAIN: 3
});

const size = 150;

class Node {
  static _id = 0;
  constructor(nodeType, name, x = 0, y = 0) {
    this._id = Node._id++;
    this._x = x;
    this._y = y;
    this._name = name;
    this._type = nodeType;
  }

  get name() {
    return this._name;
  }

  get type() {
    return this._type;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  set x(x) {
    this._x = x;
  }

  set y(y) {
    this._y = y;
  }
}

class Source extends Node{
  constructor(sourceType, name, x, y) {
    super(NodeType.SOURCE, name, x, y);
  }
}

class Effect extends Node{
  constructor(sourceType, name, x, y) {
    super(NodeType.EFFECT, name, x, y);
  }
}

export class Oscillator extends Source {
  constructor(x, y) {
    super(SourceType.OSCILLATOR, 'Osc', x, y);
  }

  get id() {
    return this._id;
  }
}

export class Panner extends Effect {
  constructor(x, y) {
    super(SourceType.PANNER, 'Pan', x, y);
  }

  get id() {
    return this._id;
  }
}

export class Gain extends Effect {
  constructor(x, y) {
    super(SourceType.GAIN, 'Gain', x, y);
  }

  get id() {
    return this._id;
  }
}

class NodeList extends Array {
  constructor(...args) {
    super(...args);
    this._groups = new NodeGroup(...args);
  }

  push(...args) {
    this._groups.push(...args);
    super.push(...args);
  }

  delete(id) {
    const i = super.findIndex(node => node.id === id);
    if (i < 0) return;
    this._groups.delete(i);
    super.splice(i, 1);
  }

  has(id) {
    return !!this.get(id);
  }

  get(id) {
    return super.find(node => node.id === id);
  }

  get groups() {
    return this._groups;
  }
}

// TODO: fix
class NodeGroup extends Array {
  constructor(...args) {
    super(...args.filter(node => node.type === NodeType.SOURCE).map(node => [node]));
  }

  push(...args) {
    super.push(...args.filter(node => node.type === NodeType.SOURCE).map(node => [node]));
  }

  add(sourceId, node) {
    const group = super.find(n => n[0].id === sourceId);
    if (!group?.includes(node)) {
      group?.push(node);
    }
  }

  delete(sourceId) {
    const i = super.findIndex(n => n[0].id === sourceId);
    if (i < 0) return;
    super.splice(i, 1);
  }

  remove(node) {
    const i = super.findIndex(n => n.includes(node));
    if (i < 0) return;
    this[i].splice(this[i].length === 2 ? 1 : this[i].findIndex(n => n === node), 1);
  }
}

export class NodeDisplay {
  constructor(s) {
    this._s = s;
    this._selected = undefined;
    this._dragging = false;
    this._nodes = new NodeList();

    s.mouseDragged = () => {
      if (!this._dragging) {
        s.loop();
        this._dragging = true;
      }
      this._drag();
      this._connect();
    };

    s.mouseReleased = () => {
      this._selected = undefined;
      this._dragging = false;
      s.noLoop();
      return false;
    };
  }

  show() {
    this._nodes.groups.forEach(group => {
      if (group.length === 1) return;
      this._s.stroke(255);
      group.forEach(node => {
        this._s.strokeWeight(10000 / (10 * this._s.dist(group[0].x, group[0].y, node.x, node.y)));
        this._s.line(group[0].x, group[0].y, node.x, node.y);
      });
    });
    this._nodes.forEach(node => this._node(node));
  }

  _node(node) {
    this._s.strokeWeight(0);
    this._s.fill(255);
    if (node.type === NodeType.SOURCE) {
      this._s.circle(node.x, node.y, size);
    } else {
      this._s.square(node.x - size / 2, node.y - size / 2, size);
    }
    this._s.fill(0);
    this._s.textAlign(this._s.CENTER, this._s.CENTER);
    this._s.text(node.name, node.x, node.y);
  }

  _drag() {
    if (!this._selected) {
      this._nodes.forEach(node => {
        if (this._s.dist(this._s.mouseX, this._s.mouseY, node.x, node.y) < size - 10) {
          this._selected = this._nodes.get(node.id);
        }
      });
    } else {
      this._selected.x = this._s.mouseX;
      this._selected.y = this._s.mouseY;
    }
  }

  _connect() {
    if (!this._selected || this._selected?.type === NodeType.SOURCE) {
      return;
    }

    let min = [undefined, 500];
    this._nodes.forEach(node => {
      if (this._selected === node) return;
      const d = this._s.dist(node.x, node.y, this._s.mouseX, this._s.mouseY);
      if (min[1] > d && node.type === NodeType.SOURCE) {
        min[0] = node;
        min[1] = d;
      }
    });
    if (min[0]?.type === NodeType.SOURCE) {
      this._nodes.groups.add(min[0].id, this._selected);
    } else {
      this._nodes.groups.remove(this._selected);
    }
  }

  get nodes() {
    return this._nodes;
  }
}
