import Window from './Window';

const Info = ({ title, children }) => {
  return (
    <Window anchor="help-window" title={ `Info: ${ title }` }>
      { children ? children : <div className="filler" /> }
    </Window>
  );
};

export default Info;
