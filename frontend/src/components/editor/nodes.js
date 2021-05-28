const size = 150;

export default class Nodes {
  constructor(s) {
    this._s = s;
    this._nodes = [];
    this._selected = -1;

    s.mouseDragged = () => {
      s.redraw();
      s.loop();
      this.drag();
    };

    s.mouseReleased = () => {
      this.connect();
      this._selected = -1;
      return false;
    };
  }

  show() {
    this._nodes.forEach(node => this._node(node.x, node.y, node.name));
  }

  oscillator(x, y) {
    return this._nodes.push({ x, y, name: 'Osc', type: 'osc' }) - 1;
  }

  panner(x, y) {
    return this._nodes.push({ x, y, name: 'Pan', type: 'pan' }) - 1;
  }

  _node(x, y, name) {
    this._s.fill(255);
    this._s.circle(x, y, size);
    this._s.fill(0);
    this._s.textAlign(this._s.CENTER, this._s.CENTER);
    this._s.text(name, x, y);
  }

  drag() {
    if (this._selected === -1) {
      this._nodes.forEach((node, i) => {
        if (this._s.dist(this._s.mouseX, this._s.mouseY, node.x, node.y) < size) {
          this._selected = i;
        }
      });
    }
    if (this._selected !== -1) {
      this._nodes[this._selected].x = this._s.mouseX;
      this._nodes[this._selected].y = this._s.mouseY;
    }
  }

  connect() {
    let min = [-1, 1000];
    this._nodes.forEach((node, i) => {
      if (this._selected === i) return;
      const d = this._s.dist(node.x, node.y, this._s.mouseX, this._s.mouseY);
      if (min[1] > d) {
        min[0] = i;
        min[1] = d;
      }
    });
    if (min[0] >= 0) {
      this._s.strokeWeight(5);
      this._s.stroke(255);
      this._s.line(this._nodes[min[0]].x, this._nodes[min[0]].y, this._nodes[this._selected].x, this._nodes[this._selected].y);
    }
  }
}
