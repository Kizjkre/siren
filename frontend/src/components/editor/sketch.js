import { NodeDisplay, Oscillator, Panner, Gain } from './node';

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
    };
  }

  add(node) {
    if (!this._draw) return;
    this._display.nodes.push(node);
    this._s.redraw();
  }
}

// const s = (h, w) => s => {
//   let font;
//   const display = new NodeDisplay(s);
//
//   s.preload = () => {
//     font = s.loadFont('https://fonts.gstatic.com/s/jetbrainsmono/v6/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxTOlOTk6OThhvA.woff');
//   };
//
//   s.setup = () => {
//     s.createCanvas(w, h);
//     s.textFont(font, 36);
//     display.nodes.push(new Oscillator(100, 100));
//     display.nodes.push(new Panner(200, 200));
//     display.nodes.push(new Gain(400, 400));
//     display.nodes.push(new Oscillator(100, 100));
//     s.noLoop();
//   };
//
//   s.draw = () => {
//     s.clear();
//     display.show();
//   };
// };
//
// export default s;
