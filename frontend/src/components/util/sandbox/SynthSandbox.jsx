import module from '../../../util/sandbox/module';
import process from '../../../util/sandbox/process';
import Sandbox from './Sandbox';

const SynthSandbox = props => (
  <Sandbox>
    {
      `
        (${ module.toString() })(
          'let port = null;'
          + ${ JSON.stringify(props.children) },
          url =>
            'import synth, { parameters } from ' + JSON.stringify(url) + ';'
            + '(() => {('
            + ${ JSON.stringify(process) }
            + ')(${ JSON.stringify(props.name) }, synth, port, parameters);'
            + '})();'
        );
      `
    }
  </Sandbox>
);

export default SynthSandbox;
