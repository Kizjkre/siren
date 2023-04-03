import message from '../../../util/sandbox/message';
import module from '../../../util/sandbox/module';

const Sandbox = props => {
  return (
    <iframe // eslint-disable-line jsx-a11y/iframe-has-title
      class="is-hidden"
      sandbox="allow-scripts"
      allow="autoplay"
      srcdoc={
        `
          <html lang="en">
            <body>
              <script>
                const port = (${ message.toString() })({
                  name: ${ JSON.stringify(props.name) },
                  uuid: ${ JSON.stringify(props.uuid) },
                  origin: ${ JSON.stringify(window.location.origin) }
                });
                (${ module.toString() })(
                  'let port = null;'
                  + ${ JSON.stringify(props.children) },
                  ${ props.process }
                );
              </script>  
            </body>
          </html>
        `
      }
    />
  );
};

export default Sandbox;
