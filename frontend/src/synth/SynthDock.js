import { compile } from 'moo';
import { ENVELOPE } from '../constants/workstation';
import calculate from '../helper/grammars/calculator';
import { TOKEN_TYPES, tokens } from '../helper/lexer';
import Timeline from '../helper/synth/timeline';

export default class SynthDock {
  constructor(synth) {
    this._synth = synth;
    this._nodes = {};

    this._nodes.context = new AudioContext();
    this._synth.nodes.forEach(async node => {
      this._nodes[node.name] = new window[node.type](this._nodes.context);
      if (this._nodes[node.name] instanceof ConvolverNode) {
        // REF: https://developer.mozilla.org/en-US/docs/Web/API/ConvolverNode
        const response = this._synth.irs[node.impulseResponse];
        const arraybuffer = await response.arrayBuffer();
        this._nodes[node.name].buffer = await this._nodes.context.decodeAudioData(arraybuffer);
      }
    });

    this._synth.connections.forEach(connection => {
      const [from, to] = Object.entries(connection)[0];
      if (typeof to === 'object') {
        this._nodes[from].connect(this._nodes[to.name][to.parameter]);
      } else {
        this._nodes[from].connect(this._nodes[to]);
      }
    });
  }

  queue(timeline) {
    const t = new Timeline(this._synth);
    t.add(0, timeline[0][1]);

    const current = {};
    const envelope = [...this._synth.adsrd.values];

    this._synth.adsrd.nodes.forEach(({ node, parameter }) => this._nodes[node][parameter].setValueAtTime(0, 0));

    const synthTokens = Object.freeze({ ...tokens, KEYWORD: Object.keys(this._synth.variables) });

    const lexer = compile(synthTokens);
    const lex = expression => {
      lexer.reset(expression);
      return Array.from(lexer);
    }

    timeline.forEach(([time, features]) => {
      const timeFeatures = {
        envelope: [],
        nodes: []
      };

      // noinspection CommaExpressionJS
      ENVELOPE.forEach((feature, i) => feature in features && (timeFeatures.envelope.push(feature), envelope[i] = features[feature]));

      const update = Object.entries(this._synth.inputs)
        .filter(([expression]) => lex(expression).some(({ value }) => value in features))
        .flatMap(([expression, nodes]) => nodes.map(node => ({ ...node, expression })));

      update
        .filter(({ node, parameter }) => !this._synth.adsrd.nodes.some(n => n.node === node && n.parameter === parameter))
        .forEach(({ node, parameter, expression }) => {
          const result = calculate(lex(expression).reduce((acc, { type, value }) => acc + (type !== TOKEN_TYPES.KEYWORD ? value.toString() : features[value]), ''));
          this._nodes[node][parameter].linearRampToValueAtTime(result, time);
          console.log(node, parameter, result, time);
        });

      update
        .filter(({ node, parameter }) => this._synth.adsrd.nodes.some(n => n.node === node && n.parameter === parameter))
        .forEach(({ node, parameter, expression }) => {
          const result = calculate(lex(expression).reduce((acc, { type, value }) => acc + (type !== TOKEN_TYPES.KEYWORD ? value.toString() : features[value]), ''));
          current[node] = { ...current[node], [parameter]: result };
          timeFeatures.nodes.push({ node, parameter, result });
        });

      if (timeFeatures.envelope.length) {
        timeFeatures.envelope.forEach(feature => this._synth.adsrd.nodes.forEach(({ node, parameter }) => {
          switch (feature) {
            case 'Attack':
              this._nodes[node][parameter].linearRampToValueAtTime(current[node][parameter], time);
              console.log('attack', node, parameter, current[node][parameter], time);
              break;
            case 'Decay':
              this._nodes[node][parameter].linearRampToValueAtTime(envelope[2] * current[node][parameter], time);
              console.log('decay', node, parameter, envelope[2] * current[node][parameter], time);
              break;
            case 'Release':
              this._nodes[node][parameter].linearRampToValueAtTime(0, time);
              console.log('release', node, parameter, 0, time);
              break;
            case 'Duration':
              this._nodes[node][parameter].linearRampToValueAtTime(envelope[2] * current[node][parameter], time);
              console.log('duration', node, parameter, envelope[2] * current[node][parameter], time);
              break;
          }
        }));
      } else if (timeFeatures.nodes.length) {
        timeFeatures.nodes.forEach(({ node, parameter, result }) => this._nodes[node][parameter].linearRampToValueAtTime(result, time));
      }
    });

    return this;
  }

  start() { Object.values(this._nodes).forEach(node => 'start' in node ? node.start() : null); return this; }
  stop(time = this._nodes.context.currentTime) { Object.values(this._nodes).forEach(node => 'stop' in node ? node.stop(time) : null); return this; }


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
