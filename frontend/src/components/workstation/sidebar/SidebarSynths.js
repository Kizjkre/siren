import SidebarSectionTemplate from './SidebarSectionTemplate';
import { focusWindow } from '../../../actions';
import { connect } from 'react-redux';
import { synthDemo } from '../../../helper/synth/demo';

const SidebarSynths = ({ synths, focusWindow }) => {
  return (
    <SidebarSectionTemplate title="Synths" empty={ false } icon="fa fa-wave-square">
      {
        Object.values(synths).map((synth, i) => (
          <li key={ i } onClick={ () => synthDemo(synth) }>
            <a> { /* eslint-disable-line jsx-a11y/anchor-is-valid */ }
              <span className="icon-text">
                <span className="icon">
                  <i className="fa fa-wave-square" />
                </span>
                <span>{ synth.name }</span>
              </span>
            </a>
          </li>
        ))
      }
      <li onClick={ () => focusWindow('window-synth') }>
        <a className="button is-info"> { /* eslint-disable-line jsx-a11y/anchor-is-valid */ }
          <span className="icon-text">
            <span className="icon">
              <i className="fa fa-plus"/>
            </span>
            <span>Add synth</span>
          </span>
        </a>
      </li>
    </SidebarSectionTemplate>
  );
};

const mapStateToProps = state => ({
  synths: state.workstation.synths
});

const mapDispatchToProps = dispatch => ({
  focusWindow: id => dispatch(focusWindow(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarSynths);
