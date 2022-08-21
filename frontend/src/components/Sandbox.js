const Sandbox = ({ script }) => {
  return (
    <iframe
      className="is-hidden"
      sandbox="allow-scripts"
      srcDoc={ `<script>${ script }</script>` }
    />
  );
};

export default Sandbox;
