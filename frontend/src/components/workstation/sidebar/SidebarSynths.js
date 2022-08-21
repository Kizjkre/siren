import { useState } from 'react';
import { connect } from 'react-redux';
import { synthDemo } from '../../../helper/synth/demo';
import Sandbox from '../../Sandbox';
import SynthDock from '../SynthDock';
import SidebarSectionTemplate from './SidebarSectionTemplate';

const SidebarSynths = ({ synths }) => {
  const [click, setClick] = useState(false);

  return (
    <>
      <Sandbox script={ 'console.log("hi");' } />
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
        <li onClick={ () => setClick(true) }>
          <a className="button is-info"> { /* eslint-disable-line jsx-a11y/anchor-is-valid */ }
            <span className="icon-text">
              <span className="icon">
                <i className="fa fa-plus" />
              </span>
              <span>Add synth</span>
            </span>
          </a>
        </li>
      </SidebarSectionTemplate>
      <SynthDock click={ click } setClick={ setClick } />
    </>
  );
};

const mapStateToProps = state => ({
  synths: state.workstation.synths
});

export default connect(mapStateToProps)(SidebarSynths);
