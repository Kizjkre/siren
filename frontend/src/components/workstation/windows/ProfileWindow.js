import { useState } from 'react';
import Window from '../../Window';
import ProfileEditor from '../ProfileEditor';
import { connect } from 'react-redux';
import { addProfile } from '../../../actions';

const ProfileWindow = ({ profiles, addProfile }) => {
  const [save, setSave] = useState(false);
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const [expression, setExpression] = useState('');

  const handleChange = e => setName(e.target.value);

  return (
    <Window
      title="Add Profile"
      id="window-profile"
      buttons={ [{
        close: true,
        color: 'is-success',
        text: 'Add Profile',
        disabled: expression === '' || value !== expression || name === '' || Object.keys(profiles).includes(name),
        onClick: () => {
          addProfile(name, expression);
          setSave(!save);
          setName('');
          setValue('');
          setExpression('');
        }
      }] }
    >
      <div className="box">
        <div className="columns">
          <div className="column is-8">
            <h5 className="subtitle is-size-5">Mapping Function</h5>
          </div>
          <div className="column is-4">
            <input type="text" className="input" placeholder="Name" value={ name } onChange={ handleChange } />
          </div>
        </div>
        <hr />
        <ProfileEditor save={ save } onExpression={ expr => setExpression(expr) } onChange={ value => setValue(value) } editable={ true } />
        <hr />
        <div className="box">
          <h6 className="subtitle is-size-5">To use:</h6>
          <div className="content">
            <ul>
              <li>Any valid math expression (case sensitive)</li>
              <li>Supported operations:</li>
              <ul>
                <li>
                  Numbers:&nbsp;
                  <code className="profile-editor-code-number">0</code>,&nbsp;
                  <code className="profile-editor-code-number">3.14</code>,&nbsp;
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
                </ul>
              </ul>
            </ul>
          </div>
        </div>
      </div>
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
