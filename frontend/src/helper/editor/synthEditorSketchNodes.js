export class SynthEditorNode {
  static _id = 0;

  constructor(name, x, y, w, h, icon = '', color = [50, 152, 220], params = []) {
    this._nameStr = name;
    this._x = x;
    this._y = y;
    this._w = w;
    this._h = h;
    this._iconName = icon;
    this._color = color;
    this._paramArr = params;
    this._id = SynthEditorNode._id++;
  }

  create(sketch) {
    this._sketch = sketch;
    if (!sketch) {
      throw new Error('Sketch not initialized.');
    }

    this._expand = false;

    if (this._iconName) {
      this._icon = sketch.createSpan();
      this._icon.class(`fa fa-${ this._iconName }`);
      this._icon.style('color', 'white');

      const iSize = this._icon.size();
      this._icon.position(this._w / 2 + this._x - iSize.width / 2, this._h / 2 + this._y - iSize.height / 2);
    }

    this._name = sketch.createSpan(this._nameStr);
    this._name.id(`synth-editor-node-${ SynthEditorNode._id }`);
    this._name.class('code synth-editor-param');
    this._name.attribute('data-type', 'node');
    this._name.attribute('data-id', SynthEditorNode._id);
    const nSize = this._name.size();
    this._name.position(this._w / 2 + this._x - nSize.width / 2, this._y - nSize.height - 5);
    this._name.hide();

    this._params = this._paramArr.map((param, i) => {
      const span = sketch.createSpan(param);
      span.class('code synth-editor-param');
      span.attribute('data-type', 'param');
      span.attribute('data-node', `synth-editor-node-${ SynthEditorNode._id }`);
      span.attribute('data-id', i);
      span.position(this._x + 20, this._y + this._h + 5 + i * 30);
      span.hide();
      return span;
    });

    return this;
  }

  draw() {
    this._sketch.noStroke();
    this._sketch.fill(...this._color);
    this._sketch.rect(this._x, this._y, this._w, this._h);
    return this;
  }

  contains(x, y) {
    return (x > this._x && x < this._x + this._w) && (y > this._y && y < this._y + this._h);
  }

  expand() {
    if (this._expand) {
      this._name.hide();
      this._params.forEach(param => param.hide());
      this._sketch.erase();
      this._sketch.rect(this._x + 10, this._y + this._h, 5, 30 * this._params.length);
      this._sketch.noErase();
    } else {
      this._name.show();
      this._params.forEach(param => param.show());
      this._sketch.noStroke();
      this._sketch.fill(...this._color);
      this._sketch.rect(this._x + 10, this._y + this._h, 5, 30 * this._params.length);
    }
    this._expand = !this._expand;
    return this;
  }
}


export class OscillatorSENode extends SynthEditorNode {
  constructor(x, y) {
    super('Osc', x, y, 50, 50, 'wave-square', undefined, ['Frequency', 'Detune']);
  }
}

export class GainSENode extends SynthEditorNode {
  constructor(x, y) {
    super('Gain', x, y, 50, 50, 'volume-up', [0, 209, 178], ['Gain']);
  }
}

export class PanSENode extends SynthEditorNode {
  constructor(x, y) {
    super('Pan', x, y, 50, 50, 'broadcast-tower', [0, 209, 178], ['Pan']);
  }
}

export class ConvolverSENode extends SynthEditorNode {
  constructor(x, y) {
    super('Conv', x, y, 50, 50, 'phone-volume', [0, 209, 178]);
  }
}

export class ContextSENode extends SynthEditorNode {
  constructor(x, y) {
    super('Ctx', x, y, 50, 50, 'map-marker', [241, 70, 104], ['Destination']);
  }
}

export class SourceSENode extends SynthEditorNode {
  constructor(x, y, name) {
    super(name, x, y, 50, 50, 'seedling', [72, 199, 116]);
  }
}
