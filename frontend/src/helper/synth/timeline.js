import cloneDeep from 'lodash.clonedeep';
import { compile } from 'moo';
import { Grammar, Parser } from 'nearley';
import { FillType } from '../../constants/state';
import store from '../../store';
import synthGrammar from '../grammars/synth/synth';
import interpolate from '../interpolate';
import { TOKEN_TYPES, tokens } from '../lexer';
import { add } from '../processing';

const createTimeline = () => {
  const state = store.getState();
  console.log(state);
  const timelines = {};
  const parameters = {};

  Object.entries(state.workstation.channels).forEach(([name, channel]) => {
    const timeline = {};
    const synth = state.workstation.synths[channel.synth];

    if (!(channel.synth in parameters)) {
      const synthTokens = cloneDeep(tokens);
      synthTokens.KEYWORD = Object.keys(synth.variables);
      const keywords = {};

      Object.entries(synth.inputs).forEach(([expression, nodes]) => {
        const parser = new Parser(Grammar.fromCompiled(synthGrammar(compile(synthTokens))));
        parser.feed(expression);
        if (!parser.results.length) {
          const line = parser.lexer.line;
          const buf = parser.lexer.buffer.split('\n');
          const index = parser.lexer.index - buf.slice(0, line - 1).join(' ').length - 1;
          throw new SyntaxError(`In synth ${ channel.synth }: unexpected "${ expression[index - 1] }" at line ${ line } col ${ index }:\n ${ line }\t${ buf[line - 1] }\n  \t${ new Array(index).fill().join(' ') }^`);
        }
        parser.results[0]
          .filter(({ type }) => type === TOKEN_TYPES.KEYWORD)
          .forEach(({ value }) => value in keywords ? keywords[value].push(...nodes) : (keywords[value] = [...nodes]));
      });

      parameters[channel.synth] = keywords;
    }

    const rawEnvelope = channel.features.Envelope.track !== -1 ?
      interpolate(state.workstation.tracks[channel.features.Envelope.track].data) :
      synth.envelope.default;

    const notes = channel.features.Duration.track !== -1 ?
      state.workstation.tracks[channel.features.Duration.track].data :
      new Array(
        state.workstation.tracks[
          Object.values(channel.features)
            .filter(({ track }) => track !== -1)
            .reduce((a, b) =>
              state.workstation.tracks[a.track].data.length > state.workstation.tracks[b.track].data.length ? a : b
            )
            .track
        ].data.length
      ).fill().map(() => rawEnvelope[rawEnvelope.length - 1][0]);

    const envelope = rawEnvelope.map(([x, y], _, a) => [x / a[a.length - 1][0], y]);

    notes.reduce((sum, d) => {
      envelope.forEach(([p, v]) => timeline[add(sum, d * p)] = { envelope: v });
      return add(sum, d);
    }, 0);

    const features = cloneDeep(channel.features);
    delete features.Envelope;
    delete features.Duration;

    Object.entries(features).forEach(([feature, { track, fill }]) => {
      if (track === -1) {
        timeline[0] = { ...timeline[0], [feature]: synth.variables[feature] };
        return;
      }
      const { data } = state.workstation.tracks[track];

      switch (fill) {
        case FillType.FIT:

          break;
        case FillType.WRAP:

          break;
        case FillType.REPEAT:

          break;
        case FillType.STRETCH:
          const times = Object.keys(timeline);
          const interval = times.sort()[times.length - 1] / data.length;
          data.forEach((datum, i) => timeline[i * interval] = { ...timeline[i * interval], [feature]: data });
          break;
      }
    });

    timelines[name] = timeline;
  });
};

export default createTimeline;
