import { useState } from 'react';
import { connect } from 'react-redux';
import { addProfile } from '../../../actions';
import Accordion from '../../Accordion';
import Window from '../../Window';
import ProfileEditor from '../ProfileEditor';

const ProfileWindow = ({ profiles, addProfile }) => {
  const [name, setName] = useState('');
  const [value, setValue] = useState({});
  const [clear, setClear] = useState();

  const handleChange = e => setName(e.target.value);

  return (
    <Window
      title="Add Profile"
      id="window-profile"
      buttons={ [{
        close: true,
        color: 'is-success',
        text: 'Add Profile',
        disabled: !value.valid || name === '' || Object.keys(profiles).includes(name),
        onClick: () => {
          addProfile(name, value.expression);
          setName('');
          setValue({});
          clear?.();
        }
      }] }
    >
      <div className="columns">
        <div className="column is-4 profile-title">
          <h5 className="subtitle is-size-5">Enter Profile Name:</h5>
        </div>
        <div className="column is-8">
          <input type="text" className="input" placeholder="Name" value={ name } onChange={ handleChange } />
        </div>
      </div>
      <hr />
      <Accordion title="Profile Editor Guide">
        <div className="content">
          <ul>
            <li>Any valid math expression (case sensitive)</li>
            <li>Supported operations:</li>
            <ul>
              <li>
                Numbers:&nbsp;
                <code className="profile-editor-code-number">0</code>,&nbsp;
                <code className="profile-editor-code-number">3.14</code>,&nbsp;
                <code className="profile-editor-code-number">e</code>,&nbsp;
                etc.
              </li>
              <li>
                Operations:&nbsp;
                <code className="profile-editor-code-operation">+</code>,&nbsp;
                <code className="profile-editor-code-operation">-</code>,&nbsp;
                <code className="profile-editor-code-operation">*</code>,&nbsp;
                <code className="profile-editor-code-operation">/</code>,&nbsp;
                <code className="profile-editor-code-operation">^</code>,&nbsp;
                <code className="profile-editor-code-operation">%</code>
              </li>
              <li>
                Functions:&nbsp;
                <code className="profile-editor-code-function">sin</code>,&nbsp;
                <code className="profile-editor-code-function">cos</code>,&nbsp;
                <code className="profile-editor-code-function">tan</code>,&nbsp;
                <code className="profile-editor-code-function">asin</code>,&nbsp;
                <code className="profile-editor-code-function">acos</code>,&nbsp;
                <code className="profile-editor-code-function">atan</code>,&nbsp;
                <code className="profile-editor-code-function">sqrt</code>,&nbsp;
                <code className="profile-editor-code-function">ln</code>
              </li>
              <li>Parenthesis: <code className="profile-editor-code-parenthesis">()</code></li>
              <li>
                Keywords:
              </li>
              <ul>
                <li><code className="profile-editor-code-keyword">MIN</code> (minimum value of the dataset)</li>
                <li><code className="profile-editor-code-keyword">MAX</code> (maximum value of the dataset)</li>
                <li><code className="profile-editor-code-keyword">MEAN</code> (mean of the dataset)</li>
                <li><code className="profile-editor-code-keyword">MEDIAN</code> (median of the dataset)</li>
                <li><code className="profile-editor-code-keyword">MODE</code> (mode of the dataset)</li>
                <li><code className="profile-editor-code-keyword">Q1</code> (first quartile of the dataset)</li>
                <li><code className="profile-editor-code-keyword">Q3</code> (third quartile of the dataset)</li>
                <li><code className="profile-editor-code-keyword">x</code> (references every data point in the dataset)</li>
                <li><code className="profile-editor-code-keyword">i</code> (references every index in the dataset)</li>
              </ul>
            </ul>
          </ul>
        </div>
      </Accordion>
      <hr />
      <ProfileEditor onChange={ setValue } setClear={ setClear } editable={ true } />
      <hr />
    </Window>
  );
};

const mapStateToProps = state => ({
  profiles: state.workstation.profiles
});

const mapDispatchToProps = dispatch => ({
  addProfile: (name, map) => dispatch(addProfile(name, map))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileWindow);
