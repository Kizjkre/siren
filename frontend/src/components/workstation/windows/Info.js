import Window from './Window';

const Info = ({ title, children }) => {
  return (
    <Window anchor="help-window" title={ `Info: ${ title }` }>
      { children }
    </Window>
  );
};

export default Info;
