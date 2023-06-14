import run from '../../../util/sandbox/run';
import Sandbox from './Sandbox';

const MappingSandbox = props => (
  <Sandbox
    name={ props.name }
    uuid={ props.uuid }
    type="mapping"
    process={
      `url => 'import mapping from ' + JSON.stringify(url) + ';'
        + '(() => {('
        + ${ JSON.stringify(run) }
        + ')(${ JSON.stringify(props.name) }, mapping, port);'
        + '})();'`
    }
  >
    { props.children }
  </Sandbox>
);

export default MappingSandbox;
