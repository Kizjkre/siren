import Window from './Window';

const Info = ({ title, children }) => {
  return (
    <Window anchor="help-window" title={ `Info: ${ title }` }>
      { children ? children : <div className="p-20 m-20" /> }
    </Window>
  );
};

export default Info;
