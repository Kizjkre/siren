const Tooltip = ({ children, open, position }) => (
  <span
    className={ `tag is-danger is-light tooltip ${ open ? '' : 'is-hidden' }` }
    style={ {
      bottom: `calc(100vh - ${ position.y - 5 }px)`,
      right: `calc(100vw - ${ position.x - 5 }px)`
    } }
  >
    { children }
  </span>
);

export default Tooltip;
