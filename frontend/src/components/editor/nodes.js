const size = 150;

export default class Nodes {
  constructor(s) {
    this._s = s;
    this._nodes = [];
    this._selected = -1;
    this._dragging = false;
    this._groups = [];

    s.mouseDragged = () => {
      if (!this._dragging) {
        s.redraw();
        s.loop();
        this._dragging = true;
      }
      this.drag();
      this.connect();
    };

    s.mouseReleased = () => {
      this._selected = -1;
      this._dragging = false;
      s.noLoop();
      return false;
    };
  }

  show() {
    this._groups.forEach(group =>
      [...group].slice(0, group.size - 1).forEach((n1, i) =>
        [...group].slice(i + 1).forEach(n2 => {
          this._s.stroke(255);
          this._s.strokeWeight(10000 / (10 * this._s.dist(this._nodes[n1].x, this._nodes[n1].y, this._nodes[n2].x, this._nodes[n2].y)));
          this._s.line(this._nodes[n1].x, this._nodes[n1].y, this._nodes[n2].x, this._nodes[n2].y);
        })
      )
    );
    this._nodes.forEach(node => this._node(node.x, node.y, node.name));
  }

  oscillator(x, y) {
    return this._nodes.push({ x, y, name: 'Osc', type: 'osc' }) - 1;
  }

  panner(x, y) {
    return this._nodes.push({ x, y, name: 'Pan', type: 'pan' }) - 1;
  }

  _node(x, y, name) {
    this._s.strokeWeight(0);
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
    let min = [-1, 500];
    this._nodes.forEach((node, i) => {
      if (this._selected === i) return;
      const d = this._s.dist(node.x, node.y, this._s.mouseX, this._s.mouseY);
      if (min[1] > d) {
        min[0] = i;
        min[1] = d;
      }
    });
    if (min[0] >= 0) {
      let exists = false;
      // TODO: Fix
      this._groups.forEach(group => {
        if (group.has(min[0])) {
          if (group.has(this._selected)) return;
          group.delete(min[0]);
        } else if (group.has(this._selected)) {
          group.add(min[0]);
          exists = true;
        }
      });
      if (!exists) {
        this._groups.push(new Set([min[0], this._selected]));
      }
    } else {
      this._groups.forEach(group => group.delete(this._selected));
    }
    console.log(this._groups);
  }
}
