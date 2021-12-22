import store from '../store';
import { SimpleLexicalAnalyzer, SLAToken } from '../helper/simple/SimpleLexicalAnalyzer';
import SimpleSyntaxAnalyzer from '../helper/simple/SimpleSyntaxAnalyzer';
import SimpleCodeGenerator from '../helper/simple/SimpleCodeGenerator';
import cloneDeep from 'lodash.clonedeep';

const nodeTypes = Object.freeze({
  OSC: 'oscillator',
  GAIN: 'gain',
  PAN: 'panner',
  CONVOLVER: 'convolver',
  CONSTANT: 'constantSource'
});

export const play = timelines => {
  const state = store.getState();

  Object.values(timelines).forEach(t => {
    const synth = state.workstation.synths[t.synth];
    const timeline = t.timeline;

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

    const calculateParameters = (variables, time) => Object.entries(synth.inputs).forEach(([name, value]) => {
      const tokens = new SimpleLexicalAnalyzer(value).analyze().tokens;
      const tree = new SimpleSyntaxAnalyzer(tokens).analyze().tree;
      const generator = new SimpleCodeGenerator(tree, variables);
      const result = generator.generate();
      if (types.osc.includes(name)) {
        nodes[name].frequency.setValueAtTime(result, time);
      } else if (types.gain.includes(name)) {
        nodes[name].gain.setValueAtTime(result, time);
      } else if (types.pan.includes(name)) {
        nodes[name].pan.setValueAtTime(result, time);
      } else if (types.convolver.includes(name)) {
      } else if (types.constant.includes(name)) {
        nodes[name].offset.setValueAtTime(result, time);
      }
    });

    const now = nodes.context.currentTime;

    calculateParameters(synth.variables, now);

    let current = cloneDeep(synth.variables);
    current['Attack'] = synth.adsrd.values[0];
    current['Decay'] = synth.adsrd.values[1];
    current['Sustain'] = synth.adsrd.values[2];
    current['Release'] = synth.adsrd.values[3];
    current['Duration'] = synth.adsrd.values[4];

    const setADSRD = callback => {
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
        callback(nodes[node][prop], factor);
      });
    };

    setADSRD(node => node.setValueAtTime(0, now));

    Object.entries(timeline).forEach(([time, change]) => {
      time = parseFloat(time);
      calculateParameters(Object.assign(current, change), now + time);
      setADSRD((node, factor) => node.linearRampToValueAtTime(factor));
    });

    Object.values(nodes).forEach(node => 'stop' in node ? node.stop(now + synth.adsrd.values[4]): null);
  });
};
