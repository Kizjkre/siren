import { SimpleLexicalAnalyzer, SLAToken } from '../helper/simple/SimpleLexicalAnalyzer';
import SimpleSyntaxAnalyzer from '../helper/simple/SimpleSyntaxAnalyzer';
import SimpleCodeGenerator from '../helper/simple/SimpleCodeGenerator';

export default class SynthDock {
  constructor(synth) {
    this._synth = synth;
    this._nodes = {};
  }

  static NodeTypes = Object.freeze({
    OSC: 'oscillator',
    GAIN: 'gain',
    PAN: 'panner',
    CONVOLVER: 'convolver',
    CONSTANT: 'constantSource'
  });

  init() {
    this._nodes.context = new AudioContext();
    this._synth.nodes.forEach(node => {
      switch (node.type) {
        case SynthDock.NodeTypes.OSC:
          this._nodes[node.name] = new OscillatorNode(this._nodes.context);
          break;
        case SynthDock.NodeTypes.GAIN:
          this._nodes[node.name] = new GainNode(this._nodes.context);
          break;
        case SynthDock.NodeTypes.PAN:
          this._nodes[node.name] = new StereoPannerNode(this._nodes.context);
          break;
        case SynthDock.NodeTypes.CONVOLVER:
          this._nodes[node.name] = new ConvolverNode(this._nodes.context);
          break;
        case SynthDock.NodeTypes.CONSTANT:
          this._nodes[node.name] = new ConstantSourceNode(this._nodes.context);
          break;
        default:
          break;
      }
    });

    this._synth.connections.forEach(connection => {
      const [from, to] = Object.entries(connection)[0];
      if (typeof to === 'object') {
        this._nodes[from].connect(this._nodes[to.name][to.property]);
      } else {
        this._nodes[from].connect(this._nodes[to]);
      }
    });

    return this;
  }

  queue(variables, adsrd, time) {
    SLAToken.TYPES.keyword = new RegExp(Object.keys(variables).reduce((a, v) => `${ a }|${ v }`));
    SLAToken.TYPES.number = /(?<![a-zA-Z])\d*\.?\d+/;
    Object.entries(this._synth.inputs).forEach(([name, value]) => {
      const tokens = new SimpleLexicalAnalyzer(value).analyze().tokens;
      const tree = new SimpleSyntaxAnalyzer(tokens).analyze().tree;
      const generator = new SimpleCodeGenerator(tree, variables);
      const result = generator.generate();

      if (this._synth.adsrd.nodes.includes(name)) {
        this._queueADSRD(...adsrd, name, time, result);
      } else {
        switch (this._nodes[name].constructor) {
          case OscillatorNode:
            this._nodes[name].frequency.setValueAtTime(result, time);
            break;
          case GainNode:
            this._nodes[name].gain.setValueAtTime(result, time);
            break;
          case StereoPannerNode:
            this._nodes[name].pan.setValueAtTime(result, time);
            break;
          case ConvolverNode:
            break;
          case ConstantSourceNode:
            this._nodes[name].offset.setValueAtTime(result, time);
            break;
          default:
            throw new TypeError('Undefined node type.');
        }
      }
    });

    this._synth.adsrd.nodes.forEach(node => {
      if (!Object.keys(this._synth.inputs).includes(node)) {
        this._queueADSRD(...adsrd, node, time);
      }
    });

    return this;
  }

  _queueADSRD(a, d, s, r, du, node, time, factor) {
    console.log(arguments);
    const total = du / (1 - (a + d + r));
    let prop = '';
    switch (this._nodes[node].constructor) {
      case OscillatorNode:
        prop = 'frequency';
        break;
      case GainNode:
        prop = 'gain';
        break;
      case StereoPannerNode:
        prop = 'pan';
        break;
      case ConvolverNode:
        break;
      case ConstantSourceNode:
        prop = 'offset';
        break;
      default:
        throw new TypeError('Undefined node type.');
    }
    factor = factor || this._nodes[node][prop].value;
    const now = this.now + time;
    this._nodes[node][prop].setValueAtTime(0, now);
    this._nodes[node][prop].linearRampToValueAtTime(factor, now + a * total);
    this._nodes[node][prop].linearRampToValueAtTime(s * factor, now + (a + d) * total);
    this._nodes[node][prop].setValueAtTime(s * factor, now + (1 - r) * total);
    this._nodes[node][prop].linearRampToValueAtTime(0, now + total);
  }

  start() { Object.values(this._nodes).forEach(node => 'start' in node ? node.start(): null); return this; }
  stop(time) { Object.values(this._nodes).forEach(node => 'stop' in node ? node.stop(time): null); return this; }


  get synth() {
    return this._synth;
  }

  get nodes() {
    return this._nodes;
  }

  get now() {
    return this._nodes.context.currentTime;
  }
}
