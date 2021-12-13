import SimpleCodeGenerator from '../profile/SimpleCodeGenerator';
import { SimpleLexicalAnalyzer, SLAToken } from '../profile/SimpleLexicalAnalyzer';
import SimpleSyntaxAnalyzer from '../profile/SimpleSyntaxAnalyzer';

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
    const factor = nodes[node].offset.value || 1;
    nodes[node].offset.setValueAtTime(0, now);
    nodes[node].offset.linearRampToValueAtTime(synth.adsrd.values[2] * factor, now + synth.adsrd.values[0]);
    nodes[node].offset.linearRampToValueAtTime(0.6 * synth.adsrd.values[2] * factor, now + synth.adsrd.values[0] + synth.adsrd.values[1]);
    nodes[node].offset.setValueAtTime(0.6 * synth.adsrd.values[2] * factor, now + synth.adsrd.values[4] - synth.adsrd.values[3]);
    nodes[node].offset.linearRampToValueAtTime(0, now + synth.adsrd.values[4]);
  });

  Object.values(nodes).forEach(node => 'stop' in node ? node.stop(now + synth.adsrd.values[4]): null);
};
