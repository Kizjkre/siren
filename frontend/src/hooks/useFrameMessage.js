import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { updateSynth } from '../actions';
import store from '../store';

const useFrameMessage = () => {
  const synths = useSelector(state => state.workstation.synths);
  useEffect(() => {
    const listener = e => {
      if (e.origin !== 'null' || !(e.data.synth in synths) || e.data.uuid !== synths[e.data.synth].uuid || e.source !== synths[e.data.synth].settings.ref.current.contentWindow) return;
      window.removeEventListener('message', listener);
      const [port] = e.ports;
      port.onmessage = e => {
        store.dispatch(updateSynth(e.data.name, {
          parameters: [...e.data.parameters],
          port
        }));
        port.onmessage = null;
      };
    };

    window.addEventListener('message', listener);

    return () => window.removeEventListener('message', listener);
  }, [synths]);
};

export default useFrameMessage;
