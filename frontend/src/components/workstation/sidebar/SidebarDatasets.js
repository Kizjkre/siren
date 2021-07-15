import { connect } from 'react-redux';
import { focusWindow } from '../../../actions';
import SidebarSectionTemplate from './SidebarSectionTemplate';

const SidebarDatasets = ({ files, focusWindow }) => (
  <SidebarSectionTemplate title="Datasets" icon="fa fa-file-csv" empty={ !Object.keys(files).length }>
    {
      Object.keys(files).map(name => (
        <li key={ name } onClick={ () => focusWindow(`window-${ name }`) }>
          <a> { /* eslint-disable-line jsx-a11y/anchor-is-valid */ }
            <span className="icon-text">
              <span className="icon">
                <i className="fa fa-file-csv" />
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
  files: state.workstation.files
});

const mapDispatchToProps = dispatch => ({
  focusWindow: id => dispatch(focusWindow(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(SidebarDatasets);
