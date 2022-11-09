import { connect } from 'react-redux';
import synthDemo from '../../../util/sandbox/demo';
import SidebarSectionTemplate from './SidebarSectionTemplate';

const SidebarSynth = ({ synths }) => (
  <SidebarSectionTemplate title="Synths" empty={ false } icon="fa fa-wave-square">
    {
      Object.keys(synths).map((name, i) => (
        <li key={ i } onClick={ () => synthDemo(name) }>
          <a> { /* eslint-disable-line jsx-a11y/anchor-is-valid */ }
            <span className="icon-text">
              <span className="icon">
                <i className="fa fa-wave-square" />
              </span>
              <span>{ name }</span>
            </span>
          </a>
        </li>
      ))
    }
  </SidebarSectionTemplate>
);

const mapStateToProps = state => ({
  synths: state.workstation.synths
});

export default connect(mapStateToProps)(SidebarSynth);
