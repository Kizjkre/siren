import SimpleCodeGenerator from '../simple/SimpleCodeGenerator';
import { SimpleLexicalAnalyzer, SLAToken } from '../simple/SimpleLexicalAnalyzer';
import SimpleSyntaxAnalyzer from '../simple/SimpleSyntaxAnalyzer';

const nodeTypes = Object.freeze({
  OSC: 'oscillator',
  GAIN: 'gain',
  PAN: 'panner',
  CONVOLVER: 'convolver',
  CONSTANT: 'constantSource'
})

export const synthDemo = synth => {
  const nodes = {
    context: new AudioContext()
  };

  const types = {
    osc: [],
    gain: [],
    pan: [],
    convolver: [],
    constant: []
  };

  synth.nodes.forEach(node => {
    switch (node.type) {
      case nodeTypes.OSC:
        nodes[node.name] = new OscillatorNode(nodes.context);
        types.osc.push(node.name);
        break;
      case nodeTypes.GAIN:
        nodes[node.name] = new GainNode(nodes.context);
        types.gain.push(node.name);
        break;
      case nodeTypes.PAN:
        nodes[node.name] = new StereoPannerNode(nodes.context);
        types.pan.push(node.name);
        break;
      case nodeTypes.CONVOLVER:
        nodes[node.name] = new ConvolverNode(nodes.context);
        types.convolver.push(node.name);
        break;
      case nodeTypes.CONSTANT:
        nodes[node.name] = new ConstantSourceNode(nodes.context);
        types.constant.push(node.name);
        break;
      default:
        break;
    }
  });

  synth.connections.forEach(connection => {
    const [from, to] = Object.entries(connection)[0];
    if (typeof to === 'object') {
      nodes[from].connect(nodes[to.name][to.property]);
    } else {
      nodes[from].connect(nodes[to]);
    }
  });

  Object.values(nodes).forEach(node => 'start' in node ? node.start(): null);

  SLAToken.TYPES.keyword = new RegExp(Object.keys(synth.variables).reduce((a, v) => `${ a }|${ v }`));
  SLAToken.TYPES.number = /(?<![a-zA-Z])\d*\.?\d+/;
  Object.entries(synth.inputs).forEach(([name, value]) => {
    const tokens = new SimpleLexicalAnalyzer(value).analyze().tokens;
    const tree = new SimpleSyntaxAnalyzer(tokens).analyze().tree;
    const generator = new SimpleCodeGenerator(tree, synth.variables);
    const result = generator.generate();
    if (types.osc.includes(name)) {
      nodes[name].frequency.value = result;
    } else if (types.gain.includes(name)) {
      nodes[name].gain.value = result;
    } else if (types.pan.includes(name)) {
      nodes[name].pan.value = result;
    } else if (types.convolver.includes(name)) {
    } else if (types.constant.includes(name)) {
      nodes[name].offset.value = result;
    }
  });

  const now = nodes.context.currentTime;
  synth.adsrd.nodes.forEach(node => {
    let prop = '';
    if (types.osc.includes(node)) {
      prop = 'frequency';
    } else if (types.gain.includes(node)) {
      prop = 'gain';
    } else if (types.pan.includes(node)) {
      prop = 'pan';
    } else if (types.convolver.includes(node)) {
    } else if (types.constant.includes(node)) {
      prop = 'offset';
    }
    const factor = nodes[node][prop].value;
    nodes[node][prop].setValueAtTime(0, now);
    nodes[node][prop].linearRampToValueAtTime(factor, now + synth.adsrd.values[0] * synth.adsrd.values[4]);
    nodes[node][prop].linearRampToValueAtTime(synth.adsrd.values[2] * factor, now + (synth.adsrd.values[0] + synth.adsrd.values[1]) * synth.adsrd.values[4]);
    nodes[node][prop].setValueAtTime(synth.adsrd.values[2] * factor, now + (1 - synth.adsrd.values[3]) * synth.adsrd.values[4]);
    nodes[node][prop].linearRampToValueAtTime(0, now + synth.adsrd.values[4]);
  });

  Object.values(nodes).forEach(node => 'stop' in node ? node.stop(now + synth.adsrd.values[4]): null);
};
