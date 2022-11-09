import { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { updateSynth } from '../actions';
import message from '../util/sandbox/message';
import processSynth from '../util/sandbox/processSynth';
import sandboxModule from '../util/sandbox/sandboxModule';

const Sandbox = ({ name, code, uuid, updateSynth }) => {
  const ref = useRef();

  useEffect(() => {
    updateSynth(name, { ref });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <iframe // eslint-disable-line jsx-a11y/iframe-has-title
      className="is-hidden"
      sandbox="allow-scripts"
      allow="autoplay"
      ref={ ref }
      srcDoc={
        `
          <html lang="en">
            <body>
              <script>
                const port = (${ message.toString() })({
                  synth: ${ JSON.stringify(name) },
                  uuid: ${ JSON.stringify(uuid) },
                  origin: ${ JSON.stringify(window.location.origin) }
                });
                (${ sandboxModule.toString() })(
                  'let port = null;'
                  + ${ JSON.stringify(code) },
                  url =>
                    'import synth, { parameters } from ' + JSON.stringify(url) + ';'
                    + '(() => {('
                    + ${ JSON.stringify(processSynth) }
                    + ')(${ JSON.stringify(name) }, synth, parameters, port);'
                    + '})();'
                );
              </script>  
            </body>
          </html>
        `
      }
    />
  );
}
const mapDispatchToProps = dispatch => ({
  updateSynth: (name, settings) => dispatch(updateSynth(name, settings))
});

export default connect(null, mapDispatchToProps)(Sandbox);
