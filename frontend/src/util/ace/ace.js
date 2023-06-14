import ace from 'ace-builds';

window.require = ace.require;
window.define = ace.define;

ace.config.set('basePath', 'node_modules/ace-builds/src/');
ace.require('ace/ext/language_tools'); // TODO: Fix

export default ref => {
  try {
    const editor = ace.edit(ref);
    editor.session.setMode('ace/mode/javascript');
    editor.setTheme('ace/theme/one_dark');
    editor.setOptions({
      fontFamily: 'Jetbrains Mono',
      enableBasicAutocompletion: true,
      enableSnippets: true,
      enableLiveAutocompletion: true,
      maxLines: Infinity,
      tabSize: 2,
      useSoftTabs: false
    });
    return editor;
  } catch (e) {
    console.warn('Caught in try/catch:', e);
    return null;
  }
};
