const Tooltip = props => {
  return (
    <div class={ `absolute rounded p-4 flex right-0 border bg-white shadow-xl z-40 left-[${ props.location.x }px] top-[${ props.location.y }px]` }>
      { props.children }
    </div>
  );
};

export default Tooltip;
