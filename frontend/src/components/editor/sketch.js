import Nodes from './nodes';

const s = (h, w) => s => {

  let inconsolata;
  const nodes = new Nodes(s);
  s.setup = () => {
    s.createCanvas(w, h);
    inconsolata = s.loadFont('https://fonts.gstatic.com/s/inconsolata/v21/QldgNThLqRwH-OJ1UHjlKENVzkWGVkL3GZQmAwLYxYWI2qfdm7Lpp4U8WR32kXWdycuJDA.woff');
    s.textFont(inconsolata, 36);
    nodes.oscillator(100, 100);
    nodes.panner(800, 400);
  };

  s.draw = () => {
    s.noLoop();
    s.clear();
    nodes.show();
  };
};

export default s;
