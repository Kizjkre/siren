import { useEffect, useRef } from 'react';
import p5 from 'p5';
import SynthEditorSketch from '../../helper/editor/synthEditorSketch';

const sketch = new SynthEditorSketch();

const SynthEditor = ({ channel }) => {
  const editor = useRef();
  // const sketch = useRef(new SynthEditorSketch());

  const listener = e => {
    if (e.target.classList.contains('selected')) {
      e.target.classList.remove('selected');
    } else {
      e.target.classList.add('selected');

      const type = e.target.getAttribute('data-type');
      if (type === 'node') {
        sketch.select(
          e.target.getAttribute('data-id'),
          -1,
          e.target
        );
      } else {
        sketch.select(
          document.getElementById(e.target.getAttribute('data-node')).getAttribute('data-id'),
          e.target.getAttribute('data-id'),
          e.target
        );
      }
    }
  };

  useEffect(() => {
    const observer = new MutationObserver(mutationRecords => {
      if (!mutationRecords[0].target?.classList.contains('is-active')) {
        sketch.clear();

        Array.from(document.getElementsByClassName('synth-editor-param')).forEach(el => el.removeEventListener('click', listener));
      } else {
        const bounds = editor.current?.getBoundingClientRect();
        // noinspection JSPotentiallyInvalidConstructorUsage
        new p5(sketch.init(bounds.width, bounds.height), 'editor');
        sketch.draw();

        Array.from(document.getElementsByClassName('synth-editor-param')).forEach(el => el.addEventListener('click', listener));
      }
    });

    observer.observe(editor.current?.parentElement.parentElement.parentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div ref={ editor } id="editor" />;
};

export default SynthEditor;
