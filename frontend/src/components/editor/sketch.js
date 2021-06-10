import store from '../../store/';
import { NodeDisplay, Oscillator, Panner, Gain, size } from './node';
import { setEditorOpen } from '../../actions';

export default class Sketch {
  draw(h, w) {
    this._draw = true;
    return s => {
      let font;
      this._s = s;
      this._display = new NodeDisplay(s);

      s.preload = () => {
        font = s.loadFont('https://fonts.gstatic.com/s/jetbrainsmono/v6/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxTOlOTk6OThhvA.woff');
      };

      s.setup = () => {
        s.createCanvas(w, h);
        s.textFont(font, 36);
        this._display.nodes.push(new Oscillator(100, 100));
        this._display.nodes.push(new Panner(200, 200));
        this._display.nodes.push(new Gain(400, 400));
        this._display.nodes.push(new Oscillator(100, 100));
        s.noLoop();
      };

      s.draw = () => {
        s.clear();
        this._display.show();
      };

      s.doubleClicked = e => {
        const none = this._display.nodes.every(node => {
          if (s.dist(e.x, e.y, node.x, node.y) < size - 10) {
            store.dispatch(setEditorOpen(node));
            return false;
          }
          return true;
        });
        if (none) {
          store.dispatch(setEditorOpen(null));
        }
      };
    };
  }

  add(node) {
    if (!this._draw) return;
    this._display.nodes.push(node);
    this._s.redraw();
  }
}
