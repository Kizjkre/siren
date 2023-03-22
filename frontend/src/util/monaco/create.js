import { editor } from 'monaco-editor';
import './setup';

export default (ref, value) => {
  const model = editor.create(ref, { automaticLayout: true, minimap: { enabled: false }, scrollBeyondLastLine: false, padding: { top: 10, bottom: 10 } });
  model.setModel(editor.createModel(value, 'javascript'));
  model.updateOptions({ tabSize: 2 });
  return model;
};
