import process from '../../../util/sandbox/process';
import Sandbox from './Sandbox';

const SynthSandbox = props => (
  <Sandbox
    name={ props.name }
    uuid={ props.uuid }
    process={
      `url => 'import synth, { parameters } from ' + JSON.stringify(url) + ';'
        + '(() => {('
        + ${ JSON.stringify(process) }
        + ')(${ JSON.stringify(props.name) }, synth, port, parameters);'
        + '})();'`
    }
  >
    { props.children }
  </Sandbox>
);

export default SynthSandbox;
